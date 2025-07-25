// src/components/layout/Footer.tsx
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "../../styles/components/layout/Footer.module.css";
import SocialLinks from "../social/SocialLinks";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function using react-scroll
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <SocialLinks size="medium" className={styles.footerSocialLinks} />

        <p className={styles.copyright}>
          &copy; {currentYear} Guillaume Noblet
        </p>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`${styles.scrollTopButton} ${isVisible ? styles.visible : ""}`}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
