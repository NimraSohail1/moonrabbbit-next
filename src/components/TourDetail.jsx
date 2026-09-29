'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { tours } from '@/data/tours';
import { X, Maximize2 } from 'lucide-react';
import Link from 'next/link';

export default function TourDetail({ explicitId }) {
  const pathname = usePathname();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  let tourKey = explicitId;
  if (!tourKey) {
    const pathSlug = pathname.replace(/^\/|\/$/g, '').split('/').pop();
    tourKey = pathSlug;
  }

  const tour = tours.find(
    (t) =>
      t.id === tourKey ||
      t.code.toLowerCase() === tourKey?.toLowerCase() ||
      t.route?.replace('/', '') === tourKey
  );

  if (!tour) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-oswald text-3xl mb-4">Tour Not Found</h2>
        <Link href="/tour" className="text-[#FFD700] hover:underline">
          Return to All Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen select-none">
      {/* Main Content Area */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Column 1: Tour Code & Map Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-white font-normal text-center mb-4 sm:mb-6">
              {tour.code}
            </h2>

            {/* Route Map Image */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative w-full max-w-[480px] cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
              title="Click to zoom map"
            >
              <img
                src={tour.mapImage || tour.badgeImage}
                alt={`${tour.title} Map`}
                className="w-full h-auto object-contain mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1.5 rounded text-white text-xs flex items-center gap-1">
                <Maximize2 className="h-3.5 w-3.5 text-[#FFD700]" />
              </div>
            </div>
          </div>

          {/* Column 2: Tour Full Title & Descriptions */}
          <div className="lg:col-span-7 flex flex-col pt-2 sm:pt-4 lg:pt-0">
            <h2 className="font-oswald text-2xl sm:text-3xl md:text-[34px] text-white font-normal text-left mb-6 sm:mb-8 tracking-wide">
              {tour.title}
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {tour.sections.map((sec, idx) => (
                <p
                  key={idx}
                  className="text-white text-[14.5px] sm:text-[15.5px] md:text-[16px] leading-[1.8] text-left font-normal"
                >
                  <strong className="font-bold text-white">{sec.heading}: </strong>
                  {sec.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal for Map */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-neutral-900 border border-white/20 text-white hover:text-[#FFD700] transition"
            aria-label="Close image zoom"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center mb-3">
            <h3 className="font-oswald text-xl sm:text-2xl text-white uppercase tracking-wider">
              {tour.code} — {tour.title}
            </h3>
          </div>

          <div className="max-w-4xl max-h-[85vh] p-2">
            <img
              src={tour.mapImage || tour.badgeImage}
              alt={tour.title}
              className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Bottom Spacer */}
      <div className="h-8 sm:h-12 w-full bg-black" />
    </div>
  );
}
