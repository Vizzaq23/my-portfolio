# Arcade interaction preview

Local route: `/atlas/arcade`. This is one working cabinet-to-project interaction, not the complete island or an implemented platformer. It does not replace the accepted TV intro. Cabinet artwork is CSS and SVG icons; the project image is the existing TCG Shelf screenshot. No generated artwork was added.

## Code → visible behavior

### 1. React owns the interaction

```tsx
const [open, setOpen] = useState(false);
const [feature, setFeature] = useState(0);
<Dialog.Root open={open} onOpenChange={setOpen}>
```

Clicking the cabinet or pressing Enter opens the project. Radix Dialog provides modal semantics, focus trapping, Escape dismissal, and focus restoration to the cabinet. Feature selection persists when closing and reopening during the current page visit.

### 2. The cabinet screen becomes the project panel

```tsx
<motion.div layoutId={quiet ? undefined : 'project-screen'}
  transition={transition} />
```

The small screen and large panel share this identity in a Motion LayoutGroup. Motion interpolates their position and size. Closing reverses the journey. AnimatePresence keeps exiting elements available during their transition. The page behind the panel subtly scales and dims; detail content fades in after the opening starts.

### 3. Feature selection is actual UI

```tsx
onClick={() => setFeature(i)}
aria-pressed={i === feature}
<motion.span layoutId="feature-pill" transition={transition} />
```

Collect / Track / Share are keyboard-accessible buttons. The selection indicator moves between them; AnimatePresence transitions the explanation. A polite live region announces new content. These explain the real product; they are not a simulation of its backend.

### 4. Existing content stays authoritative

```tsx
const project = projects.find(p => p.id === 'tcg-shelf')!;
project.highlights.map(text => <li key={text}>{text}</li>)
project.tags.map(tag => <span key={tag}>{tag}</span>)
```

Summary, screenshot, technology tags, highlights, and live URL come from `src/data/projects.ts`. The three feature explanations are sourced from the existing TCG case study. Future cabinets can reuse the interaction, but this pass intentionally implements only TCG Shelf.

### 5. Motion and responsive behavior

`useReducedMotion()` and a user pause toggle disable shared-screen travel and set transitions to zero duration. CSS stacks the panel on narrow screens and keeps its close button sticky while content scrolls. Route-scoped CSS hides the site's shared navigation/footer only while this preview is present; the homepage files are untouched.

## Validation

Production build includes TypeScript and ESLint. Browser review covers desktop and narrow layouts, image loading, feature switching, keyboard activation, Escape return, focus restoration, and pause mode. No new dependency, merge, or production deployment.
