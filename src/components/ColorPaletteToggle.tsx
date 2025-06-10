import React from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import Toggle from './Toggle';
import { RiPaletteLine } from 'react-icons/ri';
import styles from '../styles/components/Toggle.module.css';

const ColorPaletteToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { palette } = useColorPalette();

  // No-op handler since we only have blue palette now
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // No palette toggle functionality needed
  };

  return (
    <Toggle
      icon={<RiPaletteLine />}
      onClick={handleClick}
      className={`${styles[palette]} ${className || ''}`}
      ariaLabel="Blue color palette"
      title="Blue color palette"
      showDot={true}
      dotColor={styles.blueDot}
      spacingRight={true}
    />
  );
};

export default ColorPaletteToggle;