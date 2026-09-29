import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Rabbit Screen - Moon Rabbit',
  description: 'I like you, you’re Curious .....Follow the Rabbit',
};

export default function RabbitScreenPage() {
  return (
    <div className="w-full bg-black text-white py-14 sm:py-20 md:py-24 px-4 sm:px-8 select-none min-h-[380px] flex flex-col justify-center">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-between">
        {/* Centered Main Heading: I like you, you’re Curious */}
        <div className="w-full text-center">
          <h1 className="font-oswald text-[32px] sm:text-[38px] md:text-[44px] font-light text-white text-center tracking-normal">
            I like you, you’re Curious
          </h1>
        </div>

        {/* Right-Aligned: .....Follow the Rabbit & Rabbit Mascot */}
        <div className="w-full flex justify-end items-center pr-4 sm:pr-10 md:pr-16 lg:pr-24 mt-6 sm:mt-10 md:mt-12">
          <div className="flex items-end gap-3 sm:gap-4 md:gap-5">
            <span className="font-oswald text-[18px] sm:text-[22px] md:text-[26px] font-light text-white tracking-normal select-none pb-2 sm:pb-3">
              .....Follow the Rabbit
            </span>
            <Link
              href="/black-velvet-jacket"
              className="inline-block hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer flex-shrink-0"
              title="rabbit"
            >
              <img
                src="/assets/rabbit-rnopn82x0sp6ygd6vc0pl48souhrksvxq93heczbug.png"
                alt="rabbit"
                className="w-[72px] sm:w-[92px] md:w-[112px] h-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
