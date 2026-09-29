'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Share2,
  Search,
  Maximize,
  Minimize,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Play,
  Pause,
  FileText,
  BookOpen,
  Download,
  Printer,
  Maximize2,
  X,
  Check,
  Copy,
  LayoutGrid,
  List
} from 'lucide-react';

export default function BlackVelvetJacket() {
  const totalPages = 22;
  const [currentPage, setCurrentPage] = useState(1);
  const [isDoublePage, setIsDoublePage] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [flipDir, setFlipDir] = useState(null); // 'next' | 'prev' | null

  // Loading State (4 pulsing square boxes with Loading X%)
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(15);

  // Floating Popups & Modals
  const [showTOCModal, setShowTOCModal] = useState(false);
  const [tocActiveTab, setTocActiveTab] = useState('outline'); // 'outline' | 'thumbnails'
  const [tocSearchQuery, setTocSearchQuery] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [pageInputValue, setPageInputValue] = useState('1');

  const containerRef = useRef(null);
  const startAudioRef = useRef(null);
  const endAudioRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const moreMenuRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  // Chapters & Table of Contents Outline
  const tableOfContents = [
    { page: 1, title: 'Front Cover — Black Velvet Jacket', subtitle: 'Esoteric Manuscript' },
    { page: 2, title: 'Stephen Hawking TOE Dedication', subtitle: 'Theory of Everything & TOSS' },
    { page: 3, title: 'Introduction & Epigraph', subtitle: 'The Secret Rabbit Path' },
    { page: 4, title: 'Preface — Esoteric Transfers', subtitle: 'Cosmic Geology & Mysteries' },
    { page: 6, title: 'The Astro-Geological Ley Lines', subtitle: 'Pakistan Mountain Ranges' },
    { page: 8, title: 'Chapter I: The Celestial Lattice', subtitle: 'Mineral Resonances' },
    { page: 10, title: 'Chapter II: Sacred Cartography', subtitle: 'Topographical Alignments' },
    { page: 12, title: 'Chapter III: Mining Frequencies', subtitle: 'Subterranean Harmonics' },
    { page: 14, title: 'Chapter IV: Alchemy of the North', subtitle: 'Karakoram & Himalayas' },
    { page: 16, title: 'Chapter V: Hidden Mountain Portals', subtitle: 'Passu & Fairy Meadows' },
    { page: 18, title: 'Chapter VI: The Velvet Manuscript', subtitle: 'Philosophical Synthesis' },
    { page: 20, title: 'Epilogue & Mathematical Theorems', subtitle: 'Concluding Postulates' },
    { page: 22, title: 'Back Cover & Official Seal', subtitle: 'Moon Rabbit Archive' },
  ];

  // Preload Images & Simulate 4-box loader progress
  useEffect(() => {
    let loadedCount = 0;
    const progressInterval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev < 90) return prev + Math.floor(Math.random() * 18 + 8);
        return prev;
      });
    }, 120);

    // Preload first few pages
    const preloadPages = [1, 2, 3, 4, 5, 22];
    preloadPages.forEach((p) => {
      const img = new Image();
      img.src = `/assets/bvj-pages/page_${p}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= preloadPages.length) {
          clearInterval(progressInterval);
          setLoadProgress(100);
          setTimeout(() => setIsLoading(false), 300);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= preloadPages.length) {
          clearInterval(progressInterval);
          setLoadProgress(100);
          setTimeout(() => setIsLoading(false), 300);
        }
      };
    });

    // Fallback timeout to ensure loader closes
    const fallbackTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadProgress(100);
      setIsLoading(false);
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Preload audio files
  useEffect(() => {
    try {
      startAudioRef.current = new Audio('/sounds/start-flip.mp3');
      startAudioRef.current.preload = 'auto';
      startAudioRef.current.volume = 0.9;

      endAudioRef.current = new Audio('/sounds/end-flip.mp3');
      endAudioRef.current.preload = 'auto';
      endAudioRef.current.volume = 0.9;
    } catch (e) {
      console.warn('Audio initialize error', e);
    }
  }, []);

  // Responsive screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsDoublePage(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync page input value
  useEffect(() => {
    setPageInputValue(String(currentPage));
  }, [currentPage]);

  // Click outside to close More menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Play page flip audio immediately on user action
  const playPageFlipSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const startSound = new Audio('/sounds/start-flip.mp3');
      startSound.volume = 1.0;
      const playPromise = startSound.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn('Audio play start error', e);
        });
      }

      setTimeout(() => {
        try {
          const endSound = new Audio('/sounds/end-flip.mp3');
          endSound.volume = 1.0;
          endSound.play().catch(() => {});
        } catch (e) {}
      }, 250);
    } catch (err) {
      console.warn('Audio playback error', err);
    }
  }, [soundEnabled]);

  // Spread calculation
  const getSpread = useCallback((page) => {
    if (!isDoublePage) {
      return { left: null, right: page, isCover: page === 1, isBack: page === totalPages };
    }
    if (page === 1) {
      return { left: null, right: 1, isCover: true, isBack: false };
    }
    if (page >= totalPages) {
      return { left: totalPages, right: null, isCover: false, isBack: true };
    }
    const left = page % 2 === 0 ? page : page - 1;
    const right = left + 1 <= totalPages ? left + 1 : null;
    return { left, right, isCover: false, isBack: false };
  }, [isDoublePage, totalPages]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (isAnimatingRef.current || currentPage >= totalPages) return;
    isAnimatingRef.current = true;
    playPageFlipSound();
    setFlipDir('next');

    let nextPage;
    if (!isDoublePage) {
      nextPage = Math.min(totalPages, currentPage + 1);
    } else {
      if (currentPage === 1) {
        nextPage = 2;
      } else if (currentPage >= totalPages - 1) {
        nextPage = totalPages;
      } else {
        const left = currentPage % 2 === 0 ? currentPage : currentPage - 1;
        nextPage = Math.min(totalPages, left + 2);
      }
    }

    setTimeout(() => {
      setCurrentPage(nextPage);
      setFlipDir(null);
      isAnimatingRef.current = false;
    }, 450);
  }, [currentPage, isDoublePage, playPageFlipSound, totalPages]);

  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current || currentPage <= 1) return;
    isAnimatingRef.current = true;
    playPageFlipSound();
    setFlipDir('prev');

    let prevPage;
    if (!isDoublePage) {
      prevPage = Math.max(1, currentPage - 1);
    } else {
      if (currentPage === 2 || currentPage === 3) {
        prevPage = 1;
      } else if (currentPage === totalPages) {
        const left = totalPages % 2 === 0 ? totalPages - 2 : totalPages - 3;
        prevPage = Math.max(1, left);
      } else {
        const left = currentPage % 2 === 0 ? currentPage : currentPage - 1;
        prevPage = Math.max(1, left - 2);
      }
    }

    setTimeout(() => {
      setCurrentPage(prevPage);
      setFlipDir(null);
      isAnimatingRef.current = false;
    }, 450);
  }, [currentPage, isDoublePage, playPageFlipSound, totalPages]);

  // Touch Swipe Gesture Handlers for Mobile Devices
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Trigger page flip if horizontal swipe is > 35px and more horizontal than vertical
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped Left -> Go Next Page
        handleNext();
      } else {
        // Swiped Right -> Go Previous Page
        handlePrev();
      }
    }
  };

  const handleSinglePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const handleFirstPage = () => {
    if (currentPage > 1 && !isAnimatingRef.current) {
      playPageFlipSound();
      setCurrentPage(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages && !isAnimatingRef.current) {
      playPageFlipSound();
      setCurrentPage(totalPages);
    }
  };

  const jumpToPage = (pageNum) => {
    if (!isAnimatingRef.current) {
      playPageFlipSound();
      setCurrentPage(pageNum);
    }
    setShowTOCModal(false);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(pageInputValue, 10);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      jumpToPage(num);
    } else {
      setPageInputValue(String(currentPage));
    }
  };

  // Auto-play slideshow
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        if (currentPage >= totalPages) {
          setIsPlaying(false);
        } else {
          handleNext();
        }
      }, 3500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, currentPage, handleNext, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        handleFirstPage();
      } else if (e.key === 'End') {
        handleLastPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) handleToggleFullscreen();
        setShowTOCModal(false);
        setShowShareModal(false);
        setShowMoreMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  // Fullscreen
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentSpread = getSpread(currentPage);

  // Filtered TOC items
  const filteredOutline = tableOfContents.filter((item) =>
    item.title.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
    String(item.page).includes(tocSearchQuery)
  );

  return (
    <div className="w-full bg-black text-white selection:bg-gold selection:text-black min-h-screen">
      {/* =========================================================================
          MAIN 3D FLIPBOOK VIEWER SECTION
          ========================================================================= */}
      <section
        ref={containerRef}
        className={`relative w-full bg-black flex flex-col items-center justify-between select-none ${
          isFullscreen
            ? 'fixed inset-0 z-[99999] h-screen w-screen p-2 sm:p-6'
            : 'py-8 sm:py-12 md:py-16 px-2 sm:px-4'
        }`}
        style={{ minHeight: isFullscreen ? '100vh' : '820px' }}
      >
        {/* =========================================================================
            EXACT OFFICIAL 3D FLIPBOOK LOADER (From live plugin)
            ========================================================================= */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200">
            <div className="fb3d-loading-progress">
              <div className="fb3d-progress-circle">
                <div className="fb3d-loader-box">
                  <div className="fb3d-loader-inner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="fb3d-caption">
                Loading {Math.min(100, loadProgress)}%
              </div>
            </div>
          </div>
        )}

        {/* Main 3D Book Viewport with Mobile Touch Swipe Support */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full flex-1 flex items-center justify-center overflow-hidden py-4 touch-pan-y"
        >
          {/* Left Large Arrow Navigation (Matching Pic 1) */}
          {currentPage > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous Page"
              className="absolute left-4 sm:left-8 md:left-14 top-1/2 -translate-y-1/2 z-40 text-white/70 hover:text-white transition-all duration-200 transform hover:scale-125 focus:outline-none p-2 cursor-pointer"
            >
              <ChevronLeft className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 stroke-[1.5]" />
            </button>
          )}

          {/* Right Large Arrow Navigation (Matching Pic 1) */}
          {currentPage < totalPages && (
            <button
              onClick={handleNext}
              aria-label="Next Page"
              className="absolute right-4 sm:right-8 md:right-14 top-1/2 -translate-y-1/2 z-40 text-white/70 hover:text-white transition-all duration-200 transform hover:scale-125 focus:outline-none p-2 cursor-pointer"
            >
              <ChevronRight className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 stroke-[1.5]" />
            </button>
          )}

          {/* Main Book Stage Container */}
          <div
            className="relative flex items-center justify-center transition-transform duration-300"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              perspective: '2200px',
            }}
          >
            {/* 1. SINGLE PAGE / COVER VIEW (Page 1 or Back Cover or Mobile) - Matching Pic 1 */}
            {!isDoublePage || currentSpread.isCover || currentSpread.isBack ? (
              <div
                onClick={handleSinglePageClick}
                className={`relative group cursor-pointer bg-[#050505] rounded-[2px] overflow-hidden border border-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_30px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                  flipDir === 'next' ? 'rotate-y-[-12deg] scale-[0.98]' : ''
                } ${flipDir === 'prev' ? 'rotate-y-[12deg] scale-[0.98]' : ''}`}
                style={{
                  maxHeight: isFullscreen ? '82vh' : '72vh',
                  maxWidth: '92vw',
                }}
              >
                <img
                  src={`/assets/bvj-pages/page_${currentSpread.right || currentSpread.left}.png`}
                  alt={`Page ${currentSpread.right || currentSpread.left}`}
                  className="w-auto h-auto max-h-[60vh] sm:max-h-[68vh] md:max-h-[74vh] object-contain block select-none pointer-events-none"
                  draggable="false"
                />
              </div>
            ) : (
              /* 2. DUAL-PAGE SPREAD VIEW (Pages 2 & 3, 4 & 5, etc.) */
              <div
                className={`relative flex items-stretch bg-[#050505] rounded-[2px] border border-neutral-900 shadow-[0_30px_80px_rgba(0,0,0,0.98),0_0_50px_rgba(0,0,0,0.9)] max-w-[96vw] lg:max-w-[1200px] xl:max-w-[1300px] transition-transform duration-300 ${
                  flipDir ? 'scale-[0.99]' : 'scale-100'
                }`}
                style={{
                  maxHeight: isFullscreen ? '82vh' : '72vh',
                }}
              >
                {/* Left Page */}
                <div
                  onClick={handlePrev}
                  className="relative flex-1 cursor-pointer overflow-hidden bg-[#0d0d0d] flex items-center justify-end"
                >
                  <img
                    src={`/assets/bvj-pages/page_${currentSpread.left}.png`}
                    alt={`Page ${currentSpread.left}`}
                    className="w-auto h-auto max-h-[58vh] sm:max-h-[66vh] md:max-h-[72vh] object-contain block select-none pointer-events-none"
                    draggable="false"
                  />
                  {/* Left Spine Fold Gradient */}
                  <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-black/85 via-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Center Book Spine Seam */}
                <div className="w-[3px] bg-gradient-to-b from-neutral-800 via-neutral-950 to-neutral-800 shadow-[0_0_12px_rgba(0,0,0,1)] z-10 flex-shrink-0" />

                {/* Right Page */}
                <div
                  onClick={handleNext}
                  className="relative flex-1 cursor-pointer overflow-hidden bg-[#0d0d0d] flex items-center justify-start"
                >
                  <img
                    src={`/assets/bvj-pages/page_${currentSpread.right}.png`}
                    alt={`Page ${currentSpread.right}`}
                    className="w-auto h-auto max-h-[58vh] sm:max-h-[66vh] md:max-h-[72vh] object-contain block select-none pointer-events-none"
                    draggable="false"
                  />
                  {/* Right Spine Fold Gradient */}
                  <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM WHITE FLOATING TOOLBAR (Exact Match to Pic 1)
            ========================================================================= */}
        <div className="relative z-50 mt-4 mb-2 flex items-center justify-center">
          <div className="bg-white text-neutral-800 rounded-[5px] shadow-[0_4px_25px_rgba(0,0,0,0.6)] px-3 py-1.5 flex items-center gap-2.5 border border-[#d8d8d8]">
            {/* 1. Zoom In */}
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
              title="Zoom in"
              className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* 2. Zoom Out */}
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
              title="Zoom out"
              className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* 3. Bookmarks / Table of Contents */}
            <button
              onClick={() => {
                if (showTOCModal && tocActiveTab === 'thumbnails') {
                  setShowTOCModal(false);
                } else {
                  setTocActiveTab('thumbnails');
                  setShowTOCModal(true);
                }
              }}
              title="Table of contents / Thumbnails"
              className={`p-1 rounded transition-colors cursor-pointer ${
                showTOCModal && tocActiveTab === 'thumbnails'
                  ? 'text-black bg-[#e5e5e5]'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* 4. Previous / Backward (Double Arrow Left - as in Pic 1) */}
            <button
              onClick={handlePrev}
              disabled={currentPage <= 1}
              title="Previous page"
              className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 disabled:opacity-25 disabled:hover:bg-transparent rounded transition-colors cursor-pointer"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* 5. Page Boxes [ 1 ] [ 22 ] (Exact Pic 1 Style) */}
            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1">
              <input
                type="text"
                value={pageInputValue}
                onChange={(e) => setPageInputValue(e.target.value)}
                onBlur={handlePageInputSubmit}
                className="w-8 h-6 bg-[#ececec] border border-[#d8d8d8] text-neutral-800 text-xs text-center rounded-[3px] font-sans focus:outline-none focus:border-neutral-500 font-medium"
                title="Current page"
              />
              <div
                className="w-8 h-6 bg-[#ececec] border border-[#d8d8d8] text-neutral-600 text-xs flex items-center justify-center rounded-[3px] font-sans font-medium select-none"
                title="Total pages"
              >
                {totalPages}
              </div>
            </form>

            {/* 6. Next / Forward (Double Arrow Right - as in Pic 1) */}
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              title="Next page"
              className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 disabled:opacity-25 disabled:hover:bg-transparent rounded transition-colors cursor-pointer"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>

            {/* 7. Share Button */}
            <button
              onClick={() => setShowShareModal(!showShareModal)}
              title="Share"
              className={`p-1 rounded transition-colors cursor-pointer ${
                showShareModal ? 'text-black bg-[#e5e5e5]' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* 8. Search & Thumbnails Button */}
            <button
              onClick={() => {
                if (showTOCModal && tocActiveTab === 'search') {
                  setShowTOCModal(false);
                } else {
                  setTocActiveTab('search');
                  setShowTOCModal(true);
                }
              }}
              title="Search"
              className={`p-1 rounded transition-colors cursor-pointer ${
                showTOCModal && tocActiveTab === 'search'
                  ? 'text-black bg-[#e5e5e5]'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* 9. Fullscreen Toggle */}
            <button
              onClick={handleToggleFullscreen}
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
              className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>

            {/* 10. More (...) Dropdown Menu */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                title="More"
                className={`p-1 rounded transition-colors cursor-pointer ${
                  showMoreMenu ? 'text-black bg-[#e5e5e5]' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* More Popup Menu - Matching Pic 1 */}
              {showMoreMenu && (
                <div className="absolute bottom-full right-0 mb-1.5 w-44 bg-white border border-[#d0d0d0] rounded-[3px] shadow-[0_4px_18px_rgba(0,0,0,0.25)] py-1 text-sm text-[#222] z-50 animate-in fade-in duration-100">
                  {/* 1. Single page / Two pages */}
                  <button
                    onClick={() => {
                      setIsDoublePage(!isDoublePage);
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#ebebeb] flex items-center gap-3 text-[13px] text-[#222] font-sans cursor-pointer transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#444] stroke-[1.7]" />
                    <span>{isDoublePage ? 'Single page' : 'Two pages'}</span>
                  </button>

                  {/* 2. Sounds */}
                  <button
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#ebebeb] flex items-center gap-3 text-[13px] text-[#222] font-sans cursor-pointer transition-colors"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-[#444] stroke-[1.7]" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-[#888] stroke-[1.7]" />
                    )}
                    <span>Sounds</span>
                  </button>

                  {/* 3. Print */}
                  <button
                    onClick={() => {
                      window.print();
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#ebebeb] flex items-center gap-3 text-[13px] text-[#222] font-sans cursor-pointer transition-colors"
                  >
                    <Printer className="w-4 h-4 text-[#444] stroke-[1.7]" />
                    <span>Print</span>
                  </button>

                  {/* 4. Download */}
                  <a
                    href="/assets/BVJ-Book.pdf"
                    download="Black-Velvet-Jacket.pdf"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setShowMoreMenu(false)}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#ebebeb] flex items-center gap-3 text-[13px] text-[#222] font-sans cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#444] stroke-[1.7]" />
                    <span>Download</span>
                  </a>

                  {/* Divider */}
                  <div className="my-1 border-t border-[#e5e5e5]" />

                  {/* 5. Goto first page */}
                  <button
                    onClick={() => {
                      handleFirstPage();
                      setShowMoreMenu(false);
                    }}
                    disabled={currentPage <= 1}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#ebebeb] disabled:hover:bg-transparent disabled:opacity-40 flex items-center gap-3 text-[13px] text-[#222] font-sans cursor-pointer disabled:cursor-default transition-colors"
                  >
                    <ChevronsLeft className="w-4 h-4 text-[#555] stroke-[1.7]" />
                    <span>Goto first page</span>
                  </button>

                  {/* 6. Goto last page */}
                  <button
                    onClick={() => {
                      handleLastPage();
                      setShowMoreMenu(false);
                    }}
                    disabled={currentPage >= totalPages}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#ebebeb] disabled:hover:bg-transparent disabled:opacity-40 flex items-center gap-3 text-[13px] text-[#222] font-sans cursor-pointer disabled:cursor-default transition-colors"
                  >
                    <ChevronsRight className="w-4 h-4 text-[#555] stroke-[1.7]" />
                    <span>Goto last page</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            TABLE OF CONTENTS & SEARCH FLOATING WINDOW (Exact Match to Pic 2)
            ========================================================================= */}
        {showTOCModal && (
          <div className="absolute top-8 sm:top-12 md:top-16 left-4 sm:left-8 md:left-12 lg:left-20 z-40 w-[280px] sm:w-[310px] max-h-[80vh] sm:max-h-[560px] bg-white border border-[#cccccc] rounded-[2px] shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in fade-in duration-100">
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-white border-b border-[#e8e8e8] flex items-center justify-between">
              <span className="font-sans font-bold text-[13px] text-[#111111]">
                Table of contents
              </span>
              <button
                onClick={() => setShowTOCModal(false)}
                className="text-[#666] hover:text-black text-xs font-bold px-1.5 py-0.5 leading-none cursor-pointer transition-colors"
                aria-label="Close"
              >
                ✖
              </button>
            </div>

            {/* Tabs Row: Thumbnails vs Search */}
            <div className="px-3.5 pt-2.5 pb-1 bg-white flex items-center gap-4 text-xs font-sans">
              <button
                onClick={() => setTocActiveTab('thumbnails')}
                className={`cursor-pointer transition-colors pb-1 ${
                  tocActiveTab === 'thumbnails'
                    ? 'font-bold text-[#111111]'
                    : 'text-[#666666] hover:text-black font-normal'
                }`}
              >
                Thumbnails
              </button>
              <button
                onClick={() => setTocActiveTab('search')}
                className={`cursor-pointer transition-colors pb-1 ${
                  tocActiveTab === 'search'
                    ? 'font-bold text-[#111111]'
                    : 'text-[#666666] hover:text-black font-normal'
                }`}
              >
                Search
              </button>
            </div>

            {/* 1. Search Tab Content (Pic 2 Match - Only Search Bar) */}
            {tocActiveTab === 'search' && (
              <div className="p-3.5 bg-white flex flex-col">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const num = parseInt(tocSearchQuery, 10);
                    if (!isNaN(num) && num >= 1 && num <= totalPages) {
                      jumpToPage(num);
                    } else {
                      const match = tableOfContents.find(
                        (item) =>
                          item.title.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(tocSearchQuery.toLowerCase())
                      );
                      if (match) {
                        jumpToPage(match.page);
                      }
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    value={tocSearchQuery}
                    onChange={(e) => setTocSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#a8a8a8] text-[#222222] text-xs px-2.5 py-1.5 rounded-[1px] outline-none focus:border-[#333] font-sans"
                    autoFocus
                  />
                </form>
              </div>
            )}

            {/* 2. Thumbnails Tab Content */}
            {tocActiveTab === 'thumbnails' && (
              <div className="p-3 bg-white flex-1 overflow-y-auto max-h-[380px]">
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive =
                      pageNum === currentPage ||
                      (isDoublePage && (pageNum === currentSpread.left || pageNum === currentSpread.right));

                    return (
                      <div
                        key={pageNum}
                        onClick={() => jumpToPage(pageNum)}
                        className={`cursor-pointer group flex flex-col items-center bg-[#fafafa] p-1 rounded-[1px] border transition-all ${
                          isActive
                            ? 'border-black shadow-sm ring-1 ring-black'
                            : 'border-[#dddddd] hover:border-[#888]'
                        }`}
                      >
                        <div className="w-full aspect-[3/4] bg-white border border-[#eee] rounded-[1px] overflow-hidden flex items-center justify-center mb-1">
                          <img
                            src={`/assets/bvj-pages/page_${pageNum}.png`}
                            alt={`Page ${pageNum}`}
                            className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-150"
                            loading="lazy"
                          />
                        </div>
                        <span
                          className={`text-[10px] font-sans ${
                            isActive ? 'text-black font-bold' : 'text-[#666] group-hover:text-black'
                          }`}
                        >
                          Page {pageNum}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            SHARE MODAL
            ========================================================================= */}
        {showShareModal && (
          <div className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Share2 className="w-5 h-5 text-gold" />
                  <h3 className="font-oswald text-lg uppercase tracking-wider text-white">
                    Share Manuscript
                  </h3>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-300">
                  Share this interactive digital edition of <strong>Black Velvet Jacket</strong>:
                </p>

                <div className="flex items-center gap-2 bg-black/60 border border-white/15 rounded-lg p-2">
                  <input
                    type="text"
                    readOnly
                    value={typeof window !== 'undefined' ? window.location.href : ''}
                    className="bg-transparent text-xs text-gray-300 font-mono flex-1 outline-none px-2"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold text-black rounded text-xs font-semibold hover:bg-gold/90 transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}&text=${encodeURIComponent('Black Velvet Jacket - Moon Rabbit')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-[#1DA1F2]/20 border border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/30 rounded text-center text-xs text-[#1DA1F2] font-medium transition-colors"
                  >
                    Twitter / X
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-[#4267B2]/20 border border-[#4267B2]/40 hover:bg-[#4267B2]/30 rounded text-center text-xs text-[#4267B2] font-medium transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`mailto:?subject=Black Velvet Jacket&body=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}`}
                    className="px-3 py-2 bg-white/10 border border-white/20 hover:bg-white/20 rounded text-center text-xs text-white font-medium transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
