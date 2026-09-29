'use client';

import React, { useState } from 'react';

export default function VehiclesPage() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  const suvs = [
    {
      id: 'land-cruiser-v8',
      title: 'Land Cruiser V8',
      desc: ['4-5 passenger with luggage'],
      image: '/assets/v8-e1691352303332-1024x658.jpg',
    },
    {
      id: 'revo',
      title: 'Revo',
      desc: ['4 passenger with luggage'],
      image: '/assets/1010857-scaled-e1691352262418-1024x658.jpg',
    },
    {
      id: 'prado',
      title: 'Prado',
      desc: ['4-5 passenger with luggage'],
      image: '/assets/909788-1024x654.jpg',
    },
  ];

  const largeCapacity = [
    {
      id: 'coaster',
      title: 'Coaster',
      desc: ['20 passenger with luggage'],
      image: '/assets/TOYOTA_Coaster_Standard_170331p6137hr.jpg',
    },
    {
      id: 'grand-cabin',
      title: 'Grand Cabin',
      desc: ['8-10 passenger with luggage'],
      image: '/assets/Grand-Cabin-MoonRabbit-1024x683.jpg',
    },
  ];

  const airfare = [
    {
      id: 'airfare',
      title: 'Airfare',
      desc: [
        'Now booking domestic flights with all airlines operating in Pakistan',
        'Offering corporate discount and special rates for groups',
        'Specializing in flights to and from: Chitral, Gilgit, and Skardu',
      ],
      image: '/assets/skardu-by-air-2-1024x569.jpg',
    },
  ];

  const railways = [
    {
      id: 'green-line',
      title: 'Luxury Green Line',
      desc: [
        'Now offering Pakistan Railway Bookings for the Luxury Green Line as an addition to your tour.',
        'You can travel to and from any city in Pakistan using this unique train service experience.',
        'AC Parlor Class & Business Class',
      ],
      image: '/assets/Greenline-Exterior-1024x569.jpg',
    },
  ];

  const bikes = [
    {
      id: 'mountain-bike',
      title: 'Mountain Bike',
      desc: [
        'Must request in advance',
        'Durable Mountain Bikes available',
        'Must add roof rack on vehicle to transport',
      ],
      image: '/assets/haidan-777231-unsplash-2-1024x678.jpg',
    },
  ];

  const watercraft = [
    {
      id: 'kayak',
      title: 'Kayak',
      desc: [
        'Must request in advance',
        'Kayak style 1 or 2 passenger boat',
        'Includes paddles and life jackets',
      ],
      image: '/assets/premium-sea-kayak_4-e1691352187802.jpg',
    },
    {
      id: 'inflatable-raft',
      title: 'Inflatable Raft',
      desc: [
        'Must request in advance',
        'Inflatable 4 passenger tube style raft',
        'Includes paddles and lifejackets',
      ],
      image: '/assets/inflatble-2-e1691349928320-1024x701.jpg',
    },
    {
      id: 'life-jacket',
      title: 'Life Jacket',
      desc: [
        'Universal 1 size fits all',
        'Provided with Kayak and Raft Rental',
      ],
      image: '/assets/life-jak2-e1691352936834.jpg',
    },
  ];

  const renderCard = (v) => {
    const isSelected = activeCard === v.id;

    return (
      <div
        key={v.id}
        onClick={() => handleCardClick(v.id)}
        className={`group relative bg-[#101010] rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out flex flex-col cursor-pointer select-none p-3 ${
          isSelected
            ? '-translate-y-3.5 border border-[#c89d3c] shadow-[0_16px_35px_rgba(0,0,0,0.95)] scale-[1.03] z-20'
            : 'border border-[#292929] hover:border-[#c89d3c] hover:shadow-[0_12px_35px_rgba(0,0,0,0.95)] hover:scale-[1.04] hover:-translate-y-2.5 hover:z-20 active:-translate-y-3.5'
        }`}
      >
        <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-900 rounded-[18px]">
          <img
            src={v.image}
            alt={v.title}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              isSelected ? 'scale-108' : 'group-hover:scale-108'
            }`}
          />
        </div>
        <div className="px-1.5 pt-3.5 pb-2.5 flex-1 flex flex-col justify-start">
          <h2 className="font-oswald text-[23px] sm:text-[25px] font-normal text-white tracking-normal mb-1 text-left">
            {v.title}
          </h2>
          <div className="font-oswald text-[14px] sm:text-[15px] font-light text-[#FFFFFF] leading-snug space-y-0.5 text-left">
            {v.desc.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#060606] min-h-screen text-white select-none">
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* 1. Main Page Header Wooden Plaque */}
        <div className="flex justify-center pt-2 pb-2">
          <img
            src="/assets/Vehicles.png"
            alt="Vehicles"
            className="w-[240px] sm:w-[270px] md:w-[285px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* SECTION 1: Jeeps */}
        <section className="space-y-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/Jeeps-1.png"
              alt="Jeeps"
              className="w-[145px] sm:w-[160px] md:w-[170px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {suvs.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 2: Large Capacity */}
        <section className="space-y-4 pt-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/Untitled-design-2026-06-04T155959.053.png"
              alt="Large Capacity"
              className="w-[240px] sm:w-[275px] md:w-[295px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {largeCapacity.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 3: Airfare */}
        <section className="space-y-4 pt-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/Untitled-design-2026-06-05T163101.848-e1780659090373.png"
              alt="Airfare"
              className="w-[145px] sm:w-[160px] md:w-[170px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {airfare.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 4: Railway / Green Line */}
        <section className="space-y-4 pt-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/Untitled-design-2026-06-04T155724.945.png"
              alt="Railways"
              className="w-[140px] sm:w-[150px] md:w-[158px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {railways.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 5: Mountain Bikes */}
        <section className="space-y-4 pt-4">
          <div className="pt-2 pb-1">
            <img
              src="/assets/Untitled-design-2026-06-04T160322.021.png"
              alt="Mountain Bikes"
              className="w-[130px] sm:w-[142px] md:w-[151px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bikes.map((v) => renderCard(v))}
          </div>
        </section>

        {/* SECTION 6: Boats / Watercraft & Rafts */}
        <section className="space-y-4 pt-4 pb-14">
          <div className="pt-2 pb-1">
            <img
              src="/assets/Untitled-design-2026-06-04T163559.718.png"
              alt="Boats and Watercraft"
              className="w-[135px] sm:w-[148px] md:w-[159px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {watercraft.map((v) => renderCard(v))}
          </div>
        </section>
      </div>
    </div>
  );
}
