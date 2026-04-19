"use client";

import Block from "@/components/Block";

export default function Staircase() {
  const steps = 4; // number of steps

  return (
    <div
      className="absolute bottom-[64px] right-[4vw] z-50 hidden origin-bottom-right scale-[0.28] items-end sm:right-[12vw] md:flex lg:right-[18vw] xl:right-[300px]"
    >
      {Array.from({ length: steps }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col">
          {Array.from({ length: colIndex + 1 }).map((_, rowIndex) => (
            <Block key={rowIndex} type="empty" />
          ))}
        </div>
      ))}
    </div>
  );
}
