// src/App.tsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

// Layout component to handle different container styles
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isFullWidth = location.pathname === "/home2";
  
  return (
    <>
      <Navbar />
      <main className={isFullWidth ? "main-content full-width-page" : "main-content"}>
        <div className={isFullWidth ? "content-container-full" : "content-container"}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <Home />
          </AppLayout>
        } />
        <Route path="/home2" element={
          <AppLayout>
            <Home2 />
          </AppLayout>
        } />
        <Route path="/blog" element={
          <AppLayout>
            <Blog />
          </AppLayout>
        } />
        <Route path="/blog/:slug" element={
          <AppLayout>
            <BlogPostPage />
          </AppLayout>
        } />
        <Route path="/portfolio" element={
          <AppLayout>
            <Portfolio />
          </AppLayout>
        } />
        <Route path="/contact" element={
          <AppLayout>
            <Contact />
          </AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
