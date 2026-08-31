"use client";

import Image from "next/image";

export default function Platforms() {
  return (
    <div
      className="absolute bottom-[12vh] left-1/2 z-40 flex -translate-x-1/2 gap-4"
      aria-hidden
    >
      {/* Left platform */}
      <Image
        src="/platforms.png"
        alt=""
        width={40}
        height={11}
        className="object-contain pixelated"
      />

      {/* Middle platform (higher) */}
      <div className="relative -top-6">
        <Image
          src="/platforms.png"
          alt=""
          width={40}
          height={11}
          className="object-contain pixelated"
        />
      </div>

      {/* Right platform */}
      <Image
        src="/platforms.png"
        alt=""
        width={40}
        height={11}
        className="object-contain pixelated"
      />
    </div>
  );
}
