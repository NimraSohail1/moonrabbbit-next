'use client';

import React from "react";

export default function VideoSection() {
  return (
    <section className="w-full bg-black pt-4 sm:pt-6 pb-12 sm:pb-16 flex flex-col items-center justify-center px-4 sm:px-6">
      {/* Section Heading */}
      <div className="text-center mb-4 sm:mb-5">
        <h2 className="font-oswald text-2xl sm:text-3xl md:text-[36px] font-extralight text-white tracking-normal leading-none">
          Our Theme
        </h2>
      </div>

      {/* Compact Video Player Container */}
      <div className="w-full max-w-[660px] md:max-w-[700px] mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.9)] bg-black aspect-video flex items-center justify-center border border-white/10">
        <video
          className="w-full h-full object-cover"
          controls
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          preload="metadata"
        >
          <source
            src="/videos/Moon-Rabbit-Final-5.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
