import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "../../styles/components/background/GridBackground.module.css";

type GridBackgroundProps = {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  animated?: boolean;
};

const GridBackground: React.FC<GridBackgroundProps> = ({
  className = "",
  gridSize = 60,
  lineColor,
  animated = false,
}) => {
  const { theme } = useTheme();

  // Use theme-appropriate line color if not explicitly provided
  const themeLineColor =
    lineColor ||
    (theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.15)");

  const themeClass =
    theme === "light" ? styles.gridLightTheme : styles.gridDarkTheme;
  const animationClass = animated
    ? `${styles.animatedGrid} ${styles.active}`
    : "";

  return (
    <div
      className={`${styles.gridBackground} ${themeClass} ${animationClass} ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.gridSvg}
      >
        <defs>
          {/* Pattern definition for the grid */}
          <pattern
            id={`grid-pattern-${theme}`}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal line */}
            <line
              x1="0"
              y1="0"
              x2={gridSize}
              y2="0"
              stroke={themeLineColor}
              strokeWidth="2"
            />
            {/* Vertical line */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={gridSize}
              stroke={themeLineColor}
              strokeWidth="2"
            />
          </pattern>
        </defs>

        {/* Apply the pattern to a rectangle covering the entire SVG */}
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${theme})`} />
      </svg>
    </div>
  );
};

export default GridBackground;
