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

      {/* Hero Section - separate from leaf animation */}
      <section id="hero" className={`${styles.section} ${styles.heroSection}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={styles.heroContent}
        >
          <div className={styles.profileImageContainer}>
            <img
              src="src/assets/myself.jpg"
              alt="Guillaume Noblet"
              className={styles.profileImage}
            />
          </div>
          <h1>Hey👋, I'm Guillaume Noblet</h1>
          <h2 className={styles.subtitle}>
            I am humanitarian researcher who specializes in policy decision-making and data visualization.
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
              I'm a humanitarian researcher who thrives where academic curiosity
              meets real-world impact. Whether wrangling massive datasets from
              crisis zones or debating the finer points of economic history, I
              love turning complex problems into actionable insights—and having
              a bit of fun along the way.
            </p>

            <h3>What I Do</h3>
            <p>
              Currently, I'm the Research Manager for the Global Research &
              Development team at IMPACT Initiatives in Geneva. My team and I
              orchestrate Multi-Sector Needs Assessments (MSNAs)—think
              nationwide surveys in over 20 countries, designed to inform
              humanitarian action where it matters most. I get to:
            </p>
            <ul>
              <li>
                Dive into data from around the globe and build composite
                indicators that help shape humanitarian funding.
              </li>
              <li>
                Champion best practices in research design, from sampling to
                analysis, and coordinate a squad of specialists to keep our
                methods sharp.
              </li>
              <li>
                Liaise with country teams and foreign offices to make sure our
                research translates into real-world change.
              </li>
            </ul>

            <p>
              Before Geneva, I led the MSNA in Haiti, managing a team of 80+ and
              co-chairing the Information Management Working Group to improve
              the humanitarian information landscape. In Burkina Faso, I managed
              data and GIS teams, led field research, and collaborated with
              ministries, UN agencies, and coordination bodies.
            </p>

            <h3>Academic Adventures</h3>
            <p>
              I hold a fully funded doctorate in economics from the University
              of Paris 1 Panthéon-Sorbonne, where I explored the history of
              agricultural economics in the interwar United States. My research
              has been published in peer-reviewed journals, including:
            </p>
            <p>
              "The Making of a Science of Agricultural Economics in the Interwar
              United States: Methods, Experiments, and Statistics" (Œconomia,
              2021)
            </p>
            <p>
              "The Emergence of Agricultural Economics as a Discipline in the
              United States" (Revue d'Histoire des Sciences Humaines, 2020)
            </p>

            <h3>Skills & Superpowers</h3>
            <ul>
              <li>
                <strong>Research & Analysis:</strong> Statistical analysis,
                economic modeling, historical research, participatory
                assessment, data visualization
              </li>
              <li>
                <strong>Project & Team Management:</strong> Horizontal project
                management, capacity building, community resilience initiatives
              </li>
              <li>
                <strong>Tech Toolbox:</strong> R (Tidyverse, Shiny, packaging,
                interactive viz), Python, Julia, STATA, QGIS, Kobo Toolbox,
                Qualtrics, Microsoft Office, InDesign, LaTeX
              </li>
              <li>
                <strong>Languages:</strong> French (native), English (fluent)
              </li>
            </ul>

            <h3>Interests</h3>
            <ul>
              <li>Data visualization</li>
              <li>Open source projects</li>
              <li>Community resilience</li>
              <li>Socio-ecological analysis</li>
              <li>Participatory assessment</li>
            </ul>

            <p>
              From time to time I also write poetry. I'll be sharing some of
              this here as well as some data (viz) projects (coming soon,
              although no pressure for myself).
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
