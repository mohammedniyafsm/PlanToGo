"use client";

import React from "react";
import { Compass, Ticket, Users, Globe2, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    titleFirstLine: "Pick Your",
    titleSecondLine: "Trip",
    description: "Explore handpicked itineraries hosted by verified travel creators and adventurous influencers.",
    icon: Compass,
  },
  {
    number: "02",
    titleFirstLine: "Book Your",
    titleSecondLine: "Spot",
    description: "Reserve your seat with a small deposit. Every trip is capped at 12–18 travelers for maximum bonding.",
    icon: Ticket,
  },
  {
    number: "03",
    titleFirstLine: "Meet the",
    titleSecondLine: "Crew",
    description: "Get introduced in the private pre-trip chat, break the ice, and coordinate pre-departure packing.",
    icon: Users,
  },
  {
    number: "04",
    titleFirstLine: "Travel",
    titleSecondLine: "Together",
    description: "Land at your destination, share unforgettable moments, and turn strangers into lifelong travel buddies.",
    icon: Globe2,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-[#161B22] text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FF6B4A] text-xs font-bold uppercase tracking-wider border border-white/10">
            Simple 4-Step Process
          </div>
          <h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How Plan{" "}
            <span className="italic font-bold text-[#FF6B4A]" style={{ fontFamily: "var(--font-serif-italic)" }}>
              togo
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            No solo travel awkwardness, no logistics headaches. Just apply, join the group, and pack your bags.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6 hover:border-[#FF6B4A] hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-4xl font-black text-white/20 group-hover:text-[#FF6B4A] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B4A] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3
                    className="text-2xl font-bold leading-none tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <span className="block text-white">{step.titleFirstLine}</span>
                    <span
                      className="block text-white/40 group-hover:text-[#FF6B4A] italic font-bold transition-colors duration-300 mt-1"
                      style={{ fontFamily: "var(--font-serif-italic)", fontSize: "1.05em" }}
                    >
                      {step.titleSecondLine}
                    </span>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-white/20">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
