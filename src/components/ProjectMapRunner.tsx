"use client";

import { useEffect, useRef } from "react";
import { advanceAlongRoute, levelDistance, positionOnRoute } from "@/lib/project-map-route";

/** Classic Chopper: pink doctor hat, white X, antlers, and a blue nose. */
function ChopperRunner() {
  return (
    <svg viewBox="0 0 32 36" shapeRendering="crispEdges" focusable="false">
      {/* Branched antlers sit behind the hat, inside the sprite bounds. */}
      <path d="M1 2h3v4h2V3h3v8h2v6H7v-5H3V9H1zM27 1h3v6h2v3h-4v3h-3v4h-4v-7h3V5h3z" fill="#452f31" />
      <path d="M2 3h1v4h4V5h1v6H5V9H2zM28 3h1v5h2v1h-4v3h-2V7h3z" fill="#ba8653" />
      {/* Oversized pink top hat and its crisp white cross. */}
      <path d="M10 1h12v2h3v11h4v5H5v-5h3V3h2z" fill="#493044" />
      <path d="M10 3h12v2h1v10H9V5h1zM6 15h22v3H6z" fill="#df6b92" />
      <path d="M11 3h10v2H11zM9 6h2v8H9zM7 15h19v1H7z" fill="#ffa4bc" />
      <path d="M11 17h16v1H11zM22 5h1v9h-1z" fill="#a54475" />
      <path d="M13 6h2v2h2V6h2v2h-2v2h2v2h-2v-2h-2v2h-2v-2h2V8h-2z" fill="#fff9e8" />
      {/* Ears, tan face, and the nose point toward the direction of travel. */}
      <path d="M7 18h4v2H7zM10 18h15v5h2v2h-4v2H12v-2h-2z" fill="#513637" />
      <path d="M8 18h3v1H8zM12 19h11v5h-2v2h-8v-2h-2v-4h1z" fill="#c99861" />
      <path d="M16 21h8v3h-3v2h-6v-2h1z" fill="#f4d8a4" />
      <path d="M19 19h2v3h-2zM13 19h1v2h-1z" fill="#263241" />
      <path d="M23 21h3v2h-3z" fill="#41b6ea" />
      <path d="M24 21h2v1h-2z" fill="#a7ebff" />
      <path d="M19 24h3v1h-3z" fill="#71504a" />
      <path d="M12 26h10v3h2v4H10v-5h2z" fill="#49363d" />
      <path d="M13 26h7v4h-7z" fill="#c99861" />
      <path d="M16 27h4v3h-4z" fill="#e5bb80" />
      <path d="M11 30h12v3H11z" fill="#ad465a" />
      <g className="map-run-pose map-run-pose-0">
        <path d="M12 32h4v2h-3v2H8v-2h4zM19 32h4v2h3v2h-6v-2h-1z" fill="#49363d" />
        <path d="M12 32h3v2h-3zM20 32h2v2h-2z" fill="#b48054" />
        <path d="M12 27h3v3h-4v2H7v-3h5z" fill="#49363d" />
        <path d="M11 28h3v2h-3zM8 29h3v1H8z" fill="#d4a46c" />
      </g>
      <g className="map-run-pose map-run-pose-1">
        <path d="M12 32h4v4h-5v-2h1zM19 32h4v2h1v2h-5z" fill="#49363d" />
        <path d="M13 32h2v2h-2zM20 32h2v2h-2z" fill="#b48054" />
        <path d="M12 27h3v6h-4v-3h1z" fill="#49363d" />
        <path d="M12 28h2v3h-2z" fill="#d4a46c" />
      </g>
      <g className="map-run-pose map-run-pose-2">
        <path d="M12 32h4v2h2v2h-5v-2h-1zM19 32h4v2h-2v2h-4v-2h2z" fill="#49363d" />
        <path d="M13 32h2v2h-2zM20 32h2v1h-2z" fill="#b48054" />
        <path d="M12 27h3v2h5v3h-5v-2h-3z" fill="#49363d" />
        <path d="M13 28h2v2h-2zM16 29h3v1h-3z" fill="#d4a46c" />
      </g>
      <g className="map-run-pose map-run-pose-3">
        <path d="M12 32h4v4h-5v-2h1zM19 32h5v3h-5z" fill="#49363d" />
        <path d="M13 32h2v2h-2zM20 32h3v1h-3z" fill="#b48054" />
        <path d="M12 27h3v4h-4v-2h1z" fill="#49363d" />
        <path d="M12 28h2v2h-2z" fill="#d4a46c" />
      </g>
    </svg>
  );
}

export default function ProjectMapRunner({ levelId }: { levelId: string }) {
  const layer = useRef<HTMLDivElement>(null);
  const runner = useRef<HTMLDivElement>(null);
  const travelled = useRef(levelDistance(levelId));
  const selectTarget = useRef<((distance: number) => void) | null>(null);
  const initial = positionOnRoute(travelled.current);

  useEffect(() => {
    const element = runner.current;
    const track = layer.current;
    if (!element || !track) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let target = travelled.current;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let visible = false;
    let hopHeight = 32;

    const paint = (moving: boolean, direction?: number) => {
      const position = positionOnRoute(travelled.current);
      element.style.left = `${position.x}%`;
      element.style.top = `${position.y}%`;
      element.style.setProperty("--map-hop", `${position.hop * hopHeight}px`);
      element.dataset.moving = String(moving);
      element.dataset.pose = moving ? (position.hop > .12 ? "3" : String(Math.floor(elapsed / 105) % 4)) : "1";
      if (moving && direction) element.dataset.facing = position.facing * direction < 0 ? "left" : "right";
    };
    const tick = (now: number) => {
      const delta = previous ? Math.min(now - previous, 48) : 0;
      previous = now;
      elapsed += delta;
      const direction = Math.sign(target - travelled.current);
      travelled.current = advanceAlongRoute(travelled.current, target, delta / 1000);
      const moving = travelled.current !== target;
      paint(moving, direction);
      if (moving) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (motion.matches) {
        travelled.current = target;
        paint(false);
      } else if (visible && !document.hidden && travelled.current !== target) {
        frame = requestAnimationFrame(tick);
      } else paint(travelled.current !== target);
    };
    selectTarget.current = (destination) => { target = destination; sync(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(track);
    const resize = new ResizeObserver(() => { hopHeight = Math.min(40, track.clientWidth * .075); paint(travelled.current !== target); });
    resize.observe(track);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    paint(false);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      selectTarget.current = null;
    };
  }, []);

  useEffect(() => { selectTarget.current?.(levelDistance(levelId)); }, [levelId]);

  return (
    <div ref={layer} className="project-map-runner-layer" aria-hidden="true">
      <div ref={runner} className="project-map-runner" data-moving="false" data-pose="1" data-facing="right" style={{ left: `${initial.x}%`, top: `${initial.y}%` }}>
        <span className="map-runner-shadow" />
        <div className="map-runner-lift"><div className="map-runner-facing"><ChopperRunner /></div></div>
      </div>
    </div>
  );
}
