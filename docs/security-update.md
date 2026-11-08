# Next.js security update — 2026-11-07

## Changes

- Next.js and eslint-config-next: 15.5.15 → 15.5.29, staying on the same release line.
- Sharp: 0.34.3 → 0.35.5 in the lockfile, resolving the vulnerable image-processing chain.
- Direct PostCSS pinned to 8.5.32. Scoped `overrides.next.postcss: "$postcss"` removes Next 15's bundled vulnerable 8.4.31 without a major framework migration. Build and visual checks cover this override; revisit it when upgrading Next.
- Refreshed compatible vulnerable transitive packages and development tooling in the lockfile. Retained ESLint-9-compatible @typescript-eslint 8.72.1 after npm audit's suggested older version caused peer conflicts.
- No application components, content, styles, images, routes or React versions changed in this security task. Earlier uncommitted UI work remains intact.

## Security evidence

Official release: https://github.com/vercel/next.js/releases/tag/v15.5.29

Critical advisories affecting the old dependency tree included Windows-hosted RCE (GHSA-p293-qw3h-jr36), AVIF image-optimization RCE (GHSA-2xp9-vwfh-vxw4), and SVG image-optimization RCE (GHSA-2464-fhr4-w9xw). The last advisory requires Sharp >=0.35.5; both Next and Sharp versions were verified with `npm ls`.

Before: full npm audit reported 19 findings (1 critical, 7 high, 11 moderate). After: **zero production dependency findings**, **zero critical/high findings overall**. Six moderate development-only findings remain in the @typescript-eslint → minimatch chain. No claim of universal vulnerability freedom or penetration testing.

Raw audit artifacts: `.playwright-mcp/audit-before-security.json`, `audit-after-security.json`, and `audit-production-security.json`. These are local verification artifacts.

## Verification

- Next production build passed compilation, lint, type checks and all seven static pages; standalone ESLint and diff whitespace checks passed.
- `npm ls` confirms Next15.5.29, eslint-config-next15.5.29, Sharp0.35.5 and PostCSS8.5.32 including the overridden Next dependency.
- Production Chromium: no horizontal overflow at320/390/768/1440; all nine project selections and preview images work; map End-key navigation works.
- Local MP4 playback, dialog Escape/Close, focus restoration after close completes, blocked-video Retry recovery, keyboard disclosure expansion, case-study client navigation/video/back link passed. No page exceptions in the focused interaction pass. Expected local analytics404 and intentionally aborted media requests were observed.
- `/resume`, `/resume.pdf`, `/projects/tcg-shelf` and a Next optimized-image request return200 with expected content types.
- Before/after full-page screenshots at390/1440 inspected. Text matches exactly at both sizes; retro palette, typography, cards and backgrounds retained. Full-page pixel differences include deferred rendering of offscreen sections, so these are not pixel-identical screenshot assertions. Initial immediate DOM metrics were affected by scrollbar/viewport settling and are not visual acceptance evidence.
- Homepage first-load JS212kB versus211kB before the patch; case study186kB versus185kB.

Preview: http://localhost:3012 (loopback only). Prepared for publication with the component changes; hosted deployment status is not verified. Cross-browser, physical-device and complete screen-reader checks were not performed.

## Remaining development findings resolved — 2026-11-07

The six findings were one underlying minimatch10.2.6 advisory propagated through five TypeScript ESLint packages: GHSA-g3hv-75wg-m249 (https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249). The latest typescript-estree8.72.1 still declares minimatch^10.2.2. Added a scoped override for `@typescript-eslint/typescript-estree` to minimatch11.0.1, the upstream patched release. Other consumers retain their compatible minimatch3.1.5. Node24.18.0 satisfies the patched package's engine requirement; the consumer's named minimatch API with dot:true passed matching/nonmatching/nested/dotfile checks. Revisit this override when typescript-estree adopts the patched major itself.

Full npm audit now reports **zero vulnerabilities across production and development dependencies**. This supersedes the earlier six-moderate limitation. Evidence: `.playwright-mcp/audit-moderate-before.json` and `audit-moderate-after.json`.

Verified production build (including lint/types and seven static pages), standalone ESLint, npm ci dry-run, npm ls dependency validity, and git diff --check. No application source, styling or runtime dependency changed. All26 application JS/CSS assets have identical SHA-256 hashes before/after; the two build-ID-specific manifest paths changed as expected. Evidence: `.playwright-mcp/moderate-asset-comparison.json`.

Chromium checks passed320/390/768/1440 overflow, local demo playback, Escape/focus restoration, keyboard disclosure, project-map End-key selection, case-study navigation/back link and resume200, with no page exceptions. Desktop1440 screenshot pixel-identical; mobile390 screenshot visually inspected and unchanged in layout/content/style (not claimed pixel-identical). JS bundle sizes unchanged at212kB home and186kB case study. Local analytics404 remains expected. Preview restarted localhost3012, loopback only. Included in the component/security publication; hosted deployment status is not verified.
