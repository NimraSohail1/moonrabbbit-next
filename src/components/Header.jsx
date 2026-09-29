'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mining page has its own dedicated in-page navigation
  if (pathname === '/mining') {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tour' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Accommodations', path: '/accommodation' },
    { name: 'Contact', path: '/contact' },
    { name: 'Mining', path: '/mining', isGold: true },
  ];

  const isHome = pathname === '/' || pathname === '/home';

  if (!isHome) {
    return (
      <header
        className="relative w-full border-b border-black select-none bg-cover bg-center bg-no-repeat pt-5 sm:pt-6 md:pt-7 pb-3 sm:pb-4 px-4 sm:px-6 relative z-30"
        style={{ backgroundImage: `url('/assets/dariusz-sankowski-3OiYMgDKJ6k-unsplash-scaled.jpg')` }}
      >
        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        {/* Centered Logo in Upper/Middle of Notebook */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Link href="/" className="inline-block cursor-pointer transition-opacity hover:opacity-95">
            <img
              src="/assets/MOON-RABBIT-Recovered-01-1-scaled.png"
              alt="Moon Rabbit"
              className="w-[155px] sm:w-[175px] md:w-[195px] h-auto object-contain mx-auto filter drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
            />
          </Link>
        </div>

        {/* Navigation Menu at Bottom of Notebook */}
        <nav className="relative z-10 hidden md:flex items-center justify-center gap-6 sm:gap-7 md:gap-8 mt-3 sm:mt-4">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-xs sm:text-[13.5px] md:text-[14.5px] font-medium tracking-normal ${item.isGold ? 'text-[#FFD700]' : 'text-white'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden absolute top-4 right-4 sm:top-5 sm:right-6 z-40">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-white hover:opacity-80 transition focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#FFD700]" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        <div
          className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl md:hidden transition-all duration-300 flex flex-col justify-between pt-16 pb-8 px-6 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/assets/MOON-RABBIT-Recovered-01-1-scaled.png"
                  alt="Moon Rabbit"
                  className="w-36 h-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white hover:opacity-80"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 pt-4">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded ${item.isGold
                    ? 'text-[#FFD700]'
                    : 'text-white'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-xs font-poppins text-gray-400">
              Mystical Guided Tours &bull; Northern Pakistan
            </p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full select-none pt-4 sm:pt-6 md:pt-7 pb-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Centered Logo */}
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="inline-block cursor-pointer transition-opacity hover:opacity-95">
            <img
              src="/assets/MOON-RABBIT-Recovered-01-1-scaled.png"
              alt="Moon Rabbit"
              className="w-[155px] sm:w-[175px] md:w-[195px] h-auto object-contain mx-auto filter drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center justify-center gap-6 sm:gap-7 md:gap-8 mt-3 sm:mt-4 relative z-10">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-xs sm:text-[13.5px] md:text-[14.5px] font-medium tracking-normal ${item.isGold
                ? 'text-[#FFD700]'
                : 'text-white'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden absolute top-4 right-4 sm:top-5 sm:right-6 z-40">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#FFD700]" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl md:hidden transition-all duration-300 flex flex-col justify-between pt-16 pb-8 px-6 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/assets/MOON-RABBIT-Recovered-01-1-scaled.png"
                alt="Moon Rabbit"
                className="w-36 h-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 pt-4">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded ${item.isGold
                  ? 'text-[#FFD700]'
                  : 'text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs font-poppins text-gray-400">
            Mystical Guided Tours &bull; Northern Pakistan
          </p>
        </div>
      </div>
    </header>
  );
}
