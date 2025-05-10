// src/pages/Home2.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import BlueSkyLogo from "../assets/logo/Bluesky_Logo.svg";
import styles from "../styles/pages/Home2.module.css";
import projectStyles from "../styles/pages/ProjectsSection.module.css";
import { Link as RouterLink } from "react-router-dom";
import { projects } from "../data/projects";
import LeafAnimationGentle from "../components/LeafAnimationGentle";

const Home2: React.FC = () => {
  return (
    <div className={styles.fullWidthContainer}>
      {/* Intro Section */}
      <section className={`${styles.section} ${styles.introSection}`}>
        {/* Leaf animation container positioned right under the navbar */}
        <div className={styles.leafContainer}>
          <LeafAnimationGentle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.sectionContent}
        >
          <img
            src="src/assets/myself.jpg"
            alt="Guillaume Noblet"
            className={styles.profileImage}
          />

          <h1 className={styles.title}>Hey👋, I'm Guillaume Noblet</h1>

          <h2 className={styles.subtitle}>
            Humanitarian researcher specializing in policy decision-making and
            data visualization
          </h2>

          <p className={styles.subtitle}>
            Previously, I was a Data & Research Specialist at
            <a href="https://www.impact-initiatives.org"> IMPACT Initiatives</a>
            .
          </p>

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

          <button
            onClick={() => {
              const aboutSection = document.getElementById("aboutMe");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={styles.scrollDownButton}
          >
            ↓ Scroll Down
          </button>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section
        id="aboutMe"
        className={`${styles.section} ${styles.aboutMeSection}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionContent}
        >
          <h2 className={styles.title}>About Me</h2>

          <div className={styles.aboutText}>
            <p className={styles.subtitle}>
              I'm a humanitarian researcher who thrives where academic curiosity meets real-world impact. 
              Whether wrangling massive datasets from crisis zones or debating economic history, 
              I love turning complex problems into actionable insights. This website serves as my personal portfolio and blog where I share my projects, thoughts on data visualization, humanitarian research, and technology.
            </p>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <strong>Portfolio</strong> - Showcasing my professional work and
                personal projects
              </li>
              <li className={styles.featureItem}>
                <strong>Blog</strong> - Articles about data visualization,
                research methods, and humanitarian work
              </li>
              <li className={styles.featureItem}>
                <strong>Technical Skills</strong> - Examples of my work with R,
                Python, and other technologies
              </li>
              <li className={styles.featureItem}>
                <strong>Contact Information</strong> - Ways to get in touch for
                collaboration or questions
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Latest Projects Section */}
      <section className={`${projectStyles.projectsSection}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={projectStyles.sectionContent}
        >
          <h2 className={projectStyles.sectionTitle}>My Latest Projects</h2>
          <p className={projectStyles.sectionSubtitle}>
            Here are some of my recent projects and works that showcase my
            skills and interests
          </p>

          <div className={projectStyles.projectsGrid}>
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={projectStyles.projectCard}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={projectStyles.cardImage}
                  />
                  <div className={projectStyles.cardContent}>
                    <h3 className={projectStyles.cardTitle}>{project.title}</h3>
                    <p className={projectStyles.cardDescription}>
                      {project.description}
                    </p>
                    <div className={projectStyles.cardTags}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={projectStyles.cardTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <div className={projectStyles.viewMoreContainer}>
            <RouterLink
              to="/portfolio"
              className={projectStyles.viewMoreButton}
            >
              View All Projects
            </RouterLink>
          </div>
        </motion.div>
      </section>

      {/* Contact Me Section */}
      <section className={`${styles.section} ${styles.aboutMeSection}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionContent}
        >
          <h2 className={styles.title}>Contact Me</h2>

          <div className={styles.aboutText}>
            <p className={styles.subtitle}>
              Do you want to get in touch? Have a project on data or surveys and
              need support, advice, or just another mind to discuss? Feel free
              to reach out!
            </p>

            <div className={styles.contactButtonContainer}>
              <a
                href="mailto:gnoblet@zaclys.net"
                className={styles.contactButton}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home2;
