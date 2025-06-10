import React, { useState } from "react";
import styles from "../styles/components/Timeline.module.css";
import { timelineEntries } from "../data/timeline";
import Tag from "./Tag";

const Timeline: React.FC = () => {
  const [hoveredEntry, setHoveredEntry] = useState<number | null>(null);

  const handleEntryHover = (index: number | null) => {
    setHoveredEntry(index);
  };

  return (
    <div>
      <div className={styles.timelineContainer}>
        {timelineEntries.map((entry, index) => (
          <div
            key={index}
            className={`${styles.timelineEntry} ${
              hoveredEntry !== null && hoveredEntry !== index
                ? styles.dimmedEntry
                : ""
            }`}
            onMouseEnter={() => handleEntryHover(index)}
            onMouseLeave={() => handleEntryHover(null)}
          >
            <span className={styles.timelineYear}>{entry.period}</span>
            <div className={styles.timelineLineSegment}></div>
            <div className={styles.timelineHalo}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineRole}>{entry.role}</span>
                <span className={styles.timelineDot}>•</span>
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
                </span>
              </div>
              {entry.location && (
                <span className={styles.timelineLocation}>
                  {entry.location}
                </span>
              )}
            </div>
            <p className={styles.timelineDescription}>{entry.description}</p>
            {entry.skills && entry.skills.length > 0 && (
              <div className={styles.timelineSkills}>
                {entry.skills.map((skill, skillIndex) => (
                  <Tag key={skillIndex} text={skill} showPrefix={false} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
