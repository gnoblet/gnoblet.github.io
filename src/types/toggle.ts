import { ReactNode } from 'react';

export type ToggleType = 'theme' | 'palette';

export type PaletteType = 'blue' | 'autumn';
export type ThemeType = 'light' | 'dark';

export interface ToggleProps {
  /**
   * Icon to display in the toggle
   */
  icon: ReactNode;
  
  /**
   * Function called when toggle is clicked
   */
  onClick: (e: React.MouseEvent) => void;
  
  /**
   * Whether to show a colored dot indicator
   */
  showDot?: boolean;
  
  /**
   * CSS class for the dot color
   */
  dotColor?: string;
  
  /**
   * Additional CSS class for the toggle
   */
  className?: string;
  
  /**
   * Accessibility label
   */
  ariaLabel?: string;
  
  /**
   * Tooltip text
   */
  title?: string;
  
  /**
   * Whether to add left margin
   */
  spacingLeft?: boolean;
  
  /**
   * Whether to add right margin
   */
  spacingRight?: boolean;
  
  /**
   * Whether to rotate icon on hover
   */
  rotateOnHover?: boolean;
  
  /**
   * Whether the toggle is currently animating
   */
  isAnimating?: boolean;
}