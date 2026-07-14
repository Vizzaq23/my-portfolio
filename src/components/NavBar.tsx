"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinkClass =
  "no-underline inline-flex min-h-9 items-center gap-1 rounded-sm px-2 py-1.5 text-[9px] font-display uppercase tracking-wide border-2 border-white shadow-[2px_2px_0px_#fff] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 sm:min-h-10 sm:gap-1.5 sm:px-2.5 sm:text-[10px] md:px-3 md:text-xs";

const worldBySection: { id: string; world: string }[] = [
  { id: "top", world: "1-1" },
  { id: "projects", world: "2-1" },
  { id: "about", world: "3-1" },
  { id: "experience", world: "4-1" },
  { id: "contact", world: "5-1" },
];

export default function NavBar() {
  const [time, setTime] = useState(300);
  const [world, setWorld] = useState("1-1");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elements = worldBySection
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        const match = worldBySection.find((entry) => entry.id === id);
        if (match) setWorld(match.world);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full border-b-4 border-white bg-black"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-2 py-1.5 sm:px-4 sm:py-2">
        <div className="flex w-full items-start justify-between font-display text-[9px] tracking-widest text-white sm:text-[10px] md:text-xs">
          <div className="flex flex-col leading-tight">
            <span>Quintin</span>
            <span>000100</span>
          </div>
          <div className="flex flex-col items-center leading-tight">
            <span>COINS</span>
            <span>x03</span>
          </div>
          <div className="flex flex-col items-center leading-tight">
            <span>WORLD</span>
            <span>{world}</span>
          </div>
          <div className="flex flex-col items-end leading-tight">
            <span>TIME</span>
            <span>{time}</span>
          </div>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <li>
            <a href="#projects" className={`${navLinkClass} bg-gray-200 text-black`}>
              <Image src="/coin.png" alt="" width={14} height={14} className="pixelated h-3.5 w-3.5" />
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="#about" className={`${navLinkClass} bg-green-500 text-white`}>
              <Image src="/flag.png" alt="" width={14} height={14} className="pixelated h-3.5 w-3.5" />
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="#experience" className={`${navLinkClass} bg-yellow-300 text-black`}>
              <span>XP</span>
            </a>
          </li>
          <li>
            <a href="#contact" className={`${navLinkClass} bg-red-500 text-white`}>
              <Image src="/letter.png" alt="" width={14} height={14} className="pixelated h-3.5 w-3.5" />
              <span>Contact</span>
            </a>
          </li>
          <li>
            <a href="/resume.pdf" className={`${navLinkClass} bg-amber-400 text-black`}>
              <span>Résumé</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Vizzaq23"
              target="_blank"
              rel="noopener noreferrer"
              className={`${navLinkClass} bg-slate-700 text-white`}
              aria-label="GitHub profile (opens in a new tab)"
            >
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
