'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function CardCarousel({ images, title, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically advance to next image every 3 seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={() => onImageClick && onImageClick(images[currentIndex], title)}
      className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 rounded-[18px] group cursor-pointer"
    >
      {/* Smooth Cross-fading Images with Subtle Zoom on Hover */}
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${title} - ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out select-none ${
            idx === currentIndex
              ? 'opacity-100 scale-100 group-hover:scale-105'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        />
      ))}

      {/* Navigation Arrows if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/90 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/90 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-4 h-1.5 bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.9)]'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AccommodationsPage() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const residence = [
    {
      id: 'residence',
      title: 'Residence',
      location: 'Location — Oghi',
      images: [
        '/assets/masjid.png-e1694858682430.jpg',
        '/assets/Zahir-1-e1694858654368.png',
        '/assets/Batin-2.png',
      ],
    },
  ];

  const approvedHotels = [
    {
      id: 'serena',
      title: 'serena hotel',
      location: 'Location — Islamabad | Swat | Gilgit | Hunza | Khaplu | Shigar',
      images: [
        '/assets/serena3-1.jpg',
        '/assets/executive-room-2.jpg',
        '/assets/serene2-1.jpg',
        '/assets/serene4-1.jpg',
      ],
    },
    {
      id: 'roomys',
      title: 'roomys',
      location: 'Location — Islamabad | Hunza Dastaan | Minapin | Batakundi | Kalam',
      images: [
        '/assets/roomy1-3.jpg',
        '/assets/roomy3-3.jpg',
        '/assets/roomy4-2.jpg',
        '/assets/roomy5-1.jpg',
      ],
    },
    {
      id: 'hindukush',
      title: 'Hindukush Heights',
      location: 'Location — Chitral | Mastuj Fort',
      images: [
        '/assets/h2.jpg',
        '/assets/h4.jpg',
        '/assets/h1.jpg',
        '/assets/h3.jpg',
      ],
    },
    {
      id: 'khoj',
      title: 'Khoj Resorts',
      location: 'Location — Shigar/Skardu',
      images: [
        '/assets/Khoj-Allana-resort-near-Karachi.avif',
        '/assets/DSC_0178-2.avif',
        '/assets/Khoj-Shigar-Villas.avif',
      ],
    },
    {
      id: 'pc',
      title: 'Pearl Continental',
      location: 'Location — Malam Jabba, Legacy Hunza, Bhurban Murree',
      images: [
        '/assets/PC-Hotel-1.jpg',
        '/assets/PC-Hotel-2.jpg',
        '/assets/PC-Hotel-3.png',
      ],
    },
    {
      id: 'alpine',
      title: 'Alpine Resort',
      location: 'Location — Nathiagali',
      images: [
        '/assets/Alpine-1.png',
        '/assets/Alpine-2.png',
        '/assets/Alpine-3.png',
      ],
    },
    {
      id: 'magpie-lodge',
      title: 'Magpie Lodge',
      location: 'Location — Thandiani',
      images: [
        '/assets/Magpie-1.png',
        '/assets/Magpie-3.png',
        '/assets/Magpie-2.png',
      ],
    },
    {
      id: 'ayun-fort-inn',
      title: 'Ayun Fort Inn',
      location: 'Location — Chitral (near Kalash Valley)',
      images: [
        '/assets/Fort-Inn-Chitral-4.png',
        '/assets/Fort-Inn-Chitral-3.png',
        '/assets/Fort-Inn-Chitral-2.png',
        '/assets/Fort-Inn-Chitral.png',
      ],
    },
    {
      id: '2-magpies',
      title: '2 Magpies',
      location: 'Madal Gan (Near Boys Degree College), Ali Abad',
      images: [
        '/assets/rsw_984h_984.webp',
        '/assets/download-2.webp',
        '/assets/rsw_984h_738.webp',
      ],
    },
    {
      id: 'luxus',
      title: 'Luxus Hotels',
      location: 'Location — Lahore, Skardu & Hunza',
      images: [
        '/assets/royal-e1780485902445.webp',
        '/assets/deluxe-lake-1-e1780485915982.webp',
        '/assets/family-room-1-e1780485937472.webp',
      ],
    },
  ];

  const tents = [
    {
      id: 'tents',
      title: 'Tents',
      location: 'Available at any location upon request.',
      images: [
        '/assets/Tips-for-Camping-Outdoors-F-06-03-1024x640-2-1-e1691761070705.jpg',
        '/assets/fairy-meadows-tour-package-2-1-1-e1691761039914.jpg',
        '/assets/fairymeadowscottages-1-1-e1691760997473.jpg',
        '/assets/HD-wallpaper-passu-cones-camping-landscape-mountains-nature-pakistan-passucones-tent-1-e1691760902261.jpg',
      ],
    },
  ];

  const renderCard = (v) => {
    return (
      <div
        key={v.id}
        className="group relative bg-[#101010] border border-[#292929] hover:border-[#c89d3c] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_35px_rgba(200,157,60,0.22)] rounded-[22px] overflow-hidden flex flex-col select-none p-3"
      >
        <CardCarousel
          images={v.images}
          title={v.title}
          onImageClick={(img, t) => {
            setLightboxImg(img);
            setLightboxTitle(t);
          }}
        />

        <div className="px-1.5 pt-3.5 pb-2.5 flex-1 flex flex-col justify-start">
          <h2 className="font-oswald text-[23px] sm:text-[25px] font-normal text-white tracking-normal mb-1 text-left">
            {v.title}
          </h2>
          <div className="font-oswald text-[14px] sm:text-[15px] font-light text-[#FFFFFF] leading-snug space-y-0.5 text-left">
            <p>{v.location}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#060606] min-h-screen text-white select-none">
      {/* Lightbox Modal on Image Click */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-5 right-6 text-white hover:text-gold text-4xl font-light cursor-pointer transition-colors"
            aria-label="Close image"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={lightboxImg}
              alt={lightboxTitle || 'Accommodation'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {lightboxTitle && (
              <p className="mt-3 font-oswald text-lg text-gold">{lightboxTitle}</p>
            )}
          </div>
        </div>
      )}

      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* 1. Main Page Header Wooden Plaque */}
        <div className="flex justify-center pt-2 pb-2">
          <img
            src="/assets/Untitled-design-2026-06-04T170615.810.png"
            alt="Accommodations"
            className="w-[270px] sm:w-[320px] md:w-[360px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* SECTION 1: Moon Rabbit Official Residence in Oghi */}
        <section className="space-y-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/moon-rabit-official-residence-1-scaled-e1780568874165.png"
              alt="Moon Rabbit Official Residence"
              className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[440px] h-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {residence.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 2: Moonrabbit Approved Hotels & Guest Houses */}
        <section className="space-y-4 pt-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/hotels-1-e1780568757738-1024x480.png"
              alt="Moonrabbit Approved Hotels & Guest Houses"
              className="w-[230px] sm:w-[260px] md:w-[280px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {approvedHotels.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 3: Tents */}
        <section className="space-y-4 pt-4 pb-14">
          <div className="pt-2 pb-1">
            <img
              src="/assets/aged_wooden_plank_tents-1-e1780567992338.png"
              alt="Tents"
              className="w-[190px] sm:w-[215px] md:w-[240px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tents.map((v) => renderCard(v))}
          </div>
        </section>
      </div>
    </div>
  );
}
