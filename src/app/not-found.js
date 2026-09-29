import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen pt-10 sm:pt-14 pb-20 flex items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto">
          <Compass className="h-10 w-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        <h1 className="font-oswald text-6xl font-light text-white">404</h1>
        <h2 className="font-oswald text-2xl font-light uppercase tracking-widest text-[#D4AF37]">
          Off the Chart
        </h2>
        <p className="text-gray-400 font-light text-sm">
          The trail you followed does not exist. Return to base camp to navigate our guided routes.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-oswald text-xs uppercase tracking-widest bg-[#D4AF37] text-black font-semibold hover:bg-[#F3E5AB] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
