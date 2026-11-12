# Playable atlas prototype

Route: `/atlas`. Branch: `codex/playable-atlas-prototype`.

## Intent

An isolated art and motion study for Quintin's portfolio: folded field atlas, three-panel unfolding, illustrated archipelago, selectable project destinations, real project case studies, and return to exploration. The existing homepage, catalog, screenshots, and other routes are preserved.

## Current implementation

- Original, code-authored SVG cartography in `public/atlas/archipelago.svg`; no generated raster images, downloaded third-party assets, or new dependencies.
- Vector illustration study, not finished pixel art. Do not claim artist-made provenance or final visual approval.
- Four named destinations plus an index exposing every existing project from `src/data/projects.ts`.
- Native modal dialog, Escape and back controls, project hash deep links, optional synthesized sound, reduced-motion behavior, and responsive styles.
- A separate route marked noindex; no homepage replacement or production promotion.

## Remaining art and motion work

1. Visually inspect desktop and phone at 1440, 1024, 768, 390 and 360 pixels. Review the entire animation, not only screenshots.
2. Verify native dialog focus restoration, Escape, browser hash navigation, full project index, sound toggle, and reduced-motion behavior.
3. Refine the physical opening: this first study has hinged paper panels, but does not yet include hands, envelope extraction, or convincing hand-paper interaction.
4. Evaluate coherent artist-created high-detail pixel assets against this illustrated direction; preserve exact source URLs and license files if assets are imported. Avoid mismatched pixel scales or stock sprites posing as custom landmarks.
5. Refine scene-specific transitions: destination-aware map camera travel is implemented, followed by the existing case-study dialog. A custom interior/doorway scene is still not implemented.
6. Optimize after visual QA. Maintain direct readable project content and a classic portfolio escape route.

## Verification at first checkpoint

`npx tsc --noEmit` and `npm run build` passed. Next builds `/atlas` statically; initial route first-load JS reported 119 kB.

Browser QA is pending: the managed `sites-preview` launcher appends Vite flags (`--host` and `--strictPort`) to `next dev`, which rejects them. The preview exits before serving. Do not modify a working application's dev script just to accommodate this infrastructure issue. Use a supported preview path or the branch's Vercel preview if available.

## References

- https://github.com/JSLegendDev/2d-portfolio-kaboom
- https://github.com/brunosimon/folio-2025
- https://github.com/phaserjs/template-nextjs
- https://www.mapeditor.org/
- https://kenney.nl/assets/tiny-town
- https://cainos.itch.io/pixel-art-top-down-basic

These are research references only; their code or assets have not been copied into this prototype.

## Entrance refinement

The opening now includes original monoline name lettering drawn with SVG stroke animation, staggered title lines, and a short stepped text reveal. The complete text remains in the accessibility tree; controls are immediately available, and reduced-motion preferences suppress the choreography. No fake loading percentage or mandatory wait is introduced.

Art direction requirement: match the restraint and deliberate timing of the reference at https://antwi.dev/ (its handwritten name and Skip/Fast forward intro were observed in the browser). Do not copy its lettering or assets. Aim for senior-level execution: coherent palette, typography, layout, animation timing, accessibility, responsive behavior, and performance. This is still a prototype pending visual QA, not a claim of final polish.

## Destination travel checkpoint — November 11

- Selecting a mapped project now moves a separate camera layer toward that landmark before the case study opens (380 ms). The paper unfolding transform remains independent. The return restores the overview.
- An immediate “Open now” control skips travel; Escape cancels it. Reduced motion and direct hash links open without travel.
- The original trigger is retained for focus restoration. Closing the modal no longer rewrites URLs in response to browser history events. Project entry pushes history, and popstate/hashchange synchronize the dialog.
- Background scrolling is locked only while the native dialog is open. Mobile destinations have a 48 px minimum hit area.
- Folded-map placement now reserves more vertical space below the added handwriting and heading; visual confirmation remains required.
- Vercel reports successful branch deployments through GitHub status checks. A direct browser attempt at the bot-provided preview URL redirected to Vercel login. No access settings were changed, and no alternate protected host was probed. The managed preview launcher defect remains unresolved. Desktop/mobile appearance, focus behavior, and animation timing remain browser-unverified.

Preview entry from the Vercel bot: https://my-portfolio-git-codex-playable-atlas-p-759deb-quintin-b167b285.vercel.app/atlas (requires Vercel login in the current cloud browser).

## Transition controls checkpoint — November 11, 09:00 UTC run

- Unfolding now hands keyboard focus to the immediate skip control, then to the first destination after React removes `inert`. Folding restores focus after the cover controls become interactive. The unfolding timer is scoped to its phase and is cancelled on skip, navigation, or unmount.
- Camera travel focuses its “Open now” control. A destination is counted as explored only when its case study opens; cancelling travel does not add it. Direct project links now count as visits, and each opened case study starts at its top.
- Enabling reduced motion during an active unfolding or travel finishes that transition immediately. Audio cleanup clears the closed context reference.
- Validation: TypeScript and targeted ESLint passed; production build passed with no new dependencies. Browser interaction and desktop/mobile animation QA remain unverified because of the previously recorded preview/access blockers. This checkpoint fixes source-observable transition issues; it does not establish visual quality approval.
- Next useful work remains visual inspection of the existing opening and travel before adding more art or motion. Hands, envelope extraction, and project interiors are still incomplete. No homepage or project catalog changes.

## Paper depth review — November 11

- Rendered the original SVG at 1200 × 760 with Inkscape and inspected the result. The palette and landmark silhouettes are coherent; the sparse geometric islands remain an illustration study, not the requested final detailed art. No assets were added or replaced.
- Found a 3D compositing defect: `filter: drop-shadow(...)` on `.atlas-paper` forces its `preserve-3d` children flat. Moved the shadow to `.atlas-camera` and assigned perspective there, directly above the paper. This preserves the folding layer's 3D context while keeping camera travel independent.
- References for the correction: [MDN transform-style grouping properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style), [MDN perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective).
- Type-check and production build passed. SVG inspection does **not** verify browser composition, responsive UI, or animation. The recorded preview blockers still apply; actual desktop/mobile opening review remains the next quality gate. Do not treat repeated source-only refinements as visual approval.

## Combined atlas and unfolding world — November 11, 2026

Combined the atlas opening with the unfolding world's nine project landmarks, pixel traveller, native horizontal exploration, full project notes and existing demos. Selectively adapted the world from `feat/unfolding-portfolio-world` (`7720675`), without merging its homepage replacement. All application changes live under `src/app/atlas`; existing project data, media, homepage and case-study sources are unchanged. About, experience and contact destinations link to their original homepage sections.

The centered handwritten introduction and folded cover now lead to either the paper map or an immediate world skip. Navy, parchment and gold styling joins the two views. The map reserves space for its heading and toolbar; mobile has a four-destination shortcut legend. Pioneer Arcade has a themed entrance and room header above the complete engineering notes. Map entry arrives at the matching world landmark; closing restores its focus and position. Native horizontal scrolling, arrow keys, Home/End, Enter, destination controls and a complete expandable reading list provide alternate navigation.

The project visit uses Radix so existing nested demo dialogs remain usable. Opening and travel have immediate skip controls, Escape cancels travel, reduced motion bypasses transitions, and direct project hashes open their matching destination. Full notes remain available without JavaScript. Sound remains opt-in.

Local preview is working at `http://127.0.0.1:3015/atlas`, using Next's supported `--hostname` and `--port` arguments. The earlier managed-launcher/protected-preview blockers do not block this local preview. Production build (including lint/types/static generation) and standalone TypeScript passed. Chromium checked widths 320/390/768/1440 without horizontal overflow; all nine project deep links restored their landmark focus and scroll position; keyboard opening skip, travel cancellation (zero visits), map-to-Pinball entry/return, nested TCG MP4 loading/playback and Escape, no-JavaScript notes, and client navigation back to the original homepage passed. Desktop/mobile screenshots were inspected locally. The local analytics endpoint returns 404; no production analytics claim is made.

This remains a prototype: hands, envelope extraction, fully walkable project interiors and final detailed island art are unfinished. Cross-browser, physical-device and full assistive-technology testing were not repeated for this combination. Prior unfolding-only results do not certify the combined route. No merge or production deployment is authorized or performed.
