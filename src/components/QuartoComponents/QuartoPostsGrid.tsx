import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import styles from "../../styles/pages/Home.module.css";
import "../../styles/components/horizontal/HorizontalCard.css";
import { fetchQuartoDocuments } from "../../utils/quartoService";
import {
  QuartoDocument,
  QuartoPostsGridProps,
  QuartoCardProps,
} from "../../types/quarto";

const QuartoPostsGrid: React.FC<QuartoPostsGridProps> = ({
  maxPosts,
  className = styles.projectsGrid,
  onDocumentsLoaded,
  cardClassName = "horizontal-card",
}) => {
  const [documents, setDocuments] = useState<QuartoDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuartoDocuments = async () => {
      try {
        const sortedDocs = await fetchQuartoDocuments();

        // Apply maxPosts limit if provided
        const limitedDocs = maxPosts
          ? sortedDocs.slice(0, maxPosts)
          : sortedDocs;

        setDocuments(limitedDocs);
        // Notify parent component if callback is provided
        if (onDocumentsLoaded) {
          onDocumentsLoaded(limitedDocs);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading Quarto documents:", err);
        setError("Failed to load Quarto documents");
        setLoading(false);
      }
    };

    loadQuartoDocuments();
  }, [onDocumentsLoaded, maxPosts]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {documents.length === 0 ? (
        <div className="no-documents">
          <p>No Quarto blog posts found. Check back later!</p>
        </div>
      ) : (
        <div className={className}>
          {documents.map((doc, index) => (
            <motion.div
              key={doc.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <QuartoCard doc={doc} className={cardClassName} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

// Card component that can be used independently

export const QuartoCard: React.FC<QuartoCardProps> = ({
  doc,
  onTagClick,
  className = "horizontal-card",
  selectedTags = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${className} ${isHovered ? "card-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RouterLink
        to={`/blog/${doc.slug}`}
        className="horizontal-card-inner"
        aria-label={`View Quarto document: ${doc.title || "Untitled Document"}`}
        title={doc.description || "No description available"}
      >
        <div className="horizontal-card-left-column">
          <div className="horizontal-card-image-container">
            <div className="card-icon">
              <FaFileAlt style={{ fontSize: "2rem" }} />
            </div>
          </div>
          <h2 className="horizontal-card-title">
            {doc.title || "Untitled Document"}
          </h2>
        </div>
        <div className="horizontal-card-right-column">
          <div className="horizontal-card-content">
            <p className="horizontal-card-description">
              {doc.description || "No description available"}
            </p>
            {doc.date && (
              <p
                style={{
                  fontSize: "var(--font-size-md)",
                  color: "var(--text-secondary)",
                  marginTop: "auto",
                }}
              >
                {new Date(doc.date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </RouterLink>
      <div className="horizontal-card-tags">
        {(doc.categories || []).map((tag) => (
          <span
            key={tag}
            className={`horizontal-card-tag ${selectedTags.includes(tag) ? "selected" : ""}`}
            onClick={
              onTagClick
                ? (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onTagClick(tag);
                  }
                : undefined
            }
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuartoPostsGrid;
