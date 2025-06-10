import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/components/buttons/ActionButton.module.css";
interface ActionButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "small" | "regular";
}

/**
 * ActionButton component for consistent button styling across the site
 * Can be rendered as a router Link, external anchor, or button based on props
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  to,
  href,
  onClick,
  children,
  className = "",
  size = "regular",
}) => {
  const buttonClasses = `${styles.actionButton} ${size === "small" ? styles.smallButton : ""} ${className}`;
  // Router link (internal navigation)
  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  // Button with click handler
  return (
    <button onClick={onClick} className={buttonClasses} type="button">
      {children}
    </button>
  );
};

export default ActionButton;
