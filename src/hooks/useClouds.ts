import { useState, useEffect } from "react";

type Cloud = { id: number; x: number; y: number; size: number; speed: number; opacity: number };

export default function useClouds() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const cloudCount = window.innerWidth > 1024 ? 6 : window.innerWidth > 640 ? 4 : 3;

    const initialClouds = Array.from({ length: cloudCount }).map((_, i) => {
      const size = 80 + Math.random() * 120; // 80–200px
      const speed = Math.max(0.2, 2.0 - size / 120); // parallax depth

      // Height bias: bigger = higher, smaller = lower
      const baseY = 20 + (200 - size); // 20px min, ~140px max
      const y = baseY + Math.random() * 40; // add a random offset

      return {
        id: i + 1,
        x: Math.random() * (window.innerWidth * 0.8),
        y,
        size,
        speed,
        opacity: 0.9,
      };
    });

    setClouds(initialClouds);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClouds((prev) =>
        prev.map((cloud) => {
          let newX = cloud.x + cloud.speed;
          let newOpacity = cloud.opacity;

          if (newX > window.innerWidth + cloud.size) {
            newX = -cloud.size;
            newOpacity = 0;
            setTimeout(() => {
              setClouds((cloudsNow) =>
                cloudsNow.map((c) =>
                  c.id === cloud.id ? { ...c, opacity: 0.9 } : c
                )
              );
            }, 50);
          }

          return { ...cloud, x: newX, opacity: newOpacity };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return clouds;
}
