"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Small character at the hero “floor” — walk-in-place feel via CSS + frame flip on scroll.
 */
export default function HeroIdleSprite() {
  const [walkPhase, setWalkPhase] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setWalkPhase((p) => (p + 1) % 2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute bottom-[68px] left-[6vw] z-[40] select-none sm:left-10 md:left-16"
      aria-hidden
    >
      <div
        className="hero-sprite-phase pixelated"
        data-phase={walkPhase}
      >
        <div className="hero-sprite-bob drop-shadow-[2px_2px_0_#000]">
          <Image
            src="/hero-pixel.png"
            alt=""
            width={700}
            height={700}
            className="h-14 w-14 object-contain pixelated"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
