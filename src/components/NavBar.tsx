"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const sections = ["top", "projects", "about", "experience", "contact"];
const links = [
  { id: "projects", label: "Projects", number: "02" },
  { id: "about", label: "About", number: "03" },
  { id: "experience", label: "Experience", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

export default function NavBar() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = (document.querySelector(".site-header")?.getBoundingClientRect().height ?? 80) + 100;
      let current = "top";
      sections.forEach((id) => {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= marker) current = id;
      });
      setActive(current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <Link className="site-brand no-underline" href="/#top" aria-label="Quintin Vizza — home">
          <span className="brand-mark" aria-hidden="true">QV</span>
          <span><strong>Quintin Vizza</strong><small>Software Engineer</small></span>
        </Link>
        <ul className="site-nav-links">
          {links.map(({ id, label, number }) => <li key={id}>
            <Link href={"/#" + id} className={`nav-world nav-world-${id} no-underline`} aria-current={active === id ? "location" : undefined}><span className="nav-world-number" aria-hidden="true">{number}</span>{label}</Link>
          </li>)}
        </ul>
        <a className="dev-button dev-button-primary nav-resume no-underline" href="/resume">Résumé <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
