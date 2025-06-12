// src/services/quartoService.ts
import { QuartoDocument } from '../types/quarto';

// Debug logging function
const logDebug = (message: string, ...data: any[]) => {
  console.log(`🔍 [QuartoService] ${message}`, ...data);
};

/**
 * Fetches all Quarto documents from the server
 * @returns Promise that resolves to an array of QuartoDocument objects
 */
export const fetchQuartoDocuments = async (): Promise<QuartoDocument[]> => {
  try {
    // Try to get cached documents first - disabled for now to force refresh
    // const cachedDocs = localStorage.getItem('quartoDocuments');
    // const cacheTimestamp = localStorage.getItem('quartoDocumentsTimestamp');
    
    // Force refresh - skip cache check
    const cachedDocs = null;
    const cacheTimestamp = null;
    
    // Check if we have a valid cache (less than 1 hour old)
    if (cachedDocs && cacheTimestamp) {
      const now = new Date().getTime();
      const cacheTime = parseInt(cacheTimestamp, 10);
      const cacheAge = now - cacheTime;
      
      // If cache is less than 1 hour old, use it (reduced from 24 hours)
      if (cacheAge < 60 * 60 * 1000) {
        logDebug('Using cached Quarto documents');
        const parsedDocs = JSON.parse(cachedDocs);
        return parsedDocs;
      }
    }
    
    // Add cache busting parameter to prevent browser caching
    const cacheBuster = `?t=${Date.now()}`;
    // For simplicity, we'll fetch and parse the index.html file we created
    const response = await fetch(`/quarto-html/index.html${cacheBuster}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load Quarto index: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Extract document info from the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const listItems = doc.querySelectorAll('.quarto-list li a');
    
    // Create an array of document URLs for batch processing
    const documents = Array.from(listItems).map(item => ({
      href: item.getAttribute('href') || '',
      title: item.textContent || 'Untitled Document',
      slug: (item.getAttribute('href') || '').replace(/\.html$/, '')
    }));
    
    // Batch fetch documents in groups of 2 to avoid overwhelming the browser
    const batchSize = 2;
    const documentBatches = [];
    
    for (let i = 0; i < documents.length; i += batchSize) {
      documentBatches.push(documents.slice(i, i + batchSize));
    }
    
    const extractedDocs: QuartoDocument[] = [];
    
    // Process each batch sequentially
    for (const batch of documentBatches) {
      const batchResults = await Promise.all(batch.map(async ({ href, title: initialTitle, slug }) => {
        try {
          const response = await fetch(`/quarto-html/${href}${cacheBuster}`);
          const html = await response.text();
          const parser = new DOMParser();
          const docContent = parser.parseFromString(html, 'text/html');
          
          // Only extract categories from metadata
          let categories: string[] = [];
          const metaTags = docContent.querySelectorAll('meta');
          metaTags.forEach(tag => {
            const name = tag.getAttribute('name');
            if (name && name.includes('categories')) {
              const content = tag.getAttribute('content');
              if (content) {
                // Split by commas and trim whitespace
                categories = content.split(',').map(cat => cat.trim());
              }
            }
          });
          
          // If we couldn't find categories in meta tags, try looking for categories in the content
          if (categories.length === 0) {
            // Look for text that might indicate categories
            const content = docContent.body.textContent || '';
            const categoryMatch = content.match(/categories:\s*\[(.*?)\]/);
            if (categoryMatch && categoryMatch[1]) {
              categories = categoryMatch[1].split(',').map(cat => cat.trim().replace(/["']/g, ''));
            }
          }
          
          // Look for date information
          let date: string | undefined = undefined;
          const dateMetaTag = docContent.querySelector('meta[name="date"]');
          if (dateMetaTag) {
            date = dateMetaTag.getAttribute('content') || undefined;
          }
          
          // Extract title from meta tags or title element (more accurate than link text)
          let title = initialTitle;
          const titleMetaTag = docContent.querySelector('meta[name="title"], meta[property="og:title"]');
          if (titleMetaTag) {
            const metaTitle = titleMetaTag.getAttribute('content');
            if (metaTitle && metaTitle.trim()) {
              title = metaTitle;
            }
          } else {
            // If no meta title, try to get it from the title element
            const titleElement = docContent.querySelector('title');
            if (titleElement && titleElement.textContent) {
              title = titleElement.textContent.trim();
            }
          }
          
          // Try to extract description from excerpt in YAML header
          let description = 'A Quarto blog post';
          
          // First check for excerpt in meta tags
          const excerptTag = docContent.querySelector('meta[name="description"], meta[name="excerpt"]');
          if (excerptTag) {
            description = excerptTag.getAttribute('content') || description;
          }
          
          // Some Quarto renderings might put the excerpt in og:description
          if (description === 'A Quarto blog post') {
            const ogDescTag = docContent.querySelector('meta[property="og:description"]');
            if (ogDescTag) {
              description = ogDescTag.getAttribute('content') || description;
            }
          }
          
          // Look for excerpt in the document content if still not found
          if (description === 'A Quarto blog post') {
            const content = docContent.body.textContent || '';
            const excerptMatch = content.match(/excerpt:\s*["']([^"']+)["']/);
            if (excerptMatch && excerptMatch[1]) {
              description = excerptMatch[1].trim();
            }
          }
          
          return {
            slug,
            title,
            date,
            description,
            categories: categories.length > 0 ? categories : ['quarto'],
          };
        } catch (err) {
          console.error(`Error fetching document ${href}:`, err);
          return {
            slug,
            title: initialTitle,
            description: 'A Quarto blog post',
            categories: ['quarto'],
          };
        }
      }));
      
      extractedDocs.push(...batchResults);
    }
    
    // Sort by date if available (most recent first)
    const sortedDocs = extractedDocs.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // Cache the results
    try {
      localStorage.setItem('quartoDocuments', JSON.stringify(sortedDocs));
      localStorage.setItem('quartoDocumentsTimestamp', new Date().getTime().toString());
    } catch (e) {
      console.warn('Failed to cache Quarto documents:', e);
    }
    
    logDebug(`Loaded ${sortedDocs.length} Quarto documents with titles:`, 
      sortedDocs.map(d => ({ slug: d.slug, title: d.title })));
    
    return sortedDocs;
  } catch (err) {
    console.error('Error loading Quarto documents:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    logDebug(`Failed to load Quarto documents: ${errorMessage}`);
    throw new Error('Failed to load Quarto documents');
  }
};