import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Recipes | Executive Chef Anand Kumar",
  description: "Recipes by Executive Chef Anand Kumar — Coming Soon.",
  path: "/recipes",
});

export default function RecipesPage() {
  return (
    <section className="relative min-h-[82vh] w-full bg-obsidian text-ivory flex items-center justify-center px-4 overflow-hidden select-none">
      {/* Subtle Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-semibold text-white uppercase tracking-[0.26em]">
          COMING SOON
        </h1>
        <div className="h-[3px] w-28 sm:w-36 bg-[#DCA54C] mt-5 rounded-full" />
      </div>
    </section>
  );
}
