// src/components/TagCloud.tsx
import React from "react";
import styles from "../styles/TagCloud.module.css";
import { motion } from "framer-motion";

interface TagCloudProps {
  tags: { name: string; count: number }[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  selectedTag,
  onTagSelect,
}) => {
  // Sort tags alphabetically
  const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.tagCloudContainer}>
      <h3 className={styles.tagCloudTitle}>Browse by Tags</h3>
      <div className={styles.tagCloud}>
        <motion.button
          className={`${styles.tagButton} ${selectedTag === null ? styles.active : ""}`}
          onClick={() => onTagSelect(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Posts
        </motion.button>

        {sortedTags.map((tag) => (
          <motion.button
            key={tag.name}
            className={`${styles.tagButton} ${selectedTag === tag.name ? styles.active : ""}`}
            onClick={() =>
              onTagSelect(tag.name === selectedTag ? null : tag.name)
            }
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
