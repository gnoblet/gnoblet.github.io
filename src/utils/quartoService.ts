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
    // For simplicity, we'll fetch and parse the index.html file we created
    const response = await fetch('/quarto-html/index.html');
    
    if (!response.ok) {
      throw new Error(`Failed to load Quarto index: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Extract document info from the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const listItems = doc.querySelectorAll('.quarto-list li a');
    
    // First get the basic document information
    const extractedDocs: QuartoDocument[] = await Promise.all(Array.from(listItems).map(async (item) => {
      const href = item.getAttribute('href') || '';
      let title = item.textContent || 'Untitled Document';
      const slug = href.replace(/\.html$/, '');
      
      // Fetch the actual HTML file to extract the categories
      try {
        const response = await fetch(`/quarto-html/${href}`);
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
          
          // We're only using categories, not tags
        }
        
        // Look for date information
        let date: string | undefined = undefined;
        const dateMetaTag = docContent.querySelector('meta[name="date"]');
        if (dateMetaTag) {
          date = dateMetaTag.getAttribute('content') || undefined;
        }
        
        // Original title from link text
        const originalTitle = title;
        
        // Extract title from meta tags or title element (more accurate than link text)
        const titleMetaTag = docContent.querySelector('meta[name="title"], meta[property="og:title"]');
        if (titleMetaTag) {
          const metaTitle = titleMetaTag.getAttribute('content');
          if (metaTitle && metaTitle.trim()) {
            title = metaTitle;
            logDebug(`Found title in meta tag for ${slug}: "${title}"`);
          }
        } else {
          // If no meta title, try to get it from the title element
          const titleElement = docContent.querySelector('title');
          if (titleElement && titleElement.textContent) {
            title = titleElement.textContent.trim();
            logDebug(`Found title in title element for ${slug}: "${title}"`);
          }
        }
        
        // Log if title was updated
        if (title !== originalTitle) {
          logDebug(`Updated title for ${slug}: "${originalTitle}" → "${title}"`);
        } else {
          logDebug(`No title change for ${slug}, keeping: "${title}"`);
        }
        
        // Try to extract description from excerpt in YAML header
        let description = 'A Quarto blog post';
        
        // First check for excerpt in meta tags
        const excerptTag = docContent.querySelector('meta[name="description"], meta[name="excerpt"]');
        if (excerptTag) {
          description = excerptTag.getAttribute('content') || description;
          logDebug(`Found description in meta tag for ${slug}: "${description}"`);
        }
        
        // Some Quarto renderings might put the excerpt in og:description
        if (description === 'A Quarto blog post') {
          const ogDescTag = docContent.querySelector('meta[property="og:description"]');
          if (ogDescTag) {
            description = ogDescTag.getAttribute('content') || description;
            logDebug(`Found description in og:description for ${slug}: "${description}"`);
          }
        }
        
        // Look for excerpt in the document content if still not found
        if (description === 'A Quarto blog post') {
          const content = docContent.body.textContent || '';
          const excerptMatch = content.match(/excerpt:\s*["']([^"']+)["']/);
          if (excerptMatch && excerptMatch[1]) {
            description = excerptMatch[1].trim();
            logDebug(`Found description in content excerpt for ${slug}: "${description}"`);
          }
        }
        
        const resultDoc = {
          slug,
          title,
          date,
          description,
          categories: categories.length > 0 ? categories : ['quarto'],
        };
        
        logDebug(`Extracted document info for ${slug}:`, resultDoc);
        return resultDoc;
      } catch (err) {
        console.error(`Error fetching document ${href}:`, err);
        return {
          slug,
          title,
          description: 'A Quarto blog post',
          categories: ['quarto'],
        };
      }
    }));
    
    // Sort by date if available (most recent first)
    const sortedDocs = extractedDocs.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
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