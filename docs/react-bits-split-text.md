# React Bits hero SplitText

2026-11-16: Installed the actual TypeScript CSS registry source with `npx shadcn@latest add @react-bits/SplitText-TS-CSS --yes` (exit 0). The CLI added `src/components/SplitText.tsx`, GSAP 3.15.1, @gsap/react 2.1.2 and the @react-bits registry in components.json. This variant currently contains inline styles and needs no separate CSS file.

Source: https://reactbits.dev/r/SplitText-TS-CSS.json

HeroProfile uses two span instances within the existing h1, retaining its line break, colored period and accessible full-name label. Letters rise once on load with a 35ms stagger and 0.55s duration. No loop or hover animation. Adapted installed source to retain visible server-rendered/no-JavaScript text and respond to live reduced-motion changes. Aceternity role highlight remains on the separate role line.

Validation: focused ESLint, TypeScript and production build (`PORTFOLIO_BUILD_DIR=.next/split-text-check`, `next build --no-lint`) passed. Desktop browser observed 12 split letters; reduced motion reverted to plain text. At 390px no horizontal overflow; without JavaScript the heading remains visible. No page errors observed. Screenshot: .playwright-mcp/react-bits-hero.png. Build-generated temporary tsconfig include removed afterward.

Before/after SHA256 matched for page.tsx, PlayableHero.tsx, HeroIdleSprite.tsx and ProjectWorldMap.tsx. No new sections, scenery changes, commit, push or deployment. Other existing local edits preserved.
