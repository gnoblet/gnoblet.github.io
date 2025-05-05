// src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import TagFilter from "../components/TagFilter";
import SearchBar from "../components/SearchBar";
import { BlogPostMetadata } from "../types/blog";
import { useBlogPosts } from "../utils/blogUtils";
import styles from "../styles/pages/Blog.module.css";
import { motion } from "framer-motion";

const Blog: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();
  const [postsMetadata, setPostsMetadata] = useState<BlogPostMetadata[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Transform full posts to metadata (remove content)
  useEffect(() => {
    if (posts.length > 0) {
      const metadata = posts.map(({ content, ...meta }) => meta);
      setPostsMetadata(metadata);
      setFilteredPosts(metadata);

      // Extract all unique tags
      const tags = new Set<string>();
      posts.forEach((post) => {
        post.tags.forEach((tag) => tags.add(tag));
      });
      setAllTags(Array.from(tags).sort());
    }
  }, [posts]);

  // Filter posts based on search term and selected tag
  useEffect(() => {
    let results = postsMetadata;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      results = results.filter((post) => post.tags.includes(selectedTag));
    }

    setFilteredPosts(results);
  }, [searchTerm, selectedTag, postsMetadata]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  if (loading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.blogContainer}>
      <motion.div
        className={styles.headerSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>Thoughts, stories and ideas</p>
      </motion.div>

      <motion.div
        className={styles.controlsSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          placeholder="Search blog posts..."
        />

        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
        />
      </motion.div>

      {filteredPosts.length === 0 ? (
        <div className={styles.noResults}>
          <p>No posts found. Try adjusting your search or filters.</p>
          {selectedTag && (
            <button
              className={styles.clearFilterButton}
              onClick={() => setSelectedTag(null)}
            >
              Clear Filter
            </button>
          )}
        </div>
      ) : (
        <BlogList posts={filteredPosts} />
      )}

      {selectedTag && (
        <motion.div
          className={styles.activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>Filtering by: </span>
          <button
            className={styles.activeTag}
            onClick={() => setSelectedTag(null)}
          >
            #{selectedTag} ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Blog;
