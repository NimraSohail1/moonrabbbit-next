'use client';

import React, { useState } from 'react';
import styles from './MountainCard.module.css';

export default function MountainCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`${styles.mountainCard} ${isExpanded ? styles.expanded : ''}`}
      style={{ backgroundImage: `url(${item.image})` }}
      onClick={() => setIsExpanded(!isExpanded)}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${item.title} - ${item.subtitle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.rangeBadge}>{item.subtitle}</span>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        {item.elevation && <p className={styles.elevation}>{item.elevation}</p>}

        <p className={styles.description}>
          {item.description}
        </p>

        <span className={styles.tapPrompt}>
          {isExpanded ? 'Show Less' : 'Read Narrative'}
        </span>
      </div>
    </div>
  );
}
