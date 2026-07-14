export type ExperienceKind = "work" | "certification" | "education";

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
      "Shipped production dashboard features, analytics tools, and data workflows on a cross-functional product team.",
    bullets: [
      "Developed frontend features with Next.js, React, TypeScript, and Tailwind CSS.",
      "Built analytics and admin tools for activity, referrals, and retention.",
      "Worked with Supabase, APIs, and data-processing pipelines supporting systems with more than 500 active users.",
      "Collaborated through GitHub workflows, code reviews, and technical documentation.",
    ],
    tags: ["Next.js", "TypeScript", "React", "Tailwind", "Supabase", "APIs"],
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
      "Bachelor of Science in Computer Engineering with a minor in Mathematics. GPA 3.82.",
  },
];
