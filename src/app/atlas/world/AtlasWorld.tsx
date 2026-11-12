"use client";
import { useEffect, useImperativeHandle, useRef, useState, type PointerEvent, type Ref } from "react";
import Image from "next/image";
import Link from "next/link";
import { journeyProjects } from "./journey";
import type { Project } from "@/data/projects";
import RetroOverworld from "@/components/RetroOverworld";
import OnePieceSprites from "@/components/OnePieceSprites";
import Block from "@/components/Block";
import { PixelRunner } from "./PixelRunner";
import Landmark from "./Landmark";
export type WorldController = { goToProject(id: string): HTMLElement | null; focus(): void };
const skills = ["TypeScript", "Next.js", "Python", "React", "Tailwind", "APIs", "Supabase", "Git", "CI", "Hardware"];
const destinationLabels = ["The beginning", ...journeyProjects.map(stop => stop.place), "Player Profile", "The Airship", "Contact Underground"];
function nearestDestination(element: HTMLDivElement, centers: number[]) {
  const fraction = element.scrollLeft / Math.max(1, element.scrollWidth - element.clientWidth);
  if (fraction >= .999) return destinationLabels.length - 1;
  if (fraction <= .001) return 0;
  const marker = element.scrollLeft + element.clientWidth * .5;
  let nearest = 0;
  let distance = Infinity;
  centers.forEach((center, index) => {
    const difference = Math.abs(center - marker);
    if (difference < distance) { nearest = index; distance = difference; }
  });
  return nearest;
}
const scenery = <>
  <div className="journey-sky" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span key={index} className="journey-cloud" style={{ left: `${index * 440 + 120}px`, top: `${26 + (index % 3) * 42}px` }} />)}</div>
  <div className="journey-hills" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <RetroOverworld key={index} />)}</div>
  <div className="journey-ground" aria-hidden="true" />
</>;

export default function AtlasWorld({ onVisit, onRead, onMap, active, controller }: {
  onVisit: (id: string, trigger: HTMLElement) => void;
  onRead: () => void;
  onMap: () => void;
  active: boolean;
  controller: Ref<WorldController>;
}) {
  const [currentStop, setCurrentStop] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const stopCenters = useRef<number[]>([]);
  const progress = useRef<HTMLSpanElement>(null);
  const traveller = useRef<HTMLDivElement>(null);
  const directory = useRef<HTMLDetailsElement>(null);
  const pointer = useRef<{ id: number; x: number; scroll: number; moved: boolean } | null>(null);
  useImperativeHandle(controller, () => ({
    goToProject(id) {
      const index = journeyProjects.findIndex(stop => stop.project.id === id);
      if (index < 0) return null;
      goTo(index + 1, true);
      return scroller.current?.querySelector<HTMLElement>(`[data-journey-stop="${id}"] button`) ?? null;
    },
    focus() { scroller.current?.focus({preventScroll: true}); },
  }));
  useEffect(() => { if (active) scroller.current?.focus({preventScroll: true}); }, [active]);
  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    let frame = 0;
    let settle = 0;
    let lastScroll = element.scrollLeft;
    const measure = () => {
      stopCenters.current = Array.from(element.querySelectorAll<HTMLElement>("[data-journey-stop]")).map(section => section.offsetLeft + section.offsetWidth / 2);
    };
    const update = () => {
      const nearest = nearestDestination(element, stopCenters.current);
      const fraction = element.scrollLeft / Math.max(1, element.scrollWidth - element.clientWidth);
      setCurrentStop(previous => previous === nearest ? previous : nearest);
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`;
      if (traveller.current && element.clientWidth) {
        const delta = element.scrollLeft - lastScroll;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const x = element.scrollLeft + Math.min(365, element.clientWidth * (element.clientWidth < 768 ? .12 : .3));
        traveller.current.style.transform = `translate3d(${Math.round(x / 2) * 2}px,0,0)`;
        if (delta) traveller.current.dataset.facing = delta < 0 ? "left" : "right";
        traveller.current.dataset.pose = reduced || !delta ? "1" : String(Math.floor(element.scrollLeft / 18) % 4);
        window.clearTimeout(settle);
        settle = window.setTimeout(() => { if (traveller.current) traveller.current.dataset.pose = "1"; }, 140);
        lastScroll = element.scrollLeft;
      }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(() => { measure(); schedule(); });
    observer.observe(element);
    element.addEventListener("scroll", schedule, { passive: true });
    measure();
    update();
    return () => { cancelAnimationFrame(frame); window.clearTimeout(settle); observer.disconnect(); element.removeEventListener("scroll", schedule); };
  }, []);

  function goTo(index: number, instant = false) {
    const element = scroller.current;
    const target = element?.querySelectorAll<HTMLElement>("[data-journey-stop]")[index];
    if (!element || !target) return;
    element.scrollTo({
      left: Math.max(0, target.offsetLeft - (element.clientWidth - target.offsetWidth) / 2),
      behavior: instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    if (directory.current?.open) {
      directory.current.open = false;
      directory.current.querySelector("summary")?.focus({ preventScroll: true });
    }
  }

  function openProject(project: Project, trigger: HTMLElement) {
    onVisit(project.id, trigger);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("button,a,summary")) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    pointer.current = { id: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    if (!start || start.id !== event.pointerId) return;
    const delta = event.clientX - start.x;
    if (!start.moved && Math.abs(delta) < 5) return;
    start.moved = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.scrollLeft = start.scroll - delta;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    pointer.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return <div className="portfolio-journey" data-view="world">
    <section id="atlas-world" className="journey-explorer" aria-label="Explore Quintin’s portfolio world">
      <div className="journey-topline">
        <p><span className="journey-status-light" /> Drag the scenery to explore</p>
        <div className="atlas-world-links"><button onClick={onMap}>Map overview ↗</button><button onClick={onRead}>Read all projects ↗</button></div>
        <span className="journey-mobile-hint">Swipe to explore →</span>
      </div>
      <div ref={scroller} className="journey-viewport" tabIndex={0} role="region" aria-label="Side-scrolling portfolio world" aria-describedby="journey-instructions"
        onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            event.currentTarget.scrollBy({left: event.key === "ArrowRight" ? 64 : -64, behavior: "instant"});
            return;
          }
          if (event.key === "Enter") {
            const stopIndex = nearestDestination(event.currentTarget, stopCenters.current);
            if (stopIndex === 0) return;
            event.preventDefault();
            const stop = journeyProjects[stopIndex - 1];
            if (stop) openProject(stop.project, event.currentTarget);
            else window.location.href = "/#" + ["about", "experience", "contact"][stopIndex - journeyProjects.length - 1];
            return;
          }
          const keys: Record<string, number> = { Home: 0, End: destinationLabels.length - 1 };
          if (event.key in keys) { event.preventDefault(); goTo(keys[event.key], true); }
        }}>
        <div className="journey-track">
          {scenery}
          <div ref={traveller} className="journey-traveller level-runner" data-pose="1" aria-hidden="true"><PixelRunner /></div>

          <section className="journey-start" data-journey-stop="start" aria-labelledby="journey-title">
            <div className="journey-intro">
              <p className="journey-eyebrow">SOFTWARE ENGINEER / COMPUTER ENGINEERING GRADUATE</p>
              <h1 id="journey-title">Quintin Vizza<span>.</span></h1>
              <p className="journey-intro-role">Full-stack engineer. Player at heart.</p>
              <p className="journey-intro-description">I build full-stack products, data tools, and interactive systems—from production dashboards to software that powers physical hardware.</p>
              <p className="journey-availability"><span /> Open to full-time software engineering<br />NYC, Long Island & remote</p>
              <div className="journey-intro-actions"><button type="button" className="journey-button journey-button-gold" onClick={() => goTo(1)}>Explore my work <span aria-hidden="true">→</span></button><a href="/resume" className="journey-text-link">View résumé ↗</a></div>
            </div>
            <div className="journey-start-props">
              <div className="journey-question"><Block type="question" skills={skills} size={56} /><span>A few things I build with</span></div>
              <div className="journey-start-pipe" aria-hidden="true" />
              <div className="journey-path-sign" aria-hidden="true">PROJECTS <span>→</span></div>
              <span className="journey-next-hint">Up ahead <strong>Pioneer Arcade</strong></span>
            </div>
          </section>

          {journeyProjects.map(({ project, place, kind, chapter }, index) => <section key={project.id} data-journey-stop={project.id} className={`journey-project-stop journey-stop-${kind}`} aria-label={`${place}: ${project.title}`}>
            <div className="journey-stop-caption"><p className="journey-eyebrow">{String(index + 1).padStart(2, "0")} / {chapter}</p><h2>{project.title}</h2><p className="journey-stop-summary">{project.summary}</p><span className="journey-stop-meta">{project.year} <span aria-hidden="true">·</span> {project.category}</span></div>
            <button type="button" className="journey-landmark-button" aria-label={`Explore project: ${project.title}`} onClick={event => openProject(project, event.currentTarget)}>
              <Landmark project={project} kind={kind} place={place} />
              <span className="journey-enter-label">Explore project <span aria-hidden="true">↗</span></span>
            </button>
            {kind === "ship" && <div className="journey-sprite journey-sprite-luffy"><OnePieceSprites kind="luffy" /></div>}
            {kind === "cards" && <div className="journey-sprite journey-sprite-zoro"><OnePieceSprites kind="zoro" /></div>}
            {kind === "shop" && <div className="journey-sprite journey-sprite-nami"><OnePieceSprites kind="nami" /></div>}
            <span className="journey-milepost" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </section>)}

          <section className="journey-section-stop journey-profile-stop" data-journey-stop="about" aria-labelledby="journey-about-title">
            <div className="journey-stop-caption"><p className="journey-eyebrow">BEYOND THE BUILDS</p><h2 id="journey-about-title">The engineer<br />behind the projects.</h2><p>Background, skills, and a habit of building.</p><Link href="/#about" className="journey-button journey-button-gold">Meet Quintin →</Link></div>
            <Image className="journey-profile-art" src="/worlds/mushroom-platform.webp" width={360} height={240} alt="" />
            <div className="journey-sprite journey-profile-sprite"><OnePieceSprites kind="nami" /></div>
          </section>
          <section className="journey-section-stop journey-airship-stop" data-journey-stop="experience" aria-labelledby="journey-experience-title">
            <div className="journey-stop-caption"><p className="journey-eyebrow">THE JOURNEY SO FAR</p><h2 id="journey-experience-title">Experience<br />& education.</h2><p>Production work. Engineering foundations.</p><Link href="/#experience" className="journey-button journey-button-gold">View experience →</Link></div>
            <Image className="journey-airship-art" src="/airship.svg" width={420} height={240} alt="" unoptimized />
          </section>
          <section className="journey-section-stop journey-contact-stop" data-journey-stop="contact" aria-labelledby="journey-contact-title">
            <div className="journey-stop-caption"><p className="journey-eyebrow">NEXT LEVEL, TOGETHER</p><h2 id="journey-contact-title">Let’s build<br />what’s next.</h2><p>Open to full-time software engineering opportunities.</p><Link href="/#contact" className="journey-button journey-button-gold">Get in touch →</Link><a className="journey-contact-email" href="mailto:qmviz23@gmail.com">qmviz23@gmail.com ↗</a></div>
            <Image className="journey-castle" src="/castle.png" width={200} height={190} alt="" unoptimized />
            <span className="journey-finish-flag" aria-hidden="true" />
          </section>
        </div>
      </div>
      <div className="journey-controls">
        <div className="journey-current"><span className="journey-eyebrow">YOU ARE HERE</span><p aria-live="polite" aria-atomic="true">{destinationLabels[currentStop]}</p></div>
        <p id="journey-instructions">Drag the scenery or swipe sideways.<br /><span>Focus the world: ← → to move · Enter to visit · Home / End</span></p>
        <div className="journey-controls-actions">
          <details ref={directory} className="journey-directory" onKeyDown={event => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}>
            <summary>All destinations <span aria-hidden="true">+</span></summary>
            <nav aria-label="World destinations"><p className="journey-eyebrow">TAKE A SHORTCUT</p><button type="button" onClick={() => goTo(0)}>The beginning <span>00</span></button>{journeyProjects.map(({ project }, index) => <button type="button" key={project.id} onClick={() => goTo(index + 1)}>{project.title}<span>{String(index + 1).padStart(2, "0")}</span></button>)}<Link href="/#about">About & skills →</Link><Link href="/#experience">Experience & education →</Link><Link href="/#contact">Contact →</Link><button onClick={onRead}>Read all projects ↗</button></nav>
          </details>
          <button type="button" className="journey-arrow" disabled={currentStop === 0} aria-label="Previous destination" onClick={() => goTo(currentStop - 1)}>←</button>
          <button type="button" className="journey-arrow" disabled={currentStop === destinationLabels.length - 1} aria-label="Next destination" onClick={() => goTo(currentStop + 1)}>→</button>
        </div>
        <div className="journey-progress" aria-hidden="true"><span ref={progress} /></div>
      </div>
    </section>
  </div>;
}
