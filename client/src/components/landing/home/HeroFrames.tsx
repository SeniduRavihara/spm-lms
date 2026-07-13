'use client';

import React from 'react';

export default function HeroFrames() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      {/* Left Column */}
      <div className="flex flex-col gap-4 h-full">
        {/* Top Left Frame */}
        <div 
          className="flex-1 bg-[#fdf2b3] rounded-[30px] overflow-hidden relative group transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-500/10 cursor-pointer"
        >
          <img 
            src="/test/person/p1.jpg" 
            alt="Instructor 1" 
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Bottom Left Frame */}
        <div 
          className="flex-1 bg-[#bdf3d4] rounded-[30px] rounded-bl-[120px] overflow-hidden relative group transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/10 cursor-pointer"
        >
          <img 
            src="/test/person/p2.jpg" 
            alt="Instructor 2" 
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Right Column */}
      <div 
        className="bg-[#fde2d2] rounded-t-[180px] rounded-b-[30px] overflow-hidden relative group transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer h-full"
      >
        <img 
          src="/test/person/p4.webp" 
          alt="New Person" 
          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}
