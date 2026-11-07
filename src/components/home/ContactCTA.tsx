"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, Compass, Sparkles } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionReveal from "../motion/SectionReveal";
import MagneticButton from "../motion/MagneticButton";

export default function ContactCTA() {
  const enquiryTypes = [
    { title: "General Enquiries", desc: "Private culinary consulting and bespoke gastronomy." },
    { title: "Restaurant Consulting", desc: "Concept design, menu engineering, and operations through ForkTheory." },
    { title: "Culinary Collaborations", desc: "Guest chef pop-ups, four-hands dinners, and luxury resort takeovers." },
    { title: "Hospitality Projects", desc: "Pre-opening leadership, kitchen architecture, and brigade training." },
  ];

  return (
    <>
      {/* Section 7: Typographic Personal Statement */}
      <section className="py-24 sm:py-32 bg-white text-obsidian relative overflow-hidden border-t border-b border-obsidian/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <SectionReveal direction="up">
            <span className="font-sans text-xs tracking-mega uppercase text-gold-dark font-semibold">
              The Culinary Credo
            </span>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.15}>
            <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl text-obsidian font-light leading-snug">
              &ldquo;Food is more than nourishment. <br />
              It is <span className="italic text-gold-dark font-normal">culture, emotion, memory,</span> and connection.&rdquo;
            </blockquote>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.25}>
            <cite className="font-sans text-xs uppercase tracking-widest text-espresso/60 block not-italic mt-4">
              — Executive Chef Anand Kumar
            </cite>
          </SectionReveal>
        </div>
      </section>

      {/* Section 8: Contact Invitation */}
      <section className="py-24 sm:py-32 bg-obsidian text-ivory relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <SectionReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Consultations</span>
              </div>
            </SectionReveal>

            <SectionReveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ivory-light font-light uppercase tracking-tight">
                Let&apos;s Create Something <br />
                <span className="italic text-gold font-normal">Extraordinary</span>
              </h2>
            </SectionReveal>

            <SectionReveal direction="up" delay={0.2}>
              <p className="font-sans text-base sm:text-lg text-ivory/70 max-w-xl mx-auto font-light leading-relaxed">
                Culinary excellence begins with a conversation. Available for international restaurant advisory, luxury pre-openings, menu strategy, and guest engagements.
              </p>
            </SectionReveal>
          </div>

          {/* 4 Enquiry Pathways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {enquiryTypes.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 space-y-3 group"
              >
                <span className="text-gold font-sans text-xs tracking-widest font-semibold">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl text-ivory-light group-hover:text-gold transition-colors font-light">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-ivory/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Central CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4">
            <MagneticButton href="/contact">
              <span className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-gold text-obsidian rounded-full font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-all shadow-xl shadow-gold/10">
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticButton>

            <div className="flex items-center gap-6 font-sans text-xs uppercase tracking-widest text-ivory/70">
              <a
                href={`tel:${siteContent.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Direct Line</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>Email Inquiries</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
