"use client";

import { useEffect, useRef, useState } from "react";
import TileNavbar from "../TileNavbar";
import { MapPin, ChevronDown } from "lucide-react";

// Adjust these to match your actual frame range in /public/HeroSectionLoading
const FRAME_START = 2;
const FRAME_END = 28;
const FRAME_PATH = (n: number) => `/HeroSectionLoading/${n}.webp`;

// How long the whole intro animation should take (ms)
const ANIMATION_DURATION = 1800;

interface HomeHeroProps {
    onAnimationComplete?: () => void;
}

export default function HomeHero({ onAnimationComplete }: HomeHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const frameCount = FRAME_END - FRAME_START + 1;

    // Preload all frames
    useEffect(() => {
        let cancelled = false;
        const loadedImages: HTMLImageElement[] = new Array(frameCount);
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new window.Image();
            img.src = FRAME_PATH(FRAME_START + i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount && !cancelled) {
                    setImagesLoaded(true);
                }
            };
            loadedImages[i] = img;
        }

        imagesRef.current = loadedImages;

        return () => {
            cancelled = true;
        };
    }, [frameCount]);

    // Draw a given frame index onto the canvas, covering it like object-fit: cover
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];
        if (!canvas || !img || !img.complete) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth: number;
        let drawHeight: number;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
        } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Handle canvas resizing (keep it crisp on all screens / DPR)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = window.devicePixelRatio || 1;
            const { width, height } = parent.getBoundingClientRect();

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);

            // redraw current frame after resize
            drawFrame(currentFrameIndexRef.current);
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentFrameIndexRef = useRef(0);

    // Run the intro animation once images are ready
    useEffect(() => {
        if (!imagesLoaded) return;

        let rafId: number;
        const startTime = performance.now();

        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

            const frameIndex = Math.min(
                Math.floor(progress * frameCount),
                frameCount - 1
            );

            if (frameIndex !== currentFrameIndexRef.current || elapsed === 0) {
                currentFrameIndexRef.current = frameIndex;
                drawFrame(frameIndex);
            }

            if (progress < 1) {
                rafId = requestAnimationFrame(step);
            } else {
                setAnimationFinished(true);
                onAnimationComplete?.();
            }
        };

        // draw first frame immediately, then animate
        drawFrame(0);
        rafId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(rafId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesLoaded]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            {/* Floating Navbar - Fades in smoothly after canvas animation completes */}
            <div
                className={`absolute top-0 left-0 right-0 z-50 transition-all duration-700 ease-out transform ${animationFinished
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <TileNavbar />
            </div>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
            />

            {/* Hero Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF6B4A] text-xs md:text-sm font-bold uppercase tracking-wider mb-4 animate-in fade-in duration-700">
          <MapPin className="w-4 h-4 text-[#FF6B4A]" />
          Curated Group Trips For Travelers
        </div> */}

                <h1
                    className="text-white text-5xl md:text-9xl leading-none tracking-tight font-extrabold"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    plan{" "}
                    <span
                        className="italic font-serif font-bold "
                        style={{ fontWeight: 700 }}
                    >
                        togo.
                    </span>
                </h1>

                <p className="mt-4 text-white/90 text-xs md:text-lg max-w-xl font-medium">
                    Seek New Horizons. Plan Your Journey.
                </p>

                {/* Floating Pill Chip: Scroll To Begin */}
                {/* <a
                    href="#story-statement"
                    className="absolute bottom-10 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition active:scale-95 shadow-lg animate-bounce"
                >
                    <MapPin className="w-4 h-4 text-[#FF6B4A]" />
                    <span>Scroll to begin your journey</span>
                    <ChevronDown className="w-4 h-4" />
                </a> */}
            </div>
        </section>
    );
}