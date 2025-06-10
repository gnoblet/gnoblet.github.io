// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/components/navigation/Navbar.module.css";
// We need to add the navIcon class in the CSS file
import { FaChartBar, FaLeaf } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../ui/ThemeToggle";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to check if the link is active
  const isActive = (path: string) => {
    // For home path, we want exact matching
    if (path === "/") {
      return location.pathname === path || location.pathname === "/home";
    }
    // For other paths, we check if location.pathname starts with the path
    return location.pathname.startsWith(path);
  };

  // Close menu when location changes (user navigates)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/">@GNOBLET</Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`${styles.navbarMenu} ${isMenuOpen ? styles.active : ""}`}
        >
          <ul>
            <li className={styles.navbarItem}>
              <Link
                to="/"
                className={`${styles.navbarLink} ${isActive("/") ? styles.active : ""}`}
              >
                Home
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link
                to="/blog"
                className={`${styles.navbarLink} ${isActive("/blog") ? styles.active : ""}`}
              >
                <FaChartBar className={styles.navIcon} /> Blog
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link
                to="/projects"
                className={`${styles.navbarLink} ${isActive("/projects") ? styles.active : ""}`}
              >
                <FaLeaf className={styles.navIcon} />
                Projects
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link
                to="/aboutMe"
                className={`${styles.navbarLink} ${isActive("/aboutMe") ? styles.active : ""}`}
              >
                About Me
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link
                to="/#contactMe"
                className={`${styles.navbarLink} ${isActive("/contactMe") ? styles.active : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className={styles.navbarActions}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
