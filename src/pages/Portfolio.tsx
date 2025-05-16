// src/pages/Portfolio.tsx
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import { projects } from "../data/projects";
import { Project } from "../types/project";
import styles from "../styles/pages/Portfolio.module.css";
import { motion } from "framer-motion";

const Portfolio: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Extract all unique tags from projects
  useEffect(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }, []);

  // Filter projects based on search term and selected tags
  useEffect(() => {
    let results = projects;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    // Filter by selected tags - project must have ALL selected tags
    if (selectedTags.length > 0) {
      results = results.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag)),
      );
    }

    setFilteredProjects(results);
  }, [searchTerm, selectedTags]);

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

  // Handle tag click from ProjectCard
  const handleTagClick = (tag: string) => {
    // If it's not selected, just add it (don't toggle off)
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      // If already selected, toggle it off
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    }
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

      {filteredProjects.length === 0 ? (
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
          {filteredProjects.map((project, index) => (
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
