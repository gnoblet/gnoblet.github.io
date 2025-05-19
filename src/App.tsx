// src/App.tsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import QuartoList from "./pages/QuartoList";
import QuartoPage from "./pages/QuartoPage";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ColorPaletteProvider } from "./contexts/ColorPaletteContext";
import "./App.css";

// Layout component to handle different container styles
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isFullWidth =
    location.pathname === "/" || location.pathname === "/home";

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

function App() {
  return (
    <ThemeProvider>
      <ColorPaletteProvider>
        <BrowserRouter>
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
                <Blog />
              </AppLayout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <AppLayout>
                <BlogPostPage />
              </AppLayout>
            }
          />
          <Route
            path="/quarto"
            element={
              <AppLayout>
                <QuartoList />
              </AppLayout>
            }
          />
          <Route
            path="/quarto/:slug"
            element={
              <AppLayout>
                <QuartoPage />
              </AppLayout>
            }
          />
          <Route
            path="/quarto"
            element={
              <AppLayout>
                <QuartoList />
              </AppLayout>
            }
          />
          <Route
            path="/portfolio"
            element={
              <AppLayout>
                <Portfolio />
              </AppLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <AppLayout>
                <Contact />
              </AppLayout>
            }
          />
        </Routes>
        </BrowserRouter>
      </ColorPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
