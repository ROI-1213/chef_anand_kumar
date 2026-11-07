import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian text-ivory px-4 py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="text-center max-w-lg space-y-6 relative z-10">
        <span className="font-sans text-xs uppercase tracking-mega text-gold font-medium block">
          404 &bull; Page Not Found
        </span>

        <h1 className="font-serif text-5xl sm:text-7xl text-ivory-light font-light uppercase">
          Culinary <span className="italic text-gold font-normal">Detour</span>
        </h1>

        <p className="font-sans text-base text-ivory/70 font-light leading-relaxed">
          The requested page could not be located in our digital archive. Let us return you to Chef Anand Kumar&apos;s culinary journey.
        </p>

        <div className="pt-4">
          <MagneticButton href="/">
            <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-obsidian rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition-all shadow-lg">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </span>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
