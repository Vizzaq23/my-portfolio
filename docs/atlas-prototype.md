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
