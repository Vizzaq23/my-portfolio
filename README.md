# Quintin Vizza — Software Engineering Portfolio

[Live portfolio](https://www.quintinvizza.dev/) · [Résumé](https://www.quintinvizza.dev/resume) · [LinkedIn](https://www.linkedin.com/in/quintin-vizza/)

Computer Engineering graduate building full-stack applications, data tools, and interactive systems. Production internship experience at Sentari AI with React, Next.js, TypeScript, Flask, and Supabase.

## Selected work

- **[One Piece TCG Shelf](https://tcg-lyart.vercel.app/)** — collector application with authentication, PostgreSQL RLS, cached market pricing, and public profiles. [Engineering case study](https://www.quintinvizza.dev/projects/tcg-shelf). [Public source](https://github.com/Vizzaq23/TCG).
- **[Pinball machine](https://github.com/Vizzaq23/pinball-scoreboard)** — team capstone; led Python/Pygame software and Raspberry Pi GPIO integration.
- **[Adaptive Combat Trainer](https://github.com/Vizzaq23/AdpativeShooter)** — modular Unity/C# aim training with performance-based difficulty.

## Portfolio implementation

Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS. The retro game theme sits alongside immediately visible engineering summaries and a standalone case study.

```sh
git clone https://github.com/Vizzaq23/my-portfolio.git
cd my-portfolio
npm ci
npm run dev
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin for canonical/Open Graph metadata. The `/resume` route serves `src/content/resume.pdf`; `public/resume.pdf` is the matching direct-download copy.

## Project demos

- [TCG Shelf — 30 seconds](https://www.quintinvizza.dev/demos/tcg-20260911.mp4)
- [Unity trainer — 41 seconds](https://www.quintinvizza.dev/demos/trainer-20260911.mp4)
- [Pinball capstone showcase](https://www.linkedin.com/feed/update/urn:li:activity:7453827527732539392/)

## Code map

| Path | Responsibility |
| --- | --- |
| `src/app/` | Pages, case study, and resume route |
| `src/components/` | Profile sections, project cards, demos, and retro map |
| `src/data/projects.ts` | Project descriptions and display order |
| `public/demos/` | Optimized recordings, posters, and provenance |
| `src/content/resume.pdf` | Resume served by `/resume` |

The site is deployed through its GitHub connection to Vercel. Run lint and a production build before publishing code changes; check the live links and video playback after deployment.
