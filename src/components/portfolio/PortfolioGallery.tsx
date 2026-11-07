"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { portfolioData, PortfolioItem } from "@/lib/content";

export default function PortfolioGallery() {
  const { categories, items } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Filter items based on active category
  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

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
      setSelectedItemIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
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

  const currentLightboxItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <div className="space-y-12">
      {/* Category Filter Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-gold mr-2 hidden sm:flex">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-sans text-[11px] uppercase tracking-mega">Categories:</span>
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
              className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "bg-gold text-obsidian font-semibold shadow-md shadow-gold/20"
                  : "bg-white/5 text-ivory/70 hover:text-ivory hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.04 }}
              key={item.id}
              className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer border border-white/10 shadow-lg bg-obsidian-100"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-2 border border-transparent group-hover:border-gold/40 rounded-lg transition-colors duration-500 pointer-events-none" />

              {/* Content Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-gold block font-semibold">
                    {item.category}
                  </span>
                  <p className="font-serif text-sm text-ivory-light font-light line-clamp-1">
                    {item.title}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Lightbox Modal */}
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
              className="absolute top-6 right-6 p-3 rounded-full border border-white/20 text-ivory hover:text-gold hover:border-gold transition-colors z-50 focus:outline-none"
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
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-ivory hover:text-gold hover:border-gold bg-obsidian/50 transition-colors z-50"
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
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-ivory hover:text-gold hover:border-gold bg-obsidian/50 transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Modal Image Container */}
            <div
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] sm:h-[72vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption & Category */}
              <div className="mt-4 text-center space-y-1">
                <span className="font-sans text-xs tracking-mega uppercase text-gold font-medium block">
                  {currentLightboxItem.category} &bull; Image {selectedItemIndex! + 1} of {filteredItems.length}
                </span>
                <p className="font-serif text-xl sm:text-2xl text-ivory-light font-light">
                  {currentLightboxItem.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
