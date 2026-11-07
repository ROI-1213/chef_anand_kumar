"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { servicesData } from "@/lib/content";
import SectionReveal from "../motion/SectionReveal";
import MagneticButton from "../motion/MagneticButton";

const SERVICE_IMAGES: Record<string, string> = {
  "fork-theory": "/images/original/fullwidth/model4.jpg",
  "cuisine": "/images/original/portfolio/signature1.jpg",
  "kitchen-designing": "/images/original/fullwidth/modele.jpg",
  "restaurant-designing": "/images/original/fullwidth/modelh.jpg",
  "equipment-procurement": "/images/original/fullwidth/modelt.jpg",
  "team-training": "/images/original/fullwidth/modelm.jpg",
  "hiring": "/images/original/portfolio/travel1.jpg",
  "menu-planning": "/images/original/portfolio/food2.jpg",
};

export default function Expertise() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("fork-theory");

  const currentIndex = servicesData.findIndex((s) => s.id === selectedServiceId);
  const currentService = servicesData[currentIndex] || servicesData[0];
  const currentImage = SERVICE_IMAGES[currentService.id] || "/images/original/fullwidth/model4.jpg";

  return (
    <section className="py-24 sm:py-32 bg-obsidian text-ivory relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <SectionReveal direction="up">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-gold/30 bg-gold/5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
                Hospitality & Culinary Advisory
              </span>
            </div>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.1}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory-light font-light uppercase tracking-tight">
              Expertise That Goes <br />
              <span className="italic text-gold font-normal">Beyond The Kitchen</span>
            </h2>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-ivory/70 leading-relaxed font-light">
              Through ForkTheory and executive advisory services, Chef Anand Kumar translates decades of international five-star hospitality leadership into high-performing, profitable culinary ventures.
            </p>
          </SectionReveal>
        </div>

        {/* Master Editorial Split: Interactive Selector on Left, Animated Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Numbered Service List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {servicesData.map((service, index) => {
              const isSelected = service.id === selectedServiceId;
              const num = String(index + 1).padStart(2, "0");

              return (
                <motion.button
                  key={service.id}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  onClick={() => setSelectedServiceId(service.id)}
                  data-cursor="SELECT"
                  className={`w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-300 flex items-center justify-between group border relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-r from-gold/15 via-white/[0.04] to-transparent border-gold text-gold shadow-[0_8px_30px_rgba(200,167,107,0.12)]"
                      : "bg-white/[0.015] border-white/10 text-ivory/60 hover:text-ivory hover:border-gold/40"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeServicePillarBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gold shadow-[0_0_12px_#C8A76B]"
                    />
                  )}

                  <div className="flex items-center gap-4 pl-1">
                    <span className={`font-sans text-xs tracking-widest ${isSelected ? "text-gold font-bold" : "text-ivory/40"}`}>
                      {num}
                    </span>
                    <span className={`font-serif text-xl sm:text-2xl tracking-wide transition-colors ${isSelected ? "text-white font-medium" : "text-ivory/80"}`}>
                      {service.title}
                    </span>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isSelected ? "rotate-90 text-gold" : "text-white/25 group-hover:translate-x-1 group-hover:text-gold"}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Animated Editorial Showcase Panel (7 cols) */}
          <div className="lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-obsidian-100/90 backdrop-blur-xl border border-gold/25 rounded-2xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] space-y-8 relative overflow-hidden"
              >
                {/* Supporting Authentic Image */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 group">
                  <Image
                    src={currentImage}
                    alt={`Chef Anand Kumar — ${currentService.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
                  <div className="absolute top-4 left-4 bg-obsidian/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/40 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                    <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold">
                      Pillar 0{currentIndex + 1} of 0{servicesData.length}
                    </span>
                  </div>
                </div>

                {/* Service Title & Full Original Narrative */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                    <h3 className="font-serif text-3xl sm:text-4xl text-ivory-light font-light uppercase">
                      {currentService.title}
                    </h3>
                    <span className="font-sans text-xs tracking-widest text-gold uppercase font-medium">
                      ForkTheory Advisory
                    </span>
                  </div>

                  <p className="font-sans text-base sm:text-lg text-ivory/85 leading-relaxed font-light">
                    {currentService.description}
                  </p>
                </div>

                {/* Key Deliverables Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 border-t border-white/10 text-xs sm:text-sm text-ivory/80 font-sans">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Strategic Concept Alignment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Operational & Cost Optimization</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Five-Star Quality Standards</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Long-term Scalable Growth</span>
                  </div>
                </div>

                {/* CTA button */}
                <div className="pt-2">
                  <MagneticButton href="/contact">
                    <span
                      data-cursor="CONSULT"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_25px_rgba(200,167,107,0.45)] transition-all"
                    >
                      <span>Consult on {currentService.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
