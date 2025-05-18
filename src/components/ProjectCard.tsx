// src/components/ProjectCard.tsx
import React, { useState } from "react";
import { Project } from "../types/project";
import styles from "../styles/components/ProjectCard.module.css";
import placeholderImage from "../assets/placeholders/project-placeholder.svg";
import { resolveImagePath } from "../utils/imageUtils";
import "../styles/common/CardStyles.css";

interface ProjectCardProps {
  project: Project;
  onTagClick: (tag: string) => void;
  selectedTags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTagClick, selectedTags = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <div 
      className={`card ${isHovered ? 'card-hovered' : ''} ${styles.card}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`card-link ${styles.cardLink}`}
      >
        <div className={`image-container ${styles.imageContainer}`}>
          <img
            src={resolveImagePath(project.imageUrl, placeholderImage)}
            alt={project.title}
            className={`card-image ${styles.image}`}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
        </div>
        <div className={`card-content ${styles.cardContent}`}>
          <h2 className={`card-title ${styles.title}`}>{project.title}</h2>
          <p className={`card-description ${styles.description}`}>{project.description}</p>
        </div>
      </a>
      <div className={`tags-container ${styles.tags}`}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''} ${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
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
