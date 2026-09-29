'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ vehicle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className={`${styles.vehicleCard} ${isExpanded ? styles.expanded : ''}`}
      aria-expanded={isExpanded}
    >
      <div
        className={styles.imageContainer}
        onClick={() => setIsExpanded(!isExpanded)}
        tabIndex={0}
        role="button"
        aria-label={`${vehicle.name} - Tap to expand specifications`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className={styles.vehicleImage}
          loading="lazy"
        />
        <div className={styles.categoryBadge}>
          {vehicle.category}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.headerRow}>
          <div>
            <h3 className={styles.name}>{vehicle.name}</h3>
            <p className={styles.capacity}>👥 {vehicle.capacity}</p>
          </div>
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse specs' : 'Expand specs'}
          >
            {isExpanded ? '▲ Less' : '▼ Details'}
          </button>
        </div>

        <p className={styles.description}>{vehicle.description}</p>

        {isExpanded && vehicle.features && (
          <div className={styles.specsSection}>
            <h4 className={styles.specsTitle}>Features & Specifications</h4>
            <ul className={styles.featureList}>
              {vehicle.features.map((feat, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span> {feat}
                </li>
              ))}
            </ul>

            <div className={styles.bookCtaWrap}>
              <Link
                href={`/contact?subject=Vehicle Rental Inquiry: ${encodeURIComponent(vehicle.name)}`}
                className="btn-gold"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Reserve / Inquire About {vehicle.name}
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
