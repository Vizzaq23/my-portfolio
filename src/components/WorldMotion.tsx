"use client";

import { useEffect } from "react";

/** Progressive enhancement: content stays visible without JavaScript. */
export default function WorldMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const scenes = Array.from(document.querySelectorAll<HTMLElement>("#top, .project-world, #about, #experience, #contact"));
      const visibleScenes = new Set<Element>();
      const syncSceneMotion = () => scenes.forEach((scene) => {
        scene.dataset.worldActive = String(visibleScenes.has(scene) && !document.hidden);
      });
      const sceneObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleScenes.add(entry.target);
          else visibleScenes.delete(entry.target);
        });
        syncSceneMotion();
      }, { rootMargin: "80px" });
      scenes.forEach((scene) => sceneObserver.observe(scene));
      document.addEventListener("visibilitychange", syncSceneMotion);
      const targets = Array.from(document.querySelectorAll<HTMLElement>(
        "#about > .relative, #experience > .relative, #contact > .relative, #projects h2, #experience ol > li"
      ));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("world-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top > window.innerHeight) {
          target.classList.add("world-reveal");
          observer.observe(target);
        }
      });
      cleanup = () => {
        sceneObserver.disconnect();
        document.removeEventListener("visibilitychange", syncSceneMotion);
        scenes.forEach((scene) => delete scene.dataset.worldActive);
        observer.disconnect();
        targets.forEach((target) => target.classList.remove("world-reveal", "world-revealed"));
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { cleanup(); preference.removeEventListener("change", setup); };
  }, []);
  return null;
}
