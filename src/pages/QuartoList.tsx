import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileAlt, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/pages/Quarto.css';

interface QuartoDocument {
  slug: string;
  title: string;
  date?: string;
  description?: string;
}

const QuartoList: React.FC = () => {
  const [documents, setDocuments] = useState<QuartoDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
        
        const extractedDocs: QuartoDocument[] = Array.from(listItems).map((item) => {
          const href = item.getAttribute('href') || '';
          const title = item.textContent || 'Untitled Document';
          
          return {
            slug: href.replace(/\.html$/, ''),
            title: title,
            description: 'A Quarto document',
          };
        });
        
        setDocuments(extractedDocs);
        setLoading(false);
      } catch (err) {
        console.error('Error loading Quarto documents:', err);
        setError('Failed to load Quarto documents');
        setLoading(false);
      }
    };
    
    fetchQuartoDocuments();
  }, []);
  
  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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
      
      <div className="quarto-search">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {filteredDocuments.length === 0 ? (
        <div className="no-documents">
          <p>No Quarto documents found. {searchTerm ? 'Try a different search term.' : 'Add some .qmd files to get started.'}</p>
        </div>
      ) : (
        <motion.div 
          className="documents-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredDocuments.map((doc) => (
            <div key={doc.slug} className="document-card">
              <div className="document-icon">
                <FaFileAlt />
              </div>
              <div className="document-info">
                <h3>{doc.title}</h3>
                {doc.description && <p>{doc.description}</p>}
              </div>
              <div className="document-actions">
                <Link to={`/quarto/${doc.slug}`} className="view-document">
                  View <FaExternalLinkAlt />
                </Link>
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