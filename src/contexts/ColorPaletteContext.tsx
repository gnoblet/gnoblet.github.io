import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type ColorPalette = 'blue' | 'autumn';

interface ColorPaletteContextType {
  palette: ColorPalette;
  togglePalette: () => void;
  setPalette: (palette: ColorPalette) => void;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(undefined);

interface ColorPaletteProviderProps {
  children: ReactNode;
}

export const ColorPaletteProvider: React.FC<ColorPaletteProviderProps> = ({ children }) => {
  // Check if user has previously selected a palette
  const getSavedPalette = (): ColorPalette => {
    const savedPalette = localStorage.getItem('colorPalette') as ColorPalette;
    if (savedPalette && ['blue', 'autumn'].includes(savedPalette)) {
      return savedPalette;
    }
    
    // Default to blue palette if no preference is found
    return 'blue';
  };

  const [palette, setPalette] = useState<ColorPalette>('blue'); // Default initial state

  // Initialize palette once the component mounts (client-side)
  useEffect(() => {
    const savedPalette = getSavedPalette();
    setPalette(savedPalette);
    
    // Apply palette class immediately to prevent flash of default style
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add(`palette-${savedPalette}`);
    }
  }, []);

  // Apply palette to document when it changes
  useEffect(() => {
    // Save user preference to localStorage
    localStorage.setItem('colorPalette', palette);
    
    // Apply palette to document element
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove all palette classes first
      root.classList.remove('palette-blue', 'palette-autumn');
      
      // Add the current palette class
      root.classList.add(`palette-${palette}`);
    }
  }, [palette]);

  const togglePalette = () => {
    const newPalette = palette === 'blue' ? 'autumn' : 'blue';
    setPalette(newPalette);
  };

  return (
    <ColorPaletteContext.Provider value={{ palette, togglePalette, setPalette }}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export const useColorPalette = (): ColorPaletteContextType => {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error('useColorPalette must be used within a ColorPaletteProvider');
  }
  return context;
};