// src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import TagCloud from "../components/TagCloud";
import { BlogPostMetadata } from "../types/blog";
import { loadBlogPosts } from "../utils/blogUtils";
import styles from "../styles/Blog.module.css";
import { motion } from "framer-motion";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 4;

  // Calculate tag counts for the tag cloud
  const calculateTags = (posts: BlogPostMetadata[]) => {
    const tagMap = new Map<string, number>();

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagMap).map(([name, count]) => ({ name, count }));
  };

  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Starting to load blog posts...");
        const allPosts = await loadBlogPosts();
        console.log("Loaded posts:", allPosts);

        if (allPosts.length === 0) {
          console.error("No blog posts were loaded");
          setError(
            "No blog posts found. Please check your directory structure.",
          );
        } else {
          // Sort posts by date (newest first)
          const sortedPosts = [...allPosts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          setPosts(sortedPosts);
          setFilteredPosts(sortedPosts);
          setTags(calculateTags(sortedPosts));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts. Check the console for details.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle tag selection
  useEffect(() => {
    let result = [...posts];

    // Filter by tag if selected
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // Filter by search term if provided
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedTag, searchTerm, posts]);

  // For pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.blogContainer}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.blogTitle}>My Blog</h1>
        <p className={styles.blogSubtitle}>Thoughts, stories and ideas</p>
      </motion.div>

      <div className={styles.blogControls}>
        {/* Search input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button
              className={styles.clearButton}
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.blogContent}>
        <div className={styles.blogSidebar}>
          <TagCloud
            tags={tags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
          />
        </div>

        <div className={styles.blogMainContent}>
          {currentPosts.length === 0 ? (
            <div className={styles.noPosts}>
              <p>No posts found. Try adjusting your filters or search.</p>
              {(selectedTag || searchTerm) && (
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    setSelectedTag(null);
                    setSearchTerm("");
                  }}
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            <>
              <BlogList posts={currentPosts} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                  >
                    &laquo; Previous
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`${styles.pageNumber} ${
                            currentPage === page ? styles.activePage : ""
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                  >
                    Next &raquo;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
