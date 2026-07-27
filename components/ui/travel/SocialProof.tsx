"use client";

import React from "react";
import { Star, Heart, MessageCircle } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

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
    username: "@samantha_r",
    body: "I booked solo because none of my friends could take time off. Within 2 hours of meeting the crew in Bali, we felt like we'd known each other for years! Best trip of my life.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "David Chen",
    username: "@david_c",
    body: "The creator host organized every alpine hut stay flawlessly. All I had to do was show up with my hiking boots. 10/10 recommendation!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Elena Rostova",
    username: "@elena_r",
    body: "Standing under the Northern Lights with 14 people who started as strangers and ended as lifelong friends is a memory I'll treasure forever.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = REVIEWS.slice(0, Math.ceil(REVIEWS.length / 2));
const secondRow = REVIEWS.slice(Math.ceil(REVIEWS.length / 2));

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4 transition duration-300",
        "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full object-cover w-8 h-8" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-gray-900">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-600 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

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

        {/* Testimonial Marquees */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
          <Marquee pauseOnHover className="[--duration:30s] py-2">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s] py-2">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          {/* Fading Gradients */}
          <div className="from-[#F7F9FC] to-transparent pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r z-10"></div>
          <div className="from-[#F7F9FC] to-transparent pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l z-10"></div>
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
