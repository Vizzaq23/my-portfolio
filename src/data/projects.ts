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
      "Owned features across a transcript → empathy pipeline: embeddings, structured extraction, GPT-assisted replies, and longitudinal user profiles.",
    detail:
      "Delivered admin dashboards for growth metrics (referrals, retention, usage) with Next.js, Supabase, and MongoDB — production schema design, auth-aware queries, and iterative UX with stakeholders.",
    tags: ["Next.js", "TypeScript", "Supabase", "MongoDB", "LLM APIs", "Dashboards"],
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
  {
    id: "pinball",
    title: "Pinball",
    year: "2026",
    summary:
      "Pinball table with custom layout, score rules, and physics-driven ball motion — focused on readable feedback, flipper timing, and juice (camera, SFX hooks).",
    detail:
      "Built as a self-contained game slice: bumpers, ramps, and multipliers wired into a clear scoring loop; structured so tables and tuning data are easy to iterate without rewriting core physics.",
    tags: ["Physics", "Game feel", "Score systems", "Level design"],
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
