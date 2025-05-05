// src/components/TagFilter.tsx
import React from "react";
import styles from "../styles/components/TagFilter.module.css";
import { motion } from "framer-motion";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTag,
  onTagSelect,
}) => {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Filter by tag</h3>
      <motion.div
        className={styles.tagList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        <motion.button
          className={`${styles.tagButton} ${selectedTag === null ? styles.active : ""}`}
          onClick={() => onTagSelect(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {tags.map((tag) => (
          <motion.button
            key={tag}
            className={`${styles.tagButton} ${selectedTag === tag ? styles.active : ""}`}
            onClick={() => onTagSelect(tag === selectedTag ? null : tag)} // Toggle on/off
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            #{tag}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default TagFilter;
