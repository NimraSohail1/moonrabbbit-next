'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function MapLightbox({ image, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50 focus:outline-none"
        aria-label="Close Map View"
      >
        <X className="h-7 w-7 text-[#FFD700]" />
      </button>

      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={title || 'Mining Zone Exploration Map'}
          className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        />
        {title && (
          <p className="mt-4 font-oswald text-base uppercase tracking-widest text-[#FFD700] text-center">
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
