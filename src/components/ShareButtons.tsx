// src/components/ShareButtons.tsx
import React from "react";
import styles from "../styles/ShareButtons.module.css";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  // Encode the URL and title for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Social media share URLs
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

  return (
    <div className={styles.shareContainer}>
      <p className={styles.shareTitle}>Share this post:</p>
      <div className={styles.shareButtons}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareButton} ${styles.twitter}`}
          aria-label="Share on Twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
          <span>Twitter</span>
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareButton} ${styles.facebook}`}
          aria-label="Share on Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          <span>Facebook</span>
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareButton} ${styles.linkedin}`}
          aria-label="Share on LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span>LinkedIn</span>
        </a>

        <a
          href={redditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareButton} ${styles.reddit}`}
          aria-label="Share on Reddit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M14.5 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M8 12a2 2 0 104 0 2 2 0 00-4 0z" />
            <path d="M16 12a2 2 0 104 0 2 2 0 00-4 0z" />
            <path d="M8.5 16.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z" />
          </svg>
          <span>Reddit</span>
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;
