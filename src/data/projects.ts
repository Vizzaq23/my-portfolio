export type Project = {
  id: string;
  title: string;
  year: string;
  /** Short line for cards */
  summary: string;
  /** Optional extra detail shown on hover / expanded */
  detail?: string;
  tags: string[];
  image: string;
  link: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    id: "sentari",
    title: "Sentari AI — SDE Internship",
    year: "2025",
    summary:
      "Worked on an AI pipeline that transforms raw diary entries into structured insights and empathetic responses.",
    detail:
      "Built and iterated on a TypeScript pipeline that processes diary transcripts into embeddings, detects user goals and intents, and generates short AI responses alongside an evolving user profile. Implemented multi-step data transformations, logging, and simulation runs to validate system behavior over time. Also developed internal dashboards using Next.js, Supabase, and MongoDB to track referral usage and user activity, focusing on clean data models, secure queries, and practical UI improvements.",
    tags: ["Next.js", "TypeScript", "Supabase", "MongoDB", "LLM APIs", "Pipelines"],
    image: "/projects/sentari.jpeg",
    link: "https://journal.withsentari.com/signin",
    linkLabel: "Product (login)",
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
    link: "https://github.com/Vizzaq23/ai-game-balancer-",
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
    link: "https://github.com/Vizzaq23/AdpativeShooter",
    linkLabel: "GitHub",
  },
  // TODO: Add a video of the pinball game
  {
    id: "pinball",
    title: "Pinball",
    year: "2026",
    summary:
      "Custom pinball game with real-time scoring, hardware integration, and responsive flipper/bumper interactions.",
    detail:
      "Built a pinball system in Python using Pygame and Raspberry Pi GPIO. Implemented game state management (attract, gameplay, test modes), scoring logic, and event-driven interactions for bumpers, targets, and ball drain. Integrated physical components (switches, solenoids) with safe timing controls, and structured the code to allow easy tuning of gameplay and rules without modifying core logic.",
    tags: ["Python", "Pygame", "GPIO", "Game logic"],
    image: "/projects/pinball.svg",
    link: "https://github.com/Vizzaq23/pinball-scoreboard",
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
    link: "https://www.stanthonyshs.org/project-lavender/",
    linkLabel: "Program page",
  },
];
