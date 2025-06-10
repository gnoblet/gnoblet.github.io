// src/pages/Projects.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "../components/cards/ProjectCard.tsx";
import { projects } from "../data/projects.ts";
import projectStyles from "../styles/pages/Projects.module.css";
import { motion } from "framer-motion";
import Title from "../components/layout/Title.tsx";

const Projects: React.FC = () => {
  const location = useLocation();

  return (
    <div className="page-spacing" key={`projects-page-${location.key}`}>
      <Title title="My Projects" subtitle="Check out my recent projects" />

      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max-width)",
          margin: "0 auto",
        }}
      >
        <motion.div
          style={{ marginTop: "var(--spacing-2xl)", width: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        </motion.div>

        {(
          <div
            className={projectStyles.projectsGrid}
            style={{ maxWidth: "100%" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={projectStyles.projectItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onTagClick={() => {}}
                  selectedTags={[]}
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
