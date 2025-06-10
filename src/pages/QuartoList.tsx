import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import "../styles/pages/Quarto.css";
import "../styles/common/CardStyles.css";
import "../styles/components/horizontal/HorizontalCard.css";
import useTagFilter from "../hooks/useTagFilter.tsx";
import { QuartoCard } from "../components/QuartoComponents/QuartoPostsGrid";
import { fetchQuartoDocuments } from "../utils/quartoService";
import { QuartoDocument } from "../types/quarto";
import "../styles/components/FeaturedProjects.module.css";
import Title from "../components/layout/Title.tsx";

const QuartoList: React.FC = () => {
  const [documents, setDocuments] = useState<QuartoDocument[]>([]);
  const [displayedDocuments, setDisplayedDocuments] = useState<
    QuartoDocument[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Use our custom hook for tag filtering
  const {
    filteredItems,
    selectedTags,
    allTags,
    handleTagSelect,
    handleTagClick,
    handleClearAllTags,
  } = useTagFilter<QuartoDocument>({
    items: documents,
    getItemTags: (doc) => doc.categories || [],
  });

  // Apply search filter
  useEffect(() => {
    let results = filteredItems;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (doc) =>
          doc.title.toLowerCase().includes(term) ||
          (doc.description && doc.description.toLowerCase().includes(term)) ||
          (doc.categories || []).some((cat) =>
            cat.toLowerCase().includes(term),
          ),
      );
    }

    // If we're searching or filtering, show all matching results
    // Otherwise, just show the first page
    if (searchTerm || selectedTags.length > 0) {
      setDisplayedDocuments(results);
    } else {
      setDisplayedDocuments(results.slice(0, documentsPerPage * currentPage));
    }
  }, [
    searchTerm,
    filteredItems,
    selectedTags.length,
    documentsPerPage,
    currentPage,
  ]);

  // Handle search change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Error state is now handled by the QuartoPostsGrid component

  return (
    <div className="quarto-list-container page-spacing">
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
                  handleClearAllTags();
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

            {/* Load more button */}
            {!searchTerm &&
              selectedTags.length === 0 &&
              documents.length > documentsPerPage * currentPage && (
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
            Created with{" "}
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
