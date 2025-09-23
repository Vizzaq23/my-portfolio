"use client";

import { useEffect, useState } from "react";

export default function NavBar() {
  const [time, setTime] = useState(300);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000); // decrease by 1 every second

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-black border-b-4 border-white z-50 flex flex-col justify-between">
      {/* === HUD Row === */}
      <div className="w-full flex justify-between px-6 pt-2 font-['Press_Start_2P'] text-xs text-white tracking-widest">
        {/* Left: Mario & Coins */}
        <div className="flex flex-col">
          <span>Quintin</span>
          <span>000100</span>
        </div>

        <div className="flex flex-col items-center">
          <span>COINS</span>
          <span>x03</span>
        </div>

        {/* Middle: World */}
        <div className="flex flex-col items-center">
          <span>WORLD</span>
          <span>2-1</span>
        </div>

        {/* Right: Time (Dynamic) */}
        <div className="flex flex-col items-end">
          <span>TIME</span>
          <span>{time}</span>
        </div>
      </div>

      {/* === Nav Links Row === */}
      <div className="w-full flex justify-center pb-2">
        <ul className="flex space-x-4 text-sm font-bold uppercase">
          <li>
            <a
              href="#projects"
              className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-black border-2 border-white shadow-[2px_2px_0px_#fff] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#fff] transition pixelated"
            >
              <img src="/coin.png" alt="Coin" className="w-4 h-4 pixelated" />
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white border-2 border-white shadow-[2px_2px_0px_#fff] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#fff] transition pixelated"
            >
              <img src="/letter.png" alt="Letter" className="w-4 h-4 pixelated" />
              <span>Contact</span>
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white border-2 border-white shadow-[2px_2px_0px_#fff] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#fff] transition pixelated"
            >
              <img src="/flag.png" alt="Flag" className="w-4 h-4 pixelated" />
              <span>About</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

