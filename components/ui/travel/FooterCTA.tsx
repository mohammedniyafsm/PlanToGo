"use client";

import React, { useState } from "react";
import { Send, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function FooterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="footer-cta" className="w-full bg-background text-white py-24 px-6 relative overflow-hidden select-none">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Main CTA Story Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FF6B4A] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#FF6B4A]" />
            Your Next Adventure Awaits
          </div>

          <h2
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Seek New Horizons. <br />
            <span className="italic font-serif font-semibold text-[#FF6B4A]">Plan Your Journey.</span>
          </h2>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Ready to trade routine for real adventure? Join upcoming small-group trips hosted by top travel creators.
          </p>

          {/* Newsletter Signup Form */}
          <div className="pt-4 max-w-md mx-auto">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm">You're on the priority notification list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                <input
                  type="email"
                  required
                  placeholder="Enter your email for new trip alerts..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-transparent text-white placeholder:text-white/60 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B4A] hover:bg-[#e05838] active:scale-95 text-white font-bold px-5 py-3 rounded-xl transition flex items-center gap-1.5 text-sm whitespace-nowrap shadow-md shadow-orange-500/20"
                >
                  <span>Notify Me</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation & Link Grids */}
        <div className="pt-16 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-sm text-white/80">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B4A] flex items-center justify-center text-white font-bold text-xs">
                <MapPin className="w-4 h-4 fill-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Plan Togo
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed max-w-xs">
              Curated group trips for solo travelers and adventure seekers. Connect with top creators and discover the world together.
            </p>
          </div>

          {/* Column 2: Explore links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Explore</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><a href="#upcoming-trips" className="hover:text-white transition duration-200">Upcoming Journeys</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition duration-200">How it Works</a></li>
              <li><a href="#values" className="hover:text-white transition duration-200">Our Core Values</a></li>
              <li><a href="#social-proof" className="hover:text-white transition duration-200">Traveler Stories</a></li>
            </ul>
          </div>

          {/* Column 3: Information links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Information</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><a href="/terms" className="hover:text-white transition duration-200">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-white transition duration-200">Privacy Policy</a></li>
              <li><a href="/safety" className="hover:text-white transition duration-200">Safety Guidelines</a></li>
              <li><a href="/support" className="hover:text-white transition duration-200">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Connect</h4>
            <div className="flex flex-col gap-3">
              {/* WhatsApp Contact badge */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#25D366] transition duration-200 font-semibold w-fit border border-white/10"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span className="text-white text-xs font-medium">WhatsApp Support</span>
              </a>

              {/* Instagram Contact badge */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#E1306C] transition duration-200 font-semibold w-fit border border-white/10"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                <span className="text-white text-xs font-medium">@plantogo.trips</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright separator */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 Plan Togo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Made for travelers, by travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
