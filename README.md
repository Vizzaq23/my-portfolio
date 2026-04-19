# Quintin Vizza – Portfolio

Personal portfolio site: projects, background, and contact — built with **Next.js 15**, **React**, **TypeScript**, and **Tailwind CSS**.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel (typical)
- **Version control:** Git + GitHub

## Features

- Responsive layout (mobile and desktop)
- Hero, projects, about, and contact sections
- Project links and resume download (add `public/resume.pdf`)

## Getting started

```bash
git clone https://github.com/Vizzaq23/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live site

Deploy as you prefer (e.g. Vercel). Set `NEXT_PUBLIC_SITE_URL` to your production URL (used for Open Graph / canonical metadata in `src/app/layout.tsx`).

Replace `public/resume.pdf` with your real résumé PDF; the repo may ship a tiny placeholder file so the download link works in dev.
