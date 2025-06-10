import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/components/layout/Title.module.css";

interface TitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  animate?: boolean;
  className?: string;
  marginBottom?: string;
  marginAfterSubtitle?: string;
  titleSize?: string;
  subtitleSize?: string;
  showUnderline?: boolean;
  boldSubtitle?: boolean;
}

const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  center = true,
  animate = true,
  className = "",
  marginBottom = "0",
  marginAfterSubtitle = "",
  titleSize,
  subtitleSize,
  showUnderline = true,
  boldSubtitle = false,
}) => {
  const titleContainerClass = center
    ? styles.titleContainer
    : styles.titleContainerLeft;
  const sectionContentClass = center
    ? styles.sectionContent
    : `${styles.sectionContent} ${styles.sectionContentLeft}`;

  // Calculate container style with optional margins
  const containerStyle: React.CSSProperties = { marginBottom };

  // Calculate subtitle container style
  const subtitleContainerStyle: React.CSSProperties = {};
  if (marginAfterSubtitle) {
    subtitleContainerStyle.marginBottom = marginAfterSubtitle;
  }
  
  // Custom styles for title and subtitle font sizes
  const titleStyle: React.CSSProperties = {};
  if (titleSize) {
    titleStyle.fontSize = titleSize;
  }
  
  const subtitleTextStyle: React.CSSProperties = {
    textAlign: center ? 'center' : 'left'
  };
  if (subtitleSize) {
    subtitleTextStyle.fontSize = subtitleSize;
  }
  if (boldSubtitle) {
    subtitleTextStyle.fontWeight = 'bold';
  }
  
  // Add class to control underline visibility
  const titleClassName = showUnderline 
    ? styles.title 
    : `${styles.title} ${styles.noUnderline}`;

  const titleElement = (
    <div
      className={`${titleContainerClass} ${className}`}
      style={containerStyle}
    >
      <h2 className={titleClassName} style={titleStyle}>{title}</h2>
      {subtitle ? (
        <div style={subtitleContainerStyle} className={center ? '' : styles.subtitleContainerLeft}>
          <p className={styles.subtitle} style={subtitleTextStyle}>{subtitle}</p>
        </div>
      ) : (
        marginAfterSubtitle && (
          <div style={{ height: marginAfterSubtitle }}></div>
        )
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={sectionContentClass}
      >
        {titleElement}
      </motion.div>
    );
  }

  return <div className={sectionContentClass}>{titleElement}</div>;
};

export default Title;
