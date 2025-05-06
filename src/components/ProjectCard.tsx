// src/components/ProjectCard.tsx
import React from "react";
import { Project } from "../types/project";
import styles from "../styles/components/ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onTagClick: (tag: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTagClick  }) => {

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={styles.tag}
            onClick={() => handleTagClick(tag)}
          >
            #{tag}
          </span>
        ))}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
