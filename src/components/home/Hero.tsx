"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MENU_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "RECIPES", href: "/recipes" },
  { label: "VIDEO ARCHIVE", href: "/video-archive" },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasTransitioned, setHasTransitioned] = useState(false);

  const goToSlide = useCallback((nextIdx: number) => {
    setHasTransitioned(true);
    setActiveSlide(nextIdx);
  }, []);

  useEffect(() => {
    // Preload Hero Slides 2 & 3 right after initial paint so banner transitions are instant
    const preloadTimer = setTimeout(() => {
      ["/images/hero-slider/hero-hd-2.jpg", "/images/hero-slider/hero-hd-3.jpg"].forEach(
        (src) => {
          const img = new window.Image();
          img.src = src;
        }
      );
    }, 300);

    const timer = setInterval(() => {
      setHasTransitioned(true);
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4500);
    return () => {
      clearTimeout(preloadTimer);
      clearInterval(timer);
    };
  }, []);

  // Determine exact opposite-direction horizontal slide vectors per banner:
  // - Slide 0 (1st banner): Static on initial load (and when activeSlide === 0 before transition)
  // - Slide 1 (2nd banner): Image moves to LEFT (from right: +380 -> 0), Text moves to RIGHT (from left: -380 -> 0)
  // - Slide 2 (3rd banner): Image moves to RIGHT (from left: -380 -> 0), Text moves to LEFT (from right: +380 -> 0)
  const isFirstStatic = activeSlide === 0 && !hasTransitioned;

  const getImageVariants = (slideIdx: number) => {
    if (slideIdx === 0 && !hasTransitioned) {
      return {
        initial: { x: 0, opacity: 1 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -320, opacity: 0 },
      };
    }
    if (slideIdx === 1) {
      // Moving to Banner 2: Image moves to LEFT (from right to left)
      return {
        initial: { x: 420, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 360, opacity: 0 },
      };
    }
    if (slideIdx === 2) {
      // Moving to Banner 3: Image moves to RIGHT (from left to right)
      return {
        initial: { x: -420, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -360, opacity: 0 },
      };
    }
    // Returning to Banner 1
    return {
      initial: { x: 0, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -320, opacity: 0 },
    };
  };

  const getTextVariants = (slideIdx: number) => {
    if (slideIdx === 0 && !hasTransitioned) {
      return {
        initial: { x: 0, opacity: 1 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 320, opacity: 0 },
      };
    }
    if (slideIdx === 1) {
      // Moving to Banner 2: Text moves to RIGHT (from left to right)
      return {
        initial: { x: -420, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -360, opacity: 0 },
      };
    }
    if (slideIdx === 2) {
      // Moving to Banner 3: Text moves to LEFT (from right to left)
      return {
        initial: { x: 420, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 360, opacity: 0 },
      };
    }
    // Returning to Banner 1
    return {
      initial: { x: 0, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 320, opacity: 0 },
    };
  };

  const imageVariants = getImageVariants(activeSlide);
  const textVariants = getTextVariants(activeSlide);

  return (
    <section
      className="relative w-full bg-[#050505] overflow-hidden select-none"
      aria-label="Executive Chef Anand Kumar Hero Showcase"
    >
      {/* Full-Width 16:9 HD Stage */}
      <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:aspect-[16/9] lg:max-h-[100vh] flex items-center bg-[#050505] overflow-hidden">
        {/* 2K HD Animated Image Layer */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`hero-img-${activeSlide}`}
            variants={imageVariants}
            initial={isFirstStatic ? false : "initial"}
            animate="animate"
            exit="exit"
            transition={{
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 z-0 pointer-events-none will-change-[transform,opacity]"
          >
            <Image
              src={`/images/hero-slider/hero-hd-${activeSlide + 1}.jpg`}
              alt={`Executive Chef Anand Kumar Banner ${activeSlide + 1}`}
              fill
              priority
              quality={100}
              unoptimized
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated Opposite-Direction Typography Layer */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-0">
          <AnimatePresence mode="wait" initial={false}>
            {activeSlide === 0 && (
              <motion.div
                key="hero-text-0"
                variants={textVariants}
                initial={isFirstStatic ? false : "initial"}
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full lg:w-[54%] flex flex-col items-start text-left"
              >
                {/* Eyebrow: Gold Line + EXECUTIVE CHEF */}
                <div className="flex items-center gap-4 mb-4 sm:mb-5">
                  <span className="w-10 sm:w-12 h-[2px] bg-[#D5A753]" />
                  <span className="font-sans text-xs sm:text-sm tracking-[0.34em] text-white/90 uppercase font-medium">
                    EXECUTIVE CHEF
                  </span>
                </div>

                {/* Main Title: Anand Kumar */}
                <h1 className="font-sans text-4xl sm:text-6xl lg:text-[72px] font-semibold tracking-tight leading-[1.06]">
                  <span className="text-white">Anand </span>
                  <span className="text-[#DFB668]">Kumar</span>
                </h1>

                {/* Subtitle: CHEF • CREATOR • CONSULTANT */}
                <p className="font-sans text-xs sm:text-sm lg:text-[15px] tracking-[0.3em] text-white/85 uppercase mt-4 sm:mt-5 font-normal">
                  CHEF &nbsp;&bull;&nbsp; CREATOR &nbsp;&bull;&nbsp; CONSULTANT
                </p>

                {/* Rectangular Gold-Bordered EXPLORE Button */}
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-5 mt-8 sm:mt-11 px-7 sm:px-9 py-3.5 sm:py-4 border border-[#C89D4C] bg-black/30 hover:bg-[#C89D4C] text-white hover:text-[#080808] font-sans text-xs sm:text-sm tracking-[0.26em] uppercase font-medium transition-all duration-300"
                >
                  <span>EXPLORE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            )}

            {activeSlide === 1 && (
              <motion.div
                key="hero-text-1"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full lg:w-[54%] lg:ml-auto flex flex-col items-start text-left"
              >
                {/* Heading: Executive (Silver) + Chef (Bold White) */}
                <h2 className="font-sans text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.08]">
                  <span className="text-[#B4B4B4]">Executive </span>
                  <span className="text-white">Chef</span>
                </h2>

                {/* Underlined Link: EXPLORE PORTFOLIO -> */}
                <Link
                  href="/portfolio"
                  className="group inline-flex flex-col items-start mt-7 sm:mt-9"
                >
                  <span className="inline-flex items-center gap-5 font-sans text-sm sm:text-lg lg:text-[21px] tracking-[0.28em] text-white group-hover:text-[#DFB668] uppercase font-normal transition-colors pb-3">
                    <span>EXPLORE PORTFOLIO</span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-[#DFB668] group-hover:translate-x-1.5 transition-all duration-300" />
                  </span>
                  <span className="w-[88%] h-[1.5px] bg-white/80 group-hover:bg-[#DFB668] transition-colors duration-300" />
                </Link>
              </motion.div>
            )}

            {activeSlide === 2 && (
              <motion.div
                key="hero-text-2"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full lg:w-[46%] flex items-stretch text-left"
              >
                {/* Left Vertical Line with Gold Top Accent */}
                <div className="relative w-[2px] bg-white/20 mr-8 sm:mr-12 shrink-0">
                  <div className="absolute top-0 left-0 w-full h-14 bg-[#D5A753]" />
                </div>

                {/* 4 Interactive Navigation Rows */}
                <div className="flex-1 flex flex-col justify-between py-1 space-y-5 sm:space-y-6">
                  {MENU_LINKS.map((item, idx) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group flex items-center justify-between pb-4 sm:pb-5 ${
                        idx < MENU_LINKS.length - 1
                          ? "border-b border-white/15"
                          : ""
                      }`}
                    >
                      <span className="font-sans text-lg sm:text-xl lg:text-[24px] tracking-[0.28em] text-white/95 group-hover:text-[#DFB668] uppercase font-light transition-colors duration-300">
                        {item.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-white/80 group-hover:text-[#DFB668] group-hover:translate-x-1.5 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle Bottom Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {[0, 1, 2].map((idx) => {
            const isActive = idx === activeSlide;
            return (
              <button
                key={`hero-dot-${idx}`}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to hero banner ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive
                    ? "w-9 bg-[#DFB668]"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
