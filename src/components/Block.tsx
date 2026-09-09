"use client";

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
        tabIndex={type === "empty" ? -1 : undefined}
        aria-hidden={type === "empty" ? true : undefined}
        aria-label={type === "question" ? (nextSkillIndex >= (skills?.length ?? 0) ? "Question block — all skills revealed" : "Question block — one skill per tap") : "Block"}
        aria-disabled={type === "question" && nextSkillIndex >= (skills?.length ?? 0) ? true : undefined}
        onClick={() => {
          if (type === "question") spawnNextSkill();
        }}
        className={`world-block m-0 cursor-pointer border-none bg-transparent p-0 active:translate-y-[2px] ${
          type === "question" && !used ? "question-idle motion-reduce:animate-none" : ""
        }`}
      >
        <span className="block-model" style={size ? { "--block-size": `${size}px` } as CSSProperties : undefined} aria-hidden="true">
          {type === "question" && !used ? (
            <span className="block-gold">
              <span className="block-rivet" /><span className="block-rivet-bottom" />
              <svg className="block-question" viewBox="0 0 48 56" fill="currentColor">
                <path d="M10 4h26v6h6v16h-6v6h-8v8H16V28h6v-6h8V16H16v6H4V10h6Z" />
                <rect x="16" y="45" width="12" height="11" />
              </svg>
            </span>
          ) : (
            <span className="block-masonry">
              {[0, 1, 2].map((row) => <span className="block-brick-row" key={row}>{[0, 1].map((brick) => <span key={brick} />)}</span>)}
            </span>
          )}
        </span>
      </button>

      {type === "question" && <span className="sr-only" aria-live="polite" aria-atomic="true">{nextSkillIndex > 0 ? "Skill: " + skills?.[nextSkillIndex - 1] : ""}</span>}

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
