"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ReverseTransition() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameCount = 27;
  const currentFrameIndexRef = useRef(frameCount - 1);

  // Preload reverseSection frames
  useEffect(() => {
    let cancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `/reverseSection/${i + 2}.webp`;
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

    // Rotate 180 degrees (upside down) to make the transition face downwards
    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate(Math.PI);
    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  };

  // Handle canvas resizing
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

      drawFrame(currentFrameIndexRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [imagesLoaded]);

  // Set up ScrollTrigger frame scrub
  useEffect(() => {
    if (!imagesLoaded) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const airplay = { frame: frameCount - 1 };
    const tween = gsap.to(airplay, {
      frame: 0,
      ease: "power1.in", // starts slowly to delay the first 5 frames, then accelerates
      scrollTrigger: {
        trigger: wrapper,
        start: "top 50%",
        end: "top top",
        scrub: 0.6,
        onUpdate: () => {
          const index = Math.min(
            Math.max(Math.round(airplay.frame), 0),
            frameCount - 1
          );
          if (index !== currentFrameIndexRef.current) {
            currentFrameIndexRef.current = index;
            drawFrame(index);
          }
        }
      }
    });

    return () => {
      tween.kill();
    };
  }, [imagesLoaded]);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-[70vh] overflow-hidden bg-white"
    >
      {/* Background canvas playing reverse transition (rotated 180deg) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover pointer-events-none"
      />
    </section>
  );
}
