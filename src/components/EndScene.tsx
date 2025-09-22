"use client";

import { useEffect, useState } from "react";

export default function EndScene() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="absolute right-4 bottom-16 flex items-end space-x-4">
      {/* Flagpole container */}
      <div className="relative h-[160px]"> {/* 5 grass tiles tall (5 × 32px) */}
        <img
          src="/flagPole.png"
          alt="Flagpole"
          className="h-[160px] w-auto pixelated"
        />
        <img
          src="/flag.png"
          alt="Flag"
          className={`absolute -right-2 h-10 w-auto pixelated ${
            animate ? "animate-rise-then-ripple" : ""
          }`}
          style={{ bottom: "0" }}
        />
      </div>

      {/* Castle */}
      <img
        src="/castle.png"
        alt="Castle"
        className="w-[92px] h-36" // 3 grass tiles wide
      />
    </div>
  );
}
