'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/mining') {
    return null;
  }

  return (
    <footer className="relative w-full border-t border-black bg-black select-none">
      {/* Vintage Map & Compass Background Banner */}
      <div
        className="relative w-full py-1 sm:py-1.5 md:py-2 px-4 sm:px-8 md:px-10 bg-cover bg-[center_35%] bg-no-repeat"
        style={{ backgroundImage: `url('/assets/1643468.jpg')` }}
      >
        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full flex items-center justify-between">
          {/* Left Column */}
          <div className="flex flex-col items-start gap-0 pl-2 sm:pl-4 md:pl-6">
            {/* Logo shifted slightly */}
            <Link
              href="/"
              className="inline-block ml-5 sm:ml-10 md:ml-16 lg:ml-20"
            >
              <img
                src="/assets/MOON-RABBIT-Recovered-01-1-scaled.png"
                alt="Moon Rabbit Tours"
                className="w-[120px] sm:w-[138px] md:w-[155px] h-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              />
            </Link>

            {/* Spiritual Journey Tagline on the Left */}
            <img
              src="/assets/a-spiritual-journey-through-the-material-World-1.png"
              alt="...a spiritual journey through the material World"
              className="w-[265px] sm:w-[315px] md:w-[360px] h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] -ml-1 -mt-1 sm:-mt-1.5"
            />
          </div>

          {/* Right: Amanita Muscaria Mushroom House linking to /rabbit-screen */}
          <div className="flex items-center justify-end pr-1 sm:pr-2 md:pr-3">
            <Link
              href="/rabbit-screen"
              className="cursor-pointer inline-block"
              title="Rabbit Screen"
            >
              <img
                src="/assets/amanita-muscaria-pic.png"
                alt="Amanita Muscaria"
                className="h-[60px] sm:h-[70px] md:h-[80px] w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
