// src/components/ProjectCard.tsx
import React from "react";
import { Project } from "../types/project";
import styles from "../styles/components/ProjectCard.module.css";
import placeholderImage from "../assets/placeholders/project-placeholder.svg";
import { resolveImagePath } from "../utils/imageUtils";

interface ProjectCardProps {
  project: Project;
  onTagClick: (tag: string) => void;
  selectedTags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTagClick, selectedTags = [] }) => {
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <div className={styles.card}>
      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        <div className={styles.imageContainer}>
          <img
            src={resolveImagePath(project.imageUrl, placeholderImage)}
            alt={project.title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.description}>{project.description}</p>
        </div>
      </a>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
            onClick={(e) => handleTagClick(e, tag)}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
