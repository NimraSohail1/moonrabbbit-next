'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, MapPin, Check } from 'lucide-react';
import Link from 'next/link';
import CaptchaModal from '@/components/CaptchaModal';

export default function Mining() {
  const [activeMap, setActiveMap] = useState(null);
  const [activeMapTitle, setActiveMapTitle] = useState('');
  const [equipmentIndex, setEquipmentIndex] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ submitting: false, submitted: false });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-sliding disabled: carousel only advances on manual user interaction

  const openLightbox = (imgUrl, title) => {
    setActiveMap(imgUrl);
    setActiveMapTitle(title);
  };

  const closeLightbox = () => {
    setActiveMap(null);
    setActiveMapTitle('');
  };

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const equipmentList = [
    {
      id: 0,
      title: 'GPZ 8000 Field Detection System',
      subtitle: 'GPZ 8000: Final Search',
      image: '/assets/GPZ8000_web_z17_hero_dt_v01_1_-removebg-preview.png',
      desc: 'The GPZ 8000 is an advanced gold detection system designed for mineral exploration in challenging and highly mineralized ground. It delivers strong depth performance across different soil conditions, helping identify subsurface targets with improved accuracy during field surveys. Built for extended use, it features a lightweight design, adjustable sensitivity, and clear audio feedback for reliable target detection. Its stable performance in difficult terrain makes it suitable for professional geological exploration and field mapping work.',
    },
    {
      id: 1,
      title: 'GPX 6000',
      subtitle: 'GPX 6000: Deep Field Search',
      image: '/assets/Banner_GPX6000.1-1-1024x529.webp',
      desc: 'The GPX 6000 is an advanced gold detection system engineered for exploration in difficult and highly mineralized environments. Using GeoSense-PI™ technology, it delivers strong sensitivity to both small and deep gold targets while maintaining stable performance across changing ground conditions. Its lightweight carbon-fibre construction, automatic ground balancing, and clear audio feedback support extended field use with improved comfort and reliable target detection. Suitable for professional exploration and geological survey work in challenging terrain.',
    },
    {
      id: 2,
      title: 'GOLD PAN PREMIUM KIT',
      subtitle: 'PANNING TOOLS',
      image: '/assets/WhatsApp_Image_2026-05-23_at_10_52_36_PM-Picsart-AiImageEnhancer-removebg-preview.png',
      desc: 'The XP GOLD PAN PREMIUM KIT is a gold recovery system designed for efficient prospecting and material separation in demanding environments. Featuring XP’s exclusive Snake Skin™ texture technology, it improves fine gold retention while supporting effective separation across different sediment conditions. Its stackable classifier design, lightweight construction, and optimized pan geometry enable faster processing and improved field usability. Complete with prospecting accessories for collection, inspection, and storage, the kit delivers a reliable solution for gold panning and exploration work.',
    },
    {
      id: 3,
      title: 'GOLD MONSTER 1000',
      subtitle: 'GM 1000: Shallow Search',
      image: '/assets/116-1024x538.webp',
      desc: 'The GOLD MONSTER 1000 is a high-sensitivity gold detector designed for mineralized ground conditions. Powered by 45 kHz VLF technology and 24-bit processing, it delivers reliable detection of small and deep gold targets with strong signal clarity. Automatic ground balance, sensitivity adjustment, and noise reduction simplify operation while maintaining stable performance. Its lightweight design and target response make it suitable for geological surveys and gold prospecting.',
    },
  ];

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCaptchaCheckboxClick = () => {
    if (captchaChecked) {
      setCaptchaChecked(false);
      return;
    }
    setCaptchaError(false);
    setIsCaptchaModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!captchaChecked) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setStatus({ submitting: true, submitted: false });
    setTimeout(() => {
      setStatus({ submitting: false, submitted: true });
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setCaptchaChecked(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#060606] text-white select-none min-h-screen">
      
      {/* Lightbox Modal for Mining Maps */}
      {activeMap && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-6 text-white hover:text-gold text-4xl font-light cursor-pointer transition-colors"
          >
            &times;
          </button>
          <div className="max-w-6xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activeMap}
              alt={activeMapTitle || 'Mining Map'}
              className="max-w-full max-h-[85vh] object-contain rounded-none border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}



      {/* 1. HERO SECTION WITH TUNNEL WALK VIDEO & EMBEDDED NAVIGATION */}
      <section className="relative w-full h-[480px] sm:h-[580px] md:h-[680px] lg:h-[750px] overflow-hidden bg-black flex flex-col items-center justify-start pt-3 sm:pt-5 md:pt-7">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/videos/tunnel walk.mp4" type="video/mp4" />
          <source src="/videos/tunnel%20walk.mp4" type="video/mp4" />
          <source src="https://moonrabbit.pk/wp-content/uploads/2026/06/Miner_walking_in_mine_tunnel_202606051953.mp4" type="video/mp4" />
        </video>

        {/* Ambient Subtle Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#060606] pointer-events-none" />

        {/* Mobile Hamburger Menu Button (Top-Right, 1:1 with Screenshot) */}
        <div className="md:hidden absolute top-4 right-4 sm:top-6 sm:right-6 z-40">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-gold transition-colors focus:outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 text-gold stroke-[2.5]" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-white stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col justify-start pt-20 px-6 animate-fade-in select-none">
            <div className="flex flex-col gap-3.5 text-center max-w-sm mx-auto w-full">
              <div className="pb-2 border-b border-white/15">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#c89d3c] font-semibold">
                  Mining Navigation
                </span>
              </div>
              
              {[
                { name: 'Maps', id: 'maps' },
                { name: 'Equipment', id: 'equipment' },
                { name: 'Team', id: 'team' },
                { name: 'Methodology', id: 'methodology' },
                { name: 'Investment', id: 'investment' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToAnchor(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-[19px] font-oswald tracking-wide text-white hover:text-gold py-1.5 transition-colors cursor-pointer border-b border-white/5"
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 pb-2 border-t border-white/15 mt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
                  Main Website Pages
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm pt-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 text-center"
                >
                  Home
                </Link>
                <Link
                  href="/tour"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 text-center"
                >
                  Tours
                </Link>
                <Link
                  href="/vehicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 text-center"
                >
                  Vehicles
                </Link>
                <Link
                  href="/accommodation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200 text-center"
                >
                  Accommodations
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Centered Mining Branding & Desktop Navigation */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto select-none">
          {/* Moon Rabbit Mining Logo */}
          <Link href="/mining" className="inline-block hover:opacity-95 transition-opacity">
            <img
              src="/assets/MOON-RABBIT-Recovered-02-1-1-scaled.png"
              alt="Moon Rabbit Mining"
              className="w-[125px] sm:w-[155px] md:w-[185px] lg:w-[200px] h-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
            />
          </Link>

          {/* Desktop Sub-Navigation Menu */}
          <nav className="-mt-2 sm:-mt-3 md:-mt-4 hidden md:flex flex-wrap items-center justify-center gap-4 sm:gap-7 md:gap-9 text-[12.5px] sm:text-[14px] md:text-[15px] font-normal tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            <button
              onClick={() => scrollToAnchor('maps')}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              Maps
            </button>
            <button
              onClick={() => scrollToAnchor('equipment')}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              Equipment
            </button>
            <button
              onClick={() => scrollToAnchor('team')}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              Team
            </button>
            <button
              onClick={() => scrollToAnchor('methodology')}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollToAnchor('investment')}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              Investment
            </button>
            <button
              onClick={() => scrollToAnchor('contact')}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>
      </section>

      {/* SECTION 1: MAPS (FULL-WIDTH VINTAGE COMPASS BACKGROUND) */}
      <section
        id="maps"
        className="relative w-full py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-cover bg-center bg-no-repeat scroll-mt-6 overflow-hidden border-t border-b border-black/80"
        style={{ backgroundImage: `url('/assets/1643468.jpg')` }}
      >
        {/* Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-black/76 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/65 pointer-events-none" />

        {/* Inner Content Container */}
        <div className="relative z-10 w-full max-w-[1140px] mx-auto space-y-6 sm:space-y-8">
          <div className="flex justify-center">
            <img
              src="/assets/aged_wooden_plank_maps-e1780921812113.png"
              alt="Maps"
              className="w-[125px] sm:w-[145px] md:w-[165px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {/* Zone A */}
            <div
              onClick={() => openLightbox('/assets/Moon-Rabbit-Mining-Map-1.png', 'Zone A - All Minerals')}
              className="group bg-black/20 hover:bg-black/30 border border-white/15 hover:border-gold rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_25px_rgba(255,215,0,0.18)] cursor-pointer flex flex-col"
            >
              <div className="w-full h-[225px] sm:h-[245px] md:h-[265px] overflow-hidden bg-neutral-900/40">
                <img
                  src="/assets/Moon-Rabbit-Mining-Map-1.png"
                  alt="Zone A - All Minerals"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 sm:p-6 text-left flex flex-col justify-start bg-transparent">
                <h3 className="font-sans font-bold text-[17px] sm:text-[18.5px] md:text-[19.5px] text-white tracking-tight mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Zone A - All Minerals
                </h3>
                <p className="text-gray-300 text-[13px] sm:text-[13.5px] font-normal leading-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Gilgit Baltistan &amp; KPK Regions of Pakistan.
                </p>
              </div>
            </div>

            {/* Zone B */}
            <div
              onClick={() => openLightbox('/assets/ChatGPT-Image-May-21-2026-09_22_15-PM.png', 'Zone B – Gold Specific')}
              className="group bg-black/20 hover:bg-black/30 border border-white/15 hover:border-gold rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_25px_rgba(255,215,0,0.18)] cursor-pointer flex flex-col"
            >
              <div className="w-full h-[225px] sm:h-[245px] md:h-[265px] overflow-hidden bg-neutral-900/40">
                <img
                  src="/assets/ChatGPT-Image-May-21-2026-09_22_15-PM.png"
                  alt="Zone B – Gold Specific"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 sm:p-6 text-left flex flex-col justify-start bg-transparent">
                <h3 className="font-sans font-bold text-[17px] sm:text-[18.5px] md:text-[19.5px] text-white tracking-tight mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Zone B – Gold Specific
                </h3>
                <p className="text-gray-300 text-[13px] sm:text-[13.5px] font-normal leading-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Gilgit Baltistan &amp; KPK Regions of Pakistan.
                </p>
              </div>
            </div>

            {/* Zone C */}
            <div
              onClick={() => openLightbox('/assets/ChatGPT-Image-May-21-2026-09_22_15-PM.png', 'Zone C – Gem Stones')}
              className="group bg-black/20 hover:bg-black/30 border border-white/15 hover:border-gold rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_25px_rgba(255,215,0,0.18)] cursor-pointer flex flex-col"
            >
              <div className="w-full h-[225px] sm:h-[245px] md:h-[265px] overflow-hidden bg-neutral-900/40">
                <img
                  src="/assets/ChatGPT-Image-May-21-2026-09_22_15-PM.png"
                  alt="Zone C – Gem Stones"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 sm:p-6 text-left flex flex-col justify-start bg-transparent">
                <h3 className="font-sans font-bold text-[17px] sm:text-[18.5px] md:text-[19.5px] text-white tracking-tight mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Zone C – Gem Stones
                </h3>
                <p className="text-gray-300 text-[13px] sm:text-[13.5px] font-normal leading-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Gilgit Baltistan &amp; KPK Regions of Pakistan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EQUIPMENT (FULL-WIDTH BACKGROUND VIDEO) */}
      <section
        id="equipment"
        className="relative w-full min-h-[640px] sm:min-h-[680px] md:h-[680px] lg:h-[750px] px-2 sm:px-6 md:px-8 bg-black overflow-hidden scroll-mt-6 border-t border-b border-black flex flex-col justify-between py-6 sm:py-8 md:py-10"
      >
        {/* Full-bleed Background Video (Scaled up slightly) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-110 sm:scale-115 md:scale-120 transform origin-center pointer-events-none"
        >
          <source src="/videos/equipments.mp4" type="video/mp4" />
          <source src="https://moonrabbit.pk/wp-content/uploads/2026/06/equipments.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradients & Vignette Overlay (Significantly lightened) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 md:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

        {/* Inner Content Container */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col justify-between h-full">
          {/* Centered Wooden Plaque (Bigger size as requested) */}
          <div className="flex justify-center pt-0 sm:pt-1 md:pt-2">
            <img
              src="/assets/aged_wooden_plank_equipment-e1780921894713.png"
              alt="Equipment"
              className="w-[160px] sm:w-[200px] md:w-[255px] lg:w-[280px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Carousel Layout with Side Chevrons (Comfortable spacing on mobile, moved down on desktop) */}
          <div className="relative flex items-center justify-between w-full my-auto px-0.5 sm:px-4 mt-5 sm:mt-7 md:mt-0 md:translate-y-20 lg:translate-y-24">
            {/* Left Chevron Button */}
            <button
              onClick={() => setEquipmentIndex((prev) => (prev - 1 + equipmentList.length) % equipmentList.length)}
              className="p-1 sm:p-2 text-white/90 hover:text-white transition-colors cursor-pointer z-20 flex-shrink-0"
              aria-label="Previous equipment"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 stroke-[2.2]" />
            </button>

            {/* Main 2-Column Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-14 lg:gap-16 items-center flex-grow px-1 sm:px-6 md:px-8">
              
              {/* Left Column: Equipment Product Image + Product Title */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-full h-[110px] sm:h-[150px] md:h-[210px] lg:h-[225px] flex items-center justify-center">
                  <img
                    src={equipmentList[equipmentIndex].image}
                    alt={equipmentList[equipmentIndex].title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)] transition-all duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/1.png';
                    }}
                  />
                </div>
                <h4 className="font-oswald font-light uppercase text-white tracking-normal text-[17px] sm:text-[22px] md:text-[30px] lg:text-[32px] mt-2 sm:mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] leading-tight">
                  {equipmentList[equipmentIndex].title}
                </h4>
              </div>

              {/* Right Column: Subtitle Headline + Detailed Description + Indicators */}
              <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start">
                <h3 className="font-oswald font-light text-white tracking-normal text-[21px] sm:text-[28px] md:text-[44px] leading-[1.18] mb-1.5 sm:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {equipmentList[equipmentIndex].subtitle}
                </h3>
                <p className="font-roboto text-white/95 text-[12px] sm:text-[13.5px] md:text-[14.5px] leading-[1.6] md:leading-[1.68] font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] max-w-lg">
                  {equipmentList[equipmentIndex].desc}
                </p>

                {/* Dot Indicators at Bottom of Right Column */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 mt-2.5 sm:mt-4">
                  {equipmentList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setEquipmentIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === equipmentIndex
                          ? 'w-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]'
                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Right Chevron Button */}
            <button
              onClick={() => setEquipmentIndex((prev) => (prev + 1) % equipmentList.length)}
              className="p-1 sm:p-2 text-white/90 hover:text-white transition-colors cursor-pointer z-20 flex-shrink-0"
              aria-label="Next equipment"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 stroke-[2.2]" />
            </button>
          </div>
          
          <div className="pb-1 sm:pb-2" />
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 py-12 space-y-20">

        {/* SECTION 3: TEAM */}
        <section id="team" className="space-y-6 sm:space-y-7 scroll-mt-24">
          <div className="flex justify-center">
            <img
              src="/assets/aged_wooden_plank_team-e1780921976415.png"
              alt="Team"
              className="w-[130px] sm:w-[155px] md:w-[185px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
            {/* Lead Prospector */}
            <div className="bg-white/5 border border-white/12 hover:border-gold rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.12)] flex flex-col">
              <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] bg-neutral-900 overflow-hidden">
                <img
                  src="/assets/Untitled-design-2026-06-03T153804.867.png"
                  alt="Lead Prospector"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 text-left flex-grow flex flex-col justify-start">
                <h3 className="font-oswald text-[20px] sm:text-[21px] text-white mb-1.5 tracking-normal">Lead Prospector</h3>
                <p className="text-[#cccccc] text-[13.5px] sm:text-[14px] leading-relaxed font-light">
                  Responsible for planning and managing field exploration activities and coordinating survey operations.
                </p>
              </div>
            </div>

            {/* Geological Analyst */}
            <div className="bg-white/5 border border-white/12 hover:border-gold rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.12)] flex flex-col">
              <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] bg-neutral-900 overflow-hidden">
                <img
                  src="/assets/silhouette_female_final.png"
                  alt="Geological Analyst"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 text-left flex-grow flex flex-col justify-start">
                <h3 className="font-oswald text-[20px] sm:text-[21px] text-white mb-1.5 tracking-normal">Geological Analyst</h3>
                <p className="text-[#cccccc] text-[13.5px] sm:text-[14px] leading-relaxed font-light">
                  Handles terrain interpretation, mapping data analysis, and mineral signal evaluation during field surveys.
                </p>
              </div>
            </div>

            {/* Equipment Technician */}
            <div className="bg-white/5 border border-white/12 hover:border-gold rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.12)] flex flex-col">
              <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] bg-neutral-900 overflow-hidden">
                <img
                  src="/assets/silhouette_variation_2_final.png"
                  alt="Equipment Technician"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 text-left flex-grow flex flex-col justify-start">
                <h3 className="font-oswald text-[20px] sm:text-[21px] text-white mb-1.5 tracking-normal">Equipment Technician</h3>
                <p className="text-[#cccccc] text-[13.5px] sm:text-[14px] leading-relaxed font-light">
                  Manages detection equipment setup, calibration, and technical support for field operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4: METHODOLOGY (FULL-WIDTH BACKGROUND) */}
      <section
        id="methodology"
        className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-cover bg-center bg-no-repeat scroll-mt-6 overflow-hidden border-t border-b border-black/80 my-8 sm:my-12"
        style={{ backgroundImage: `url('/assets/photo-1526778548025-fa2f459cd5c1.avif')` }}
      >
        {/* Dark Contrast Overlay matching reference screenshot */}
        <div className="absolute inset-0 bg-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/80 pointer-events-none" />

        {/* Inner Content Container */}
        <div className="relative z-10 w-full max-w-[1140px] mx-auto space-y-8 sm:space-y-10">
          {/* Centered Wooden Plaque */}
          <div className="flex justify-center">
            <img
              src="/assets/aged_wooden_plank_methodology-e1780922043204.png"
              alt="Methodology"
              className="w-[185px] sm:w-[225px] md:w-[265px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* 2x2 Grid of Methodology Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
            {/* Step 01 */}
            <div className="group relative bg-black/80 hover:bg-black/90 border border-white/12 hover:border-gold rounded-[20px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-22 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <span className="inline-block text-gold border border-gold/70 bg-black/60 text-[12px] sm:text-[13px] font-sans font-medium px-4 py-0.5 rounded-full shadow-sm">
                  Step 01
                </span>
                <h3 className="font-sans font-bold text-[22px] sm:text-[24px] md:text-[25px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Site Reconnaissance
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Initial terrain inspection and evaluation of access routes and geological conditions.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group relative bg-black/80 hover:bg-black/90 border border-white/12 hover:border-gold rounded-[20px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-22 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <span className="inline-block text-gold border border-gold/70 bg-black/60 text-[12px] sm:text-[13px] font-sans font-medium px-4 py-0.5 rounded-full shadow-sm">
                  Step 02
                </span>
                <h3 className="font-sans font-bold text-[22px] sm:text-[24px] md:text-[25px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Surface Mapping
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Recording geological formations and structural features across the exploration zone.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group relative bg-black/80 hover:bg-black/90 border border-white/12 hover:border-gold rounded-[20px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-22 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <span className="inline-block text-gold border border-gold/70 bg-black/60 text-[12px] sm:text-[13px] font-sans font-medium px-4 py-0.5 rounded-full shadow-sm">
                  Step 03
                </span>
                <h3 className="font-sans font-bold text-[22px] sm:text-[24px] md:text-[25px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Signal Detection
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Using detection equipment to identify potential subsurface mineral indicators.
                </p>
              </div>
            </div>

            {/* Step 04 (Highlighted with Gold Glowing Border as shown in screenshot) */}
            <div className="group relative bg-black/85 hover:bg-black/90 border-2 border-gold shadow-[0_0_30px_rgba(255,215,0,0.35)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] rounded-[20px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-18 group-hover:opacity-25 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <span className="inline-block text-gold border border-gold bg-black/60 text-[12px] sm:text-[13px] font-sans font-medium px-4 py-0.5 rounded-full shadow-sm">
                  Step 04
                </span>
                <h3 className="font-sans font-bold text-[22px] sm:text-[24px] md:text-[25px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Astro-Geology
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  We specialize in using ancient Astro-geological practices including celestial correspondence with landscape, detecting ley lines, and geomancy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUATION CONTAINER FOR INVESTMENT & REMAINING CONTENT */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-20 sm:space-y-24">

        {/* SECTION 5: INVESTMENT */}
        <section id="investment" className="space-y-8 sm:space-y-10 scroll-mt-24">
          <div className="flex justify-center">
            <img
              src="/assets/aged_wooden_plank_investment-removebg-preview-e1780922169744.png"
              alt="Investment"
              className="w-[185px] sm:w-[225px] md:w-[260px] lg:w-[280px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
            {/* Entry Level */}
            <div className="group relative bg-black/80 hover:bg-black/90 border border-white/12 hover:border-gold rounded-[22px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-22 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              <div className="relative z-10 space-y-3.5">
                <h3 className="font-sans font-bold text-[21px] sm:text-[22px] md:text-[23px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Entry Level
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Early-stage participation focused on foundational funding support for exploration setup, initial site assessment, and preparation of designated mineral zones for structured evaluation.
                </p>
              </div>
            </div>

            {/* Mining Lease Investment */}
            <div className="group relative bg-black/80 hover:bg-black/90 border border-white/12 hover:border-gold rounded-[22px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-22 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              <div className="relative z-10 space-y-3.5">
                <h3 className="font-sans font-bold text-[21px] sm:text-[22px] md:text-[23px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Mining Lease Investment
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Mid-stage investment involving secured mining lease participation, regulated site access, and organized extraction planning supported by professional geological and operational oversight.
                </p>
              </div>
            </div>

            {/* Heavy Machinery Investment */}
            <div className="group relative bg-black/80 hover:bg-black/90 border border-white/12 hover:border-gold rounded-[22px] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] text-left flex flex-col justify-start cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-22 grayscale contrast-125 brightness-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "url('/assets/NVProspectingMap1.png')" }}
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              <div className="relative z-10 space-y-3.5">
                <h3 className="font-sans font-bold text-[21px] sm:text-[22px] md:text-[23px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Heavy Machinery Investment
                </h3>
                <p className="font-sans text-gray-300 text-[13.5px] sm:text-[14px] leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Final-stage investment focused on active extraction operations, deployment of heavy mining equipment, and large-scale resource recovery supported by full operational infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 6: MINING CONTACT (FULL-WIDTH UNDERGROUND CAVERN BACKGROUND) */}
      <section
        id="contact"
        className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 bg-cover bg-center bg-no-repeat scroll-mt-6 overflow-hidden border-t border-black mt-8 sm:mt-12 mb-0"
        style={{ backgroundImage: `url('/assets/pexels-i-love-pixel-391111544-14747539-scaled.jpg')` }}
      >
        {/* Dark Left-to-Right Contrast Gradient Overlay (Lightened for better visibility) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Inner Content Container */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col items-start justify-center">
          
          {/* Form Box placed on the left */}
          <div className="w-full max-w-[640px] text-left">
            {/* Wooden Plaque at Top of Contact Form */}
            <div className="mb-6 sm:mb-7">
              <img
                src="/assets/aged_wooden_plank_contact-e1780840422598.png"
                alt="Contact"
                className="w-[130px] sm:w-[155px] md:w-[180px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
              />
            </div>

            {status.submitted ? (
              <div className="w-full bg-[#dff8cf] border border-[#d2f0c0] text-[#1c1c1c] px-5 sm:px-6 py-4 rounded-none text-[15px] sm:text-[16px] font-sans leading-relaxed text-left shadow-sm animate-in fade-in duration-200">
                Thanks for contacting us! We will be in touch with you shortly.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4.5 sm:space-y-5">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                      Full Name <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      className="w-full bg-black/50 border border-white/20 rounded-[16px] px-4.5 py-3 sm:py-3.5 text-white placeholder:text-gray-400 focus:border-gold outline-none text-[15px] sm:text-[16px] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                      Email Address <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="sample@yourcompanydoma"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full bg-black/50 border border-white/20 rounded-[16px] px-4.5 py-3 sm:py-3.5 text-white placeholder:text-gray-400 focus:border-gold outline-none text-[15px] sm:text-[16px] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="space-y-2">
                  <label className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                    Phone Number <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full bg-black/50 border border-white/20 rounded-[16px] px-4.5 py-3 sm:py-3.5 text-white placeholder:text-gray-400 focus:border-gold outline-none text-[15px] sm:text-[16px] transition-colors"
                  />
                </div>

                {/* Row 3: Message */}
                <div className="space-y-2">
                  <label className="block text-white text-[15px] sm:text-[16px] font-bold tracking-tight">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full bg-black/50 border border-white/20 rounded-[16px] px-4.5 py-3.5 sm:py-4 text-white placeholder:text-gray-400 focus:border-gold outline-none text-[15px] sm:text-[16px] transition-colors resize-none h-[135px] sm:h-[155px]"
                  />
                </div>

                {/* Row 4: Official Live Internet hCaptcha Widget */}
                <div className="pt-1.5">
                  <CaptchaModal
                    onVerify={() => {
                      setCaptchaChecked(true);
                      setCaptchaError(false);
                    }}
                    onExpire={() => {
                      setCaptchaChecked(false);
                    }}
                    theme="light"
                  />
                  {captchaError && (
                    <p className="text-red-400 text-[12.5px] font-normal mt-1 flex items-center gap-1">
                      <span>*</span> Please verify that you are human before submitting.
                    </p>
                  )}
                </div>

                {/* Row 5: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="bg-white hover:bg-gray-100 text-black font-bold text-[16px] py-3 px-10 rounded-[16px] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {status.submitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. MINING CUSTOM FOOTER (1:1 LIVE SITE SCREENSHOT MATCH) */}
      <footer
        className="relative w-full py-6.5 sm:py-7.5 md:py-9 pl-6 sm:pl-10 md:pl-14 pr-2 sm:pr-3 md:pr-4 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url('/assets/miningfooter.png')` }}
      >
        {/* Balanced Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/45 pointer-events-none" />

        <div className="relative z-10 w-full flex items-center justify-between gap-4">
          
          {/* Left: Moon Rabbit Mining Logo + Calligraphy Quote */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3">
            {/* Gold Moon Rabbit Mining Logo (Enlarged & Shifted further to the right, no hover effect) */}
            <Link href="/mining" className="inline-block ml-14 sm:ml-20 md:ml-28 lg:ml-32 cursor-pointer">
              <img
                src="/assets/goldenlogo.png"
                alt="Moon Rabbit Mining"
                className="w-[105px] sm:w-[125px] md:w-[145px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
              />
            </Link>

            {/* Cursive Quote: Life is a treasure hunt, you just have to know where to look... (Enlarged) */}
            <img
              src="/assets/Life-is-a-treasure-hunt-you-just-have-to-know-where-to-look.-3-e1780662551985.png"
              alt="Life is a treasure hunt, you just have to know where to look"
              className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Right: Amanita Muscaria Mushroom House linking to /rabbit-screen (Placed close to right scrollbar, hover scale removed) */}
          <div className="flex items-center justify-end flex-shrink-0 pr-0.5 sm:pr-1">
            <Link
              href="/rabbit-screen"
              className="cursor-pointer inline-block"
              title="Rabbit Screen"
            >
              <img
                src="/assets/amanita-muscaria-pic.png"
                alt="Amanita Muscaria"
                className="w-[58px] sm:w-[72px] md:w-[86px] lg:w-[95px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
              />
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
}
