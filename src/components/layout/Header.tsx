"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import EditorialMenu from "./EditorialMenu";
import SiteIntroLoader from "./SiteIntroLoader";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Site-Opening Spinning Logo Intro */}
      <SiteIntroLoader />

      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-transparent py-2 sm:py-3 pointer-events-none transition-opacity duration-300 ${
          menuOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full px-4 sm:px-7 lg:px-10 flex items-center justify-between">
          {/* Top-Left Corner: Floating Logo Only (No Navbar Bar) */}
          <Link
            href="/"
            className={`pointer-events-auto group relative flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${
              scrolled ? "bg-black/65 backdrop-blur-sm shadow-lg" : ""
            }`}
            aria-label="Chef Anand Kumar Home"
          >
            {/* Subtle Spinning Golden Halo Ring around Logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-gold/30 border-t-gold/85 pointer-events-none"
            />

            {/* Bright Logo Image with Spin on Site Load & Hover */}
            <motion.div
              initial={{ rotate: -360, rotateY: 180, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, rotateY: 0, scale: 1, opacity: 1 }}
              whileHover={{ rotate: 360, scale: 1.08 }}
              transition={{
                duration: 1.4,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative transition-all duration-500 p-1 ${
                scrolled
                  ? "w-16 h-16 sm:w-20 sm:h-20"
                  : "w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              }`}
            >
              <Image
                src="/images/logo-bright.png"
                alt="Chef Anand Kumar Official Logo"
                fill
                sizes="140px"
                priority
                unoptimized
                className="object-contain brightness-125 contrast-125 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </Link>

          {/* Top-Right Corner: Floating 3-Line Menu Button Only (No Navbar Bar) */}
          <button
            onClick={() => setMenuOpen(true)}
            data-cursor="MENU"
            className={`pointer-events-auto group flex items-center justify-center p-3 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer ${
              scrolled
                ? "bg-black/65 backdrop-blur-sm shadow-lg hover:bg-black/80"
                : "hover:bg-white/5"
            }`}
            aria-label="Open navigation menu"
          >
            <div className="flex flex-col items-end justify-center gap-2 w-8 sm:w-9">
              <span className="w-full h-[2.5px] bg-white group-hover:bg-gold rounded-full transition-all duration-300 shadow-[0_1px_6px_rgba(0,0,0,0.8)]" />
              <span className="w-full h-[2.5px] bg-white group-hover:bg-gold rounded-full transition-all duration-300 shadow-[0_1px_6px_rgba(0,0,0,0.8)]" />
              <span className="w-full h-[2.5px] bg-white group-hover:bg-gold rounded-full transition-all duration-300 shadow-[0_1px_6px_rgba(0,0,0,0.8)]" />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Animated Editorial Menu Overlay */}
      <EditorialMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
