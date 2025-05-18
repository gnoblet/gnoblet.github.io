import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileAlt } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import '../styles/pages/Quarto.css';
import '../styles/common/CardStyles.css';
import useTagFilter from '../hooks/useTagFilter.tsx';

interface QuartoDocument {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  categories?: string[];
}

const QuartoList: React.FC = () => {
  const [documents, setDocuments] = useState<QuartoDocument[]>([]);
    const [displayedDocuments, setDisplayedDocuments] = useState<QuartoDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchQuartoDocuments = async () => {
      try {
        // For simplicity, we'll fetch and parse the index.html file we created
        const response = await fetch('/quarto-html/index.html');
        
        if (!response.ok) {
          throw new Error(`Failed to load Quarto index: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Extract document info from the HTML
        // This is a simple approach - a more robust approach would be to generate a JSON index
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const listItems = doc.querySelectorAll('.quarto-list li a');
        
        // First get the basic document information
        const extractedDocs: QuartoDocument[] = await Promise.all(Array.from(listItems).map(async (item) => {
          const href = item.getAttribute('href') || '';
          const title = item.textContent || 'Untitled Document';
          const slug = href.replace(/\.html$/, '');
          
          // Fetch the actual HTML file to extract the categories
          try {
            const response = await fetch(`/quarto-html/${href}`);
            const html = await response.text();
            const parser = new DOMParser();
            const docContent = parser.parseFromString(html, 'text/html');
            
            // Try to find categories or tags in the metadata
            // Look for meta tags that might contain categories info
            let categories: string[] = [];
            const metaTags = docContent.querySelectorAll('meta');
            metaTags.forEach(tag => {
              const name = tag.getAttribute('name');
              if (name && (name.includes('categories') || name.includes('tags'))) {
                const content = tag.getAttribute('content');
                if (content) {
                  // Split by commas and trim whitespace
                  categories = content.split(',').map(cat => cat.trim());
                }
              }
            });
            
            // If we couldn't find categories in meta tags, try looking for common patterns in the content
            if (categories.length === 0) {
              // Look for text that might indicate categories or tags
              const content = docContent.body.textContent || '';
              const categoryMatch = content.match(/categories:\s*\[(.*?)\]/);
              if (categoryMatch && categoryMatch[1]) {
                categories = categoryMatch[1].split(',').map(cat => cat.trim().replace(/["']/g, ''));
              }
              
              // Also check for tags
              const tagMatch = content.match(/tags:\s*\[(.*?)\]/);
              if (tagMatch && tagMatch[1]) {
                const tags = tagMatch[1].split(',').map(tag => tag.trim().replace(/["']/g, ''));
                categories = [...categories, ...tags];
              }
            }
            
            return {
              slug,
              title,
              description: 'A Quarto document',
              categories: categories.length > 0 ? categories : ['quarto'],
            };
          } catch (err) {
            console.error(`Error fetching document ${href}:`, err);
            return {
              slug,
              title,
              description: 'A Quarto document',
              categories: ['quarto'],
            };
          }
        }));
        
        setDocuments(extractedDocs);
        setDisplayedDocuments(extractedDocs);
        setLoading(false);
      } catch (err) {
        console.error('Error loading Quarto documents:', err);
        setError('Failed to load Quarto documents');
        setLoading(false);
      }
    };
    
    fetchQuartoDocuments();
  }, []);
  
  // Use our custom hook for tag filtering
  const {
    filteredItems,
    selectedTags,
    allTags,
    handleTagSelect,
    handleTagClick,
    handleClearAllTags
  } = useTagFilter<QuartoDocument>({
    items: documents,
    getItemTags: (doc) => doc.categories || []
  });

  // Apply search filter
  useEffect(() => {
    let results = filteredItems;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(term) ||
        (doc.description && doc.description.toLowerCase().includes(term)) ||
        (doc.categories || []).some(cat => cat.toLowerCase().includes(term))
      );
    }
    
    setDisplayedDocuments(results);
  }, [searchTerm, filteredItems]);

  // Handle search change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="quarto-container loading">
        <div className="loading-spinner"></div>
        <p>Loading Quarto documents...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quarto-container error">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="quarto-list-container">
      <motion.div 
        className="quarto-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Quarto Documents</h1>
        <p>Interactive data science documents powered by Quarto</p>
      </motion.div>
      
      <motion.div
        className="quarto-controls-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          placeholder="Search Quarto documents..."
        />

        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onClearAll={handleClearAllTags}
        />
      </motion.div>
      
      {displayedDocuments.length === 0 ? (
        <div className="no-documents">
          <p>No Quarto documents found. {searchTerm || selectedTags.length > 0 ? 'Try adjusting your search or filters.' : 'Add some .qmd files to get started.'}</p>
          {(searchTerm || selectedTags.length > 0) && (
            <button
              className="clear-filter-button"
              onClick={() => {
                setSearchTerm('');
                handleClearAllTags();
              }}
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <motion.div 
          className="documents-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayedDocuments.map((doc) => (
            <div
              key={doc.slug} 
              className="card document-card"
            >
              <Link to={`/quarto/${doc.slug}`} className="card-link document-card-link">
                <div className="card-icon document-icon">
                  <FaFileAlt />
                </div>
                <div className="card-content document-info">
                  <h3 className="card-title">{doc.title}</h3>
                  {doc.description && <p className="card-description">{doc.description}</p>}
                </div>
              </Link>
              <div className="tags-container document-tags">
                {doc.categories && doc.categories.map((category) => (
                  <span 
                    key={category} 
                    className={`tag document-tag ${selectedTags.includes(category) ? 'tag-selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTagClick(category);
                    }}
                  >
                    #{category}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
      
      <div className="quarto-footer">
        <p>
          Created with <a href="https://quarto.org" target="_blank" rel="noopener noreferrer">Quarto</a> - 
          An open-source scientific and technical publishing system
        </p>
      </div>
    </div>
  );
};

export default QuartoList;