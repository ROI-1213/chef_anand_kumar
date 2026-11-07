"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/content";

interface EditorialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditorialMenu({ isOpen, onClose }: EditorialMenuProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lock body scroll when menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const links = siteContent.navigation;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
          exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#0B0B0A] text-ivory-light flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Ambient Grain */}
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none z-10" />

          {/* Top-Center Geometric Wireframe Facets (Matching Mockup) */}
          <svg
            className="hidden md:block absolute top-0 left-[26%] w-72 h-48 opacity-20 pointer-events-none text-white/30 z-10"
            viewBox="0 0 300 200"
            fill="none"
          >
            <polygon points="20,0 130,150 220,0" stroke="currentColor" strokeWidth="0.8" />
            <polygon points="80,0 130,150 160,90" stroke="currentColor" strokeWidth="0.6" />
          </svg>

          {/* Bottom-Center Geometric Wireframe Facets (Matching Mockup) */}
          <svg
            className="hidden md:block absolute bottom-0 left-[44%] w-80 h-44 opacity-20 pointer-events-none text-white/30 z-10"
            viewBox="0 0 320 180"
            fill="none"
          >
            <polygon points="10,180 90,70 210,130 280,180" stroke="currentColor" strokeWidth="0.8" />
            <line x1="90" y1="70" x2="140" y2="180" stroke="currentColor" strokeWidth="0.6" />
          </svg>

          {/* Bottom-Left Gold Facet Line (Matching Mockup) */}
          <svg
            className="absolute bottom-0 left-0 w-40 h-40 opacity-60 pointer-events-none text-gold z-20"
            viewBox="0 0 160 160"
            fill="none"
          >
            <polyline points="0,85 65,125 90,160" stroke="currentColor" strokeWidth="1.2" />
            <line x1="65" y1="125" x2="0" y2="145" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          </svg>

          {/* Left Side: Authentic Chef Plating Photography with Smooth Blend */}
          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[48%] pointer-events-none z-0">
            <motion.div
              initial={{ scale: 1.08, opacity: 0, x: -30 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/menu-plating-clean.png"
                alt="Chef Anand Kumar Culinary Plating"
                fill
                priority
                unoptimized
                className="object-cover object-left-bottom lg:object-contain lg:object-left-bottom opacity-35 sm:opacity-60 lg:opacity-100"
              />
              {/* Seamless vignette fade into the dark right canvas */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0B0A]/30 to-[#0B0B0A]" />
            </motion.div>
          </div>

          {/* Top Bar: Bright Logo Crest on Left with Spin Animation, Close Button "X" on Right */}
          <header className="relative z-30 px-6 sm:px-12 pt-5 sm:pt-7 flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="group relative flex items-center justify-center"
            >
              {/* Spinning Golden Halo Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-gold/30 border-t-gold/90 pointer-events-none"
              />
              <motion.div
                initial={{ rotate: -360, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                whileHover={{ rotate: 360, scale: 1.08 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 p-1.5"
              >
                <Image
                  src="/images/logo-bright.png"
                  alt="Chef Anand Executive Chef Logo"
                  fill
                  sizes="160px"
                  priority
                  unoptimized
                  className="object-contain brightness-125 contrast-125 filter drop-shadow-[0_0_16px_rgba(255,255,255,0.55)]"
                />
              </motion.div>
            </Link>

            {/* Close Button "X" */}
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              className="p-2 sm:p-3 text-white hover:text-gold transition-colors focus:outline-none rounded-full"
              aria-label="Close navigation menu"
            >
              <X className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.8]" />
            </motion.button>
          </header>

          {/* Center Area: Vertical Gold Line, Numbered Menu Items, & Calligraphic "Menu" Watermark */}
          <main className="relative z-20 flex-1 flex items-center px-6 sm:px-12 lg:px-20">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Left 5 columns reserved for the Chef Plating visual on Desktop */}
              <div className="hidden lg:block lg:col-span-5" />

              {/* Right 7 columns: Navigation List */}
              <div className="lg:col-span-7 relative pl-6 sm:pl-10 lg:pl-12 py-4">
                
                {/* Vertical Gold Hairline Divider on Left of Numbers */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="
                    absolute left-0 top-0 bottom-0 w-[1px] origin-top
                    bg-gradient-to-b from-transparent via-gold/60 to-transparent
                  "
                />

                {/* Authentic Calligraphic "Menu" Script Watermark (Top Right of Menu List) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                  className="hidden sm:block absolute right-8 lg:right-20 -top-12 lg:-top-16 w-56 h-32 lg:w-72 lg:h-40 pointer-events-none select-none z-0 opacity-75"
                >
                  <Image
                    src="/images/menu-script-watermark.png"
                    alt="Menu Calligraphic Script"
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Numbered Navigation Links (01 to 07) */}
                <nav className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
                  {links.map((link, idx) => {
                    const isActive = pathname === link.href;
                    const isHovered = hoveredIndex === idx;
                    const isSelected = isHovered || (hoveredIndex === null && isActive);
                    const isExternal = link.href.startsWith("http");
                    const num = String(idx + 1).padStart(2, "0");

                    const itemContent = (
                      <div className="inline-flex flex-col">
                        <div className="flex items-baseline gap-6 sm:gap-9 group">
                          {/* Number 01 - 07 */}
                          <span
                            className={`font-sans text-xs sm:text-sm tracking-[0.2em] transition-colors duration-300 ${
                              isSelected ? "text-ivory-light font-medium" : "text-ivory/50"
                            }`}
                          >
                            {num}
                          </span>

                          {/* Page Title */}
                          <span
                            className={`font-sans text-lg sm:text-xl md:text-2xl tracking-[0.25em] uppercase transition-all duration-300 ${
                              isSelected
                                ? "text-white font-medium"
                                : "text-ivory/65 hover:text-white font-light"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>

                        {/* Glowing Gold Underline on Active / Hovered Item */}
                        <div className="h-[2px] ml-11 sm:ml-14 mt-1.5 relative">
                          {isSelected && (
                            <motion.div
                              layoutId="editorialMenuUnderline"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              className="h-[1.5px] w-32 sm:w-44 bg-gradient-to-r from-[#DFBF88] via-[#C8A76B] to-transparent shadow-[0_0_10px_rgba(200,167,107,0.6)]"
                            />
                          )}
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.06, duration: 0.45, ease: "easeOut" }}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="block focus:outline-none"
                          >
                            {itemContent}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="block focus:outline-none"
                          >
                            {itemContent}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

            </div>
          </main>

          {/* Far-Right Circular Gold Arc with Gold Dot & Right Arrow (Matching Mockup) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 items-center z-20"
          >
            <div className="relative w-32 h-80 flex items-center justify-end">
              <svg className="w-32 h-80 text-gold/45" viewBox="0 0 100 240" fill="none">
                <path
                  d="M100,5 A115,115 0 0,0 100,235"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                {/* Gold Orb on the Arc */}
                <circle cx="22" cy="120" r="4.5" fill="#DFBF88" />
              </svg>
              <button
                onClick={onClose}
                aria-label="Continue to page"
                className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-gold transition-transform hover:translate-x-1"
              >
                <ArrowRight className="w-6 h-6 stroke-[1.3]" />
              </button>
            </div>
          </motion.div>

          {/* Bottom Bar: 4 Minimalist Square Social Buttons on Right */}
          <footer className="relative z-30 px-6 sm:px-14 pb-6 sm:pb-9 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3.5"
            >
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-white/30 hover:border-gold text-ivory-light hover:text-gold flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/30 hover:border-gold text-ivory-light hover:text-gold flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 border border-white/30 hover:border-gold text-ivory-light hover:text-gold flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-white/30 hover:border-gold text-ivory-light hover:text-gold flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                </svg>
              </a>
            </motion.div>
          </footer>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
