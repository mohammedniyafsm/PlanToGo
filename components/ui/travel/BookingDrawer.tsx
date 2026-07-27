"use client";

import React, { useState } from "react";
import { X, Calendar, MapPin, Users, CheckCircle2, ShieldCheck } from "lucide-react";

export interface TripData {
  id: string;
  title: string;
  location: string;
  dates: string;
  duration: string;
  price: string;
  slotsRemaining: number;
  totalSlots: number;
  hostName: string;
  hostHandle: string;
  image: string;
  description: string;
}

interface BookingDrawerProps {
  trip: TripData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDrawer({ trip, isOpen, onClose }: BookingDrawerProps) {
  const [seats, setSeats] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !trip) return null;

  const priceNum = parseInt(trip.price.replace(/[^0-9]/g, "")) || 499;
  const totalPrice = priceNum * seats;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 bg-[#0B57D6] text-white flex items-center justify-between relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B4A] text-white text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {trip.slotsRemaining} Slots Left
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{trip.title}</h3>
            <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-[#FF6B4A]" /> {trip.location}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-2 rounded-full hover:bg-white/10 text-white transition focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#161B22]">Spot Reserved!</h4>
              <p className="text-gray-600 text-sm max-w-sm mx-auto">
                We've saved {seats} seat(s) for you on <strong>{trip.title}</strong>. Check your inbox ({email || "your email"}) for access to the private trip group chat!
              </p>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="mt-6 w-full bg-[#0B57D6] text-white font-bold py-3.5 rounded-xl hover:bg-[#0947b0] transition shadow-lg"
              >
                Back to Trips
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Summary Card */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-4">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="space-y-1 text-sm text-[#161B22]">
                  <p className="font-semibold text-base">{trip.title}</p>
                  <p className="text-gray-600 flex items-center gap-1 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#0B57D6]" /> {trip.dates} ({trip.duration})
                  </p>
                  <p className="text-xs text-gray-500">
                    Host: <span className="font-semibold text-[#0B57D6]">{trip.hostName} ({trip.hostHandle})</span>
                  </p>
                </div>
              </div>

              {/* Number of Seats Selection */}
              <div>
                <label className="block text-sm font-bold text-[#161B22] mb-2 flex items-center justify-between">
                  <span>Number of Traveler Seats</span>
                  <span className="text-xs text-[#FF6B4A] font-medium">Max {trip.slotsRemaining} available</span>
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      disabled={num > trip.slotsRemaining}
                      onClick={() => setSeats(num)}
                      className={`flex-1 py-3 rounded-xl border text-sm font-bold transition ${
                        seats === num
                          ? "bg-[#0B57D6] text-white border-[#0B57D6] shadow-sm"
                          : "bg-white text-[#161B22] border-gray-200 hover:border-gray-300"
                      } ${num > trip.slotsRemaining ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {num} {num === 1 ? "Seat" : "Seats"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h5 className="text-sm font-bold uppercase tracking-wider text-gray-500">Traveler Details</h5>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B57D6] text-sm text-[#161B22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B57D6] text-sm text-[#161B22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B57D6] text-sm text-[#161B22]"
                  />
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-[#161B22]">
                <div>
                  <p className="text-xs text-gray-600">Total Booking Price ({seats} seat)</p>
                  <p className="text-2xl font-black text-[#0B57D6]">${totalPrice}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> No Hidden Fees
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B4A] hover:bg-[#e05838] active:scale-[0.98] text-white font-bold py-4 rounded-xl transition shadow-lg shadow-orange-500/20 text-base"
              >
                Confirm Spot — ${totalPrice}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
