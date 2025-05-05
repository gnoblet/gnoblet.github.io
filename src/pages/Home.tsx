// src/pages/Home.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/pages/Home.module.css";
import LeafAnimation from "../components/LeafAnimation";
import FeaturedProjects from "../components/FeaturedProjects";
import { projects } from "../data/projects";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import BlueSkyLogo from "../assets/logo/Bluesky_Logo.svg"; // Import the logo

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
      {/* Standalone Leaf Animation Container - full width, 60vh height */}
      <div className={styles.fullWidthLeafContainer}>
        <LeafAnimation />
      </div>

      {/* Hero Section - now separate from leaf animation */}
      <section id="hero" className={`${styles.section} ${styles.heroSection}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <div className={styles.profileImageContainer}>
            <img
              src="/img/myself.jpg"
              alt="Guillaume Noblet"
              className={styles.profileImage}
            />
          </div>
          <h1>Hey👋, I'm Guillaume Noblet</h1>
          <h2 className={styles.subtitle}>
            Exploring data journalism and visualization
          </h2>

          <div className={styles.socialLinks}>
            <a
              href="https://bsky.app/profile/gnoblet.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bluesky"
              className={styles.blueskyLink}
            >
              <img
                src={BlueSkyLogo}
                alt="Bluesky"
                className={styles.blueskyIcon}
              />
            </a>
            <a
              href="https://github.com/gnoblet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/gnoblet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:gnoblet@zaclys.net" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

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
          <h2>About Me</h2>
          <div className={styles.aboutText}>
            <p>
              I specialized in research in humanitarian settings and data
              visualization.
            </p>
            <p>
              From time to time I also write poetry. I'll be sharing some of
              this here as well as some data (viz) projects (coming soon,
              although no pressure for myself).
            </p>
            <p>
              I was a former Research & Data Manager at{" "}
              <a
                href="https://impactinitiatives.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                IMPACT Initiatives
              </a>
              .
            </p>
            <p>
              This website is at very-early-stage of construction and (many)
              changes are expected to come. What you will eventually find is
              still to be found. Blurry images and relative emptiness, maybe
              forever.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjects projects={latestProjects} />
    </div>
  );
};

export default Home;
