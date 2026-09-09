export type ExperienceKind = "work" | "certification" | "education";

export type ExperienceItem = {
  id: string;
  kind: ExperienceKind;
  title: string;
  org: string;
  date: string;
  location?: string;
  summary: string;
  bullets?: { lead: string; detail: string }[];
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
      "Developed full-stack features for a production analytics platform, contributing across the interface, APIs, and database.",
    bullets: [
      { lead: "Production software for 500+ active users.", detail: "Shipped features with Next.js, React, TypeScript, Flask, and Supabase." },
      { lead: "Analytics that made product activity visible.", detail: "Designed an admin dashboard for referrals, retention, engagement, and user growth using Supabase RPCs and SQL." },
      { lead: "Backend development and team delivery.", detail: "Built REST APIs and data pipelines; worked with a 10+ member cross-functional team through pull requests, code reviews, and documentation." },
    ],
    tags: ["Next.js", "TypeScript", "React", "Flask", "Supabase", "SQL", "REST APIs"],
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
      "Passed the Fundamentals of Engineering exam in April 2026, demonstrating a foundation in engineering principles and problem-solving.",
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
      "Graduated in May 2026 with a Bachelor of Science in Computer Engineering and a minor in Mathematics.",
  },
];
