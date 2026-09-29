import React from 'react';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Signage & Heritage Badges - Moon Rabbit',
};

export default function SignageArchivePage() {
  const badges = [
    { title: 'Moon Rabbit Signboard', img: '/assets/moonrabbit_signboard-1024x1024.png' },
    { title: 'Official Residence Plaque', img: '/assets/moonrabbit_mansion_plaque-1024x683.png' },
    { title: 'Jeep Wooden Plaque', img: '/assets/jeep_wooden_sign_isolated-1024x683.png' },
    { title: 'Large Capacity Cruiser Plate', img: '/assets/large_capacity_metal_plate-1024x683.png' },
    { title: 'Luxury Green Line Railway Sign', img: '/assets/trains_railway_sign-1024x683.png' },
    { title: 'Nautical & Boat Sign', img: '/assets/boats_nautical_sign-1024x683.png' },
    { title: 'Mountain Bike Workshop Plaque', img: '/assets/bikes_workshop_plaque-1024x683.png' },
    { title: 'Luxury Glamping Tag', img: '/assets/moon_rabbit_tents_tag-1024x1024.png' },
    { title: 'Rusted Heritage Badge 01', img: '/assets/rusted-01.png' },
    { title: 'Rusted Heritage Badge 02', img: '/assets/rusted-02.png' },
    { title: 'Rusted Heritage Badge 03', img: '/assets/rusted-03.png' },
    { title: 'Rusted Heritage Badge 04', img: '/assets/rusted-04.png' },
    { title: 'Rusted Heritage Badge 05', img: '/assets/rusted-05.png' },
    { title: 'Rusted Heritage Badge 06', img: '/assets/rusted-06.png' },
  ];

  return (
    <div className="bg-black text-white pt-10 sm:pt-14 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-black/60 text-[#D4AF37] text-xs uppercase font-oswald tracking-widest mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Heritage Collection</span>
        </div>

        <h1 className="font-oswald text-4xl sm:text-6xl font-light uppercase tracking-widest text-white mb-4">
          Signage &amp; Heritage Badges
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto text-base font-light">
          An authorized archive of Moon Rabbit hand-carved wooden plaques, oxidized brass tags, and vintage vehicle insignias.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e0e] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4 shadow-xl group transition-all duration-300"
            >
              <div className="h-48 w-full flex items-center justify-center overflow-hidden">
                <img
                  src={b.img}
                  alt={b.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                />
              </div>
              <p className="font-oswald text-sm text-gray-300 uppercase tracking-wider text-center group-hover:text-[#D4AF37] transition">
                {b.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
