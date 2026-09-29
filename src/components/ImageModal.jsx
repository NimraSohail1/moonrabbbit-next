'use client';

import React, { useEffect } from 'react';
import styles from './ImageModal.module.css';

export default function ImageModal({ imageUrl, onClose, altText = 'Preview' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close image preview"
        >
          ✕
        </button>
        <img src={imageUrl} alt={altText} className={styles.previewImage} />
      </div>
    </div>
  );
}
