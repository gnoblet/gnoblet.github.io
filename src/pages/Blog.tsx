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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  // Filter posts based on search term and selected tags
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

    // Filter by selected tags - post must have ALL selected tags
    if (selectedTags.length > 0) {
      results = results.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag)),
      );
    }

    setFilteredPosts(results);
  }, [searchTerm, selectedTags, postsMetadata]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevTags) => {
      // Toggle tag
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
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
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onClearAll={handleClearAllTags}
        />
      </motion.div>

      {filteredPosts.length === 0 ? (
        <div className={styles.noResults}>
          <p>No posts found. Try adjusting your search or filters.</p>
          {selectedTags.length > 0 && (
            <button
              className={styles.clearFilterButton}
              onClick={handleClearAllTags}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <BlogList posts={filteredPosts} />
      )}
    </div>
  );
};

export default Blog;
