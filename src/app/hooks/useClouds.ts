import { useState, useEffect } from "react";

type Cloud = { id: number; x: number; y: number; size: number; speed: number };

export default function useClouds() {
  const [clouds, setClouds] = useState<Cloud[]>([
    { id: 1, x: 50, y: 50, size: 150, speed: 0.2 },
    { id: 2, x: 300, y: 120, size: 180, speed: 0.15 },
    { id: 3, x: 600, y: 200, size: 100, speed: 0.25 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClouds((prev) =>
        prev.map((cloud) => {
          let newX = cloud.x + cloud.speed;

          // loop around when cloud leaves screen
          if (typeof window !== "undefined" && newX > window.innerWidth + cloud.size) {
            newX = -cloud.size;
          }

          return { ...cloud, x: newX };
        })
      );
    }, 30); // ~33fps

    return () => clearInterval(interval);
  }, []);

  return clouds;
}
