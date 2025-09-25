"use client";

import Coin from "./coin";
import useQuestionBlock from "@/hooks/useQuestionBlock";
import { useState } from "react";

export default function QuestionBlock() {
  const { used, coinKey, triggerBlock } = useQuestionBlock();
  const [showCoin, setShowCoin] = useState(false);

  const handleClick = () => {
    if (!used) {
      setShowCoin(true);   // show coin once
      triggerBlock();
      setTimeout(() => setShowCoin(false), 1200); // remove after animation
    }
  };

  return (
    <div className="relative w-16 h-16">
      {/* Block */}
      <div
        onClick={handleClick}
        className={`w-16 h-16 bg-cover pixelated cursor-pointer transition-transform ${
          coinKey ? "-translate-y-2" : ""
        }`}
        style={{
          backgroundImage: used
            ? "url('/emptyBlock.png')"
            : "url('/questionBlock.png')",
        }}
      />

      {/* Coin (only one at a time) */}
      {showCoin && (
        <div className="absolute left-0 top-0 animate-coin-pop">
          <Coin />
        </div>
      )}
    </div>
  );
}
