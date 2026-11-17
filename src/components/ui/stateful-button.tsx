"use client";
// Aceternity Stateful Button: real async completion, failure recovery, reduced motion.
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  successLabel?: string;
  errorLabel?: string;
}

export const Button = ({ className, children, onClick, successLabel = "Done", errorLabel = "Could not complete. Try again.", disabled, type = "button", ...props }: ButtonProps) => {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending.current || disabled) return;
    pending.current = true;
    if (timer.current) clearTimeout(timer.current);
    setStatus("loading");
    try {
      // Call immediately to preserve transient user activation for Clipboard API.
      const action = onClick(event);
      await action;
      setStatus("success");
      if (!reducedMotion && scope.current) {
        void animate(".feedback-label", { scale: [1, 1.06, 1] }, { duration: 0.24 });
      }
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
  };

  return (
    <span className="inline-flex flex-col items-start gap-2">
      <button {...props} type={type} ref={scope} disabled={disabled || status === "loading"} aria-busy={status === "loading"} data-action-state={status}
        className={cn("inline-flex min-h-11 min-w-[150px] items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-70", className)} onClick={handleClick}>
        <span aria-hidden="true" className="relative flex h-5 w-5 items-center justify-center">
          {status === "loading" ? <Loader reducedMotion={!!reducedMotion} /> : status === "success" ? <CheckIcon /> : <span>⧉</span>}
        </span>
        <span className="feedback-label">{status === "loading" ? "Copying…" : status === "success" ? successLabel : children}</span>
      </button>
      <span role="status" aria-live="polite" className={status === "error" ? "max-w-sm text-sm text-amber-100" : "sr-only"}>
        {status === "error" ? errorLabel : status === "success" ? successLabel : ""}
      </span>
    </span>
  );
};

const Loader = ({ reducedMotion }: { reducedMotion: boolean }) => {
  return (
    <motion.svg
      animate={{
        rotate: reducedMotion ? 0 : [0, 360],
      }}
      transition={{
        duration: 0.3,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
