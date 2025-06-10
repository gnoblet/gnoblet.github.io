import React from "react";
import styles from "../styles/components/Tag.module.css";

interface TagProps {
  text: string;
  onClick?: (tag: string) => void;
  selected?: boolean;
  showPrefix?: boolean;
  className?: string;
}

/**
 * A reusable Tag component that can be used across the application
 * for displaying tags with consistent styling
 */
const Tag: React.FC<TagProps> = ({
  text,
  onClick,
  selected = false,
  showPrefix = false,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(text);
    }
  };

  return (
    <span
      className={`${styles.tag} ${selected ? styles.selected : ""} ${className}`}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {showPrefix && <span className={styles.prefix}>#</span>}
      {text}
    </span>
  );
};

export default Tag;