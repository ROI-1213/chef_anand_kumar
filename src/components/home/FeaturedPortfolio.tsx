"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryItem {
  id: string;
  coverSrc: string;
  splitImages: string[];
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "signature-dishes",
    coverSrc: "/images/home-categories/signature-dishes.jpg",
    splitImages: [
      "/images/home-categories/signature/sig-1.jpg",
      "/images/home-categories/signature/sig-2.jpg",
      "/images/home-categories/signature/sig-3.jpg",
      "/images/home-categories/signature/sig-4.jpg",
    ],
  },
  {
    id: "brunch",
    coverSrc: "/images/home-categories/brunch.jpg",
    splitImages: [
      "/images/home-categories/brunch/brunch-1.jpg",
      "/images/home-categories/brunch/brunch-2.jpg",
      "/images/home-categories/brunch/brunch-3.jpg",
      "/images/home-categories/brunch/brunch-4.jpg",
    ],
  },
  {
    id: "dessert",
    coverSrc: "/images/home-categories/dessert.jpg",
    splitImages: [
      "/images/home-categories/dessert/dessert-1.jpg",
      "/images/home-categories/dessert/dessert-2.jpg",
      "/images/home-categories/dessert/dessert-3.jpg",
      "/images/home-categories/dessert/dessert-4.jpg",
    ],
  },
  {
    id: "oktoberfest",
    coverSrc: "/images/home-categories/oktoberfest.jpg",
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
      timeoutId = setTimeout(() => {
        setPhase("pop");
      }, 2200);
    } else if (phase === "pop") {
      timeoutId = setTimeout(() => {
        setPhase("split");
      }, 1050);
    } else if (phase === "split") {
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
    <section className="w-full bg-white pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden select-none">
      <div className="max-w-[1620px] mx-auto">
        <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[470px]">
          <AnimatePresence mode="wait">
            {phase !== "split" ? (
              /* VIEW A: 4 LARGE BORDERLESS IMAGE CARDS (NO TEXT LABELS, NO BORDERS) */
              <motion.div
                key="categories-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
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
                              scale: 1.09,
                              y: -14,
                              zIndex: 30,
                              opacity: 1,
                              filter: "blur(0px)",
                            }
                          : isDimmed
                          ? {
                              scale: 0.92,
                              y: 6,
                              zIndex: 1,
                              opacity: 0.3,
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
                      <div
                        className={`relative w-full h-[360px] sm:h-[420px] lg:h-[450px] rounded-[22px] overflow-hidden bg-neutral-100 transition-shadow duration-500 ${
                          isPopping
                            ? "shadow-[0_26px_55px_rgba(0,0,0,0.28)]"
                            : "shadow-[0_12px_28px_rgba(0,0,0,0.14)] group-hover:shadow-[0_18px_36px_rgba(0,0,0,0.20)]"
                        }`}
                      >
                        <Image
                          src={cat.coverSrc}
                          alt="Chef Anand Kumar Culinary Creation"
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 48vw, 390px"
                          className={`object-cover transition-transform duration-500 ease-out ${
                            isPopping ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* VIEW B: POPPED CARD SPLITS INTO 4 UNIQUE LARGE BORDERLESS DISH IMAGES (NO TEXT, NO BORDERS) */
              <motion.div
                key={`split-grid-${currentCategory.id}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
                  {currentCategory.splitImages.map((imgSrc, splitIdx) => {
                    const offsetCols = activeCat - splitIdx;

                    return (
                      <motion.div
                        key={`${currentCategory.id}-split-${splitIdx}`}
                        initial={{
                          x: `${offsetCols * 105}%`,
                          y: -14,
                          scale: 0.76,
                          opacity: 0,
                          rotate: offsetCols * 3,
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
                          scale: 0.72,
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
                        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[450px] rounded-[22px] overflow-hidden bg-neutral-100 shadow-[0_16px_38px_rgba(0,0,0,0.18)]">
                          <Image
                            src={imgSrc}
                            alt="Chef Anand Kumar Culinary Dish"
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 48vw, 390px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
