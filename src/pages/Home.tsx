// src/pages/Home.tsx
import React from "react";
import { motion } from "framer-motion";
import SocialLinks from "../components/social/SocialLinks";
import styles from "../styles/pages/Home.module.css";
import FeaturedProjects from "../components/content/FeaturedProjects";
import FeaturesList from "../components/FeaturesList";
import LeafAnimation from "../components/background/LeafAnimation";
import LatestQuartoPosts from "../components/QuartoComponents/LatestQuartoPosts";
import ActionButton from "../components/buttons/ActionButton";
import ScrollButton from "../components/buttons/ScrollButton";
import Title from "../components/layout/Title";

import "../styles/components/horizontal/HorizontalCard.css";
import contactStyles from "../styles/components/layout/Contact.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.fullWidthContainer}>
      {/* Intro Section */}
      <section className={`${styles.section} ${styles.introSection}`}>
        {/* Leaf animation container positioned right under the navbar */}
        <div className={styles.leafContainer}>
          <LeafAnimation />
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

          <Title
            title="Hey👋, I'm Guillaume Noblet"
            subtitle="A (humanitarian) researcher specialized in field research and data visualization"
            center={true}
            animate={false}
            titleSize="var(--font-size-6xl)"
            subtitleSize="var(--font-size-3xl)"
            className={styles.heroTitle}
            showUnderline={false}
            boldSubtitle={true}
          />

          <p className={styles.subtitle}>
            Previously, I was a Data & Research Specialist at
            <a href="https://www.impact-initiatives.org"> IMPACT Initiatives</a>
            .
          </p>

          <SocialLinks size="large" />

          <ScrollButton target="aboutMe" direction="down" size="medium">
            Scroll Down
          </ScrollButton>
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
          <Title
            title="About Me"
            subtitle="I'm a (humanitarian) quantitative researcher who loves a good meme almost
            as much as bouncing ideas around with others. Whether I'm trying to make
            sense of messy data or just swapping stories about bits of history,
            I genuinely enjoy taking complicated things and making them a little
            clearer —for others, and honestly, for myself too. And if we can share a
            laugh or two along the way, even better."
            center={true}
            animate={false}
            marginBottom="1.5rem"
          />

          <div className={styles.aboutText}>
            <h3>
              ✨ Things I'm good at, enjoy, and feel somewhat passionate about
            </h3>

            <FeaturesList />

            <div className={styles.viewMoreContainer}>
              <ActionButton to="/aboutMe">Want to know more?</ActionButton>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Latest Projects Section with Mondrian Background - No Blur */}
      <FeaturedProjects />

      {/* Quarto Blog Section */}
      <section className={`${styles.section}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionContent}
        >
          <Title
            title="My Latest Quarto Blogs"
            subtitle="Here you will see the latest blog posts if I ever take the time to blog. Or find any subject I would feel both confident enough to write or the  to not be redundant."
            center={true}
            animate={false}
            marginBottom="1.5rem"
          />

          <LatestQuartoPosts maxPosts={3} />

          <div className={styles.viewMoreContainer}>
            <ActionButton to="/blog">View All Blog Posts</ActionButton>
          </div>
        </motion.div>
      </section>

      {/* Contact Me Section */}
      <section
        id="contactMe"
        className={`${styles.section} ${styles.contactSection} ${contactStyles.contactSection}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`${styles.sectionContent} ${contactStyles.contactContent}`}
        >
          <Title
            title="Contact Me"
            subtitle="Do you want to get in touch? Have a project on data or surveys and need support, advice, or just another mind to discuss? Feel free to reach out!"
            center={true}
            animate={false}
          />

          <div className={`${styles.aboutText} ${contactStyles.contactText}`}>
            <div className={styles.contactButtonContainer}>
              <ActionButton href="mailto:gnoblet@zaclys.net">
                Get in Touch
              </ActionButton>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
