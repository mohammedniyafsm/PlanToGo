"use client";

import React from "react";

const VALUES = [
  {
    titleFirstLine: "stranger",
    titleSecondLine: "camps",
    description: "Where travelers meet, share stories around the campfire, and end the trip as a close-knit crew.",
  },
  {
    titleFirstLine: "acoustic",
    titleSecondLine: "vibes",
    description: "Hosted by Hanansha & Echo, blending remote exploration with live jam sessions and musical energy.",
  },
  {
    titleFirstLine: "exclusive",
    titleSecondLine: "drops",
    description: "Follow our reveals on Instagram, grab one of the limited slots, and join the next group journey.",
  },
];

export default function CompanyValues() {
  return (
    <section className="w-full bg-[#0038FF] text-white py-28 px-6 md:px-12 relative overflow-hidden select-none">
      {/* Background illustration overlay wrapper (User can absolute-position drawings here) */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        {/* Wave or map grid design placeholders */}
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VALUES.map((val, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl border border-white/45 bg-white/5 hover:bg-white/10 transition-all duration-500 ease-out group flex flex-col justify-end p-6 overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Card content container */}
              <div className="space-y-3 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <h3
                  className="text-2xl md:text-3xl font-extrabold leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="block text-white">{val.titleFirstLine}</span>
                  <span className="block text-[#161B22]/40 dark:text-white/40 group-hover:text-white/70 transition-colors duration-500">
                    {val.titleSecondLine}
                  </span>
                </h3>
                
                <p className="text-white/90 text-xs md:text-sm font-light leading-relaxed max-w-[220px] opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 translate-y-4 group-hover:translate-y-0 overflow-hidden transition-all duration-500 ease-out">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
