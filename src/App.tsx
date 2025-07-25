// src/App.tsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import QuartoList from "./pages/QuartoList";
import QuartoPage from "./pages/QuartoPage";
import Projects from "./pages/Projects";
import AboutMe from "./pages/AboutMe";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/ui/loading/LoadingSpinner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ColorPaletteProvider } from "./contexts/ColorPaletteContext"; // Kept for compatibility
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import "./App.css";

// For handling scrolling on navigation
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

// Layout component to handle different container styles
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isFullWidth =
    location.pathname === "/" || location.pathname === "/home";
  const isQuartoPage = location.pathname.startsWith("/blog/");

  if (isQuartoPage) {
    // For Quarto pages, return just the content without navbar/footer
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main
        className={
          isFullWidth ? "main-content full-width-page" : "main-content"
        }
      >
        <div
          className={
            isFullWidth ? "content-container-full" : "content-container"
          }
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

// Main application wrapper that includes the loading spinner
const AppWithLoading = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/home"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <AppLayout>
                <QuartoList />
              </AppLayout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <AppLayout>
                <QuartoPage />
              </AppLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <AppLayout>
                <Projects />
              </AppLayout>
            }
          />
          <Route
            path="/aboutMe"
            element={
              <AppLayout>
                <AboutMe />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ColorPaletteProvider>
        <LoadingProvider>
          <AppWithLoading />
        </LoadingProvider>
      </ColorPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
