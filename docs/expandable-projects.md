# Expandable project cards — 2026-11-16

Installed genuine Aceternity source using `npx --yes shadcn@latest add @aceternity/expandable-card-demo-standard --yes` (exit0). Completed components.json using existing Tailwind3 paths/aliases without running init or modifying global styles. Original registry payload retained in vendor/ui/expandable-card-demo-standard.json; source/license: https://ui.aceternity.com/components/expandable-card and https://ui.aceternity.com/licence.

Adapted installed component with all nine existing projects, shared card/image/title/category layout IDs, cartridge styling, existing Radix Dialog for modal focus/scroll management, native button triggers, always-visible close button, Escape, focus return, and reduced-motion layout disabling. Existing outside-click hook received strict event types; Radix owns outside-click handling in the adapted component. No package/lockfile change.

Projects.tsx replaces only the old selected-detail stage with expandable cards and updates its toolbar label/import. Pre-existing featured-project edits remain intact. Map selection highlights a card; opening a card synchronizes the map. Existing featured video players and direct TCG case study remain available. Original map, scene, gameplay and data content unchanged.

Verified: production build (including TypeScript) passed. ESLint passes for Projects.tsx, expandable-card-demo-standard.tsx and use-outside-click.tsx. Full lint fails with53errors/4warnings in pre-existing public/atlas/walk-preview/vendor Three.js assets; no unrelated lint edits. git diff --check passed.

Chrome production preview http://127.0.0.1:3040/#project-details: nine cards and nine map nodes present; map-to-card selection; Sunny and TCG dialogs; keyboard Enter and Escape; Tab/Shift+Tab focus containment; close-button focus return; TCG case-study link present. Mobile390 and320 viewport checks show no page overflow; dialog fits370/300px with persistent close button and scrollable details. Reduced motion implemented in source but OS emulation not exercised. No physical phone test or deployment.

Preservation hashes (SHA256) before/after identical:
- ProjectWorldMap.tsx D1B23F82B66EA962E1C44F2214352106C1898167800428C74BFF51A1A3CE95B6
- PlayableHero.tsx 0854813A92E472D30DB100301FC6EEA34A91731E1C6D01B834EAD8290B696706

Local uncommitted work on codex/portfolio-restart. Preview server session33452. No push or deploy. Next: user reviews card presentation and expansion feel.
