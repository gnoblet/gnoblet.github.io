// src/components/ProjectSearch.tsx
import React from "react";
import styles from "../styles/components/ProjectSearch.module.css";

interface ProjectSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onClearSearch: () => void;
}

const ProjectSearch: React.FC<ProjectSearchProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      {searchTerm && (
        <button
          className={styles.clearButton}
          onClick={onClearSearch}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ProjectSearch;
