// src/pages/QuartoPage.tsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/pages/Quarto.css";
import "../styles/common/CardStyles.css";

const QuartoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // When the page changes, scroll to top
    window.scrollTo(0, 0);
  }, [slug]);



  if (loading) {
    setTimeout(() => setLoading(false), 500);
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
        <button onClick={() => navigate("/blog")} className="back-button">
          Back to Blog list
        </button>
      </div>
    );
  }

  const quartoUrl = `/quarto-html/${slug}.html`;

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
          <iframe
            ref={iframeRef}
            src={quartoUrl}
            title="Quarto Document"
            className="quarto-frame"
            style={{
              width: "100%",
              height: "100vh",
              border: "none",
              backgroundColor: "var(--color-background-primary)",
            }}
          />
        </motion.div>
      </div>
      <button onClick={() => navigate("/blog")} className="quarto-back-button">
        Back to Blog list
      </button>
    </>
  );
};

export default QuartoPage;
