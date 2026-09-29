'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './AccommodationCard.module.css';

export default function AccommodationCard({ item, onImageClick }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = item.images || [];

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <article className={styles.card} aria-labelledby={`hotel-name-${item.id}`}>
      {/* Gallery Carousel / Main Image */}
      <div className={styles.imageViewer}>
        {images.length > 0 && (
          <img
            src={images[activeImgIndex]}
            alt={`${item.name} - Photo ${activeImgIndex + 1}`}
            className={styles.mainImage}
            onClick={() => onImageClick && onImageClick(images[activeImgIndex])}
            loading="lazy"
          />
        )}
        <div className={styles.locationTag}>
          📍 {item.location}
        </div>
      </div>

      {/* Thumbnails if multiple images */}
      {images.length > 1 && (
        <div className={styles.thumbRow}>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.thumbBtn} ${idx === activeImgIndex ? styles.activeThumb : ''}`}
              onClick={() => setActiveImgIndex(idx)}
              aria-label={`View photo ${idx + 1} of ${item.name}`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className={styles.thumbImg} />
            </button>
          ))}
        </div>
      )}

      {/* Details */}
      <div className={styles.body}>
        <h3 id={`hotel-name-${item.id}`} className={styles.name}>
          {item.name}
        </h3>
        <p className={styles.description}>{item.description}</p>

        <div className={styles.ctaRow}>
          <Link
            href={`/contact?subject=Accommodation Booking: ${encodeURIComponent(item.name + ' (' + item.location + ')')}`}
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Inquire / Reserve Room
          </Link>
        </div>
      </div>
    </article>
  );
}
