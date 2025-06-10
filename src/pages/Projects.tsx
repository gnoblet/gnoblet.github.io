// src/pages/Projects.tsx
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/cards/ProjectCard.tsx";
import SearchBar from "../components/ui/SearchBar.tsx";
import TagFilter from "../components/ui/TagFilter.tsx";
import { projects } from "../data/projects.ts";
import { Project } from "../types/project.ts";
import projectStyles from "../styles/pages/Projects.module.css";
import { motion } from "framer-motion";
import useTagFilter from "../hooks/useTagFilter.tsx";
import Title from "../components/layout/Title.tsx";

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProjects, setDisplayedProjects] =
    useState<Project[]>(projects);

  // Use our custom hook for tag filtering
  const {
    filteredItems,
    selectedTags,
    allTags,
    handleTagSelect,
    handleTagClick,
    handleClearAllTags,
  } = useTagFilter<Project>({
    items: projects,
    getItemTags: (project) => project.tags,
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
          project.tags.some((tag) => tag.toLowerCase().includes(term)),
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
    <div className="page-spacing">
      <Title title="My Projects" subtitle="Check out my recent projects" />

      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max-width)",
          margin: "0 auto",
        }}
      >
        <motion.div
          className={projectStyles.controlsSection}
          style={{ marginTop: "var(--spacing-2xl)", width: "100%" }}
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
          <div className={projectStyles.noResults}>
            <p>No projects found. Try adjusting your search or filters.</p>
            {selectedTags.length > 0 && (
              <button
                className={projectStyles.clearFilterButton}
                onClick={handleClearAllTags}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div
            className={projectStyles.projectsGrid}
            style={{ maxWidth: "100%" }}
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={projectStyles.projectItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onTagClick={handleTagClick}
                  selectedTags={selectedTags}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
