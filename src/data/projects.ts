export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  /** Short line for cards */
  summary: string;
  /** Concise evidence of the work, always visible. */
  highlights: string[];
  /** Full implementation context, available through an accessible disclosure. */
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

const projectCatalog: Project[] = [
  {
    id: "lavender",
    category: "Community & fabrication",
    title: "Project Lavender — Tokens & Pins",
    year: "2021",
    summary:
      "Designed and fabricated recognition tokens and pins for a school’s Code Lavender wellness initiative.",
    highlights: [
      "Translated the program’s recognition goals into physical designs ready for fabrication.",
      "Coordinated production and delivery of tokens supporting staff morale and peer recognition.",
    ],
    detail:
      "Partnered with the school initiative on design for manufacturability, vendor coordination, and delivery of coins and pins for use in its staff recognition program.",
    tags: ["Design", "Fabrication", "Community impact", "Collaboration"],
    image: "/projects/project-lavender-thumb.jpg",
    imageAlt: "Project Lavender wellness tokens and pins",
    link: "https://www.stanthonyshs.org/project-lavender/",
    linkLabel: "Program page",
  },
  {
    id: "arcade",
    category: "Design & systems integration",
    title: "Custom Arcade Cabinet",
    year: "2021",
    summary:
      "Designed and built a two-player arcade cabinet, bringing together mechanical design, fabrication, wiring, and software configuration.",
    highlights: [
      "Modeled the cabinet in Fusion 360 and fabricated panels with CNC and laser cutting.",
      "Integrated controls and a multi-system software stack, with custom artwork and a two-player interface.",
    ],
    detail:
      "Completed the cabinet from CAD through assembly and systems integration, then configured a multi-system game library and custom interface for use as a working two-player arcade.",
    tags: ["Fusion 360", "CNC", "Fabrication", "Systems", "Hardware"],
    image: "/projects/arcade-machine.jpg",
    imageAlt: "Custom two-player arcade cabinet",
    link: "https://sites.google.com/view/quintinvizza-com/arcade-machine",
    linkLabel: "Case study",
  },
  {
    id: "game-balancer",
    category: "Data & analytics prototype",
    title: "AI Game Balancer",
    year: "2025",
    summary:
      "Built a prototype that analyzes shooter match data to identify weapon imbalance and suggest stat adjustments.",
    highlights: [
      "Processed kill/death and engagement signals with reproducible Python pipelines.",
      "Presented tuning insights with Flask and Streamlit; validated the prototype on sample match data.",
    ],
    detail:
      "The workflow turns match signals into visualizations for game designers, supporting data-informed balance decisions. Validation used sample data; this was a prototype rather than a production game integration.",
    tags: ["Python", "Flask", "Streamlit", "Analytics", "Game design"],
    image: "/projects/game-balancer.jpeg",
    imageAlt: "AI Game Balancer analytics interface graphic",
    link: "https://github.com/Vizzaq23/ai-game-balancer-",
    linkLabel: "View code",
  },
  {
    id: "adaptive-shooter",
    category: "Unity & gameplay",
    title: "Adaptive Combat Trainer",
    year: "2026",
    summary:
      "Built a Unity trainer that adapts aim practice to player performance, with a separate sandbox for testing enemy behavior.",
    highlights: [
      "Adjusted target speed, size, and spawn rate using accuracy and reaction-time signals.",
      "Designed modular C# systems for targets, shooting, scoring, UI, and performance analytics.",
    ],
    detail:
      "The main menu routes players to reflex and accuracy drills or an Enemy AI Sandbox. Separate sessions make it possible to iterate on difficulty, game feel, and opponent logic without a multiplayer stack.",
    tags: ["Unity", "C#", "Aim training", "Enemy AI", "Gameplay"],
    image: "/projects/adaptive-shooter.png",
    imageAlt: "Adaptive Combat Trainer Unity main menu",
    link: "https://github.com/Vizzaq23/AdpativeShooter",
    linkLabel: "View code",
  },
  {
    id: "pinball",
    category: "Hardware & game systems",
    title: "Pinball",
    year: "2026",
    summary:
      "Led software development for a full-scale pinball machine, connecting Raspberry Pi hardware to real-time game software.",
    highlights: [
      "Built modular Python systems for scoring, audio, game state, and GPIO events.",
      "Integrated sensors, solenoids, and LEDs, and debugged hardware–software interactions during testing.",
    ],
    detail:
      "Python and Pygame manage attract, gameplay, and test modes, with event-driven handling for bumpers, targets, and ball drain. The system integrates switches, solenoids, and 24V power with timing controls, while keeping gameplay rules configurable outside the core logic.",
    tags: ["Python", "Pygame", "GPIO", "Game logic"],
    image: "/projects/pinball.png",
    imageAlt:
      "Sacred Heart Pioneers hockey-themed pinball machine with digital scoreboard",
    link: "https://github.com/Vizzaq23/pinball-scoreboard",
    linkLabel: "View code",
  },
  {
    id: "tcg-shelf",
    category: "Full-stack application",
    title: "One Piece TCG Shelf",
    year: "2026",
    summary:
      "Built and deployed a full-stack platform for One Piece collectors to manage collections, track market prices, and share their cards.",
    highlights: [
      "Built authentication and protected APIs with Supabase, PostgreSQL, and Row Level Security.",
      "Developed a server-side pricing pipeline, collection tracking, and public collector profiles.",
    ],
    detail:
      "The searchable catalog supports graded cards, cached market prices, a three-card showcase, trade offers, alerts, collector comparisons, and activity feeds. Built with Next.js, React, Tailwind CSS, Framer Motion, and Supabase Auth and Storage, with a documented API and CI/CD deployment.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "APIs"],
    image: "/projects/tcg-shelf.png",
    imageAlt:
      "One Piece TCG Shelf Collector’s Showcase with three graded BGS cards on a wooden shelf",
    link: "https://tcg-lyart.vercel.app/",
    linkLabel: "View live app",
    badge: "NEW",
  },
];

// Lead with the work most relevant to software engineering roles.
const projectOrder = ["tcg-shelf", "pinball", "adaptive-shooter", "game-balancer", "arcade", "lavender"];
export const projects: Project[] = projectOrder.map((id) => projectCatalog.find((project) => project.id === id)!);
