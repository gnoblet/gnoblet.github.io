import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../styles/pages/Quarto.css";
import "../styles/components/horizontal/HorizontalCard.css";
import { QuartoCard } from "../components/QuartoComponents/QuartoPostsGrid";
import { fetchQuartoDocuments } from "../utils/quartoService";
import { QuartoDocument } from "../types/quarto";
import "../styles/components/FeaturesList/FeaturedProjects.module.css";
import Title from "../components/layout/Title.tsx";

const QuartoList: React.FC = () => {
  const location = useLocation();
  const [documents, setDocuments] = useState<QuartoDocument[]>([]);
  const [displayedDocuments, setDisplayedDocuments] = useState<
    QuartoDocument[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState("");
  const loadingIntervalRef = useRef<number | null>(null);

  // Track pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 6;

  useEffect(() => {
    // Set up a loading animation with dots
    if (loading) {
      let dots = 0;
      loadingIntervalRef.current = window.setInterval(() => {
        dots = (dots + 1) % 4;
        setLoadingProgress(".".repeat(dots));
      }, 500);
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    const loadQuartoDocuments = async () => {
      setLoading(true);
      try {
        // Force a fresh load every time instead of using sessionStorage
        // This ensures we always get the latest blog posts
        const loadedDocuments = await fetchQuartoDocuments();

        // Temporarily disable sessionStorage caching
        // sessionStorage.setItem('quartoDocumentsData', JSON.stringify(loadedDocuments));

        setDocuments(loadedDocuments);
        setDisplayedDocuments(loadedDocuments.slice(0, documentsPerPage));
      } catch (err) {
        console.error("Error loading Quarto documents:", err);
        // Set empty documents to avoid null errors in components
        setDocuments([]);
        setDisplayedDocuments([]);
        // Shows the "no documents" message
      } finally {
        setLoading(false);
        if (loadingIntervalRef.current) {
          clearInterval(loadingIntervalRef.current);
        }
      }
    };

    loadQuartoDocuments();
  }, []);

  // Reset state when location changes
  useEffect(() => {
    setCurrentPage(1);
    if (documents.length > 0) {
      setDisplayedDocuments(documents.slice(0, documentsPerPage));
    }
  }, [location.key, documentsPerPage, documents, currentPage]);

  // Apply pagination
  useEffect(() => {
    setDisplayedDocuments(documents.slice(0, documentsPerPage * currentPage));
  }, [documents, currentPage, documentsPerPage]);

  return (
    <div
      className="quarto-list-container page-spacing"
      key={`quarto-list-${location.key}`}
    >
      <Title
        title="Blog posts"
        marginAfterSubtitle="var(--spacing-2xl)"
        subtitle="Data-based blog posts."
      />

      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max-width)",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <div
            className="loading-container"
            style={{
              textAlign: "center",
              padding: "var(--spacing-xl) 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "300px",
              justifyContent: "center",
            }}
          >
            <div className="loading-spinner"></div>
            <p>Loading blog posts{loadingProgress}</p>
            <p
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--text-secondary)",
                marginTop: "0.5rem",
              }}
            >
              This may take a moment on first visit
            </p>
          </div>
        ) : displayedDocuments.length === 0 ? (
          <div className="no-documents">
            <p>
              No Quarto documents found. Add some .qmd files to get started.
            </p>
          </div>
        ) : (
          <>
            <motion.div
              className="documents-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginBottom: "var(--spacing-xl)" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {displayedDocuments.map((doc, index) => (
                <motion.div
                  key={doc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.05, 0.3),
                  }}
                >
                  <QuartoCard doc={doc} className="horizontal-card" />
                </motion.div>
              ))}
            </motion.div>

            {/* Load more button - show when there are more documents to display */}
            {documents.length > documentsPerPage * currentPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "40px",
                }}
              >
                <button
                  className="view-more-button"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Load More Documents ({displayedDocuments.length} of{" "}
                  {documents.length})
                </button>
              </motion.div>
            )}
          </>
        )}

        <div className="quarto-footer">
          <p>
            Blog posts created with{" "}
            <a
              href="https://quarto.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quarto
            </a>{" "}
            - An open-source scientific and technical publishing system
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuartoList;
