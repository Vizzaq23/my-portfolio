"use client";

import Image from "next/image";

/** Scrolling hills — render in a layer below the hero sprite (see page.tsx z-order). */
export function HeroHills() {
  const GROUND_H = 42;
  const HILLS_H = 80;

  return (
    <div
      className="absolute inset-x-0 bg-hills"
      style={{ height: HILLS_H, bottom: GROUND_H + 22 }}
    />
  );
}

export default function EndScene() {
  const GROUND_H = 42;     // same as your ground tile height

  return (
    <>
      {/* Flag + castle (hills are a separate layer under the hero) */}
      <div
        className="absolute right-8 flex items-end gap-10 z-30"
        style={{ bottom: GROUND_H }}
      >
        {/* Flagpole + Flag */}
        <div className="relative w-[40px] h-[140px]">
          <Image
            src="/flagpole.png"
            alt="Flagpole"
            fill
            className="object-contain pixelated"
          />
          <Image
            src="/flag.png"
            alt="Flag"
            width={40}
            height={40}
            className="absolute animate-rise-then-ripple pixelated"
            style={{ left: "10px" }}
          />
        </div>

        {/* Castle */}
        <div className="relative">
          <Image
            src="/castle.png"
            alt="Castle"
            width={180}
            height={180}
            className="object-contain pixelated"
            style={{ bottom: "20px", position: "relative" }}
          />
        </div>
      </div>
    </>
  );
}
