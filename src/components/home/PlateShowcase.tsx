"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PlateSlide {
  id: string;
  number: string;
  title: string;
  plateImage: string;
}

const PLATE_SLIDES: PlateSlide[] = [
  {
    id: "plate-01",
    number: "01",
    title: "Artisan Brie & Roasted Pistachio Slate",
    plateImage: "/images/plate-slider/plate-hd-1.png",
  },
  {
    id: "plate-02",
    number: "02",
    title: "Smoked Salmon, Avocado & Trout Roe Tartines",
    plateImage: "/images/plate-slider/plate-hd-2.png",
  },
  {
    id: "plate-03",
    number: "03",
    title: "Tricolor Quinoa & Sliced Avocado Timbale",
    plateImage: "/images/plate-slider/plate-hd-3.png",
  },
  {
    id: "plate-04",
    number: "04",
    title: "Torched Meringue, Dark Chocolate Spiral & Berries",
    plateImage: "/images/plate-slider/plate-hd-4.png",
  },
];

export default function PlateShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(3);

  const handleNext = useCallback(() => {
    setActiveIndex((curr) => {
      setPrevIndex(curr);
      return (curr + 1) % PLATE_SLIDES.length;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 2500);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section
      className="relative w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden select-none"
      aria-label="Chef Anand Kumar Latest Work Plate Showcase"
    >
      {/* Curved-Edge Card Container */}
      <div
        onClick={handleNext}
        className="relative w-full max-w-[1260px] mx-auto rounded-[24px] sm:rounded-[34px] lg:rounded-[42px] overflow-hidden shadow-[0_24px_65px_rgba(0,0,0,0.13)] ring-1 ring-black/[0.06] bg-[#DFDCD8] cursor-pointer"
      >
        {/* Clean 1536x780 Stage (Bottom Thumbnails Removed) */}
        <div className="relative w-full aspect-[1536/780] overflow-hidden bg-[#DFDCD8]">
          {/* Clean HD Background */}
          <Image
            src="/images/plate-slider/slide-v4-bg.jpg"
            alt="Chef Anand Kumar Latest Work Showcase"
            fill
            priority
            quality={98}
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1260px"
            className="object-cover"
          />

          {/* Always-Mounted GPU-Accelerated HD Plate Layer (Never Gets Stuck) */}
          <div className="absolute left-[3.2552%] top-[1.2821%] w-[52.0833%] h-[96.1538%] z-20 pointer-events-none">
            {PLATE_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              const isExiting = idx === prevIndex && idx !== activeIndex;

              let transformStyle =
                "translate3d(-115%, -18%, 0) rotate(-16deg) scale(0.86)";
              if (isActive) {
                transformStyle =
                  "translate3d(0%, 0%, 0) rotate(0deg) scale(1)";
              } else if (isExiting) {
                transformStyle =
                  "translate3d(-115%, 20%, 0) rotate(14deg) scale(0.86)";
              }

              return (
                <div
                  key={slide.id}
                  style={{
                    transform: transformStyle,
                    opacity: isActive ? 1 : 0,
                    transition:
                      isActive || isExiting
                        ? "transform 780ms cubic-bezier(0.22, 1, 0.36, 1), opacity 620ms ease-out"
                        : "none",
                  }}
                  className="absolute inset-0 w-full h-full will-change-[transform,opacity]"
                >
                  <Image
                    src={slide.plateImage}
                    alt={slide.title}
                    fill
                    priority
                    quality={98}
                    unoptimized
                    sizes="(max-width: 1280px) 52vw, 660px"
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
