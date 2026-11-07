"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteIntroLoader() {
  const [showIntro, setShowIntro] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1500;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setShowIntro(false), 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Golden Glow */}
          <div className="absolute w-96 h-96 bg-gold/15 blur-[130px] rounded-full pointer-events-none" />

          {/* Concentric Spinning Golden Orbit Rings */}
          <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-gold/40 border-t-gold border-r-transparent"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-white/15 border-b-white/75 border-l-transparent"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-dashed border-gold/25"
            />

            {/* Bright Logo with 3D Spin Entrance */}
            <motion.div
              initial={{ rotate: -180, rotateY: 180, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, rotateY: 360, scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-44 h-44 sm:w-56 sm:h-56 filter drop-shadow-[0_0_24px_rgba(255,255,255,0.6)]"
            >
              <Image
                src="/images/logo-bright.png"
                alt="Chef Anand Kumar Official Logo"
                fill
                sizes="240px"
                priority
                unoptimized
                className="object-contain brightness-125 contrast-125"
              />
            </motion.div>
          </div>

          {/* Editorial Loading Progress Bar & Counter */}
          <div className="mt-8 w-56 sm:w-64 space-y-2.5 text-center relative z-10">
            <div className="h-[1.5px] w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-gold-dark via-gold-light to-white shadow-[0_0_10px_#C8A76B]"
              />
            </div>
            <div className="flex items-center justify-between font-sans text-[10px] tracking-[0.3em] uppercase text-gold/90">
              <span>Culinary Excellence</span>
              <span className="font-mono text-white">{String(progress).padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
