"use client";

import { useEffect, useRef } from "react";

interface PhotoConfig {
  id: number;
  src: string;
  className: string;
  rotation: number;
  depth: number;
  floatDuration: string;
  floatDelay: string;
  fadeInDelay: string;
}

const PHOTO_CONFIGS: PhotoConfig[] = [
  {
    id: 1,
    src: "/home-f/1.jpg",
    className: "absolute top-[12%] left-[6%] md:top-[16%] md:left-[8%] w-[130px] md:w-[220px]",
    rotation: -6,
    depth: 0.02,
    floatDuration: "5s",
    floatDelay: "0.2s",
    fadeInDelay: "200ms",
  },
  {
    id: 2,
    src: "/home-f/2.jpg",
    className: "absolute hidden md:block top-[46%] left-[4%] w-[120px] md:w-[195px]",
    rotation: 4,
    depth: 0.035,
    floatDuration: "4.5s",
    floatDelay: "0.6s",
    fadeInDelay: "400ms",
  },
  {
    id: 3,
    src: "/home-f/3.jpg",
    className: "absolute top-[14%] right-[5%] md:top-[18%] md:right-[7%] w-[145px] md:w-[230px]",
    rotation: 5,
    depth: 0.015,
    floatDuration: "5.5s",
    floatDelay: "0.1s",
    fadeInDelay: "300ms",
  },
  {
    id: 4,
    src: "/home-f/4.jpg",
    className: "absolute hidden md:block bottom-[12%] left-[10%] w-[130px] md:w-[210px]",
    rotation: -4,
    depth: 0.025,
    floatDuration: "4.8s",
    floatDelay: "0.8s",
    fadeInDelay: "500ms",
  },
  {
    id: 5,
    src: "/home-f/5.jpg",
    className: "absolute top-[65%] right-[6%] md:bottom-[14%] md:right-[9%] w-[140px] md:w-[225px]",
    rotation: -5,
    depth: 0.03,
    floatDuration: "5.2s",
    floatDelay: "0.4s",
    fadeInDelay: "100ms",
  },
  {
    id: 6,
    src: "/home-f/6.jpg",
    className: "absolute hidden md:block top-[62%] right-[22%] w-[110px] md:w-[170px]",
    rotation: 6,
    depth: 0.04,
    floatDuration: "6s",
    floatDelay: "0s",
    fadeInDelay: "600ms",
  },
];

interface FloatingPhotoCollageProps {
  show: boolean;
}
export default function FloatingPhotoCollage({ show }: FloatingPhotoCollageProps) {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect if primary input device is a touch screen to skip parallax
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor position offset relative to viewport center
      target.x = e.clientX - window.innerWidth / 2;
      target.y = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const updateParallax = () => {
      // Linear interpolation (lerp) for smooth easing
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      PHOTO_CONFIGS.forEach((config, idx) => {
        const el = parallaxRefs.current[idx];
        if (el) {
          const xOffset = current.x * config.depth;
          const yOffset = current.y * config.depth;
          el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        }
      });

      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[5]">
      {/* Self-contained styling for the keyframe-based floating animation */}
      <style>{`
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>

      {PHOTO_CONFIGS.map((config, idx) => (
        <div
          key={config.id}
          ref={(el) => {
            parallaxRefs.current[idx] = el;
          }}
          className={config.className}
        >
          {/* Float container handles translateY oscillation */}
          <div
            style={{
              animation: `floatY ${config.floatDuration} ease-in-out infinite`,
              animationDelay: config.floatDelay,
            }}
            className="w-full h-full relative"
          >
            {/* Transition container for rotation, scale and opacity */}
            <div
              className="relative w-full h-full transition-all duration-[800ms] ease-out"
              style={{
                transform: `rotate(${config.rotation}deg) scale(${show ? 1 : 0.9})`,
                opacity: show ? 1 : 0,
                transitionDelay: show ? config.fadeInDelay : "0ms",
              }}
            >
              {/* Image card with slim white Polaroid border padding */}
              <img
                src={config.src}
                alt={`Travel moment ${config.id}`}
                className="w-full h-auto bg-white p-1 md:p-1.5 rounded-[2px] shadow-md md:shadow-xl border border-black/5 pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
