"use client";

import Block from "@/components/Block";

export default function Staircase() {
  const steps = 4; // number of steps

  return (
    <div
      className="absolute bottom-[64px] right-[300px] flex items-end z-50 scale-[0.30] origin-bottom-right"
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
