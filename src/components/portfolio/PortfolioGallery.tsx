"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { portfolioData } from "@/lib/content";

export default function PortfolioGallery() {
  const { categories, items } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Filter items based on active category and ensure unique image URLs
  const filteredItems = (
    activeCategory === "All"
      ? items
      : items.filter(
          (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
        )
  ).filter(
    (item, idx, arr) => arr.findIndex((other) => other.src === item.src) === idx
  );

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  }, [selectedItemIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex(
        (prev) => (prev! - 1 + filteredItems.length) % filteredItems.length
      );
    }
  }, [selectedItemIndex, filteredItems.length]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, showNext, showPrev]);

  const currentLightboxItem =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <div className="space-y-12">
      {/* Category Filter Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4">
        <div className="items-center gap-2 text-gold mr-2 hidden sm:flex">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-sans text-[11px] uppercase tracking-mega">
            Categories:
          </span>
        </div>
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedItemIndex(null);
              }}
              className={`px-5 sm:px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gold text-obsidian font-semibold shadow-md shadow-gold/20"
                  : "bg-white/5 text-ivory/70 hover:text-ivory hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Large Borderless Gallery Grid (Only Images, No Food Names, No Borders) */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, delay: (idx % 6) * 0.04 }}
              key={item.id}
              className="relative h-[380px] sm:h-[430px] lg:h-[470px] rounded-[22px] overflow-hidden group cursor-pointer shadow-2xl bg-obsidian-100"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={item.src}
                alt="Chef Anand Kumar Culinary Creation"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Lightbox Modal (Pure Image Only, No Border, No Food Name) */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Top Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-ivory hover:text-gold transition-colors z-50 focus:outline-none cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-ivory hover:text-gold transition-colors z-50 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-ivory hover:text-gold transition-colors z-50 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Modal Image Container */}
            <div
              className="relative max-w-6xl w-full max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[75vh] sm:h-[82vh] rounded-[22px] overflow-hidden shadow-2xl">
                <Image
                  src={currentLightboxItem.src}
                  alt="Chef Anand Kumar Culinary Creation"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
