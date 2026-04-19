"use client";

import Image from "next/image";

type Props = {
  href: string;
  /** Shown on hover (small HUD label) */
  label: string;
  /** Positioning: place with `absolute bottom-* left-*` etc. */
  className?: string;
};

/**
 * Mario-style warp pipe used as an in-page anchor (hero ↔ contact).
 * Kept behind the hero sprite (lower z-index); sprite uses pointer-events-none so taps still hit the pipe.
 */
export default function WarpPipeLink({ href, label, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group transition hover:scale-[1.04] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 ${className}`}
      aria-label={label}
    >
      <span className="relative block">
        <Image
          src="/pipe.png"
          alt=""
          width={100}
          height={100}
          className="pointer-events-none drop-shadow-[4px_4px_0_#000]"
        />
        <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border-2 border-black bg-brand-accent px-2 py-0.5 font-display text-[10px] font-bold text-black opacity-0 shadow-[2px_2px_0_#000] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:-top-9 sm:text-xs">
          {label}
        </span>
      </span>
    </a>
  );
}
