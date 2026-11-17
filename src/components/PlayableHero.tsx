"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PortfolioWalk from "./PortfolioWalk";
import { PlayerSprite } from "./HeroIdleSprite";
import RetroOverworld from "./RetroOverworld";
import Ground from "./Ground";
import Block from "./Block";
import Platforms from "./Platforms";
import WarpPipeLink from "./WarpPipeLink";
import Staircase from "./Staircase";
import EndScene from "./EndScene";
import styles from "./playable-hero.module.css";

const bindings: Record<string, string> = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", Space: "jump", ArrowUp: "jump", KeyW: "jump" };
type Body = { x: number; right: number; top: number; bottom: number; oneWay: boolean; element: HTMLElement };
const fresh = () => ({ x: 20, y: 0, vy: 0, grounded: true, coyote: .1, buffer: 0, facing: 1, time: 0 });

/** Keyboard physics layered over the original scene components and their real bounds. */
export default function PlayableHero() {
  const scene = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const state = useRef(fresh());
  const inputs = useRef(new Set<string>());
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [exploring, setExploring] = useState(false);
  const exploreButton = useRef<HTMLButtonElement>(null);
  const exitExploration = useCallback(() => {
    setExploring(false);
    exploreButton.current?.focus({preventScroll:true});
  }, []);
  const pause = () => { inputs.current.clear(); setPlaying(false); };
  const start = () => {
    if (finished) { state.current = fresh(); setFinished(false); }
    setPlaying(true); scene.current?.focus({ preventScroll: true });
  };
  const press = (code: string) => {
    if (bindings[code] === "jump" && !inputs.current.has(code)) state.current.buffer = .12;
    inputs.current.add(code);
  };
  const lift = (code: string) => {
    inputs.current.delete(code);
    if (bindings[code] === "jump" && state.current.vy > 0) state.current.vy *= .45;
  };

  useEffect(() => {
    if (!playing || !scene.current) return;
    const root = scene.current;
    let frame = 0, previous = 0, accumulator = 0;
    let width = root.clientWidth, finishX = width - 110;
    let bodies: Body[] = [];
    const measure = () => {
      const bounds = root.getBoundingClientRect();
      const floor = bounds.bottom - 64;
      width = root.clientWidth;
      bodies = Array.from(root.querySelectorAll<HTMLElement>(".level-pipe, .level-staircase > div, .world-block, .platform-pixel-tile")).flatMap(element => {
        const r = element.getBoundingClientRect();
        return r.width && r.height ? [{ x: r.left - bounds.left, right: r.right - bounds.left, top: floor - r.top, bottom: floor - r.bottom, oneWay: element.classList.contains("platform-pixel-tile"), element }] : [];
      });
      const flag = root.querySelector('.level-flagpole')?.getBoundingClientRect();
      finishX = flag ? flag.left - bounds.left : width - 110;
      state.current.x = Math.max(0, Math.min(state.current.x, width - 72));
    };
    measure();
    // Observe after initial size delivery without treating it as a user resize.
    let firstResize = true;
    const observer = new ResizeObserver(() => { if (firstResize) { firstResize = false; return; } measure(); inputs.current.clear(); setPlaying(false); });
    observer.observe(root);
    const tick = (now: number) => {
      accumulator += previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      const s = state.current;
      const dt = 1 / 120;
      while (accumulator >= dt) {
        accumulator -= dt;
        const actions = new Set(Array.from(inputs.current, key => bindings[key]));
        const direction = Number(actions.has("right")) - Number(actions.has("left"));
        s.time += dt; s.buffer -= dt;
        s.coyote = s.grounded ? .1 : s.coyote - dt;
        if (s.buffer > 0 && s.coyote > 0) { s.vy = 820; s.buffer = 0; s.coyote = 0; s.grounded = false; }
        let nextX = Math.max(0, Math.min(width - 72, s.x + direction * 260 * dt));
        // The artwork has transparent padding; collision follows its visible body.
        for (const b of bodies) {
          if (b.oneWay || s.y >= b.top - .5 || s.y + 90 <= b.bottom + .5) continue;
          if (nextX + 54 > b.x && nextX + 18 < b.right) {
            if (direction > 0 && s.x + 54 <= b.x + 1) nextX = b.x - 54;
            if (direction < 0 && s.x + 18 >= b.right - 1) nextX = b.right - 18;
          }
        }
        s.x = nextX;
        if (direction) s.facing = direction;
        const oldY = s.y;
        s.vy -= (s.vy > 0 ? 1800 : 2400) * dt;
        s.y += s.vy * dt; s.grounded = false;
        for (const b of bodies) {
          if (s.x + 54 <= b.x || s.x + 18 >= b.right) continue;
          if (s.vy <= 0 && oldY >= b.top - .5 && s.y <= b.top) { s.y = b.top; s.vy = 0; s.grounded = true; }
          else if (!b.oneWay && s.vy > 0 && oldY + 90 <= b.bottom + .5 && s.y + 90 >= b.bottom) {
            s.y = b.bottom - 90; s.vy = 0;
            if (b.element.matches('button[aria-label^="Question block"]')) b.element.click();
          }
        }
        if (s.y <= 0) { s.y = 0; s.vy = 0; s.grounded = true; }
        if (s.x + 40 >= finishX && s.grounded) { inputs.current.clear(); setFinished(true); setPlaying(false); }
      }
      if (player.current) {
        player.current.style.transform = `translate3d(${Math.round(s.x)}px,${-Math.round(s.y)}px,0) scaleX(${s.facing})`;
        const moving = Array.from(inputs.current).some(key => ['left','right'].includes(bindings[key]));
        player.current.dataset.pose = !s.grounded ? "4" : moving ? String(Math.floor(s.time * 9) % 4) : "1";
        player.current.dataset.x = String(Math.round(s.x)); player.current.dataset.y = String(Math.round(s.y));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const stop = () => { inputs.current.clear(); setPlaying(false); };
    const visibility = () => { if (document.hidden) stop(); };
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", visibility);
    const intersection = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    intersection.observe(root);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); window.removeEventListener("blur", stop); document.removeEventListener("visibilitychange", visibility); };
  }, [playing]);

  return <div className={styles.level}>
    <div className={styles.controls}>
      <button onClick={playing ? pause : start}>{finished ? "Play again" : playing ? "Pause level" : "Play level"}</button>
      <button ref={exploreButton} onClick={() => { pause(); setExploring(true); }}>Explore portfolio</button>
      <span id="original-level-controls" role="status">{finished ? "Flag reached!" : "← → / A D move · Space / ↑ / W jump · Esc pause"}</span>
    </div>
    <div ref={scene} className={styles.scene} data-playing={playing} tabIndex={0} role="group" aria-label="Original Mario level" aria-describedby="original-level-controls"
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) pause(); }}
      onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.code === "Escape") { pause(); return; } if (playing && bindings[event.code]) { event.preventDefault(); if (!event.repeat) press(event.code); } }}
      onKeyUp={event => { if (playing && bindings[event.code]) { event.preventDefault(); lift(event.code); } }}>
      <RetroOverworld />
      <div className="level-skill-blocks absolute z-[40] flex gap-3 sm:gap-4">
        <div className="hidden sm:block"><Block type="empty" /></div>
        <Block type="question" skills={["TypeScript", "Next.js", "Python", "React", "Tailwind"]} />
        <div className="hidden sm:block"><Block type="empty" /></div>
        <Block type="question" skills={["APIs", "Supabase", "Git", "CI", "Hardware"]} />
        <div className="hidden sm:block"><Block type="empty" /></div>
      </div>
      <Platforms />
      <div className="absolute bottom-0 w-full"><Ground /></div>
      <WarpPipeLink href="#contact" label="Contact" className="runner-obstacle absolute bottom-[64px] left-[12%] z-[38] -translate-x-1/2 sm:left-[18%]" />
      <div ref={player} className={`level-runner ${styles.player}`} data-pose="1" data-x="20" data-y="0" aria-hidden="true"><PlayerSprite /></div>
      <div className="pointer-events-none absolute inset-0 z-[45]"><Staircase /><EndScene /></div>
    </div>
    <div className={styles.touch} aria-label="Touch game controls">
      {[["ArrowLeft","Move left","←"],["ArrowRight","Move right","→"],["Space","Jump","Jump"]].map(([code,label,text]) => <button key={code} aria-label={label} disabled={!playing}
        onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); press(code); }}
        onPointerUp={() => lift(code)} onPointerCancel={() => lift(code)} onLostPointerCapture={() => lift(code)}>{text}</button>)}
    </div>
    {exploring && <PortfolioWalk onExit={exitExploration} />}
  </div>;
}
