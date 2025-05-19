import React from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { RiPaletteLine, RiPaletteFill } from 'react-icons/ri';
import styles from '../styles/components/ColorPaletteToggle.module.css';

const ColorPaletteToggle: React.FC = () => {
  const { palette, togglePalette } = useColorPalette();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePalette();
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.paletteToggle} ${styles[palette]}`}
      aria-label={`Switch to ${palette === 'blue' ? 'autumn' : 'blue'} color palette`}
      title={`Switch to ${palette === 'blue' ? 'autumn' : 'blue'} color palette`}
    >
      {palette === 'blue' ? (
        <><RiPaletteLine className={styles.icon} /><span className={styles.dot}></span></>
      ) : (
        <><RiPaletteFill className={styles.icon} /><span className={styles.dot}></span></>
      )}
    </button>
  );
};

export default ColorPaletteToggle;