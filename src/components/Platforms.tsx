"use client";

import Image from "next/image";

export default function Platforms() {
  return (
    <div className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 flex gap-4 z-40">
      {/* Left platform */}
      <Image
        src="/platforms.png"
        alt="Platform"
        width={40}
        height={16}
        className="object-contain pixelated"
      />

      {/* Middle platform (higher) */}
      <div className="relative -top-6">
        <Image
          src="/platforms.png"
          alt="Platform"
          width={40}
          height={16}
          className="object-contain pixelated"
        />
      </div>

      {/* Right platform */}
      <Image
        src="/platforms.png"
        alt="Platform"
        width={40}
        height={16}
        className="object-contain pixelated"
      />
    </div>
  );
}
