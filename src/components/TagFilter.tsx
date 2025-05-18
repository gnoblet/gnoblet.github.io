// src/components/TagFilter.tsx
import React from "react";
import styles from "../styles/components/TagFilter.module.css";
import { motion } from "framer-motion";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onClearAll: () => void;
  filterTitle?: string;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagSelect,
  onClearAll,
  filterTitle = "Filter by tag",
}) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>{filterTitle}</h3>
        {selectedTags.length > 0 && (
          <button className={styles.clearAllButton} onClick={onClearAll}>
            Clear all filters
          </button>
        )}
      </div>
      <motion.div
        className={styles.tagList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        <motion.button
          className={`${styles.tagButton} ${selectedTags.length === 0 ? styles.active : ""}`}
          onClick={onClearAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {tags.map((tag) => (
          <motion.button
            key={tag}
            className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.active : ""}`}
            onClick={() => onTagSelect(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            #{tag}
          </motion.button>
        ))}
      </motion.div>
      {selectedTags.length > 0 && (
        <div className={styles.filterSummary}>
          <p>
            Showing items with {selectedTags.length > 1 ? "all" : "the"}{" "}
            selected {selectedTags.length > 1 ? "tags" : "tag"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
