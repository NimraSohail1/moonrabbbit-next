'use client';

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mountains } from "@/data/mountains";

export default function MountainSlider() {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);

  const slide = useCallback((direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const firstCard = slider.firstElementChild;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const scrollAmount = direction * (cardWidth + gap);

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (direction > 0 && slider.scrollLeft >= maxScroll - 10) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && slider.scrollLeft <= 10) {
      slider.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // 3-Second Auto-play matching live moonrabbit.pk
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      slide(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, slide]);

  // Touch Swipe for Mobile Devices
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        slide(1);
      } else {
        slide(-1);
      }
    }
  };

  return (
    <section
      className="w-full bg-black pt-10 sm:pt-14 pb-4 sm:pb-6 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Heading */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-normal">
          The Majestic Mountains of Pakistan
        </h2>
      </div>

      {/* Slider Wrapper */}
      <div className="relative max-w-[1480px] mx-auto px-4 sm:px-8">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => slide(-1)}
          className="absolute -left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/85 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all duration-200 shadow-2xl focus:outline-none hover:scale-105 cursor-pointer"
          aria-label="Previous mountain"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Mountain Cards Container */}
        <div
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-3 select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {mountains.map((mountain, index) => (
            <div
              key={mountain.id || index}
              className="relative flex-none w-[calc(100vw-64px)] sm:w-[calc(50vw-40px)] md:w-[calc(33.33vw-32px)] lg:w-[calc((100%-72px)/4)] aspect-square rounded-lg overflow-hidden group cursor-pointer bg-neutral-900 shadow-2xl border border-white/10 hover:border-gold/60 transition-all duration-300"
            >
              {/* Mountain Image */}
              <img
                src={`/assets/${mountain.badge}`}
                alt={mountain.subtitle || mountain.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover State: Dark Backdrop & Narrative Text */}
              <div className="absolute inset-0 bg-black/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-5 sm:p-7 text-center z-20 pointer-events-none">
                {mountain.title && (
                  <h4 className="font-oswald text-[18px] sm:text-[20px] text-white font-light tracking-wide mb-2.5 sm:mb-3 drop-shadow">
                    {mountain.title}
                  </h4>
                )}

                {mountain.description && (
                  <p className="font-oswald text-[13px] sm:text-[14px] md:text-[14.5px] text-gray-200 font-light leading-[1.55] sm:leading-[1.6] max-w-xs">
                    {mountain.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => slide(1)}
          className="absolute -right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/85 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all duration-200 shadow-2xl focus:outline-none hover:scale-105 cursor-pointer"
          aria-label="Next mountain"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
