import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if user has previously selected a theme
  const getSavedTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // If no saved preference, check user's system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to dark theme if no preference is found
    return 'dark';
  };

  const [theme, setTheme] = useState<Theme>('dark'); // Default initial state

  // Initialize theme once the component mounts (client-side)
  useEffect(() => {
    setTheme(getSavedTheme());
  }, []);

  // Apply theme to document when theme changes
  useEffect(() => {
    // Save user preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document element
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};