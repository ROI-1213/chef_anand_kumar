"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export default function RevealText({
  text,
  className,
  tag = "p",
  delay = 0,
  stagger = 0.03,
}: RevealTextProps) {
  const words = text.split(" ");
  const Tag = tag as any;

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 24,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 18,
    },
  };

  return (
    <Tag className={cn("overflow-hidden inline-flex flex-wrap gap-x-[0.28em] gap-y-1", className)}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1"
      >
        {words.map((word, index) => (
          <motion.span variants={child} key={index} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
