"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, MapPin, Building2, Sparkles } from "lucide-react";
import { careerData } from "@/lib/content";
import SectionReveal from "../motion/SectionReveal";
import MagneticButton from "../motion/MagneticButton";

export default function CareerPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 70%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  const featuredMilestones = [
    careerData[0], // IHM Kolkata
    careerData[1], // JW Marriott Mumbai (2002)
    careerData[3], // Hyatt Hyderabad (First Exec Chef 2014)
    careerData[5], // VARU by Atmosphere Maldives
    careerData[6], // Emerald Zanzibar
    careerData[9], // Melia Desert Palm Dubai
    careerData[10], // The George Hotel Lagos Nigeria
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <SectionReveal direction="up">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-gold-dark/30 bg-gold/10">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span className="font-sans text-xs tracking-mega text-gold-dark uppercase font-semibold">
                International Trajectory
              </span>
            </div>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.1}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-obsidian font-light leading-tight">
              A Journey Across <br />
              <span className="italic text-gold-dark font-normal">Continents & Cultures</span>
            </h2>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-espresso/80 leading-relaxed font-normal">
              From classical culinary foundations in Kolkata and Mumbai to directing luxury island resorts in the Maldives and Zanzibar, bespoke wilderness retreats in Tanzania, equestrian estates in Dubai, and executive luxury at The George Hotel in Lagos.
            </p>
          </SectionReveal>
        </div>

        {/* Scroll-Animated Golden Timeline Beam */}
        <div ref={containerRef} className="relative ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-10">
          {/* Background Static Track */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-obsidian/10 rounded-full" />
          {/* Scroll-Driven Glowing Gold Beam */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-2 bottom-2 w-[2.5px] bg-gradient-to-b from-gold-dark via-gold to-gold-light origin-top rounded-full shadow-[0_0_12px_rgba(200,167,107,0.8)]"
          />

          {featuredMilestones.map((milestone, idx) => (
            <SectionReveal key={idx} direction="up" delay={idx * 0.06}>
              <motion.div
                whileHover={{ y: -4, x: 4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="relative group"
              >
                {/* Gold Marker Node */}
                <div className="absolute -left-[31px] sm:-left-[55px] top-6 w-4 h-4 rounded-full bg-ivory border-2 border-gold-dark group-hover:bg-gold group-hover:scale-150 transition-all duration-300 shadow-[0_0_0_5px_rgba(246,241,232,1)]" />

                <div className="bg-white/80 hover:bg-white transition-all duration-300 p-6 sm:p-8 rounded-2xl border border-obsidian/10 hover:border-gold shadow-[0_10px_35px_rgba(16,16,15,0.05)] hover:shadow-[0_20px_50px_rgba(200,167,107,0.18)] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold/15 font-sans text-[11px] font-bold text-gold-dark tracking-widest uppercase">
                      {milestone.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-espresso/70">
                      <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{milestone.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal group-hover:text-gold-dark transition-colors">
                    {milestone.role}
                  </h3>

                  <div className="flex items-center gap-2 font-sans text-sm font-semibold text-espresso">
                    <Building2 className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>{milestone.organization}</span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-espresso/80 leading-relaxed font-normal pt-1">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA to Full Timeline */}
        <div className="mt-16 text-center">
          <SectionReveal direction="up">
            <MagneticButton href="/about">
              <span
                data-cursor="TIMELINE"
                className="inline-flex items-center gap-3 px-9 py-4 bg-obsidian text-ivory-light rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-obsidian transition-all duration-300 shadow-2xl"
              >
                <span>View Complete Career Biography</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticButton>
          </SectionReveal>
        </div>

      </div>
    </section>
  );
}
