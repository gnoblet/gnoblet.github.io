// src/pages/Contact.tsx
import React from "react";
import styles from "../styles/Contact.module.css"; // Create this file
import { motion } from "framer-motion";

function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    console.log("Form submitted!");
  };

  return (
    <div className={styles.contactContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Contact Me</h1>
        <p className={styles.subtitle}>
          Get in touch with any questions or inquiries
        </p>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input type="text" id="name" className={styles.input} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                className={styles.textarea}
                rows={5}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
