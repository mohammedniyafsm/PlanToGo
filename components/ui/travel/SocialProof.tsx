"use client";

import React from "react";
import { Star, Heart, MessageCircle } from "lucide-react";

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

const REVIEWS = [
  {
    name: "Samantha Reed",
    role: "Bali Trip '25",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    text: "I booked solo because none of my friends could take time off. Within 2 hours of meeting the crew in Bali, we felt like we'd known each other for years! Best trip of my life.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Swiss Alps Trekker",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "The creator host @liam_summits organized every alpine hut stay flawlessly. All I had to do was show up with my hiking boots. 10/10 recommendation!",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "Iceland Aurora Explorer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    text: "Standing under the Northern Lights with 14 people who started as strangers and ended as lifelong friends is a memory I'll treasure forever.",
    rating: 5,
  },
];

const INSTA_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    likes: "1.4k",
    comments: "84",
    handle: "@plantogo.trips",
  },
  {
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    likes: "2.1k",
    comments: "142",
    handle: "@sarah_travels",
  },
  {
    url: "https://images.unsplash.com/photo-1476514525535-ce74f458147c?auto=format&fit=crop&w=600&q=80",
    likes: "980",
    comments: "56",
    handle: "@alex_trails",
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    likes: "3.2k",
    comments: "210",
    handle: "@plantogo.trips",
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="w-full bg-[#F7F9FC] text-[#161B22] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B4A]/10 text-[#FF6B4A] text-xs font-bold uppercase tracking-wider">
            <InstagramIcon className="w-4 h-4 text-[#FF6B4A]" />
            Real Travelers. Real Stories.
          </div>
          <h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#161B22]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Strangers Become The Crew
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Over 1,200+ travelers have joined our curated group trips across 24 countries. Here is what they captured along the trail.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-base italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0B57D6]"
                />
                <div>
                  <h4 className="font-bold text-[#161B22] text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Photo Grid */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center justify-between">
            <h3
              className="text-2xl font-bold text-[#161B22]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Moments From The Trail
            </h3>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-[#0B57D6] hover:underline flex items-center gap-1.5"
            >
              <InstagramIcon className="w-4 h-4" /> Follow @plantogo.trips
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INSTA_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm"
              >
                <img
                  src={photo.url}
                  alt="Trip moment"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white text-white" /> {photo.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white text-white" /> {photo.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
