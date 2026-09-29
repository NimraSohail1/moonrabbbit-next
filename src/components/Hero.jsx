'use client';

import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      console.log('Autoplay blocked by browser');
    });
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] max-h-[1000px] overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/moon-720p.mp4" type="video/mp4" />
          <source src="/videos/Moon-Rabbit-Final-5.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
    </section>
  );
}
