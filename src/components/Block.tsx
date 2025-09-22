"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import useQuestionBlock from "@/hooks/useQuestionBlock";

type BlockProps = {
  type?: "empty" | "question";
  size?: number; // optional override
};

export default function Block({ type = "empty", size }: BlockProps) {
  const { used, coinKey, triggerBlock } = useQuestionBlock();

  const [blockSize, setBlockSize] = useState(size ?? 50); // default 50px

  useEffect(() => {
    function updateSize() {
      let newSize = size ?? window.innerWidth * 0.06; // 6vw
      if (newSize < 40) newSize = 40; // min
      if (newSize > 80) newSize = 80; // max
      setBlockSize(newSize);
    }

    updateSize(); // run on mount
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size]);

  const sprite =
    type === "question"
      ? used
        ? "/emptyBlock.png"
        : "/questionBlock.png"
      : "/emptyBlock.png";

  return (
    <div className="relative overflow-visible flex items-center justify-center">
      {/* Block */}
      <button
        onClick={() => {
          if (type === "question") triggerBlock();
        }}
        className="p-0 m-0 border-none bg-transparent cursor-pointer active:translate-y-[2px]"
      >
        <Image src={sprite} alt={type} width={blockSize} height={blockSize} />
      </button>

      {/* Coin animation */}
      {coinKey > 0 && (
        <Image
          key={coinKey}
          src="/coin.png"
          alt="Coin"
          width={blockSize * 0.8}
          height={blockSize * 0.8}
          className="coin-anim"
        />
      )}
    </div>
  );
}
