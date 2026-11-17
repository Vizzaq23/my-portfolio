# Aceternity first pass — 2026-11-16

Implemented at the user's request: hero highlight, featured-project glow, About hover, and contact feedback. No new sections. Follow-up publication includes the Timeline hydration fix below.

## Component provenance and adaptations

Installed using `npx --yes shadcn@latest add @aceternity/hero-highlight @aceternity/glowing-effect @aceternity/card-hover-effect @aceternity/stateful-button --yes` (exit 0). The CLI created four real registry components under `src/components/ui/`. Official registry sources:

- https://ui.aceternity.com/registry/hero-highlight.json — use its Highlight export only, without the full background/hero wrapper. Gold role highlight, immediate readable copy, short reveal and static reduced-motion rendering.
- https://ui.aceternity.com/registry/glowing-effect.json — gold variant, 3px internal border to avoid card overflow clipping, animation cancellation and pointer/scroll race correction, fine-pointer gating, live reduced-motion preference handling. Replaces competing corner decoration; keyboard focus still has a static visible outline.
- https://ui.aceternity.com/registry/card-hover-effect.json — retained shared Motion layout highlight and AnimatePresence, adapted anchors/cards to the existing semantic definition list. All three facts retain their text; no fake links, extra tab stops, or hidden essential information. Scoped layout group and reduced-motion fallback.
- https://ui.aceternity.com/registry/stateful-button.json — adapted loading/success flow to actual async clipboard completion, synchronous callback invocation to retain user activation, duplicate-click guard, persistent error/retry, live status, cleaned-up reset timer, and reduced motion. Retained source SVG icons with corrected path/viewBox attributes observed malformed after CLI generation. Email link remains available.

Integration files: HeroProfile.tsx, Projects.tsx, About.tsx, Contact.tsx and home-refresh.module.css. Other pre-existing dirty changes were preserved. The CLI also added a registry dependency to the already-dirty package manifests; do not commit entire unrelated working-tree changes blindly.

## Verification

- Focused ESLint passed for all four registry components and four integration components.
- TypeScript passed. Final isolated production build with `PORTFOLIO_BUILD_DIR=.next/aceternity-first-pass npx next build --no-lint` passed; full-repository lint was not claimed. Removed only the generated build include from tsconfig afterward.
- Browser: desktop hero highlight, gold project border activation, About fact highlight and contact controls inspected. Normal pointer glow active=1; live reduced-motion change active=0, stays off on pointer movement.
- Actual Clipboard API write/read returned the intended email after keyboard Enter activation. Simulated rejected clipboard write showed the fallback message; restoring the real API and retrying succeeded. No fake delivery confirmation.
- 390px viewport: no horizontal overflow, 150x48px Copy email target, static completed hero highlight under reduced motion. This is browser emulation, not physical-device testing.
- Five existing homepage sections retained; no Bento/Toolkit section mounted.
- Existing reduced-motion Timeline hydration warning remains: timeline.tsx uses server/client-different opacity on its beam. This file was not changed in this pass. Also observed the existing underground-image LCP advisory in development. Normal-motion reload had no browser errors after icon corrections.

## Preservation checks

Before/after SHA-256 equality verified:

| File | SHA-256 |
| --- | --- |
| src/app/page.tsx | E6591616A9592BDEA7295BF128DA39D68294E2ADAD91720B9DB2AC1AFCCEE5C2 |
| src/components/PlayableHero.tsx | 0854813A92E472D30DB100301FC6EEA34A91731E1C6D01B834EAD8290B696706 |
| src/components/HeroIdleSprite.tsx | C49F5125F6283B3BA77F484C76DE53C4FD33D589675AA3B1379411FB77C44452 |
| src/components/ProjectWorldMap.tsx | D1B23F82B66EA962E1C44F2214352106C1898167800428C74BFF51A1A3CE95B6 |

Preview: http://localhost:3041/ (existing dev session 14550). Screenshot evidence under `.playwright-mcp/`: `aceternity-hero-desktop.png`, `page-2026-11-17T03-40-49-481Z.png` (About), `aceternity-contact-mobile.png`. The earlier `aceternity-about-desktop.png` captured before the existing entrance reveal finished and is not the final About evidence.

## Timeline follow-up and commit boundary

User requested the Timeline fix and publication. Replaced its motion-preference hook with useSyncExternalStore using a false server snapshot, so server HTML and the initial hydration render agree. After hydration it reads the actual preference and subscribes to changes. Keyed static/scroll beams avoid retaining one mode's Motion style binding in the other. Fresh reduced-motion navigation produced zero console errors; the static beam has full height and opacity 1. Timeline lint and type checks passed.

Commit preparation extracts only the Highlight import/role change in HeroProfile and the GlowingEffect import/card integration in Projects onto their tracked versions. Earlier uncommitted hero layout, expandable-card integration, shared CSS refresh and playable scenery remain in the user's working tree. The four installed components use dependencies already in the tracked manifest, so the unrelated pending manifest additions and unused Bento files are excluded. The commit does not publish the entire currently previewed redesign.

An isolated copy of the proposed commit source under `.next/aceternity-commit-check` was built successfully with existing node_modules/public junctions, confirming it does not depend on the uncommitted components. The first attempt started before extraction finished and failed on missing files; the completed extraction build passed. No branch/worktree switch or cleanup of user changes was performed.

Next: user visual review. New map animation or tabs/navigation changes are separate work.
