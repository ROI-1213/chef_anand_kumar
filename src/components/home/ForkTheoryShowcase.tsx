"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface ForkTheoryCardItem {
  id: string;
  subtitle: string;
  title: string;
  peekLabel: string;
  description: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

export const FORK_THEORY_CARDS: ForkTheoryCardItem[] = [
  {
    id: "card-1",
    subtitle: "ABOUT US",
    title: "FORK THEORY",
    peekLabel: "FORK THEORY",
    description:
      "ForkTheory is a strategy-led restaurant consultancy that transforms culinary ideas into high-performing, scalable food businesses. We specialize in concept development, menu engineering, kitchen systems, operational excellence, staff training, and growth strategy — combining creativity with data, discipline with design, and passion with performance. From startups to multi-unit brands, ForkTheory builds restaurants that launch stronger, operate smarter, and scale sustainably while delivering exceptional guest experiences and measurable financial results.",
    image: "/images/fork-theory-slider/ft-card-1.jpg",
    ctaText: "Learn More",
    ctaHref: "/contact",
  },
  {
    id: "card-2",
    subtitle: "OUR APPROACH",
    title: "Cuisine",
    peekLabel: "CUISINE",
    description:
      "That sounds like an exciting and diverse concept for a restaurant! To create a menu that aligns with market needs and the restaurant's theme, we can start by conducting thorough market research to understand the preferences of potential customers. Based on this research, we can develop a menu that offers a mix of European, Asian, Oriental, and regional cuisines to cater to a wide range of tastes.",
    image: "/images/fork-theory-slider/ft-card-2.jpg",
    ctaText: "Learn More",
    ctaHref: "/portfolio",
  },
  {
    id: "card-3",
    subtitle: "INFRASTRUCTURE",
    title: "Kitchen designing",
    peekLabel: "KITCHEN DESIGNING",
    description:
      "Creating an efficient and cost-effective kitchen layout tailored to the restaurant's concept and cuisine is crucial for maximizing productivity and maintaining quality standards, especially in a small space. Here are some key considerations for designing a process-friendly kitchen layout:\n\nAreas - Workflow Optimization, Station Organization, Space Utilization, Ventilation and Safety, Equipment Selection, Sanitation and Hygiene\n\nBy customizing the kitchen layout to align with the restaurant's concept and cuisine, we can create an optimized workspace that enhances efficiency, reduces costs, and ensures a seamless cooking process. Let's focus on incorporating these principles into the design to achieve a functional and effective kitchen within your space constraints.",
    image: "/images/fork-theory-slider/ft-card-3.jpg",
    ctaText: "Learn More",
    ctaHref: "/contact",
  },
  {
    id: "card-4",
    subtitle: "CONCEPT TO LAUNCH",
    title: "Restaurant designing",
    peekLabel: "RESTAURANT DESIGNING",
    description:
      "That's wonderful to hear! It sounds like you are delving deep into the creation process of your restaurant concept. Developing a clear and cohesive concept is key to establishing a distinct identity for your establishment. From the cuisine to be served, the type of food offered, serving style, packaging, and service rituals, each element plays a crucial role in shaping the overall experience for your guests.\n\nIf you need any assistance or guidance in brainstorming ideas, refining your concept, or mapping out the various elements of your concept, feel free to share more details or ask specific questions. I'm here to help you navigate through the creative process and bring your vision to life.",
    image: "/images/fork-theory-slider/ft-card-4.jpg",
    ctaText: "Learn More",
    ctaHref: "/contact",
  },
  {
    id: "card-5",
    subtitle: "PROCUREMENT",
    title: "Equipment procurement",
    peekLabel: "EQUIPMENT PROCUREMENT",
    description:
      "We will be offering a range of options for purchasing equipment, catering to different budget levels and quality preferences. Having access to a variety of suppliers can provide flexibility and ensure that you can find the right equipment to suit your needs and budget.\n\nIf you need any recommendations on specific types of equipment, guidance on evaluating different brands and models, or tips on negotiating competitive prices, please feel free to ask. I'm here to assist you in making informed decisions and finding the best equipment options for your back-of-house operations.",
    image: "/images/fork-theory-slider/ft-card-5.jpg",
    ctaText: "Learn More",
    ctaHref: "/contact",
  },
  {
    id: "card-6",
    subtitle: "CULINARY LEADERSHIP",
    title: "Team training",
    peekLabel: "TEAM TRAINING",
    description:
      "We plan a comprehensive training program for your team, tailored to the concept, cuisine, and skill level required. Offering three levels of training - Basic, Mid, and Advanced - is a great way to ensure that each team member receives the necessary skills and knowledge to excel in their roles.\n\nIf you need any assistance in developing training materials, curriculum planning, or guidance on effective training strategies, please don't hesitate to reach out. I'm here to support you in creating a successful and well-trained team for your establishment.",
    image: "/images/fork-theory-slider/ft-card-6.jpg",
    ctaText: "Learn More",
    ctaHref: "/contact",
  },
  {
    id: "card-7",
    subtitle: "TALENT ACQUISITION",
    title: "Hiring",
    peekLabel: "HIRING",
    description:
      "That sounds like a fantastic service you provide! Building a strong team is crucial for the success of any business, especially in the hospitality industry. Recommending candidates with experience in five-star hotels or luxury restaurants can truly elevate the level of service and expertise within a team. If there's anything specific you'd like assistance with or if you have any questions, feel free to let me know. I'm here to help!.",
    image: "/images/fork-theory-slider/ft-card-7.jpg",
    ctaText: "Learn More",
    ctaHref: "/contact",
  },
  {
    id: "card-8",
    subtitle: "BESPOKE CURATION",
    title: "Menu planning",
    peekLabel: "MENU PLANNING",
    description:
      "That sounds like a fantastic service you provide! Building a strong team is crucial for the success of any business, especially in the hospitality industry. Recommending candidates with experience in five-star hotels or luxury restaurants can truly elevate the level of service and expertise within a team. If there's anything specific you'd like assistance with or if you have any questions, feel free to let me know. I'm here to help!",
    image: "/images/fork-theory-slider/ft-card-8.jpg",
    ctaText: "Learn More",
    ctaHref: "/recipes",
  },
];

export default function ForkTheoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = FORK_THEORY_CARDS.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const prevCard = FORK_THEORY_CARDS[(activeIndex - 1 + total) % total];
  const currentCard = FORK_THEORY_CARDS[activeIndex];
  const nextCard = FORK_THEORY_CARDS[(activeIndex + 1) % total];

  return (
    <section
      className="relative w-full bg-[#FAF6F2] py-16 sm:py-24 px-3 sm:px-6 lg:px-10 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="ForkTheory Consultancy 8-Card Showcase"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Heading in Exact Uppercase + Gold Underline Format (Matching LATEST WORK) */}
        <div className="mb-12 sm:mb-16 flex flex-col items-center justify-center">
          <h2 className="text-center font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141414] uppercase tracking-[0.22em]">
            PROWESS
          </h2>
          <div className="h-[3px] w-24 sm:w-28 bg-[#DCA54C] mt-3 rounded-full" />
        </div>

        {/* Main 3-Column Stage: Left Peek Card + Center Split Card + Right Peek Card */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
          {/* Left Peek Card (Previous Slide) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`Previous: ${prevCard.title}`}
            className="hidden md:block relative w-[110px] lg:w-[138px] xl:w-[155px] h-[300px] lg:h-[345px] xl:h-[365px] rounded-[18px] overflow-hidden shrink-0 shadow-[0_12px_30px_rgba(0,0,0,0.12)] group cursor-pointer focus:outline-none"
          >
            <Image
              src={prevCard.image}
              alt={prevCard.title}
              fill
              unoptimized
              sizes="160px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute bottom-5 left-3.5 right-3 text-left">
              <span className="font-serif text-[13px] lg:text-[15px] leading-[1.25] tracking-[0.06em] uppercase text-white/95 block">
                {prevCard.peekLabel.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </span>
            </div>
          </button>

          {/* Center Featured Split Card Wrapper (with Overlapping Left/Right White Arrow Buttons) */}
          <div className="relative w-full max-w-[1040px] bg-white p-1.5 sm:p-2 rounded-[26px] sm:rounded-[30px] shadow-[0_24px_65px_rgba(0,0,0,0.10)]">
            {/* Overlapping Left Circular Arrow Button (←) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Card"
              className="absolute left-[-16px] sm:left-[-24px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.16)] flex items-center justify-center text-[#191A1C] hover:bg-[#FAF6F2] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>

            {/* Overlapping Right Circular Arrow Button (→) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Card"
              className="absolute right-[-16px] sm:right-[-24px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.16)] flex items-center justify-center text-[#191A1C] hover:bg-[#FAF6F2] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>

            {/* Inner Rounded Split Card (Left Image ~54% + Right Dark Panel ~46%) */}
            <div className="relative w-full min-h-[420px] sm:min-h-[470px] lg:min-h-[500px] rounded-[22px] sm:rounded-[24px] overflow-hidden bg-[#191A1C]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentCard.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-[420px] sm:min-h-[470px] lg:min-h-[500px]"
                >
                  {/* Left Half (~54% -> 6 cols on desktop): High-Res Food Photography */}
                  <div className="relative lg:col-span-6 min-h-[260px] sm:min-h-[320px] lg:h-full w-full overflow-hidden">
                    <Image
                      src={currentCard.image}
                      alt={currentCard.title}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>

                  {/* Right Half (~46% -> 6 cols on desktop): Dark Charcoal Content Panel */}
                  <div className="relative lg:col-span-6 bg-[#191A1C] px-7 sm:px-10 lg:px-11 py-8 sm:py-9 lg:py-10 flex flex-col justify-center text-left overflow-hidden">
                    {/* Subtle Plate & Fork Line-Art Watermark in Bottom-Right Corner */}
                    <svg
                      viewBox="0 0 220 180"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -bottom-6 -right-4 w-44 sm:w-52 h-auto text-white/[0.07] pointer-events-none"
                    >
                      <circle
                        cx="95"
                        cy="145"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="95"
                        cy="145"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M148 165 L188 68 M188 68 L178 44 M188 68 L188 41 M188 68 L198 44 M175 62 C180 72, 194 72, 200 62"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Small Uppercase Gold Subtitle + Gold Line */}
                    <div className="flex items-center gap-3.5 mb-2.5">
                      <span className="font-serif text-sm sm:text-[15px] tracking-[0.14em] uppercase text-[#C99B3B]">
                        {currentCard.subtitle}
                      </span>
                      <span className="w-12 sm:w-14 h-[1px] bg-[#C99B3B]/75" />
                    </div>

                    {/* Large Uppercase White Serif Title */}
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white uppercase tracking-[0.05em] font-normal leading-[1.12] mb-4 sm:mb-5">
                      {currentCard.title}
                    </h2>

                    {/* Supporting Description Paragraph */}
                    <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#D2D2D2] leading-[1.68] font-light max-w-[460px] mb-6 sm:mb-7 whitespace-pre-line">
                      {currentCard.description}
                    </p>

                    {/* Warm Gold Rounded Pill Button: "Learn More →" */}
                    <div className="relative z-10">
                      <Link
                        href={currentCard.ctaHref}
                        className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#D5A748] hover:bg-[#E0B456] text-[#171412] font-sans text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_20px_rgba(213,167,72,0.28)]"
                      >
                        <span>{currentCard.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Peek Card (Next Slide) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={`Next: ${nextCard.title}`}
            className="hidden md:block relative w-[110px] lg:w-[138px] xl:w-[155px] h-[300px] lg:h-[345px] xl:h-[365px] rounded-[18px] overflow-hidden shrink-0 shadow-[0_12px_30px_rgba(0,0,0,0.12)] group cursor-pointer focus:outline-none"
          >
            <Image
              src={nextCard.image}
              alt={nextCard.title}
              fill
              unoptimized
              sizes="160px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute bottom-5 left-3.5 right-3 text-left">
              <span className="font-serif text-[13px] lg:text-[15px] leading-[1.25] tracking-[0.06em] uppercase text-white/95 block">
                {nextCard.peekLabel.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Pagination Dots for All 8 Cards */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2.5">
          {FORK_THEORY_CARDS.map((card, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={`ft-dot-${card.id}`}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to card ${idx + 1}: ${card.title}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive
                    ? "bg-[#C89B3C] scale-110"
                    : "bg-[#D9D4CE] hover:bg-[#C89B3C]/50"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
