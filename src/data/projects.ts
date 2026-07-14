export type Project = {
  id: string;
  title: string;
  year: string;
  /** Short line for cards */
  summary: string;
  /** Extra detail always visible on the card (no hover-only) */
  detail?: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** External or internal URL — omit when the project has no public link */
  link?: string;
  linkLabel?: string;
  /** Non-clickable status when there is no valid link */
  status?: string;
  /** Optional themed badge (e.g. NEW) */
  badge?: "NEW";
};

export const projects: Project[] = [
  {
    id: "tcg-shelf",
    title: "One Piece TCG Shelf",
    year: "2026",
    summary:
      "A full-stack collector platform for browsing One Piece cards, tracking collections, viewing market prices, displaying prized cards, and connecting with other collectors.",
    detail:
      "Built with Next.js, React, Supabase, PostgreSQL, Tailwind CSS, and Framer Motion. Features include authentication, searchable card catalogs, collection tracking, graded-slab support, cached market pricing, public profiles, a three-card showcase, trade offers, alerts, collector comparisons, activity feeds, and a documented API.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "APIs"],
    image: "/projects/tcg-shelf-placeholder.svg",
    imageAlt: "Pixel-style placeholder for the One Piece TCG Shelf collector platform",
    status: "In development",
    badge: "NEW",
  },
  {
    id: "pinball",
    title: "Pinball",
    year: "2026",
    summary:
      "Custom pinball game with real-time scoring, hardware integration, and responsive flipper/bumper interactions.",
    detail:
      "Built a pinball system in Python using Pygame and Raspberry Pi GPIO. Implemented game state management (attract, gameplay, test modes), scoring logic, and event-driven interactions for bumpers, targets, and ball drain. Integrated physical components (switches, solenoids) with safe timing controls, and structured the code to allow easy tuning of gameplay and rules without modifying core logic.",
    tags: ["Python", "Pygame", "GPIO", "Game logic"],
    image: "/projects/pinball.png",
    imageAlt:
      "Sacred Heart Pioneers hockey-themed pinball machine with digital scoreboard",
    link: "https://github.com/Vizzaq23/pinball-scoreboard",
    linkLabel: "GitHub",
  },
  {
    id: "adaptive-shooter",
    title: "Adaptive Combat Trainer",
    year: "2026",
    summary:
      "Unity trainer with two modes: Aim Trainer for reflex and accuracy drills, and Enemy AI Sandbox to experiment with adaptive opponent behavior in a controlled scene.",
    detail:
      "Main menu routes players into focused aim practice or AI sandbox sessions — built to iterate on feel, difficulty ramps, and enemy logic without a full multiplayer stack.",
    tags: ["Unity", "C#", "Aim training", "Enemy AI", "Gameplay"],
    image: "/projects/adaptive-shooter.png",
    imageAlt: "Adaptive Combat Trainer Unity main menu",
    link: "https://github.com/Vizzaq23/AdpativeShooter",
    linkLabel: "GitHub",
  },
  {
    id: "game-balancer",
    title: "AI Game Balancer",
    year: "2025",
    summary:
      "Data-driven weapon tuning for multiplayer shooters: ingest kill/death and engagement signals, surface imbalance, and suggest stat adjustments.",
    detail:
      "Built with Python, Flask, and Streamlit — reproducible pipelines, clear visualizations for designers, and a workflow aimed at fairer competitive play (prototype validated on sample match data).",
    tags: ["Python", "Flask", "Streamlit", "Analytics", "Game design"],
    image: "/projects/game-balancer.jpeg",
    imageAlt: "AI Game Balancer analytics interface graphic",
    link: "https://github.com/Vizzaq23/ai-game-balancer-",
    linkLabel: "GitHub",
  },
  {
    id: "arcade",
    title: "Custom Arcade Cabinet",
    year: "2021",
    summary:
      "End-to-end build: CAD in Fusion 360, CNC + laser-cut panels, wiring, and a curated multi-system software stack with thousands of licensed-era titles.",
    detail:
      "Combined mechanical design, fabrication, and systems integration — finished with custom art and UX for a two-player arcade used in real-world settings.",
    tags: ["Fusion 360", "CNC", "Fabrication", "Systems", "Hardware"],
    image: "/projects/arcade-machine.jpg",
    imageAlt: "Custom two-player arcade cabinet",
    link: "https://sites.google.com/view/quintinvizza-com/arcade-machine",
    linkLabel: "Case study",
  },
  {
    id: "lavender",
    title: "Project Lavender — Tokens & Pins",
    year: "2021",
    summary:
      "Partnered with a school wellness initiative to design and fabricate coins and pins for “Code Lavender,” supporting staff morale and peer recognition.",
    detail:
      "Design for manufacturability, vendor coordination, and delivery of physical tokens tied to a measurable wellness program — not just swag, but a tangible part of the workflow.",
    tags: ["Design", "Fabrication", "Community impact", "Collaboration"],
    image: "/projects/project-lavender-thumb.jpg",
    imageAlt: "Project Lavender wellness tokens and pins",
    link: "https://www.stanthonyshs.org/project-lavender/",
    linkLabel: "Program page",
  },
];
