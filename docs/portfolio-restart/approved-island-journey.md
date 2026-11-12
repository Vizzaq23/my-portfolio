# Approved island direction — first implementation

November 11, 2026. Branch: `codex/portfolio-restart`. The user rejected the cream studio because it lost the original website's identity, then approved the screenshot-grounded Pinball-island concept. This supersedes the studio recommendation in creative-brief.md. The approved concept is a visual direction, not acceptance of this subsequent implementation.

## Scope

New isolated `/atlas` route. Retains original navigation, blue water, rounded islands, navy/gold interface and existing project map with Chopper. The Pinball entrance uses the approved illustrated arcade artwork with actual HTML controls. Original homepage, shared components, project data and project media were not edited.

Journey: illustrated Pinball entrance → real project photograph, original summary/highlights/details/technologies/code link and demo → return with focus and scroll restored. All-projects view reuses the existing keyboard-operable map. Selecting Pinball and exploring opens its arcade entrance; the direct directory can bypass this. All nine original project records remain available. Browser history supports returning between screens; hash links identify projects.

The arcade is an illustrated entrance, not a walkable 3D interior. Chopper movement remains on the existing all-project map; the new arcade scene is static. No forced opening or transition delay. Native links, heading focus, restored map selection, a direct project directory and reduced-motion CSS are retained/provided. No-JavaScript users get a direct link to the original portfolio. No new asset pack or dependencies.

## Verification

- Final Next.js production build, its lint/type checks, and standalone TypeScript passed.
- Browser inspected desktop and 390px scene; 320px and 390px checks found no horizontal overflow.
- All nine project visits exposed their original records and returned to the map at 320px without overflow.
- ArrowRight from Pinball selected/focused Trading Agent. Entering and returning retained Trading Agent selection and focus.
- Pinball entry focused its heading; return restored Explore project focus. Browser Back returned to the island.
- Actual LinkedIn Pinball video: readyState 4, paused false, time advancing. Escape from the Close demo control closed the dialog and returned focus to Watch Pinball. Cross-origin iframe keyboard focus can still capture Escape; explicit Close demo remains available.
- Final production map → Pinball arcade path verified after the last routing change.
- Source scope check: no homepage, original project data/media or shared-component edits. Existing unrelated contrast and coordination changes remain excluded.
- Reduced-motion support inspected in source; full assistive-technology, physical-device and cross-browser checks were not performed. No broad accessibility certification.

Preview: http://127.0.0.1:3017/atlas. Restart: `npm run build`, then `npm run start -- --hostname 127.0.0.1 --port 3017`.

Screenshots: `.playwright-mcp/atlas-pinball-desktop.jpg`, `.playwright-mcp/atlas-pinball-mobile.jpg`. Artwork provenance: `public/atlas/ARTWORK.md`.

No push, merge or production deployment. PR #7 remains the closed discarded prototype; this work is local on the restart branch. Next: user reviews the actual composition and entrance/return journey before expanding bespoke landmarks, character movement into the arcade, or interior art.
