'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { navigationLinks } from '@/data/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Left/Center Brand Logo */}
        <Link href="/" className={styles.logoLink} aria-label="Moon Rabbit Homepage">
          <img
            src="/assets/images/MOON-RABBIT-Recovered-01-1-scaled.png"
            alt="Moon Rabbit Logo"
            className={styles.logoImg}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navigationLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Rabbit Secret Icon / Easter Egg */}
        <Link
          href="/rabbit-screen"
          className={styles.rabbitIconLink}
          title="Follow the Rabbit"
          aria-label="Follow the Rabbit"
        >
          <img
            src="/assets/images/rabbit-rnopn82x0sp6ygd6vc0pl48souhrksvxq93heczbug.png"
            alt="Rabbit Icon"
            className={styles.rabbitSmallIcon}
          />
        </Link>

        {/* Mobile Menu Hamburger Button */}
        <button
          type="button"
          className={`${styles.hamburgerBtn} ${mobileMenuOpen ? styles.open : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobileDrawerHeader}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} aria-label="Moon Rabbit Home">
            <img
              src="/assets/images/MOON-RABBIT-Recovered-01-1-scaled.png"
              alt="Moon Rabbit Logo"
              className={styles.mobileLogoImg}
            />
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile Navigation">
          <ul className={styles.mobileNavList}>
            {navigationLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href} className={styles.mobileNavItem}>
                  <Link
                    href={item.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className={styles.mobileNavItem}>
              <Link
                href="/rabbit-screen"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                🐇 Follow the Rabbit
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.mobileFooter}>
          <p className={styles.mobileTagline}>A spiritual journey through the material World</p>
        </div>
      </div>
    </header>
  );
}
