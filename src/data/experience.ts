export type ExperienceKind = "work" | "certification" | "education" | "leadership";

export type ExperienceItem = {
  id: string;
  kind: ExperienceKind;
  title: string;
  org: string;
  date: string;
  location?: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
  link?: string;
  linkLabel?: string;
  verifyUrl?: string;
  verifyLabel?: string;
  showCredlyBadge?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    id: "sentari",
    kind: "work",
    title: "Software Engineering Intern",
    org: "Sentari AI",
    date: "June 2025 – August 2025",
    location: "Remote",
    summary:
      "Shipped production full-stack features, analytics tools, and data workflows on a cross-functional product team.",
    bullets: [
      "Developed production full-stack features using Next.js, React, TypeScript, Flask, and Supabase for an analytics platform serving 500+ active users.",
      "Designed an admin analytics dashboard tracking referrals, retention, engagement, and user growth using Supabase RPCs and SQL.",
      "Built REST APIs and backend data pipelines while collaborating through pull requests, code reviews, and documentation on a 10+ member cross-functional team.",
    ],
    tags: ["Next.js", "TypeScript", "React", "Flask", "Supabase", "SQL", "APIs"],
    link: "https://withsentari.com/",
    linkLabel: "Company site",
  },
  {
    id: "fe-exam",
    kind: "certification",
    title: "Fundamentals of Engineering (FE) Exam",
    org: "NCEES",
    date: "April 2026",
    summary:
      "Passed the Fundamentals of Engineering exam — the first step toward professional engineering licensure.",
    verifyUrl: "https://www.credly.com/badges/bab7b21d-e63a-4634-a44a-cfa8990246b3",
    verifyLabel: "Verify on Credly",
    showCredlyBadge: true,
  },
  {
    id: "bs-ce",
    kind: "education",
    title: "B.S. Computer Engineering",
    org: "Sacred Heart University",
    date: "May 2026",
    location: "Fairfield, CT",
    summary:
      "Bachelor of Science in Computer Engineering with a minor in Mathematics. Magna Cum Laude — 3.76.",
  },
  {
    id: "sigma-chi",
    kind: "leadership",
    title: "Founding Father & New Member Educator",
    org: "Sigma Chi",
    date: "Fall 2023 – Spring 2026",
    location: "Sacred Heart University",
    summary:
      "Founding chapter member and New Member Educator supporting recruitment, development, and chapter growth.",
    bullets: [
      "Helped establish and grow the chapter as a founding member while supporting recruitment, member development, and chapter initiatives.",
      "Served as New Member Educator, guiding new members through onboarding, expectations, and integration into the fraternity.",
    ],
  },
];
