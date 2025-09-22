"use client";

import Image from "next/image";

export default function EndScene() {
  const groundHeight = 42; // same as Ground tile height

  return (
    <div
      className="absolute right-8 flex items-end gap-10"
      style={{ bottom: groundHeight }}
    >
      {/* Flagpole + Flag */}
      <div className="relative w-[40px] h-[140px]">
        {/* Pole */}
        <Image
          src="/flagpole.png"
          alt="Flagpole"
          fill
          className="object-contain"
        />

        {/* Flag */}
        <Image
          src="/flag.png"
          alt="Flag"
          width={40}
          height={40}
          className="absolute animate-rise-then-ripple"
          style={{
            left: "10px", // move flag slightly right from the pole
          }}
        />
      </div>

      {/* Castle */}
      <div className="relative">
        <Image
          src="/castle.png"
          alt="Castle"
          width={180}
          height={180}
          className="object-contain"
          style={{
            bottom: "20px", // lift castle a bit above ground line
            position: "relative",
          }}
        />
      </div>
    </div>
  );
}
