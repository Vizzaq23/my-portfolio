"use client";

import useInView from "../hooks/useInView";

export default function FlagPole() {
  const flagDown = useInView("contact", 100);

  return (
    <div className="flex flex-col items-center justify-end h-64 w-12 mx-auto relative">
      {/* Pole */}
      <div className="w-2 bg-gray-300 h-full"></div>

      {/* Flag */}
      <div
        className="absolute left-2 transition-all duration-1000 ease-out"
        style={{
          top: flagDown ? "200px" : "0px",
          width: "0",
          height: "0",
          borderTop: "24px solid transparent",
          borderBottom: "24px solid transparent",
          borderLeft: "36px solid #22c55e", // Tailwind's green-500
        }}
      ></div>

      {/* Base block */}
      <div className="w-8 h-4 bg-yellow-600 mt-1 border border-yellow-800"></div>
    </div>
  );
}
