import React from "react";
import styles from "../styles/components/TagCloud.module.css";
import { motion } from "framer-motion";

interface TagCloudProps {
  tags: { name: string; count: number }[];
  selectedTags: string[]; // Change to array
  onTagSelect: (tag: string) => void; // Simplified to handle toggle
  onClearAll: () => void; // Add clear all function
}

const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  selectedTags,
  onTagSelect,
  onClearAll,
}) => {
  // Sort tags alphabetically
  const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.tagCloudContainer}>
      <div className={styles.tagCloudHeader}>
        <h3 className={styles.tagCloudTitle}>Browse by Tags</h3>
        {selectedTags.length > 0 && (
          <button className={styles.clearAllButton} onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>
      <div className={styles.tagCloud}>
        <motion.button
          className={`${styles.tagButton} ${selectedTags.length === 0 ? styles.active : ""}`}
          onClick={onClearAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Posts
        </motion.button>

        {sortedTags.map((tag) => (
          <motion.button
            key={tag.name}
            className={`${styles.tagButton} ${selectedTags.includes(tag.name) ? styles.active : ""}`}
            onClick={() => onTagSelect(tag.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            #{tag.name} <span className={styles.tagCount}>({tag.count})</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
