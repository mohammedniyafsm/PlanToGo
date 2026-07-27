"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Users, Sparkles, ArrowRight, Compass } from "lucide-react";
import BookingDrawer, { TripData } from "./BookingDrawer";

const TRIPS_DATA: TripData[] = [
  {
    id: "1",
    title: "Bali Waterfalls & Sunset Surf Camp",
    location: "Canggu & Ubud, Indonesia",
    dates: "Aug 14 - Aug 21, 2026",
    duration: "7 Days",
    price: "$899",
    slotsRemaining: 4,
    totalSlots: 16,
    hostName: "Maya Lin",
    hostHandle: "@mayasurf",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Chase secret jungle cascades, surf sunset waves, and share midnight bonfire acoustic jam sessions with 15 fellow adventurers.",
  },
  {
    id: "2",
    title: "Swiss Alps Autumn Summit Trek",
    location: "Interlaken & Zermatt, Switzerland",
    dates: "Sep 02 - Sep 09, 2026",
    duration: "8 Days",
    price: "$1,450",
    slotsRemaining: 2,
    totalSlots: 14,
    hostName: "Liam Vance",
    hostHandle: "@liam_summits",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
    description: "Hike golden alpine trails, sleep in high-altitude mountain huts, and watch sunrise hit Matterhorn with a tight-knit crew.",
  },
  {
    id: "3",
    title: "Kyoto Lantern & Ancient Trail Discovery",
    location: "Kyoto & Nara, Japan",
    dates: "Oct 10 - Oct 18, 2026",
    duration: "9 Days",
    price: "$1,690",
    slotsRemaining: 6,
    totalSlots: 18,
    hostName: "Kenji Sato",
    hostHandle: "@kenji_trails",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description: "Explore hidden bamboo groves, taste authentic izakaya street food, and wander autumn temple paths with global travelers.",
  },
  {
    id: "4",
    title: "Icelandic Northern Lights & Fjords Expedition",
    location: "Reykjavik & Vik, Iceland",
    dates: "Nov 05 - Nov 12, 2026",
    duration: "7 Days",
    price: "$1,380",
    slotsRemaining: 3,
    totalSlots: 15,
    hostName: "Astrid Lind",
    hostHandle: "@astrid_nordic",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
    description: "Soak in volcanic hot springs, trek black sand beaches, and hunt the dancing Aurora Borealis in private super-jeeps.",
  },
  {
    id: "5",
    title: "Amalfi Coast Cliffside & Sailing Escape",
    location: "Positano & Capri, Italy",
    dates: "Aug 28 - Sep 04, 2026",
    duration: "8 Days",
    price: "$1,290",
    slotsRemaining: 5,
    totalSlots: 16,
    hostName: "Marco Rossi",
    hostHandle: "@marco_amalfi",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Sail emerald coves, walk lemon tree mountain paths, and dine family-style under cliffside pergolas with new travel buddies.",
  },
  {
    id: "6",
    title: "Patagonia Glacier & Wild Frontier Hike",
    location: "Torres del Paine, Chile",
    dates: "Dec 01 - Dec 10, 2026",
    duration: "10 Days",
    price: "$1,850",
    slotsRemaining: 7,
    totalSlots: 12,
    hostName: "Sofia Cruz",
    hostHandle: "@sofia_wild",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
    description: "Conquer the legendary W-Trek, witness icebergs crashing into turquoise lakes, and experience South America's rawest wilderness.",
  },
];

const CATEGORIES = ["All Trips", "Mountain Treks", "Beach Camps", "Cultural Expeditions", "Weekend Escapes"];

export default function UpcomingTrips() {
  const [selectedCategory, setSelectedCategory] = useState("All Trips");
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBookClick = (trip: TripData) => {
    setSelectedTrip(trip);
    setIsDrawerOpen(true);
  };

  return (
    <section id="upcoming-trips" className="w-full bg-white text-[#161B22] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0B57D6] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#0B57D6]" />
              Curated Expeditions
            </div>
            <h2
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#161B22]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Upcoming Group Journeys
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-xl">
              Small-group curated trips led by experienced creators. Strangers apply, small crews form, memories get made.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition whitespace-nowrap ${selectedCategory === category
                    ? "bg-[#0B57D6] text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRIPS_DATA.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Header & Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Slots Remaining Pulse Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B4A] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Slots Available: {trip.slotsRemaining}/{trip.totalSlots}
                </div>

                {/* Host Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                  <span>Hosted by</span>
                  <span className="font-bold text-[#FF6B4A]">{trip.hostHandle}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0B57D6]" /> {trip.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0B57D6]" /> {trip.duration}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#161B22] group-hover:text-[#0B57D6] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {trip.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {trip.description}
                  </p>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Per traveler</span>
                    <span className="text-2xl font-black text-[#161B22]">{trip.price}</span>
                  </div>

                  <button
                    onClick={() => handleBookClick(trip)}
                    className="bg-[#0B57D6] hover:bg-[#0947b0] active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 text-sm shadow-md shadow-blue-500/15"
                  >
                    <span>Book Your Spot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Drawer Modal */}
      <BookingDrawer
        trip={selectedTrip}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}
