import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import TagFilter from "../components/ui/TagFilter";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState("");
  const loadingIntervalRef = useRef<number | null>(null);

  // Load documents directly from the service
  // Track pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 6;
  const [filteredDocuments, setFilteredDocuments] = useState<QuartoDocument[]>([]);

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
        // Check sessionStorage for documents first for instant loading between page navigations
        const sessionDocs = sessionStorage.getItem('quartoDocumentsData');
        if (sessionDocs) {
          const parsedDocs = JSON.parse(sessionDocs);
          setDocuments(parsedDocs);
          setDisplayedDocuments(parsedDocs.slice(0, documentsPerPage));
          setLoading(false);
          
          // Still fetch in background to check for updates
          fetchQuartoDocuments().then(freshDocs => {
            sessionStorage.setItem('quartoDocumentsData', JSON.stringify(freshDocs));
            setDocuments(freshDocs);
            applyFilters(freshDocs, searchTerm, selectedTags, currentPage);
          }).catch(err => {
            console.error("Background refresh error:", err);
          });
        } else {
          const loadedDocuments = await fetchQuartoDocuments();
          sessionStorage.setItem('quartoDocumentsData', JSON.stringify(loadedDocuments));
          setDocuments(loadedDocuments);
          setDisplayedDocuments(loadedDocuments.slice(0, documentsPerPage));
        }
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
    setSearchTerm("");
    setSelectedTags([]);
    setCurrentPage(1);
    if (documents.length > 0) {
      setDisplayedDocuments(documents.slice(0, documentsPerPage));
    }
  }, [location.key, documentsPerPage, documents]);

  // Get all unique tags from documents
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    documents.forEach((doc) => {
      (doc.categories || []).forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [documents]);
  
  // Optimized filtering function
  const applyFilters = useCallback((docs: QuartoDocument[], term: string, tags: string[], page: number) => {
    // Use requestAnimationFrame to prevent UI blocking during intensive operations
    requestAnimationFrame(() => {
      // Start fresh filtering from all documents
      let filtered = docs;
      
      // Create a new filtered array only if needed
      if (term || tags.length > 0) {
        filtered = docs.filter(doc => {
          // First check tags (faster)
          if (tags.length > 0) {
            const docTags = doc.categories || [];
            if (!tags.every(tag => docTags.includes(tag))) {
              return false;
            }
          }
          
          // Then check search term
          if (term) {
            const termLower = term.toLowerCase();
            return (
              doc.title.toLowerCase().includes(termLower) ||
              (doc.description && doc.description.toLowerCase().includes(termLower)) ||
              (doc.categories || []).some(cat => cat.toLowerCase().includes(termLower))
            );
          }
          
          return true;
        });
      }
      
      // Store full filtered results
      setFilteredDocuments(filtered);
      
      // Apply pagination
      setDisplayedDocuments(filtered.slice(0, documentsPerPage * page));
    });
  }, [documentsPerPage]);

  // Apply search filter, tag filter, and pagination
  useEffect(() => {
    applyFilters(documents, searchTerm, selectedTags, currentPage);
  }, [searchTerm, selectedTags, documents, currentPage, applyFilters]);

  // Handle search change with debounce
  const searchTimeoutRef = useRef<number | null>(null);
  const handleSearchChange = (term: string) => {
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    
    // Apply immediately if clearing search
    if (!term) {
      setSearchTerm("");
      setCurrentPage(1);
    } else {
      // Debounce search input to prevent excessive filtering
      searchTimeoutRef.current = window.setTimeout(() => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page on search
      }, 300);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => {
      // Toggle tag selection
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // Reset to first page when filtering changes
  };

  // Handle tag click from card
  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setCurrentPage(1);
    }
  };

  // Handle clear all tags
  const handleClearAllTags = () => {
    setSelectedTags([]);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  return (
    <div
      className="quarto-list-container page-spacing"
      key={`quarto-list-${location.key}`}
    >
      <Title
        title="Quarto Documents"
        marginAfterSubtitle="var(--spacing-2xl)"
        subtitle="Interactive data science documents powered by Quarto"
      />

      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max-width)",
          margin: "0 auto",
        }}
      >
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

        {loading ? (
          <div 
            className="loading-container" 
            style={{ 
              textAlign: 'center', 
              padding: 'var(--spacing-xl) 0', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              minHeight: '300px',
              justifyContent: 'center' 
            }}
          >
            <div className="loading-spinner"></div>
            <p>Loading blog posts{loadingProgress}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              This may take a moment on first visit
            </p>
          </div>
        ) : displayedDocuments.length === 0 ? (
          <div className="no-documents">
            <p>
              No Quarto documents found.{" "}
              {searchTerm || selectedTags.length > 0
                ? "Try adjusting your search or filters."
                : "Add some .qmd files to get started."}
            </p>
            {(searchTerm || selectedTags.length > 0) && (
              <button
                className="clear-filter-button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTags([]);
                  setCurrentPage(1); // Reset to first page when clearing filters
                }}
              >
                Clear All Filters
              </button>
            )}
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
              {/* Display filtered documents */}
              <AnimatePresence mode="wait">
                {displayedDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                    layout
                  >
                    <QuartoCard
                      doc={doc}
                      className="horizontal-card"
                      onTagClick={handleTagClick}
                      selectedTags={selectedTags}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load more button - show when there are more filtered documents to display */}
            {filteredDocuments.length > documentsPerPage * currentPage && (
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
                    Load More Documents ({displayedDocuments.length} of {filteredDocuments.length})
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