# Portfolio components — 2026-11-07

## Current implementation

Supersedes the initial custom implementations. User explicitly requested actual components from the linked libraries. Downloaded the official registry/source files, then adapted those files for this portfolio. They are source-distributed components, not separately installed library packages.

| Component | Upstream | Local adaptations |
| --- | --- | --- |
| Hero Video Dialog | Magic UI registry | Retained animation variants, Motion/AnimatePresence and layered play button. Gold/navy palette, Next Image, Radix modal semantics/focus/scroll lock, reduced motion, and a media slot for existing MP4/iframe loading/retry/analytics. |
| Scroll Progress | Magic UI registry | Retained useScroll and motion.div scaleX. Gold bar positioned below the existing navbar. Removed the custom progress listener. |
| Timeline | Aceternity registry | Retained sticky date column, markers, useScroll/useTransform and growing beam. Existing experience content in glass cards; gold rail; responsive sizing, ResizeObserver and static reduced-motion fallback. Removed custom pseudo-element timeline. |
| Disclosure | Motion Primitives source | Retained provider, trigger, AnimatePresence and height/opacity variants. React 19 cloneElement typing, ARIA association, retro wrapper and reduced-motion transition. Replaced native details in featured cards, project technical details and demo descriptions. |

Compare remains deferred: no genuine labeled before/after pair is available.

## Provenance and licenses

Source provenance, SHA-256 hashes, URLs and retrieval dates: `vendor/ui/sources.json` and adjacent files. Motion Primitives pinned to commit `120f64f6ca60348e251f929e9c81f11ccbe45eda`. Registry components have no supplied release version; hashes identify the saved payloads. The raw Aceternity timeline.json snapshot remains local and is excluded from publication; its integrated portfolio component and license notice are included.

- https://magicui.design/r/hero-video-dialog.json
- https://magicui.design/r/scroll-progress.json
- https://ui.aceternity.com/registry/timeline.json
- https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/disclosure.tsx

Magic UI and Motion Primitives MIT notices are retained. Aceternity uses its own license (https://ui.aceternity.com/licence), permitting personal/commercial end products and modification while restricting standalone source/template redistribution. This is a portfolio integration, not a reusable component product. Do not publish the vendor snapshots as a component library.

Added exact dependency versions: motion14.10.1, lucide-react1.70.0, clsx2.1.1, tailwind-merge2.6.0 (Tailwind3 compatible), @radix-ui/react-dialog1.3.1. Lockfile updated. Existing Next15/React19/Tailwind3 retained.

## Verification

ESLint, TypeScript and production build passed; final refinement verification is recorded below. Initial production browser checks passed page/dialog widths320/390/768/1440, modal focus/Shift+Tab/Escape/Close/return focus/media teardown, both disclosure keyboard keys, blocked MP4 retry/recovery and reading-progress endpoints. Screenshots inspected after waiting for viewport/scroll settling; initial immediate resize measurements were not valid acceptance evidence.

Build reports homepage first-load JS211kB versus134kB before adopting the libraries. Case study185kB versus114kB because the shared navbar now imports Motion. No performance score or cross-browser accessibility claim.

Subsequent security fixes upgraded Next to15.5.29, patched Sharp/PostCSS, and resolved development-tool advisories. Full npm audit now reports zero vulnerabilities. See security-update.md for exact changes and verification. Preview binds127.0.0.1 only.

Component changes and security fixes are included together for publication. Existing unrelated retro-interface.css contrast work is excluded. Hosted deployment status is not verified.

### Final verification
Final production build (including lint/types/static generation) passes after ARIA and reduced-motion fixes. Chromium confirmed aria-modal=true, immediate visibility under reduced motion, Close initial focus, animated timeline beam growth, and no page exceptions in the final pass. Reduced-motion rail forced to static full height/opacity to avoid stale animated values when OS preference changes. Progress endpoint checks pass. Library integrations retain the earlier tested responsive and retry behavior. Preview restarted on localhost3012, bound only to127.0.0.1. No hosted deployment performed.
