"use client";

import { useEffect, useState } from "react";

/** Short themed splash on first visit to the hero — respects reduced motion via CSS. */
export default function HeroIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 1700);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="hero-intro pointer-events-none absolute inset-0 z-[60] flex items-center justify-center bg-sky-700/40"
      aria-hidden
    >
      <div className="border-4 border-black bg-black/80 px-6 py-4 text-center shadow-[6px_6px_0_#000]">
        <p className="font-display text-[10px] uppercase tracking-widest text-brand-accent sm:text-xs">
          World 1-1
        </p>
        <p className="mt-2 font-display text-sm text-white sm:text-base">
          Press Start
        </p>
      </div>
    </div>
  );
}
