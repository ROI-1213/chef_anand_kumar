import VideoArchiveGrid from "@/components/video/VideoArchiveGrid";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Video Archive | Culinary Demonstrations & Media | Chef Anand Kumar",
  description: "Browse the complete video archive of Executive Chef Anand Kumar — culinary masterclasses, cooking demonstrations, and television broadcasts.",
  path: "/video-archive",
});

export default function VideoArchivePage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-obsidian text-ivory relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
                Motion & Masterclasses
              </span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory-light uppercase tracking-tight font-light">
              Culinary Stories <span className="italic text-gold font-normal">in Motion</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-ivory/70 max-w-xl mx-auto font-light leading-relaxed">
              An archival collection of 22 video demonstrations, kitchen masterclasses, and gastronomic features from Chef Anand Kumar.
            </p>
          </div>

          {/* Grid */}
          <VideoArchiveGrid />

        </div>
      </section>
    </>
  );
}
