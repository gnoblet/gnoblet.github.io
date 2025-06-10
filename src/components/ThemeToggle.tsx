import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Toggle from './Toggle';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle
      icon={theme === 'dark' ? <FiSun /> : <FiMoon />}
      onClick={toggleTheme}
      ariaLabel={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      rotateOnHover={true}
      spacingLeft={true}
      className={className}
    />
  );
};

export default ThemeToggle;