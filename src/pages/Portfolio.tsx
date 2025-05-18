// src/pages/Portfolio.tsx
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import { projects } from "../data/projects";
import { Project } from "../types/project";
import styles from "../styles/pages/Portfolio.module.css";
import { motion } from "framer-motion";
import useTagFilter from "../hooks/useTagFilter.tsx";

const Portfolio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(projects);
  
  // Use our custom hook for tag filtering
  const {
    filteredItems,
    selectedTags,
    allTags,
    handleTagSelect,
    handleTagClick,
    handleClearAllTags
  } = useTagFilter<Project>({
    items: projects,
    getItemTags: (project) => project.tags
  });

  // Apply search filter
  useEffect(() => {
    let results = filteredItems;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }
    
    setDisplayedProjects(results);
  }, [searchTerm, filteredItems]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={styles.portfolioContainer}>
      <motion.div
        className={styles.headerSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>My Portfolio</h1>
        <p className={styles.subtitle}>Check out my recent projects</p>
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
          placeholder="Search projects..."
        />

        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onClearAll={handleClearAllTags}
        />
      </motion.div>

      {displayedProjects.length === 0 ? (
        <div className={styles.noResults}>
          <p>No projects found. Try adjusting your search or filters.</p>
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
        <div className={styles.projectsGrid}>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} onTagClick={handleTagClick} selectedTags={selectedTags} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
