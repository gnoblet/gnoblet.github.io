import React from "react";
import { socialIcons } from "../../data/social-icons";
import styles from "../../styles/components/social/SocialLinks.module.css";

interface SocialLinksProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

/**
 * SocialLinks component that displays social media icons with proper styling
 */
const SocialLinks: React.FC<SocialLinksProps> = ({
  size = "medium",
  className = "",
}) => {
  return (
    <div className={`${styles.socialLinks} ${className}`}>
      {socialIcons.map(({ href, ariaLabel, Icon }) => (
        <a
          key={ariaLabel}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={styles[size]}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
