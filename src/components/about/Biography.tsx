"use client";

import Image from "next/image";
import { aboutContent } from "@/lib/content";
import SectionReveal from "../motion/SectionReveal";

export default function Biography() {
  const { biography } = aboutContent;

  return (
    <section className="py-20 sm:py-28 bg-ivory text-obsidian relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="space-y-4">
          <SectionReveal direction="up">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1.5px] bg-gold-dark" />
              <span className="font-sans text-xs tracking-mega text-gold-dark uppercase font-semibold">
                Authentic Biography
              </span>
            </div>
          </SectionReveal>

          <SectionReveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-obsidian font-light leading-tight">
              {biography.heading}
            </h2>
          </SectionReveal>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-6 text-espresso/90 font-sans text-base sm:text-lg leading-relaxed font-light">
          {biography.paragraphs.map((para, idx) => {
            // Check if paragraph is the special quote
            const isQuote = para.includes("Food is more than nourishment");

            if (isQuote) {
              return (
                <SectionReveal key={idx} direction="up" delay={0.15}>
                  <blockquote className="my-10 p-8 sm:p-10 border-l-4 border-gold bg-ivory-dark/60 rounded-r-2xl shadow-sm">
                    <p className="font-serif text-2xl sm:text-3xl text-obsidian italic font-normal leading-snug">
                      &ldquo;{para}&rdquo;
                    </p>
                    <cite className="font-sans text-xs uppercase tracking-widest text-gold-dark font-medium mt-4 block not-italic">
                      — Executive Chef Anand Kumar
                    </cite>
                  </blockquote>
                </SectionReveal>
              );
            }

            return (
              <SectionReveal key={idx} direction="up" delay={0.08 * (idx % 4)}>
                <p>{para}</p>
              </SectionReveal>
            );
          })}
        </div>

        {/* Supporting Editorial Image in Narrative */}
        <SectionReveal direction="up">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-obsidian/10 mt-12">
            <Image
              src="/images/original/fullwidth/model3.jpg"
              alt="Chef Anand Kumar Culinary Preparation"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 text-xs text-ivory/80 font-sans tracking-widest uppercase">
              Culinary Craftsmanship & Bull; Global Kitchen Operations
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
