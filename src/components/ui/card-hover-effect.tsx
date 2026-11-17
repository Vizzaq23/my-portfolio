"use client";
// Aceternity Card Hover Effect adapted to semantic, non-interactive About facts.
import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";

import { useId, useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    label: string;
    description: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const id = useId();

  return (
    <LayoutGroup id={id}>
    <dl
      className={cn(
        "profile-proof-grid",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative isolate"
          data-about-fact=""
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                aria-hidden="true"
                data-about-highlight=""
                className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] border-2 border-[#d6a52f] bg-[#fff0ad]"
                layoutId={reducedMotion ? undefined : "hoverBackground"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: reducedMotion ? 0 : 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: reducedMotion ? 0 : 0.15 },
                }}
              />
            )}
          </AnimatePresence>
          <dt className="relative z-10">{item.label}</dt>
          <dd className="relative z-10"><strong>{item.title}</strong><span>{item.description}</span></dd>
        </div>
      ))}
    </dl>
    </LayoutGroup>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-slate-200 border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 dark:border-slate-800",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
