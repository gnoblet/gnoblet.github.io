// src/components/FeaturedProjects.tsx
import React from "react";
import { Project } from "../types/project";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import styles from "../styles/components/FeaturedProjects.module.css";
import { motion } from "framer-motion";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const handleTagClick = () => {
    // No need to handle tag filtering on the home page
  };

  return (
    <section className={styles.featuredSection}>
      <div className={styles.featuredContent}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Latest Projects</h2>
          <p className={styles.sectionSubtitle}>Check out my recent work</p>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <ProjectCard project={project} onTagClick={handleTagClick} />
              </motion.div>
            ))}
          </div>

          <div className={styles.viewMoreContainer}>
            <Link to="/portfolio" className={styles.viewMoreButton}>
              View All Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
