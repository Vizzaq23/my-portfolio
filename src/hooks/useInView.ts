import { useState, useEffect } from "react";

export default function useInView(elementId: string, offset: number = 0) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(elementId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight - offset && rect.bottom >= 0;

      if (visible) setInView(true);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementId, offset]);

  return inView;
}
