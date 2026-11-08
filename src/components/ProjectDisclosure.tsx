"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/motion-primitives/disclosure";

export default function ProjectDisclosure({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <Disclosure className={`project-disclosure ${className}`} transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}>
      <DisclosureTrigger>
        <button type="button" className="disclosure-trigger"><span>{title}</span><ChevronDown size={16} aria-hidden="true" /></button>
      </DisclosureTrigger>
      <DisclosureContent>{children}</DisclosureContent>
    </Disclosure>
  );
}
