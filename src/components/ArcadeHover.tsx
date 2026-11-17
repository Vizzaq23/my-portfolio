"use client";

import { useEffect, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/** Small, interruptible cartridge tilt; links and keyboard focus remain native. */
export default function ArcadeHover({ children, className, as = "article", label }: {
  children: ReactNode;
  className?: string;
  as?: "article" | "aside";
  label?: string;
}) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 24 });
  const reset = () => { rotateX.set(0); rotateY.set(0); };

  useEffect(() => {
    if (reducedMotion) { rotateX.jump(0); rotateY.jump(0); }
  }, [reducedMotion, rotateX, rotateY]);

  const followPointer = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rotateX.set((.5 - (event.clientY - bounds.top) / bounds.height) * 5);
    rotateY.set(((event.clientX - bounds.left) / bounds.width - .5) * 5);
  };
  const Surface = as === "aside" ? motion.aside : motion.article;
  return <Surface className={className} aria-label={label} data-arcade-hover=""
    style={{ rotateX, rotateY, transformPerspective: 1000 }}
    onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset} onFocusCapture={reset}>
    {children}
  </Surface>;
}
