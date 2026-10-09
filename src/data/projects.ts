import { projectLevelOrder } from "@/lib/project-map-route";

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
    "id": "sunny-hq",
    "category": "Desktop AI workspace",
    "title": "Sunny HQ",
    "year": "2026",
    "summary": "Built a One Piece-inspired Windows workspace for running Codex missions, reviewing changes, and managing local projects.",
    "highlights": [
      "Integrated streaming Codex conversations, approval prompts, task interruption, and connection recovery.",
      "Combined a Monaco editor, Git diffs, PowerShell terminals, and local previews in an Electron desktop app."
    ],
    "detail": "Ten themed specialist roles organize project work, with saved conversations, explicit handoffs, and SQLite persistence with a JSON fallback. The app includes a floating desktop ship and reduced-motion controls. This is a local personal build in active development; continuous autonomous crew routing and mobile access are not implemented.",
    "tags": [
      "Electron",
      "React",
      "TypeScript",
      "Codex",
      "SQLite"
    ],
    "image": "/projects/sunny-hq.svg",
    "imageAlt": "Sunny HQ workflow overview: mission, crew workspace, review and approval",
    "status": "Private project · In development",
    "badge": "NEW"
  },
  {
    "id": "tcg-coach",
    "category": "Game reconstruction & AI practice",
    "title": "One Piece TCG Coach",
    "year": "2026",
    "summary": "Built a local match-review workspace that reconstructs OPTCGSim games and supports experimental AI practice through web and Unity clients.",
    "highlights": [
      "Designed deterministic replay reconstruction and player-specific views that keep hidden game information separate.",
      "Connected a local rules engine to legal-move controls, saved match choices, and optional JEV coaching."
    ],
    "detail": "Imported games provide historical checkpoints, turn navigation, and blind replay practice. New in-app matches support optional JEV decisions and later comparisons of saved choices, with a shared local service for the web and Unity clients. Experimental gameplay is available; verified move grades, skilled AI, and complete card coverage remain in development.",
    "tags": [
      "TypeScript",
      "Node.js",
      "Unity",
      "Replay systems",
      "JEV"
    ],
    "image": "/projects/tcg-coach.svg",
    "imageAlt": "TCG Coach workflow overview: match import, visible checkpoints, practice and review",
    "status": "Private project · Experimental",
    "badge": "NEW"
  },
  {
    "id": "trading-agent",
    "category": "Research & paper-trading systems",
    "title": "Trading Agent",
    "year": "2026",
    "summary": "Built a local Python research pipeline that traces source evidence through analysis, deterministic risk checks, and paper-trade evaluation.",
    "highlights": [
      "Organized eight analysis roles around immutable evidence, retained signals, and source-grounded research.",
      "Implemented paper-risk controls, replayable records, and a read-only dashboard using the Python standard library."
    ],
    "detail": "The research workspace supports configured HTTPS sources and optional local-model interpretations. It tracks paper positions and evaluates matured signals while preserving unknown costs and confidence as unknown. The project is for research and paper trading: there is no live order execution, and synthetic demonstrations are not historical performance results.",
    "tags": [
      "Python",
      "Data pipelines",
      "Risk controls",
      "Paper trading"
    ],
    "image": "/projects/trading-agent.svg",
    "imageAlt": "Trading Agent workflow overview: source evidence, analysis, risk checks and paper evaluation",
    "status": "Private project · Research",
    "badge": "NEW"
  },

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
      "Developed cached pricing, public collector profiles, trade offers, and a Stripe Checkout storefront.",
    ],
    detail:
      "The searchable catalog supports graded cards, cached market prices, a three-card showcase, trade offers, alerts, collector comparisons, and activity feeds. Built with Next.js, React, Tailwind CSS, Framer Motion, and Supabase Auth and Storage, with a documented API and CI/CD deployment. The shop includes a cart and webhook-driven inventory updates; live checkout is controlled by launch-readiness settings.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "APIs"],
    image: "/projects/tcg-shelf.png",
    imageAlt:
      "One Piece TCG Shelf Collector’s Showcase with three graded BGS cards on a wooden shelf",
    link: "https://tcg-lyart.vercel.app/",
    linkLabel: "View live app",
  },
];

// Map numbering and next/previous navigation follow the actual walking route.
export const projects: Project[] = projectLevelOrder.map((id) => projectCatalog.find((project) => project.id === id)!);

// Featured work is curated independently of the complete project map.
const featuredProjectIds = ["tcg-shelf", "pinball", "adaptive-shooter"];
export const featuredProjects: Project[] = featuredProjectIds.map((id) => projectCatalog.find((project) => project.id === id)!);
