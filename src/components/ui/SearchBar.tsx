// src/components/navigation/SearchBar.tsx
import React from "react";
import styles from "../../styles/components/ui/SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onClearSearch: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  placeholder = "Search...",
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
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

export default SearchBar;
