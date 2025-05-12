// src/pages/QuartoPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/pages/Quarto.css';

const QuartoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState<string>('');
  
  useEffect(() => {
    const fetchQuartoHtml = async () => {
      try {
        if (!slug) {
          setError('No document specified');
          setLoading(false);
          return;
        }
        
        const response = await fetch(`/quarto-html/${slug}.html`);
        
        if (!response.ok) {
          setError(`Failed to load Quarto document: ${response.statusText}`);
          setLoading(false);
          return;
        }
        
        const htmlContent = await response.text();
        setHtml(htmlContent);
        setLoading(false);
      } catch (err) {
        console.error('Error loading Quarto document:', err);
        setError('Failed to load Quarto document');
        setLoading(false);
      }
    };
    
    fetchQuartoHtml();
  }, [slug]);
  
  // When the page changes, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="quarto-container loading">
        <div className="loading-spinner"></div>
        <p>Loading Quarto document...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quarto-container error">
        <h1>Error Loading Document</h1>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/quarto')}
          className="back-button"
        >
          Back to Quarto Documents
        </button>
      </div>
    );
  }
  
  // Use a sandboxed iframe to display the HTML content
  return (
    <motion.div 
      className="quarto-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quarto-navigation">
        <button 
          onClick={() => navigate('/quarto')}
          className="back-button"
        >
          Back to Quarto Documents
        </button>
      </div>
      
      <div className="quarto-content-wrapper">
        <iframe 
          srcDoc={html}
          title="Quarto Document"
          className="quarto-iframe"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </motion.div>
  );
};

export default QuartoPage;