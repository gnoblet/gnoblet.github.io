// src/components/layout/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/Navbar.module.css";

function Navbar() {
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path: string) => {
    // For home path, we want exact matching
    if (path === "/") {
      return location.pathname === path;
    }
    // For other paths, we check if location.pathname starts with the path
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/">@GNOBLET</Link>
        </div>
        <ul className={styles.navbarMenu}>
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
              Blog
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link
              to="/portfolio"
              className={`${styles.navbarLink} ${isActive("/portfolio") ? styles.active : ""}`}
            >
              Portfolio
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link
              to="/contact"
              className={`${styles.navbarLink} ${isActive("/contact") ? styles.active : ""}`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
