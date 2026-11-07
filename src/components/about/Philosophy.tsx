"use client";

import { CheckCircle2, HeartHandshake, ShieldCheck, TrendingUp, Sparkles, ChefHat } from "lucide-react";
import { aboutContent } from "@/lib/content";
import SectionReveal from "../motion/SectionReveal";
import MagneticButton from "../motion/MagneticButton";

export default function Philosophy() {
  const { workStyle } = aboutContent;

  return (
    <section className="py-20 sm:py-28 bg-ivory text-obsidian relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <SectionReveal direction="up">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1.5px] bg-gold-dark" />
              <span className="font-sans text-xs tracking-mega text-gold-dark uppercase font-semibold">
                Kitchen Leadership & Operations
              </span>
            </div>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-obsidian font-light leading-tight">
              {workStyle.heading}
            </h2>
          </SectionReveal>
        </div>

        {/* Leadership Mantra Banner */}
        <SectionReveal direction="up" delay={0.2}>
          <div className="p-8 sm:p-12 rounded-3xl bg-obsidian text-ivory-light border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="font-sans text-xs uppercase tracking-mega text-gold font-semibold block">
                Leadership Core Belief
              </span>
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory-light uppercase tracking-tight font-light">
                &ldquo;{workStyle.mantra}&rdquo;
              </p>
              <p className="font-sans text-sm sm:text-base text-ivory/70 leading-relaxed font-light pt-2">
                With more than two decades in luxury hospitality across India, the Maldives, Tanzania, the UAE, and Nigeria, Chef Anand balances culinary creativity with unwavering operational discipline. A successful kitchen is not driven by one chef alone, but by an empowered brigade striving towards a shared standard of excellence.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Work Style Pillars Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl text-obsidian font-light">
            Foundations of My Work Style
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workStyle.pillars.map((pillar, idx) => (
              <SectionReveal key={idx} direction="up" delay={idx * 0.05}>
                <div className="p-6 rounded-2xl bg-ivory-dark/40 border border-obsidian/5 flex items-start gap-4 hover:bg-ivory-dark/70 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                  </div>
                  <p className="font-sans text-sm sm:text-base text-espresso/90 leading-relaxed font-normal">
                    {pillar}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* CTA to Consult */}
        <SectionReveal direction="up">
          <div className="pt-8 border-t border-obsidian/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-2xl text-obsidian font-light">
                Seeking Executive Culinary Leadership or Advisory?
              </h4>
              <p className="font-sans text-sm text-espresso/70 mt-1">
                Collaborate on hotel pre-openings, menu revamps, or brigade training.
              </p>
            </div>

            <MagneticButton href="/contact">
              <span className="inline-flex items-center px-8 py-3.5 bg-obsidian text-ivory-light rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-dark hover:text-white transition-all shadow-lg">
                Connect With Chef Anand
              </span>
            </MagneticButton>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
