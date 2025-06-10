// src/components/buttons/ScrollButton.tsx
import React from "react";
import styles from "../../styles/components/buttons/ScrollButton.module.css";

interface ScrollButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
  target?: string; // Id of the target element to scroll to
  smooth?: boolean; // Whether to use smooth scrolling
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  onClick,
  children,
  direction = "none",
  variant = "secondary",
  size = "medium",
  className = "",
  target,
  smooth = true,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (target) {
      const targetElement = document.getElementById(target);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
        });
      }
    }
  };

  const buttonClasses = [
    styles.scrollButton,
    direction !== "none" ? styles[direction] : "",
    variant === "primary" ? styles.primary : "",
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} onClick={handleClick}>
      {children}
    </button>
  );
};

export default ScrollButton;