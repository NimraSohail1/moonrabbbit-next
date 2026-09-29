'use client';

import React from 'react';
import Link from 'next/link';
import styles from './TourCard.module.css';

export default function TourCard({ tour }) {
  return (
    <article className={styles.tourCard} aria-labelledby={`tour-title-${tour.id}`}>
      <div className={styles.imageWrap}>
        <img
          src={tour.image}
          alt={tour.title}
          className={styles.tourImage}
          loading="lazy"
        />
        <div className={styles.badgeOverlay}>
          <span className={styles.tourCode}>{tour.code}</span>
          {tour.badge && <span className={styles.tourBadge}>{tour.badge}</span>}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          {tour.duration && <span className={styles.metaItem}>⏱ {tour.duration}</span>}
          {tour.location && <span className={styles.metaLocation}>📍 {tour.location}</span>}
        </div>

        <h3 id={`tour-title-${tour.id}`} className={styles.title}>
          {tour.title}
        </h3>

        <p className={styles.description}>{tour.description}</p>

        {tour.highlights && tour.highlights.length > 0 && (
          <div className={styles.highlightsWrap}>
            <h4 className={styles.highlightsHeading}>Highlights</h4>
            <ul className={styles.highlightsList}>
              {tour.highlights.map((item, idx) => (
                <li key={idx} className={styles.highlightItem}>
                  <span className={styles.highlightBullet}>✦</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.actionRow}>
          <Link
            href={`/contact?subject=Booking Inquiry: ${encodeURIComponent(tour.title + ' (' + tour.code + ')')}`}
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Inquire / Book Tour
          </Link>
        </div>
      </div>
    </article>
  );
}
