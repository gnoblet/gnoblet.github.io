// src/components/ui/TagFilter.tsx
import React, { memo, useMemo } from "react";
import styles from "../../styles/components/ui/TagFilter.module.css";
import { motion } from "framer-motion";
import Tag from "../ui/Tag";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onClearAll: () => void;
  filterTitle?: string;
}

const TagFilter: React.FC<TagFilterProps> = memo(({
  tags,
  selectedTags,
  onTagSelect,
  onClearAll,
  filterTitle = "Filter by tag",
}) => {
  // Memoize the All tag and tag list to prevent unnecessary re-renders
  const allTag = useMemo(() => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Tag
        text="All"
        selected={selectedTags.length === 0}
        onClick={() => onClearAll()}
        showPrefix={false}
        className={styles.filterTag}
      />
    </motion.div>
  ), [selectedTags.length, onClearAll]);
  
  // Create a Set for faster lookups when checking if a tag is selected
  const selectedTagsSet = useMemo(() => new Set(selectedTags), [selectedTags]);
  
  // Memoize the tag list
  const tagItems = useMemo(() => 
    tags.map((tag) => (
      <motion.div
        key={tag}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <Tag
          text={tag}
          selected={selectedTagsSet.has(tag)}
          onClick={onTagSelect}
          className={styles.filterTag}
        />
      </motion.div>
    )), 
  [tags, selectedTagsSet, onTagSelect]);
  
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
        transition={{ duration: 0.3 }}
      >
        {allTag}
        {tagItems}
      </motion.div>
    </div>
  );
});

export default memo(TagFilter);
