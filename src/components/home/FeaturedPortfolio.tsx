"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryItem {
  id: string;
  title: string;
  coverSrc: string;
  trackingClass: string;
  splitImages: string[];
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "signature-dishes",
    title: "SIGNATURE DISHES",
    coverSrc: "/images/home-categories/signature-dishes.jpg",
    trackingClass: "tracking-[0.18em]",
    splitImages: [
      "/images/home-categories/signature/sig-1.jpg",
      "/images/home-categories/signature/sig-2.jpg",
      "/images/home-categories/signature/sig-3.jpg",
      "/images/home-categories/signature/sig-4.jpg",
    ],
  },
  {
    id: "brunch",
    title: "BRUNCH",
    coverSrc: "/images/home-categories/brunch.jpg",
    trackingClass: "tracking-[0.28em]",
    splitImages: [
      "/images/home-categories/brunch/brunch-1.jpg",
      "/images/home-categories/brunch/brunch-2.jpg",
      "/images/home-categories/brunch/brunch-3.jpg",
      "/images/home-categories/brunch/brunch-4.jpg",
    ],
  },
  {
    id: "dessert",
    title: "DESSERT",
    coverSrc: "/images/home-categories/dessert.jpg",
    trackingClass: "tracking-[0.28em]",
    splitImages: [
      "/images/home-categories/dessert/dessert-1.jpg",
      "/images/home-categories/dessert/dessert-2.jpg",
      "/images/home-categories/dessert/dessert-3.jpg",
      "/images/home-categories/dessert/dessert-4.jpg",
    ],
  },
  {
    id: "oktoberfest",
    title: "OKTOBERFEST",
    coverSrc: "/images/home-categories/oktoberfest.jpg",
    trackingClass: "tracking-[0.22em]",
    splitImages: [
      "/images/home-categories/oktoberfest/okt-1.jpg",
      "/images/home-categories/oktoberfest/okt-2.jpg",
      "/images/home-categories/oktoberfest/okt-3.jpg",
      "/images/home-categories/oktoberfest/okt-4.jpg",
    ],
  },
];

type AnimPhase = "categories" | "pop" | "split";

export default function FeaturedPortfolio() {
  const [activeCat, setActiveCat] = useState(0);
  const [phase, setPhase] = useState<AnimPhase>("categories");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "categories") {
      // Step 1: Display all 4 categories clearly, then pop up the active category
      timeoutId = setTimeout(() => {
        setPhase("pop");
      }, 2200);
    } else if (phase === "pop") {
      // Step 2: Active category card pops up prominently, then splits into 4 images
      timeoutId = setTimeout(() => {
        setPhase("split");
      }, 1050);
    } else if (phase === "split") {
      // Step 3: Hold the 4 split dish images, then merge back to 4 categories and advance to next category
      timeoutId = setTimeout(() => {
        setPhase("categories");
        setActiveCat((prev) => (prev + 1) % CATEGORIES_DATA.length);
      }, 3100);
    }

    return () => clearTimeout(timeoutId);
  }, [phase]);

  const handleCategoryClick = (idx: number) => {
    setActiveCat(idx);
    setPhase("pop");
  };

  const currentCategory = CATEGORIES_DATA[activeCat];

  return (
    <section className="w-full bg-white pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1220px] mx-auto">
        <div className="relative min-h-[340px] sm:min-h-[360px]">
          <AnimatePresence mode="wait">
            {phase !== "split" ? (
              /* VIEW A: 4 CATEGORIES OVERVIEW & POP-UP STATE */
              <motion.div
                key="categories-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6"
              >
                {CATEGORIES_DATA.map((cat, idx) => {
                  const isPopping = phase === "pop" && activeCat === idx;
                  const isDimmed = phase === "pop" && activeCat !== idx;

                  return (
                    <motion.div
                      key={cat.id}
                      onClick={() => handleCategoryClick(idx)}
                      animate={
                        isPopping
                          ? {
                              scale: 1.11,
                              y: -18,
                              zIndex: 30,
                              opacity: 1,
                              filter: "blur(0px)",
                            }
                          : isDimmed
                          ? {
                              scale: 0.9,
                              y: 6,
                              zIndex: 1,
                              opacity: 0.28,
                              filter: "blur(2px)",
                            }
                          : {
                              scale: 1,
                              y: 0,
                              zIndex: 10,
                              opacity: 1,
                              filter: "blur(0px)",
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 22,
                      }}
                      data-cursor="VIEW"
                      className="group cursor-pointer relative"
                    >
                      {/* Rounded Square Category Card */}
                      <div
                        className={`relative w-full aspect-square rounded-[18px] overflow-hidden bg-neutral-100 transition-shadow duration-500 ${
                          isPopping
                            ? "shadow-[0_24px_50px_rgba(0,0,0,0.32)] ring-3 ring-[#DCA54C]"
                            : "shadow-[0_8px_22px_rgba(0,0,0,0.16)] group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
                        }`}
                      >
                        <Image
                          src={cat.coverSrc}
                          alt={`Chef Anand Kumar — ${cat.title}`}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 290px"
                          className={`object-cover transition-transform duration-500 ease-out ${
                            isPopping ? "scale-110" : "group-hover:scale-105"
                          }`}
                        />
                      </div>

                      {/* Centered Uppercase Category Title Below Card */}
                      <h3
                        className={`mt-6 text-center font-sans text-[15px] sm:text-[17px] lg:text-[18px] font-medium uppercase ${
                          cat.trackingClass
                        } transition-colors duration-300 ${
                          isPopping
                            ? "text-[#C59B27] font-semibold"
                            : "text-[#141414] group-hover:text-[#C59B27]"
                        }`}
                      >
                        {cat.title}
                      </h3>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* VIEW B: POPPED CATEGORY SPLITS INTO 4 INDIVIDUAL DISH IMAGES */
              <motion.div
                key={`split-grid-${currentCategory.id}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6">
                  {currentCategory.splitImages.map((imgSrc, splitIdx) => {
                    // Calculate horizontal offset so all 4 cards split out from the popped category card's column!
                    const offsetCols = activeCat - splitIdx;

                    return (
                      <motion.div
                        key={`${currentCategory.id}-split-${splitIdx}`}
                        initial={{
                          x: `${offsetCols * 105}%`,
                          y: -18,
                          scale: 0.72,
                          opacity: 0,
                          rotate: offsetCols * 4,
                        }}
                        animate={{
                          x: "0%",
                          y: 0,
                          scale: 1,
                          opacity: 1,
                          rotate: 0,
                        }}
                        exit={{
                          x: `${offsetCols * 105}%`,
                          y: -10,
                          scale: 0.68,
                          opacity: 0,
                          transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 190,
                          damping: 21,
                          delay: splitIdx * 0.05,
                        }}
                        className="group relative"
                      >
                        <div className="relative w-full aspect-square rounded-[18px] overflow-hidden bg-neutral-100 shadow-[0_14px_34px_rgba(0,0,0,0.20)] ring-2 ring-[#DCA54C]/40">
                          <Image
                            src={imgSrc}
                            alt={`${currentCategory.title} — Dish ${splitIdx + 1}`}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 290px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Active Category Label Centered Underneath the 4 Split Images */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.35, delay: 0.12 }}
                  className="mt-6 flex flex-col items-center justify-center"
                >
                  <h3
                    className={`text-center font-sans text-[15px] sm:text-[17px] lg:text-[18px] font-semibold text-[#141414] uppercase ${currentCategory.trackingClass}`}
                  >
                    {currentCategory.title}
                  </h3>
                  <div className="h-[2.5px] w-16 bg-[#DCA54C] mt-2 rounded-full" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
