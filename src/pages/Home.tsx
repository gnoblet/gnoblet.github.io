// src/pages/Home.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import LeafNetwork from "../components/LeafNetwork";
import FeaturedProjects from "../components/FeaturedProjects"; // Keep this import
import { projects } from "../data/projects"; // Also keep this for the projects data
import { Link } from "react-scroll";

const Home: React.FC = () => {
  // Get the last two projects for the featured section
  const latestProjects = [...projects].sort((a, b) => b.id - a.id).slice(0, 2);

  // For smooth scrolling behavior across the site
  useEffect(() => {
    // Enable smooth scrolling for the whole page
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section id="hero" className={`${styles.section} ${styles.heroSection}`}>
        {/* Add the LeafNetwork only inside the hero section */}
        <LeafNetwork />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1>Welcome to My Website</h1>
          <p>Scroll down to explore more</p>

          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={800}
            className={styles.scrollDownButton}
          >
            ↓ Scroll Down
          </Link>
        </motion.div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className={`${styles.section} ${styles.aboutSection}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className={styles.sectionContent}
        >
          <h2>About</h2>
          <p>This is the about section of my website.</p>
        </motion.div>
      </section>
      a{/* Services Section */}
      <section
        id="services"
        className={`${styles.section} ${styles.servicesSection}`}
      >
        {/* Services content */}
      </section>
      {/* Featured Projects Section - keep this */}
      <FeaturedProjects projects={latestProjects} />
      {/* Contact Section */}
      <section
        id="contact"
        className={`${styles.section} ${styles.contactSection}`}
      >
        {/* Contact content */}
      </section>
    </div>
  );
};

export default Home;
