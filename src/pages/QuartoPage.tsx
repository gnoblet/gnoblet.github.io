// src/pages/QuartoPage.tsx
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/pages/Quarto.css';
import '../styles/common/CardStyles.css';

const QuartoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState<string>('');
  const [iframeHeight, setIframeHeight] = useState<string>('100%');
  const [iframeWidth, setIframeWidth] = useState<string>('100%');
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
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
  
  // Adjust iframe dimensions when window resizes
  useLayoutEffect(() => {
    const updateIframeDimensions = () => {
      if (contentRef.current && iframeRef.current) {
        const container = contentRef.current.querySelector('.quarto-content-wrapper');
        if (container) {
          // Get the content wrapper's dimensions
          const rect = container.getBoundingClientRect();
          setIframeWidth(`${rect.width}px`);
          setIframeHeight(`${rect.height}px`);
        }
      }
    };
    
    // Initial calculation after a short delay to ensure DOM is ready
    const timer = setTimeout(updateIframeDimensions, 100);
    
    // Add resize listener
    window.addEventListener('resize', updateIframeDimensions);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIframeDimensions);
    };
  }, [html]);
  
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
  
  // Render a sandboxed iframe to display the HTML content
  return (
    <>
      <div className="quarto-page-container">
        <motion.div 
          className="quarto-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          ref={contentRef}
        >
          <div className="quarto-content-wrapper">
            <iframe 
              ref={iframeRef}
              srcDoc={html}
              title="Quarto Document"
              className="quarto-iframe"
              sandbox="allow-scripts allow-same-origin allow-popups"
              style={{ 
                height: iframeHeight, 
                width: iframeWidth,
                border: 'none',
                display: 'block'
              }}
              onLoad={() => {
                // Retry dimension calculation after iframe content is loaded
                if (contentRef.current) {
                  const container = contentRef.current.querySelector('.quarto-content-wrapper');
                  if (container) {
                    const rect = container.getBoundingClientRect();
                    setIframeHeight(`${rect.height}px`);
                    setIframeWidth(`${rect.width}px`);
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>
      <button 
        onClick={() => navigate('/quarto')}
        className="quarto-back-button"
      >
        ↑ Back to Quarto Documents
      </button>
    </>
  );
};

export default QuartoPage;