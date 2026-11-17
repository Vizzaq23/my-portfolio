"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./map-wave.module.css";

/** Original canvas strip deformation; no Aceternity Pro code or dependencies. */
export default function MapWaveSurface({ children }: { children: ReactNode }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!surface || !canvas || !context) return;

    const image = new window.Image();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const levels = Array.from(surface.querySelectorAll<HTMLElement>(".project-level"));
    const runner = surface.querySelector<HTMLElement>(".project-map-runner");
    let loaded = false;
    let visible = false;
    let keyboardFocus = false;
    let targeting = false;
    let disposed = false;
    let frame = 0;
    let last = 0;
    let phase = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let rotateX = 0;
    let rotateY = 0;
    let targetX = 0;
    let targetY = 0;
    let dirty = true;
    const strips = 112;

    const enabled = () => loaded && pointer.matches && !reduced.matches && !keyboardFocus
      && document.documentElement.dataset.sceneryPaused !== "true"
      && document.documentElement.dataset.portfolioWalking !== "true";
    const offset = (x: number) => Math.sin(x * Math.PI) * Math.sin(x * Math.PI * 2.2 - phase) * Math.min(13, width * 0.011);
    const alignAnchors = (flat = false) => {
      for (const level of levels) {
        const x = parseFloat(level.style.getPropertyValue("--level-x")) / 100;
        level.style.translate = flat ? "" : `0 ${offset(x).toFixed(2)}px`;
      }
      if (runner) {
        const x = parseFloat(runner.style.left) / 100;
        runner.style.translate = flat ? "" : `0 ${offset(x).toFixed(2)}px`;
      }
    };
    const flatten = () => {
      surface.dataset.waveReady = "false";
      surface.dataset.waveState = "flat";
      surface.style.transform = "";
      alignAnchors(true);
      rotateX = rotateY = targetX = targetY = 0;
      dirty = true;
    };
    const paint = () => {
      if (!width || !height) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = false;
      const sourceWidth = image.naturalWidth / strips;
      const stripWidth = width / strips;
      for (let i = 0; i < strips; i++) {
        const x = (i + 0.5) / strips;
        const dy = offset(x);
        context.drawImage(image, i * sourceWidth, 0, sourceWidth, image.naturalHeight,
          i * stripWidth, dy, stripWidth + 0.6, height);
        // A restrained crest highlight gives the sheet depth without recoloring the art.
        const light = Math.cos(x * Math.PI * 2.2 - phase) * Math.sin(x * Math.PI);
        context.fillStyle = light > 0 ? `rgba(255,248,215,${light * 0.045})` : `rgba(5,28,49,${-light * 0.065})`;
        context.fillRect(i * stripWidth, dy, stripWidth + 0.6, height);
      }
      surface.style.transform = `perspective(1800px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(.988)`;
      surface.dataset.waveReady = "true";
      surface.dataset.waveState = targeting ? "held" : "waving";
      dirty = false;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!enabled() || !visible || document.hidden || disposed) return;
      if (now - last >= 1000 / 30) {
        const seconds = last ? Math.min((now - last) / 1000, 0.08) : 0;
        last = now;
        if (!targeting) {
          phase += seconds * 0.65;
          rotateX += (targetX - rotateX) * 0.12;
          rotateY += (targetY - rotateY) * 0.12;
          dirty = true;
        }
        if (dirty) paint();
        alignAnchors();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (!enabled()) flatten();
      else if (visible && !document.hidden) {
        dirty = true;
        frame = requestAnimationFrame(tick);
      } else surface.dataset.waveState = "paused";
    };
    const resize = new ResizeObserver(() => {
      width = surface.clientWidth;
      height = surface.clientHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      dirty = true;
      sync();
    });
    resize.observe(surface);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    visibility.observe(surface);
    const scenery = new MutationObserver(sync);
    scenery.observe(document.documentElement, { attributes: true, attributeFilter: ["data-scenery-paused", "data-portfolio-walking"] });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled()) return;
      targeting = event.target instanceof Element && !!event.target.closest("button, a");
      if (targeting) { surface.dataset.waveState = "held"; return; }
      const box = surface.getBoundingClientRect();
      targetX = ((event.clientY - box.top) / box.height - 0.5) * -2;
      targetY = ((event.clientX - box.left) / box.width - 0.5) * 2.6;
    };
    const onLeave = () => { targeting = false; targetX = targetY = 0; };
    const onFocus = () => {
      // Keyboard focus uses the original, undeformed surface and native button geometry.
      if (surface.querySelector(":focus-visible")) { keyboardFocus = true; sync(); }
    };
    const onBlur = (event: FocusEvent) => {
      if (!(event.relatedTarget instanceof Node) || !surface.contains(event.relatedTarget)) {
        keyboardFocus = false;
        sync();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (["Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        keyboardFocus = true;
        sync();
      }
    };
    surface.addEventListener("pointermove", onMove, { passive: true });
    surface.addEventListener("pointerleave", onLeave);
    surface.addEventListener("focusin", onFocus);
    surface.addEventListener("focusout", onBlur);
    surface.addEventListener("keydown", onKey);
    reduced.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    image.onload = () => { if (!disposed) { loaded = true; sync(); } };
    image.onerror = () => { loaded = false; sync(); };
    image.src = "/worlds/project-level-map.webp";

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      scenery.disconnect();
      reduced.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerleave", onLeave);
      surface.removeEventListener("focusin", onFocus);
      surface.removeEventListener("focusout", onBlur);
      surface.removeEventListener("keydown", onKey);
      image.onload = image.onerror = null;
      flatten();
    };
  }, []);

  return <div ref={surfaceRef} className={`project-map-artboard ${styles.surface}`} data-map-wave="" data-wave-ready="false">
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    {children}
  </div>;
}
