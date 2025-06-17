// src/contexts/LoadingContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [initialDelay, setInitialDelay] = useState(false);

  // Set a minimum loading time (e.g., 500ms) to avoid flicker for fast loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelay(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Check for document load complete
  useEffect(() => {
    if (document.readyState === "complete") {
      setImagesLoaded(true);
    } else {
      window.addEventListener("load", () => setImagesLoaded(true));

      // Cleanup
      return () =>
        window.removeEventListener("load", () => setImagesLoaded(true));
    }
  }, []);

  // Combine both states to determine if we should stop showing the loader
  useEffect(() => {
    if (imagesLoaded && initialDelay) {
      setIsLoading(false);
    }
  }, [imagesLoaded, initialDelay]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
