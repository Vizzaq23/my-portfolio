"use client";

import useInView from "@/hooks/useInView";

export default function FlagPole() {
  const flagDown = useInView("contact", 100); // triggers when 100px inside viewport

  return (
    <div className="flex flex-col items-center justify-end h-64 w-12 mx-auto relative">
      {/* Pole */}
      <div className="w-2 bg-gray-300 h-full"></div>

      {/* Flag */}
      <div
        className={`absolute left-2 w-0 h-0 border-t-[24px] border-t-transparent border-l-[36px] border-l-green-500 border-b-[24px] border-b-transparent transition-all duration-1000 ease-out`}
        style={{
          top: flagDown ? "200px" : "0px", // animate down
        }}
      ></div>

      {/* Base block */}
      <div className="w-8 h-4 bg-yellow-600 mt-1 border border-yellow-800"></div>
    </div>
  );
}
