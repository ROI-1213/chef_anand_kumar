import BlogGallery from "@/components/blog/BlogGallery";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Personal Blog & Culinary Chronicles | Executive Chef Anand Kumar",
  description:
    "Read the official personal blog, travel chronicles, and culinary stories of Executive Chef Anand Kumar.",
  path: "/blog",
});

export default function BlogHubPage() {
  return (
    <section className="pt-32 pb-24 bg-obsidian text-ivory relative min-h-screen overflow-hidden">
      {/* Subtle Ambient Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#DCA54C]" />
            <span className="font-sans text-xs tracking-[0.24em] text-[#DCA54C] uppercase font-semibold">
              CULINARY &amp; TRAVEL CHRONICLES
            </span>
            <span className="w-8 h-[1px] bg-[#DCA54C]" />
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-semibold text-white uppercase tracking-[0.18em]">
            PERSONAL BLOG
          </h1>

          <div className="h-[3px] w-24 sm:w-28 bg-[#DCA54C] mx-auto rounded-full" />

          <p className="font-sans text-sm sm:text-base text-ivory/75 max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Reflections on global gastronomy, luxury hospitality journeys, cultural traditions, and signature dining experiences by Executive Chef Anand Kumar.
          </p>
        </div>

        {/* Native Interactive Blog Posts Grid */}
        <BlogGallery />
      </div>
    </section>
  );
}
