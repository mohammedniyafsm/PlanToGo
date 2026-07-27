"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
}

interface TileNavbarProps {
  logoImageSrc?: string;
  logoText?: string;
  ctaText?: string;
  menuItems?: MenuItem[];
  onCtaClick?: () => void;
  className?: string;
}

export function TileNavbar({
  logoImageSrc = "/logo1.png",
  logoText = "Plan Togo.",
  ctaText = "Book A Trip",
  menuItems = [
    { label: "Upcoming Trips", href: "#upcoming-trips" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "The Crew", href: "#social-proof" },
    { label: "Our Story", href: "#story-statement" },
  ],
  onCtaClick,
  className = "",
}: TileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`w-full max-w-2xl mx-auto px-4 pt-4 ${className}`}>
      <nav
        className={`w-full bg-[#3066FF]/95 backdrop-blur-md text-white rounded-2xl shadow-xl shadow-blue-950/25 border border-white/20 transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? "px-6 pt-4 pb-6" : "px-6 py-3.5"
        }`}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {logoImageSrc ? (
              <Image
                src={logoImageSrc}
                alt="Plan Togo Logo"
                width={220}
                height={65}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                priority
              />
            ) : (
              <span
                className="text-2xl font-bold tracking-tight text-white select-none"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {logoText}
              </span>
            )}
          </a>

          {/* Right Actions: CTA & Plus/Minus Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  handleNavClick("#upcoming-trips");
                }
              }}
              className={`font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all duration-200 focus:outline-none flex items-center gap-1.5 ${
                isOpen
                  ? "bg-white text-[#052EE8] shadow-sm hover:bg-white/95"
                  : "bg-[#052EE8] hover:bg-[#0024BF] text-white shadow-md active:scale-95"
              }`}
            >
              <span>{ctaText}</span>
            </button>

            {/* Toggle Button (+ / -) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2 text-white hover:bg-white/10 active:scale-95 rounded-lg transition focus:outline-none flex items-center justify-center"
            >
              {isOpen ? (
                <Minus className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Plus className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu (Opens on + click) */}
        {isOpen && (
          <div className="mt-4 pt-1 flex flex-col w-full animate-in fade-in slide-in-from-top-1 duration-200">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="w-full border-t border-white/25 py-3.5 text-white hover:opacity-85 font-bold text-lg md:text-xl tracking-tight transition-opacity text-left flex items-center justify-between group"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                <span>{item.label}</span>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  →
                </span>
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export default TileNavbar;
