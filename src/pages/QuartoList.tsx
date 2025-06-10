import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import TagFilter from "../components/ui/TagFilter";
import "../styles/pages/Quarto.css";
import "../styles/common/CardStyles.css";
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
  
  // Load documents directly from the service
  // Track pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 4;

  useEffect(() => {
    const loadQuartoDocuments = async () => {
      try {
        const loadedDocuments = await fetchQuartoDocuments();
        setDocuments(loadedDocuments);
        setDisplayedDocuments(loadedDocuments.slice(0, documentsPerPage));
      } catch (err) {
        console.error("Error loading Quarto documents:", err);
        // Set empty documents to avoid null errors in components
        setDocuments([]);
        setDisplayedDocuments([]);
        // Shows the "no documents" message
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
    documents.forEach(doc => {
      (doc.categories || []).forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [documents]);

  // Apply search filter, tag filter, and pagination
  useEffect(() => {
    // Start fresh filtering from all documents
    let filtered = [...documents];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(term) ||
          (doc.description && doc.description.toLowerCase().includes(term)) ||
          (doc.categories || []).some((cat) =>
            cat.toLowerCase().includes(term)
          ),
      );
    }
    
    // Apply tag filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter(doc => {
        const docTags = doc.categories || [];
        return selectedTags.every(tag => docTags.includes(tag));
      });
    }

    // Apply pagination - ensure we reset properly when filters change
    setDisplayedDocuments(filtered.slice(0, documentsPerPage * currentPage));
  }, [searchTerm, selectedTags, documents, currentPage, documentsPerPage]);

  // Handle search change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };
  
  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => {
      // Toggle tag selection
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // Reset to first page when filtering changes
  };
  
  // Handle tag click from card
  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
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

        {displayedDocuments.length === 0 ? (
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
              {displayedDocuments.map((doc, index) => (
                <motion.div
                  key={doc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <QuartoCard
                    doc={doc}
                    className="card horizontal-card"
                    onTagClick={handleTagClick}
                    selectedTags={selectedTags}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Load more button - only show when not filtering */}
            {!searchTerm && selectedTags.length === 0 && documents.length > documentsPerPage * currentPage && (
                <div
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
                    Load More Documents
                  </button>
                </div>
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
