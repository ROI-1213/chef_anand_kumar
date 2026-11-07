"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface LatestWorkItem {
  id: string;
  title: string;
  src: string;
}

const LATEST_WORK_ITEMS: LatestWorkItem[] = [
  {
    id: "lw-1",
    title: "Honeycomb Entremet",
    src: "/images/latest-work/latest-hd-1.jpg",
  },
  {
    id: "lw-2",
    title: "Smoked Bamboo Fish",
    src: "/images/latest-work/latest-hd-2.jpg",
  },
  {
    id: "lw-3",
    title: "Artisanal Tiers",
    src: "/images/latest-work/latest-hd-3.jpg",
  },
  {
    id: "lw-4",
    title: "Kataifi King Prawns",
    src: "/images/latest-work/latest-hd-4.jpg",
  },
  {
    id: "lw-5",
    title: "Open-Fire Asado",
    src: "/images/latest-work/latest-hd-5.jpg",
  },
];

export default function LatestWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = LATEST_WORK_ITEMS.length;

  // Continuously slide every 2 seconds (2000ms) without stopping
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2000);
    return () => clearInterval(timer);
  }, [total]);

  // Compute circular signed offset in [-2, -1, 0, +1, +2]
  const getSignedOffset = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;
    return diff;
  };

  return (
    <section
      id="latest-work"
      className="relative w-full pt-8 sm:pt-12 pb-24 sm:pb-32 bg-white text-[#141414] overflow-hidden select-none"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Heading in Exact Uppercase + Gold Underline Format */}
        <div className="mb-12 sm:mb-16 flex flex-col items-center justify-center">
          <h2 className="text-center font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141414] uppercase tracking-[0.22em]">
            LATEST WORK
          </h2>
          <div className="h-[3px] w-24 sm:w-28 bg-[#DCA54C] mt-3 rounded-full" />
        </div>

        {/* 5-Card Layered Coverflow Stage (Pure HD Images, Continuously Sliding Every 2s) */}
        <div className="relative h-[400px] sm:h-[470px] lg:h-[500px] flex items-center justify-center">
          {LATEST_WORK_ITEMS.map((item, idx) => {
            const offset = getSignedOffset(idx);
            const isCenter = offset === 0;

            let xPos = "0%";
            let scale = 1;
            let zIndex = 30;

            if (offset === -1) {
              xPos = "-62%";
              scale = 0.86;
              zIndex = 20;
            } else if (offset === 1) {
              xPos = "62%";
              scale = 0.86;
              zIndex = 20;
            } else if (offset === -2) {
              xPos = "-114%";
              scale = 0.72;
              zIndex = 10;
            } else if (offset === 2) {
              xPos = "114%";
              scale = 0.72;
              zIndex = 10;
            }

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                animate={{
                  x: xPos,
                  scale,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                }}
                data-cursor="VIEW"
                className={`absolute w-[290px] sm:w-[390px] lg:w-[435px] h-[365px] sm:h-[435px] lg:h-[465px] rounded-[22px] overflow-hidden cursor-pointer bg-white transition-shadow duration-500 ${
                  isCenter
                    ? "shadow-[0_28px_65px_rgba(0,0,0,0.22)] ring-2 ring-[#DCA54C]/80"
                    : "shadow-[0_16px_40px_rgba(0,0,0,0.14)] ring-1 ring-black/10"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 640px) 90vw, 530px"
                  className="object-cover brightness-100"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
