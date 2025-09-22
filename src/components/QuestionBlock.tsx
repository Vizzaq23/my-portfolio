"use client";

import { useState } from "react";
import Coin from "./Coin";

export default function QuestionBlock() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (!active) {
      setActive(true);
      setTimeout(() => setActive(false), 1200); // reset after animation
    }
  };

  return (
    <div className="relative w-16 h-16">
      {/* Question Block */}
      <div
        onClick={handleClick}
        className={`w-16 h-16 bg-[url('/questionBlock.png')] bg-cover pixelated cursor-pointer transition-transform ${
          active ? "-translate-y-2" : ""
        }`}
      />

      {/* Coin animation */}
      {active && (
        <div className="absolute left-0 top-0 animate-coin-pop">
          <Coin />
        </div>
      )}
    </div>
  );
}
