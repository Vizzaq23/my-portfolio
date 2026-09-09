"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import OnePieceSprites from "@/components/OnePieceSprites";

const secrets = {
  zoro: {
    number: "01",
    label: "Discover Zoro sleeping on a mushroom",
    title: "A swordsman’s day off",
    message: "Even Zoro needs a nap. Somehow, he’s wandered into the Mushroom Kingdom.",
  },
  luffy: {
    number: "02",
    label: "Discover Gear 5 Luffy by the airships",
    title: "Gear 5, sky high",
    message: "The captain found a new playground. These airships weren’t ready for this much freedom.",
  },
  nami: {
    number: "03",
    label: "Discover Nami riding Zeus",
    title: "The forecast: adventure",
    message: "Nami and Zeus are scouting the next island. Clear skies… for now.",
  },
} as const;

type Secret = keyof typeof secrets;

export default function OnePieceEasterEgg({ kind, placement }: { kind: Secret; placement?: "project-island" }) {
  const secret = secrets[kind];
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const message = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [discovered, setDiscovered] = useState(false);

  useEffect(() => {
    if (!open) return;
    message.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target) && !message.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  return <div
    ref={root}
    className={`one-piece-secret one-piece-secret-${kind}`}
    data-discovered={discovered}
    data-open={open}
    onKeyDown={(event) => {
      if (event.key === "Escape" && open) { event.stopPropagation(); close(); }
    }}
  >
    <button
      ref={trigger}
      className="one-piece-secret-trigger"
      type="button"
      aria-label={kind === "zoro" && placement === "project-island" ? "Discover Zoro sleeping on the project island" : secret.label}
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      onClick={() => { setDiscovered(true); setOpen((value) => !value); }}
    >
      <span className="secret-sprite-motion"><OnePieceSprites kind={kind} /></span>
      <span className="secret-sparkle" aria-hidden="true">✦</span>
    </button>
    {open && createPortal(<div ref={message} className="one-piece-secret-message" id={panelId} role="dialog" aria-label={secret.title}>
      <div className="secret-message-top"><span>One Piece · {secret.number} / 03</span><button type="button" onClick={close} aria-label="Close Easter egg">×</button></div>
      <p className="secret-message-title">{secret.title}</p>
      <p>{secret.message}</p>
    </div>, document.body)}
  </div>;
}
