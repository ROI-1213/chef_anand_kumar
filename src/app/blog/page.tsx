import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Culinary Blog | Executive Chef Anand Kumar",
  description: "Read the latest culinary articles, recipes, and hospitality reflections from Chef Anand Kumar on blog.chefanandkumar.com.",
  path: "/blog",
});

export default function BlogHubPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-obsidian text-ivory relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
              Editorial Publications
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory-light uppercase tracking-tight font-light">
            Chef Anand Kumar <br />
            <span className="italic text-gold font-normal">Official Blog</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-ivory/70 max-w-xl mx-auto font-light leading-relaxed">
            Discover culinary insights, cooking techniques, and gastronomic essays published directly on Chef Anand Kumar&apos;s editorial publication platform.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="https://blog.chefanandkumar.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-obsidian rounded-full font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-all shadow-xl shadow-gold/10">
                <span>Visit blog.chefanandkumar.com</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </MagneticButton>

            <MagneticButton href="/portfolio">
              <span className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-ivory-light rounded-full font-sans text-xs sm:text-sm font-medium tracking-widest uppercase hover:border-gold hover:text-gold transition-all">
                <span>Browse Portfolio</span>
              </span>
            </MagneticButton>
          </div>

        </div>
      </section>
    </>
  );
}
