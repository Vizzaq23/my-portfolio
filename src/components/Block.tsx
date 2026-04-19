"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useLayoutEffect, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import useQuestionBlock from "@/hooks/useQuestionBlock";

type BlockProps = {
  type?: "empty" | "question";
  size?: number; // optional override
  /** One skill released per click until the list is done (question blocks). */
  skills?: string[];
};

export default function Block({ type = "empty", size, skills }: BlockProps) {
  const { used, triggerBlock } = useQuestionBlock();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  /** Next index in `skills` to release (0 = first click releases skills[0]). */
  const [nextSkillIndex, setNextSkillIndex] = useState(0);
  const [burst, setBurst] = useState<{
    key: number;
    x: number;
    y: number;
    items: string[];
  } | null>(null);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setNextSkillIndex(0);
  }, [skills]);

  useLayoutEffect(() => {
    if (!burst) return;
    const t = window.setTimeout(() => setBurst(null), 2800);
    return () => window.clearTimeout(t);
  }, [burst]);

  const spawnNextSkill = () => {
    if (!skills?.length || !btnRef.current) return;
    if (nextSkillIndex >= skills.length) return;

    const r = btnRef.current.getBoundingClientRect();
    const label = skills[nextSkillIndex];
    const isLast = nextSkillIndex === skills.length - 1;

    setBurst({
      key: Date.now(),
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      items: [label],
    });
    setNextSkillIndex((i) => i + 1);
    if (isLast) triggerBlock();
  };

  return (
    <div className="relative flex items-center justify-center overflow-visible">
      <button
        ref={btnRef}
        type="button"
        aria-label={type === "question" ? "Question block — one skill per tap" : "Block"}
        onClick={() => {
          if (type === "question") spawnNextSkill();
        }}
        className="m-0 cursor-pointer border-none bg-transparent p-0 active:translate-y-[2px]"
      >
        <Image src={sprite} alt="" width={blockSize} height={blockSize} />
      </button>

      {mounted &&
        burst &&
        createPortal(
          <div
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{ contain: "none" }}
            aria-hidden
          >
            {burst.items.map((label, i) => (
              <span
                key={`${burst.key}-${i}`}
                className="skill-float-burst font-display"
                style={
                  {
                    left: burst.x,
                    top: burst.y,
                    animationDelay: "0ms",
                    "--skill-drift": "0px",
                  } as CSSProperties
                }
              >
                {label}
              </span>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
