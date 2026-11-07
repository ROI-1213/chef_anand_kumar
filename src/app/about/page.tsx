import Image from "next/image";
import Biography from "@/components/about/Biography";
import CareerTimeline from "@/components/about/CareerTimeline";
import Philosophy from "@/components/about/Philosophy";
import { constructMetadata } from "@/lib/seo";
import { aboutContent } from "@/lib/content";

export const metadata = constructMetadata({
  title: "About Executive Chef Anand Kumar | Biography & Culinary Philosophy",
  description: "Explore the international career journey, leadership philosophy, and culinary credentials of Executive Chef Anand Kumar.",
  path: "/about",
});

export default function AboutPage() {
  const { hero } = aboutContent;

  return (
    <>
      {/* Editorial Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center bg-obsidian text-ivory pt-32 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Hero Title & Descriptor */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 sm:w-12 h-[1px] bg-gold" />
                <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
                  {hero.subheading}
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ivory-light uppercase tracking-tight font-light leading-[0.95]">
                The Man Behind <br />
                <span className="italic text-gold font-normal">The Craft</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-ivory/80 max-w-xl font-light leading-relaxed">
                Executive Chef Anand Kumar brings over two decades of culinary mastery, pre-opening experience, and international hotel kitchen leadership to modern gastronomy.
              </p>
            </div>

            {/* Right: Authentic Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-3 border border-gold/30 rounded-xl pointer-events-none z-20 group-hover:border-gold/60 transition-colors duration-500" />
                <Image
                  src={hero.portrait}
                  alt="Executive Chef Anand Kumar"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-70 z-10" />
                <div className="absolute bottom-5 left-5 right-5 z-20 text-center">
                  <span className="font-serif text-xl text-ivory font-light block">
                    Chef Anand Kumar
                  </span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-gold block mt-0.5">
                    Executive Chef &bull; International Hospitality
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Complete Biography */}
      <Biography />

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Leadership Philosophy & Work Style */}
      <Philosophy />
    </>
  );
}
