import React from "react";
import Hero from "@/components/Hero";
import MountainSlider from "@/components/MountainSlider";
import VideoSection from "@/components/VideoSection";

export const metadata = {
  title: 'Moon Rabbit - Moon Rabbit',
  description: 'Moon Rabbit offers a unique Mystical Guided Tour through the bewildering scenery of Northern Pakistan.',
};

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <Hero />

      {/* WHAT WE DO */}
      <section
        id="what-we-do"
        className="relative w-full overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/katlyn-boone-sRt3zQzLLKg-unsplash-min-scaled.jpg"
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Dark/Grey Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 lg:gap-20">
            {/* LEFT - WHAT WE DO */}
            <div className="w-full md:w-[28%] flex-shrink-0 flex items-center justify-start text-left">
              <h2 className="font-oswald text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-normal leading-none text-white whitespace-nowrap">
                What We Do
              </h2>
            </div>

            {/* RIGHT - INFORMATION */}
            <div className="w-full md:w-[68%] lg:w-[65%] text-left space-y-4 sm:space-y-5">
              <p className="font-oswald text-[15px] sm:text-[16.5px] md:text-[18px] font-light leading-[1.65] text-[#FFFDFD]">
                Moon Rabbit offers a unique Mystical Guided Tour through the bewildering scenery of Northern Pakistan. Our tour packages are all inclusive and only require a simple booking followed by your arrival to a local airport of your choice.
              </p>

              <p className="font-oswald text-[15px] sm:text-[16.5px] md:text-[18px] font-light leading-[1.65] text-[#FFFDFD]">
                Rest assured, from arrival till your departure Moon Rabbit will lavish you with hospitality while providing the following amenities: dependable 4×4 vehicles, boats, mountain bikes, and a variety of picturesque accommodations along with authentic cuisine from all of the best restaurants in the area.
              </p>

              <p className="font-oswald text-[15px] sm:text-[16.5px] md:text-[18px] font-light leading-[1.65] text-[#FFFDFD]">
                The Moon Rabbit Tour Guide is well-versed and during the journey he will provide all guests an interesting backstory regarding the people, culture, and history of the area focusing on esoteric knowledge transfer. We look forward to sharing a truly memorable life changing experience with you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOUNTAIN SECTION */}
      <MountainSlider />

      {/* EXPERIENCE VIDEO */}
      <VideoSection />
    </div>
  );
}
