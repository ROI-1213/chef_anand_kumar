"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 320, mass: 0.4 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      ) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute("data-cursor") || "";
        setCursorLabel(label);
      } else {
        setIsHovered(false);
        setCursorLabel("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorLabel ? 84 : isHovered ? 54 : 34,
          height: cursorLabel ? 84 : isHovered ? 54 : 34,
          backgroundColor: cursorLabel
            ? "rgba(200, 167, 107, 0.92)"
            : isHovered
            ? "rgba(200, 167, 107, 0.14)"
            : "rgba(200, 167, 107, 0)",
          borderColor: isHovered
            ? "rgba(223, 191, 136, 0.9)"
            : "rgba(200, 167, 107, 0.45)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="fixed top-0 left-0 rounded-full border flex items-center justify-center backdrop-blur-[1px]"
      >
        {cursorLabel && (
          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-obsidian">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Gold Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorLabel ? 0 : isHovered ? 0.5 : 1,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#C8A76B]"
      />
    </div>
  );
}
