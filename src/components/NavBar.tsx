"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinkClass =
  "no-underline flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-[10px] font-display uppercase tracking-wide border-2 border-white shadow-[2px_2px_0px_#fff] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs";

export default function NavBar() {
  const [time, setTime] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className="fixed left-0 top-0 z-50 flex h-auto min-h-[5rem] w-full flex-col justify-between gap-1 border-b-4 border-white bg-black pb-2 pt-1 sm:h-20 sm:min-h-0"
      aria-label="Primary"
    >
      <div className="flex w-full justify-between px-3 pt-1 font-display text-[10px] text-white tracking-widest sm:px-6 sm:pt-2 sm:text-xs">
        <div className="flex flex-col">
          <span>Quintin</span>
          <span>000100</span>
        </div>
        <div className="flex flex-col items-center">
          <span>COINS</span>
          <span>x03</span>
        </div>
        <div className="flex flex-col items-center">
          <span>WORLD</span>
          <span>2-1</span>
        </div>
        <div className="flex flex-col items-end">
          <span>TIME</span>
          <span aria-live="polite">{time}</span>
        </div>
      </div>

      <div className="flex w-full justify-center px-1">
        <ul className="flex max-w-full flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
          <li>
            <a href="#projects" className={`${navLinkClass} bg-gray-200 text-black`}>
              <Image src="/coin.png" alt="" width={16} height={16} className="pixelated h-4 w-4" />
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="#about" className={`${navLinkClass} bg-green-500 text-white`}>
              <Image src="/flag.png" alt="" width={16} height={16} className="pixelated h-4 w-4" />
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="#contact" className={`${navLinkClass} bg-red-500 text-white`}>
              <Image src="/letter.png" alt="" width={16} height={16} className="pixelated h-4 w-4" />
              <span>Contact</span>
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              className={`${navLinkClass} bg-amber-400 text-black`}
            >
              <span aria-hidden>▸</span>
              <span>Resume</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Vizzaq23"
              target="_blank"
              rel="noopener noreferrer"
              className={`${navLinkClass} bg-slate-700 text-white`}
            >
              <span aria-hidden>⎇</span>
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
