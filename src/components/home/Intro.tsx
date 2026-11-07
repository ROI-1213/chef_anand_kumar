"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionReveal from "../motion/SectionReveal";

interface ChefSlide {
  id: string;
  baseSrc: string;
  fgSrc: string;
  alt: string;
}

const CHEF_SLIDES: ChefSlide[] = [
  {
    id: "chef-slide-1",
    baseSrc: "/images/about-chef-hd-1.png",
    fgSrc: "/images/about-chef-fg-1.png",
    alt: "Executive Chef Anand Kumar — Culinary Mastery",
  },
  {
    id: "chef-slide-2",
    baseSrc: "/images/about-chef-hd-2.png",
    fgSrc: "/images/about-chef-fg-2.png",
    alt: "Executive Chef Anand Kumar — Hospitality Leadership",
  },
  {
    id: "chef-slide-3",
    baseSrc: "/images/about-chef-hd-3.png",
    fgSrc: "/images/about-chef-fg-3.png",
    alt: "Executive Chef Anand Kumar — Global Gastronomy",
  },
];

export default function Intro() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CHEF_SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = CHEF_SLIDES[activeSlide];

  return (
    <section
      id="philosophy"
      className="relative w-full bg-white pt-10 sm:pt-14 pb-4 px-4 sm:px-8 lg:px-12"
    >
      {/* Marked Box Size Container with Curved Edges */}
      <div className="relative max-w-[1220px] mx-auto rounded-[28px] sm:rounded-[38px] bg-[#0B0B0A] text-white overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.28)] ring-1 ring-black/10">
        
        {/* Subtle Ambient Warm Glow Behind the Right Chef Portrait */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#DCA54C]/12 blur-[130px] rounded-full pointer-events-none" />

        <div className="px-6 sm:px-12 lg:px-16 pt-8 sm:pt-10 lg:pt-12 pb-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Column: Exact "About Me" Typography & Button (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 pb-8 sm:pb-10 lg:pb-12">
              
              {/* "About Me" Heading + Gold Underline Bar */}
              <SectionReveal direction="up">
                <div>
                  <h2 className="font-sans text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight leading-none">
                    <span className="text-white">About </span>
                    <span className="text-[#DCA54C]">Me</span>
                  </h2>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 110 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="h-[3px] bg-[#DCA54C] mt-3.5"
                  />
                </div>
              </SectionReveal>

              {/* Subheading with Thick Vertical Gold Bar on Left */}
              <SectionReveal direction="up" delay={0.15}>
                <div className="flex items-stretch gap-4 pt-0.5">
                  <span className="w-[5px] bg-[#DCA54C] shrink-0 rounded-xs" />
                  <h3 className="font-sans text-base sm:text-lg md:text-[21px] font-bold text-white leading-[1.35] tracking-tight">
                    Anand Kumar: A Culinary Journey of Passion, <br className="hidden sm:inline" />
                    Leadership, and Global Excellence
                  </h3>
                </div>
              </SectionReveal>

              {/* Body Paragraph */}
              <SectionReveal direction="up" delay={0.25}>
                <p className="font-sans text-xs sm:text-sm md:text-[15.5px] text-white/90 leading-[1.75] font-normal max-w-2xl">
                  Every chef has a story, but some journeys are defined not only by
                  the dishes they create but by the lives they inspire, the teams
                  they build, and the cultures they embrace. My journey in the
                  culinary world is one such story—a journey that began with a
                  dream and evolved into a lifelong pursuit of excellence. Born
                  with a passion for food and hospitality, I laid the foundation of
                  my career at the prestigious Institute of Hotel Management,
                  Catering Technology &amp; Applied Nutrition in Kolkata.
                </p>
              </SectionReveal>

              {/* "VIEW PERSONAL BLOG" Button Matching Exact Reference Design */}
              <SectionReveal direction="up" delay={0.35}>
                <div className="pt-1">
                  <Link
                    href="https://blog.chefanandkumar.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="BLOG"
                    className="group inline-flex items-stretch rounded-xl border-[1.5px] border-[#DCA54C] bg-[#0B0B0A] overflow-hidden shadow-[0_6px_25px_rgba(220,165,76,0.18)] hover:shadow-[0_8px_35px_rgba(220,165,76,0.38)] transition-all duration-300"
                  >
                    <span className="px-6 sm:px-7 py-3 font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-white group-hover:text-[#DCA54C] transition-colors flex items-center">
                      VIEW PERSONAL BLOG
                    </span>
                    <span className="px-4 sm:px-5 bg-[#DCA54C] text-[#0B0B0A] flex items-center justify-center group-hover:bg-[#ebba63] transition-colors">
                      <ArrowRight className="w-5 h-5 stroke-[2.2] group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                </div>
              </SectionReveal>

            </div>

            {/* Right Column: Sequential HD Chef Portraits with Animated Spinning Golden Back Circle (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end self-end">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[440/523] select-none">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Layer 1 (Base): HD Chef Portrait + Brushed Gold Back Circle */}
                    <Image
                      src={currentSlide.baseSrc}
                      alt={currentSlide.alt}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 1024px) 85vw, 420px"
                      className="object-contain object-bottom z-10"
                    />

                    {/* Layer 2 (Middle - Behind Chef, Over the Ring): Animated Spinning Golden Circle & Comet Arcs */}
                    <div
                      style={{
                        left: "50%",
                        top: "47.6%",
                        width: "78%",
                        height: "65.5%",
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute z-20 pointer-events-none flex items-center justify-center"
                    >
                      {/* Pulsing Golden Halo Glow */}
                      <motion.div
                        animate={{
                          scale: [0.98, 1.04, 0.98],
                          opacity: [0.35, 0.75, 0.35],
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border-2 border-[#DCA54C]/55 shadow-[0_0_35px_rgba(220,165,76,0.55),inset_0_0_25px_rgba(220,165,76,0.35)]"
                      />

                      {/* Clockwise Spinning Brushed-Gold Comet Ring */}
                      <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                        viewBox="0 0 200 200"
                        className="w-full h-full overflow-visible"
                      >
                        <defs>
                          <linearGradient id="goldSweep1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFF3D1" stopOpacity="1" />
                            <stop offset="45%" stopColor="#DCA54C" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#DCA54C" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="100"
                          cy="100"
                          r="98"
                          fill="none"
                          stroke="url(#goldSweep1)"
                          strokeWidth="3.2"
                          strokeDasharray="190 420"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="100"
                          cy="2"
                          r="3.5"
                          fill="#FFF7E0"
                          className="drop-shadow-[0_0_8px_#DCA54C]"
                        />
                      </motion.svg>

                      {/* Counter-Clockwise Inner Fine Golden Ring */}
                      <motion.svg
                        animate={{ rotate: -360 }}
                        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                        viewBox="0 0 200 200"
                        className="absolute inset-[3%] w-[94%] h-[94%] overflow-visible"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="96"
                          fill="none"
                          stroke="#FFE09E"
                          strokeWidth="1.4"
                          strokeDasharray="110 200"
                          strokeOpacity="0.75"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </div>

                    {/* Layer 3 (Top Foreground Mask — 100% Pixel-Identical to Layer 1): Chef Anand overlapping IN FRONT of the Animated Circle */}
                    <Image
                      src={currentSlide.fgSrc}
                      alt=""
                      aria-hidden="true"
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 1024px) 85vw, 420px"
                      className="object-contain object-bottom z-30 pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Slide Indicator Dots at Bottom-Right */}
                <div className="absolute bottom-3 right-3 z-40 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[#DCA54C]/30">
                  {CHEF_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`View portrait ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeSlide === idx
                          ? "w-5 bg-[#DCA54C]"
                          : "w-1.5 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
