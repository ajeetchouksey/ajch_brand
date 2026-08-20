# Aarya brand standard

One brand, extended per vertical — not one brand forked per vertical. This
package is the shared base every vertical builds on; each vertical adds a
small, explicit extension on top rather than copying and drifting.

## What's canonical (never override)

- The full primitive color palette (`--aarya-violet-*`, `--aarya-blue-*`,
  `--aarya-sky-*`, `--aarya-emerald-*`, `--aarya-amber-*`, `--aarya-rose-*`,
  `--aarya-purple-*`, `--aarya-slate-*`) — `tokens/colors.css`
- The type family — Inter — `tokens/typography.css`
- The dark glass-card visual language (blur, translucency, top-accent
  border) — still lives per-repo in `src/components/ui/`, not yet
  extracted into this package (see "Not yet shared" below)

## What verticals may extend

Exactly two custom properties, redeclared in the vertical's own
`src/index.css`, **after** importing this package:

```css
@import "@aaryaai/brand/tokens/index.css";

:root {
  --aarya-accent: var(--aarya-violet-600);   /* pick ONE primitive, don't invent a new hex */
  --aarya-accent-2: var(--aarya-sky-400);
}
```

That's the whole extension surface. A vertical picks which two primitives
from the shared palette are *its* accent pair — it does not invent new
colors. This keeps every vertical visually related (same palette family)
while still feeling distinct (different accent pair, different balance).

**Current assignments:**

| Vertical | `--aarya-accent` | `--aarya-accent-2` | Why |
|---|---|---|---|
| ajch_platform (main) | violet-600 | sky-400 | The original — everything else extends from this |
| Spark (kids) | amber-400 | emerald-400 | Warmer, brighter, higher-contrast pair for a kids audience |
| Compass (non-technical pros) | blue-700 | sky-400 | Closer to the original — restrained, professional, echoes the old Discovery "safety" track's blue |

## Using this package

1. Add the dependency (git-based, no npm publish/registry needed):
   ```json
   "dependencies": {
     "@aaryaai/brand": "github:ajeetchouksey/ajch_brand#main"
   }
   ```
2. `@import "@aaryaai/brand/tokens/index.css";` at the top of your own
   `src/index.css`, before your own rules.
3. Add the Google Fonts `<link>` tags to your `index.html` `<head>`
   (this package ships the CSS var, not the font file — the `<link>`
   still has to be per-repo since it's in `index.html`, not CSS):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
   ```
4. For JS-side color access (inline styles, icon `color` props), import
   from `tokens/tokens.js` instead of hardcoding hex values:
   ```js
   import { AARYA_COLORS } from '@aaryaai/brand/tokens/tokens.js';
   ```

## Not yet shared (known gap, not a decision)

`src/components/ui/*` (GlassCard, Badge, Button, ...) is still copied
per-repo, documented per-repo in each vertical's own `design-sync.md` —
this package only covers tokens (color/type), not components. Extracting
components into this package too is a reasonable next step once a third
vertical's copy has actually drifted in a way that hurts — not before.
Premature component sharing here would mean guessing at an API surface
no second consumer has stress-tested yet.

## Why a git dependency, not an npm-published package

No npm org/registry publish credentials exist for this account today, and
setting one up is unnecessary ceremony for an internal, all-public-repo
family with one maintainer. `github:owner/repo#ref` in `package.json` is
zero-infrastructure and pins to a real commit like any other dependency.
Revisit only if this package needs to be consumed by something outside
the Aarya GitHub org.
