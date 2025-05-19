import React, { ReactNode, useEffect, useState } from 'react';
import styles from '../styles/components/MondrianBackground.module.css';
import MondrianCanvas from './MondrianCanvas';

interface MondrianBackgroundProps {
  children: ReactNode;
  className?: string;
  minBlocks?: number;
  maxBlocks?: number;
}

const MondrianBackground: React.FC<MondrianBackgroundProps> = ({ 
  children, 
  className = '',
  minBlocks = 10,
  maxBlocks = 15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Small delay to allow for smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`${styles.mondrianBackground} ${className} ${isVisible ? styles.visible : ''}`}>
      <MondrianCanvas minBlocks={minBlocks} maxBlocks={maxBlocks} />
      <div className={styles.mondrianShadow}></div>
      <div className={styles.mondrianContent}>
        {children}
      </div>
    </div>
  );
};

export default MondrianBackground;