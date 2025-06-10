import React from "react";
import styles from "../../styles/components/ui/Toggle.module.css";
import { ToggleProps } from "../../types/toggle";

const Toggle: React.FC<ToggleProps> = ({
  icon,
  onClick,
  showDot = false,
  dotColor = "",
  className = "",
  ariaLabel,
  title,
  spacingLeft = false,
  spacingRight = false,
  rotateOnHover = false,
  isAnimating = false,
}) => {
  const toggleClasses = [
    styles.toggle,
    spacingLeft ? styles.spacingLeft : "",
    spacingRight ? styles.spacingRight : "",
    isAnimating ? styles.animating : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconClasses = [styles.icon, rotateOnHover ? styles.rotateOnHover : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={onClick}
      className={toggleClasses}
      aria-label={ariaLabel}
      title={title}
    >
      <div className={iconClasses}>{icon}</div>
      {showDot && <div className={`${styles.dot} ${dotColor}`}></div>}
    </button>
  );
};

export default Toggle;
