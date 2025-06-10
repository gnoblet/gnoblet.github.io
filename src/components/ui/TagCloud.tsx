import React from "react";
import styles from "../../styles/components/ui/TagCloud.module.css";
import { motion } from "framer-motion";
import Tag from "./Tag";

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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Tag
            text="All Posts"
            selected={selectedTags.length === 0}
            onClick={() => onClearAll()}
            showPrefix={false}
            className={styles.cloudTag}
          />
        </motion.div>

        {sortedTags.map((tag) => (
          <motion.div key={tag.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tag
              text={`${tag.name} (${tag.count})`}
              selected={selectedTags.includes(tag.name)}
              onClick={() => onTagSelect(tag.name)}
              className={styles.cloudTag}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
