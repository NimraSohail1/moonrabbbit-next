import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Tours - Moon Rabbit',
  description: 'Explore Moon Rabbit mystical guided tour packages through Northern Pakistan.',
};

export default function ToursPage() {
  const circuitsFirst = [
    {
      id: 'ghk',
      name: 'Gilgit-Hunza-Khunjerab',
      image: '/assets/GHK-04-1024x1024.png',
      route: '/ghk',
    },
    {
      id: 'sks',
      name: 'Skardu-Khaplu-Shigar',
      image: '/assets/SKS-03-1024x1024.png',
      route: '/sks-2',
    },
    {
      id: 'gyp',
      name: 'Gilgit-Yasin-Phandar',
      image: '/assets/GYP-01-1024x1024.png',
      route: '/gyp',
    },
    {
      id: 'skc',
      name: 'Swat-Kalash-Chitral',
      image: '/assets/SKC-02-1024x1024.png',
      route: '/skc',
    },
  ];

  const circuitsSecond = [
    {
      id: 'fm',
      name: 'Fairy Meadows',
      image: '/assets/FM-MoonRabbit-1024x1024.jpg',
      route: '/fm',
    },
    {
      id: 'yah',
      name: 'Yougo - Asokole - Hushe',
      image: '/assets/YAH-MoonRabbit-1024x1024.jpg',
      route: '/yah',
    },
    {
      id: 'bms',
      name: 'Booni - Mastuj - Shandur',
      image: '/assets/BMS-MoonRabbit-1024x1024.jpg',
      route: '/bms',
    },
    {
      id: 'da',
      name: 'Deosai & Astore',
      image: '/assets/DA-9.jpg',
      route: '/da',
    },
  ];

  return (
    <div className="w-full bg-black min-h-screen text-white select-none">
      {/* Main Content Area */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 pb-4">
        {/* SECTION 1: Wood Sign Plaque (Tours) */}
        <div className="pt-2 pb-4 px-1 sm:px-2">
          <img
            src="/assets/Untitled-design-2026-06-04T172511.007.png"
            alt="Tours"
            className="w-[115px] sm:w-[130px] md:w-[145px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* ROW 1: 4 Tour Cards (GHK, SKS, GYP, SKC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4 px-1 sm:px-2 pb-8">
          {circuitsFirst.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Link
                href={item.route}
                className="block w-full group cursor-pointer relative z-10 hover:z-20"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-neutral-900 shadow-xl transition-all duration-300 ease-out transform group-hover:scale-[1.06] group-hover:brightness-105 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.98)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-white font-oswald text-xs sm:text-[13.5px] md:text-[14.5px] font-bold text-center mt-2.5 tracking-normal transition-colors">
                  {item.name}
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* SECTION 2: Wood Sign Plaque (Circuits 5 - 8) */}
        <div className="pt-6 pb-3 px-1 sm:px-2">
          <img
            src="/assets/wood_sign_add_final_match.png"
            alt="Circuits 5 - 8"
            className="w-[120px] sm:w-[135px] md:w-[150px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* ROW 2: 4 Tour Cards (FM, YAH, BMS, DA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4 px-1 sm:px-2 pb-14">
          {circuitsSecond.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Link
                href={item.route}
                className="block w-full group cursor-pointer relative z-10 hover:z-20"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-neutral-900 shadow-xl transition-all duration-300 ease-out transform group-hover:scale-[1.06] group-hover:brightness-105 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.98)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-white font-oswald text-xs sm:text-[13.5px] md:text-[14.5px] font-bold text-center mt-2.5 tracking-normal transition-colors">
                  {item.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-[40px] w-full bg-black" />
    </div>
  );
}
