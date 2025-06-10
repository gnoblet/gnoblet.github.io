// src/components/content/FeaturedProjects.tsx
import React from "react";
import ProjectCard from "../cards/ProjectCard";
import styles from "../../styles/pages/Home.module.css";
import featuredStyles from "../../styles/components/FeaturesList/FeaturedProjects.module.css";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import "../../styles/components/horizontal/HorizontalCard.css";
import GridBackground from "../background/GridBackground";
import ActionButton from "../buttons/ActionButton";
import Title from "../layout/Title";

const FeaturedProjects: React.FC = () => {
  return (
    <section className={`${styles.section} ${featuredStyles.featuredSection}`}>
      <GridBackground gridSize={60} />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`${styles.sectionContent} ${featuredStyles.featuredContent}`}
      >
        <Title
          title="My Latest Projects"
          subtitle="Here are some of my recent projects and works that showcase my skills and interests"
          center={true}
          animate={false}
          marginBottom="1.5rem"
        />

        <div className={styles.projectsGrid}>
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} onTagClick={() => {}} />
            </motion.div>
          ))}
        </div>

        <div className={styles.viewMoreContainer}>
          <ActionButton to="/projects">View All Projects</ActionButton>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
