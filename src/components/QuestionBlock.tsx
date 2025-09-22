"use client";

import { useState } from "react";
import Coin from "./Coin";

export default function QuestionBlock() {
  const [used, setUsed] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (!used) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        setUsed(true); // turn into empty block
      }, 1200); // animation length
    }
  };

  return (
    <div className="relative w-16 h-16">
      {/* Block itself */}
      <div
        onClick={handleClick}
        className={`w-16 h-16 bg-cover pixelated cursor-pointer transition-transform ${
          active ? "-translate-y-2" : ""
        }`}
        style={{
          backgroundImage: used
            ? "url('/emptyBlock.png')" // transparent empty block PNG
            : "url('/questionBlock.png')", // transparent question block PNG
        }}
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
