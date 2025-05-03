// src/components/ProjectCard.tsx
import React from "react";
import { Project } from "../types/project";
import styles from "../styles/ProjectCard.module.css";
import { motion } from "framer-motion"; // Import framer-motion for animations

interface ProjectCardProps {
  project: Project;
  onTagClick: (tag: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTagClick }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.imageContainer}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
              onClick={() => onTagClick(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
