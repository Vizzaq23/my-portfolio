"use client";

import { useEffect, useState } from "react";

export default function SceneryToggle() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let saved: string | null = null;
      try { saved = sessionStorage.getItem("portfolio-scenery-paused"); } catch { /* Storage is optional. */ }
      const next = preference.matches || saved === "true";
      setReducedMotion(preference.matches);
      document.documentElement.dataset.sceneryPaused = String(next);
      setPaused(next);
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  return <button type="button" className="scenery-toggle" disabled={reducedMotion} aria-pressed={paused} onClick={() => {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.sceneryPaused = String(next);
    try { sessionStorage.setItem("portfolio-scenery-paused", String(next)); } catch { /* The control still works without storage. */ }
  }}>{reducedMotion ? "Reduced motion enabled" : "Pause scenery"}</button>;
}
