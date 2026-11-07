"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setPercent(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top 2px Luminous Gold Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-dark via-gold-light to-gold origin-left z-[60] shadow-[0_0_12px_rgba(200,167,107,0.8)]"
      />

      {/* Floating Bottom-Right Scroll Orb */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: percent > 8 ? 1 : 0,
          scale: percent > 8 ? 1 : 0.8,
          pointerEvents: percent > 8 ? "auto" : "none",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-obsidian/90 backdrop-blur-md border border-gold/40 hover:border-gold text-gold flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] group"
      >
        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        <span className="font-sans text-[8px] tracking-widest font-semibold mt-0.5">
          {percent}%
        </span>
      </motion.button>
    </>
  );
}
