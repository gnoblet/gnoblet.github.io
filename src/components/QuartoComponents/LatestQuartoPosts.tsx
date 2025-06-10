import React from 'react';
import QuartoPostsGrid from './QuartoPostsGrid';
import styles from '../../styles/pages/Home.module.css';
import { LatestQuartoPostsProps } from '../../types/quarto';

// A simple wrapper component that uses QuartoPostsGrid with specific props for the home page
const LatestQuartoPosts: React.FC<LatestQuartoPostsProps> = ({ maxPosts = 3 }) => {
  return (
    <QuartoPostsGrid 
      maxPosts={maxPosts} 
      className={styles.projectsGrid}
      cardClassName={`${styles.projectCard} card`}
    />
  );
};

export default LatestQuartoPosts;