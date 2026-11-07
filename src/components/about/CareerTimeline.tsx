"use client";

import { Building2, MapPin, Calendar, Award } from "lucide-react";
import { careerData } from "@/lib/content";
import SectionReveal from "../motion/SectionReveal";

export default function CareerTimeline() {
  return (
    <section id="timeline" className="py-20 sm:py-28 bg-obsidian text-ivory relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <SectionReveal direction="up">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
                Professional Milestones
              </span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-light font-light uppercase tracking-tight">
              Career <span className="italic text-gold font-normal">Progression</span>
            </h2>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.2}>
            <p className="font-sans text-base text-ivory/70 max-w-xl mx-auto font-light leading-relaxed">
              Two decades of culinary leadership, pre-opening hotel launches, brigade mentorship, and five-star luxury directorship across five global regions.
            </p>
          </SectionReveal>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-gold/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {careerData.map((milestone, idx) => (
            <SectionReveal key={idx} direction="up" delay={0.08 * (idx % 4)}>
              <div className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-obsidian border-2 border-gold group-hover:bg-gold group-hover:scale-125 transition-all duration-300 shadow-md" />

                <div className="bg-obsidian-100/90 border border-white/10 hover:border-gold/40 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-gold tracking-widest uppercase">
                      {milestone.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs text-ivory/50">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>{milestone.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory-light font-light">
                    {milestone.role}
                  </h3>

                  <div className="flex items-center gap-2 font-sans text-sm font-medium text-gold/90">
                    <Building2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{milestone.organization}</span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-ivory/75 leading-relaxed font-light pt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
