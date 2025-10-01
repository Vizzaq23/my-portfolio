"use client";

import { useEffect, useState } from "react";

export default function FlagPole() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="absolute bottom-0 right-44">
      {/* Container for pole + flag */}
      <div className="relative h-48">
        {/* Pole */}
        <img
          src="/flagpole.png"       // <— lowercase path to match the file
          alt="Flagpole"
          className="h-48 w-auto pixelated"
          decoding="async"
          fetchPriority="high"
        />

        {/* Flag */}
        <img
          src="/flag.png"
          alt="Flag"
          className={`absolute -right-2 h-12 w-auto pixelated ${
            animate ? "animate-rise-then-ripple" : ""
          }`}
          style={{ bottom: 15 }}    // <— number = 15px (your "15" string was invalid)
          decoding="async"
        />
      </div>
    </div>
  );
}
