import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import ContactCTA from "@/components/home/ContactCTA";
import { constructMetadata } from "@/lib/seo";
import { portfolioContent } from "@/lib/content";

export const metadata = constructMetadata({
  title: "Culinary Portfolio & Gallery | Executive Chef Anand Kumar",
  description: "Browse the authentic culinary portfolio of Executive Chef Anand Kumar — signature dishes, haute gastronomy, patisserie, and international travels.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-obsidian text-ivory relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
                Photographic Exhibition
              </span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory-light uppercase tracking-tight font-light">
              Selected <span className="italic text-gold font-normal">Culinary Portfolio</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-ivory/70 max-w-xl mx-auto font-light leading-relaxed">
              {portfolioContent.subheading}
            </p>
          </div>

          {/* Interactive Filterable Gallery */}
          <PortfolioGallery />

        </div>
      </section>

      <ContactCTA />
    </>
  );
}
