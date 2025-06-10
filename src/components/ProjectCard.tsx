// src/components/ProjectCard.tsx
import React, { useState } from "react";
import { Project } from "../types/project";
import placeholderImage from "../assets/placeholders/project-placeholder.svg";
import { resolveImagePath } from "../utils/imageUtils";
import "../styles/common/CardStyles.css";
import "../styles/components/horizontal/HorizontalCard.css";
import Tag from "./Tag";

interface ProjectCardProps {
  project: Project;
  onTagClick: (tag: string) => void;
  selectedTags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onTagClick,
  selectedTags = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Tag component now handles click events internally

  return (
    <div
      className={`card horizontal-card ${isHovered ? "card-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="horizontal-card-inner"
      >
        <div className="horizontal-card-left-column">
          <div className="horizontal-card-image-container">
            <img
              src={resolveImagePath(project.imageUrl, placeholderImage)}
              alt={project.title}
              className="horizontal-card-image"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
          </div>
          <h2 className="horizontal-card-title">{project.title}</h2>
        </div>
        <div className="horizontal-card-right-column">
          <div className="horizontal-card-content">
            <p className="horizontal-card-description">{project.description}</p>
          </div>
        </div>
      </a>
      <div className="horizontal-card-tags">
        {project.tags.map((tag) => (
          <Tag
            key={tag}
            text={tag}
            onClick={onTagClick}
            selected={selectedTags.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
