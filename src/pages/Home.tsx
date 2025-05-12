// src/pages/Home.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import BlueSkyLogo from "../assets/logo/Bluesky_Logo.svg";
import placeholderImage from "../assets/placeholders/project-placeholder.svg";
import styles from "../styles/pages/Home.module.css";
import projectStyles from "../styles/pages/ProjectsSection.module.css";
import blogStyles from "../styles/pages/BlogSection.module.css";
import { Link as RouterLink } from "react-router-dom";
import { projects } from "../data/projects";
import { timelineEntries } from "../data/timeline";
import LeafAnimationGentle from "../components/LeafAnimationGentle";
import { resolveImagePath } from "../utils/imageUtils";

const Home: React.FC = () => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

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
              I'm a humanitarian researcher who thrives where academic curiosity
              meets real-world impact. Whether wrangling massive datasets from
              crisis zones or debating economic history, I love turning complex
              problems into actionable insights.
            </p>

            <div
              className={`${styles.timelineContainer} ${isTimelineExpanded ? styles.timelineContainerExpanded : ""}`}
            >
              {timelineEntries.map((entry, index) => (
                <div key={index} className={styles.timelineEntry}>
                  <span className={styles.timelineYear}>{entry.period}</span>
                  <span className={styles.timelineCompany}>
                    {entry.companyUrl ? (
                      <a
                        href={entry.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      entry.company
                    )}
                    {entry.location && (
                      <span className={styles.timelineLocation}>
                        {" "}
                        • {entry.location}
                      </span>
                    )}
                  </span>
                  <span className={styles.timelineRole}>{entry.role}</span>
                  <p className={styles.timelineDescription}>
                    {entry.description}
                  </p>
                  {entry.skills && entry.skills.length > 0 && (
                    <div className={styles.timelineSkills}>
                      {entry.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className={styles.timelineSkill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                className={styles.timelineExpandButton}
                onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
              >
                {isTimelineExpanded ? "Show Less" : "Show More"}
                <span
                  className={`${styles.expandArrow} ${isTimelineExpanded ? styles.expandArrowRotated : ""}`}
                >
                  ↓
                </span>
              </button>
            </div>

            <div className={styles.experienceBox}>
              <p>
                Previously, I was the Research Manager for a Global Research &
                Development team at IMPACT Initiatives in Geneva. My team and I
                orchestrated Multi-Sector Needs Assessments (MSNAs)—think
                nationwide surveys in over 20 countries, designed to inform
                humanitarian yearly planning and prioritisation.
              </p>
              <br></br>
              <p>
                Before Geneva, I led the MSNA in Haiti, managing a team of 80+
                and co-chairing the Information Management Working Group to
                improve the humanitarian information landscape. In Burkina Faso,
                I managed data and GIS teams, led field research, and
                collaborated with ministries, UN agencies, and coordination
                bodies.
              </p>
              <ul className={styles.experienceList}>
                <li className={styles.experienceItem}>
                  Dive into data from around the globe and build composite
                  indicators that help shape humanitarian funding.
                </li>
                <li className={styles.experienceItem}>
                  Champion best practices in research design, from sampling to
                  analysis, and coordinate a squad of specialists to keep our
                  methods sharp.
                </li>
                <li className={styles.experienceItem}>
                  Liaise with country teams and foreign offices to make sure our
                  research translates into real-world change.
                </li>
              </ul>
            </div>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <strong>Research & Analysis</strong> - Statistical analysis,
                economic modeling, data visualization, participatory assessment
              </li>
              <li className={styles.featureItem}>
                <strong>Project Management</strong> - Horizontal project
                management, capacity building, community resilience initiatives
              </li>
              <li className={styles.featureItem}>
                <strong>Technical Toolbox</strong> - R (Tidyverse, Shiny,
                interactive viz), Python, QGIS, Kobo Toolbox, Microsoft Office
              </li>
              <li className={styles.featureItem}>
                <strong>Interests</strong> - Data visualization, open source
                projects, community resilience, socio-ecological analysis
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
                    src={resolveImagePath(project.imageUrl, placeholderImage)}
                    alt={project.title}
                    className={projectStyles.cardImage}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
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

      {/* Latest Projects Section */}
      <section className={`${blogStyles.blogSection}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={projectStyles.sectionContent}
        >
          <h2 className={projectStyles.sectionTitle}>My Latest Projects</h2>
          <p className={projectStyles.sectionSubtitle}>
            Here you will see the latest blog posts if I ever take the time to
            blog. Or find any subject I would feel both confident enough to
            write or the capability to not be redundant.
          </p>

          <div className={blogStyles.blogGrid}>
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
                    src={resolveImagePath(project.imageUrl, placeholderImage)}
                    alt={project.title}
                    className={projectStyles.cardImage}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
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
            <RouterLink to="/blog" className={projectStyles.viewMoreButton}>
              View All Blog Posts
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

export default Home;
