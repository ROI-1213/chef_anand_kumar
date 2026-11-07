import Image from "next/image";
import Link from "next/link";
import { BookOpen, Sparkles, Bell, ArrowRight } from "lucide-react";
import ContactCTA from "@/components/home/ContactCTA";
import MagneticButton from "@/components/motion/MagneticButton";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Recipes & Culinary Stories | Executive Chef Anand Kumar",
  description: "Curated collection of signature recipes, masterclass techniques, and culinary reflections by Executive Chef Anand Kumar — Publishing Soon.",
  path: "/recipes",
});

export default function RecipesPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-obsidian text-ivory relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gold" />
                <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
                  Recipes & Culinary Stories
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ivory-light uppercase tracking-tight font-light leading-[0.95]">
                Publishing <br />
                <span className="italic text-gold font-normal">Soon</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-ivory/80 max-w-lg font-light leading-relaxed">
                A curated compendium of Chef Anand Kumar&apos;s signature creations, masterclass technique guides, and gastronomic reflections is currently being prepared for publication.
              </p>

              {/* Future Schema Blueprint Indicator */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 max-w-lg">
                <div className="flex items-center gap-2 text-gold">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-sans text-xs uppercase tracking-widest font-semibold">
                    Culinary Archive Preparation
                  </span>
                </div>
                <p className="font-sans text-xs text-ivory/60 leading-relaxed">
                  The upcoming release will feature multi-course recipes, plating aesthetics, regional ingredient pairings, and step-by-step methodologies from five-star kitchens.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[10px] uppercase font-sans tracking-widest text-gold/80">
                  <span className="px-2.5 py-1 rounded-full border border-gold/20 bg-gold/5">French Classical</span>
                  <span className="px-2.5 py-1 rounded-full border border-gold/20 bg-gold/5">Coastal East African</span>
                  <span className="px-2.5 py-1 rounded-full border border-gold/20 bg-gold/5">Contemporary Indian</span>
                  <span className="px-2.5 py-1 rounded-full border border-gold/20 bg-gold/5">Haute Patisserie</span>
                </div>
              </div>

              {/* Navigation Back Link */}
              <div className="pt-2">
                <MagneticButton href="/portfolio">
                  <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-obsidian rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition-all shadow-lg">
                    <span>Explore Current Portfolio</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Authentic Photographic Feature */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-3 border border-gold/30 rounded-xl pointer-events-none z-20 group-hover:border-gold/60 transition-colors duration-500" />
                <Image
                  src="/images/original/fullwidth/model3.jpg"
                  alt="Chef Anand Kumar Culinary Presentation"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent z-10" />
                <div className="absolute bottom-6 left-6 right-6 z-20 text-center">
                  <span className="font-serif text-lg text-ivory font-light block">
                    Culinary Mastery In The Making
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold block mt-0.5">
                    Chef Anand Kumar
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
