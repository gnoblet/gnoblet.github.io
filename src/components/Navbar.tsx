// src/components/layout/Navbar.tsx
import { Link } from "react-router-dom";
import styles from "../styles/components/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/">@GNOBLET</Link>
        </div>
        <ul className={styles.navbarMenu}>
          <li className={styles.navbarItem}>
            <Link to="/" className={styles.navbarLink}>
              Home
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/blog" className={styles.navbarLink}>
              Blog
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/portfolio" className={styles.navbarLink}>
              Portfolio
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/contact" className={styles.navbarLink}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
