# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`@aaryaai/brand` is not an application — it's a tiny, dependency-free CSS/JS
design-tokens package shared across the Aarya vertical family
(ajch_platform = main platform, Spark = kids, Compass = non-technical
professionals, with more verticals expected). There is no build step, no
lint config, no test suite, and no package manager lockfile — the entire
package is four hand-written files under `tokens/`. Treat any edit here as
a change to a public contract consumed by multiple other repos, not as
application code.

Consumers pull it as a **git dependency**, not an npm-published package:
`"@aaryaai/brand": "github:ajeetchouksey/ajch_brand#main"`. There's no
registry publish step — pushing to `main` *is* the release. Consumers then
do `@import "@aaryaai/brand/tokens/index.css";` in their own `src/index.css`,
and/or `import { AARYA_COLORS } from '@aaryaai/brand/tokens/tokens.js'` in JS.

## Working in this repo

There's nothing to build, lint, or test — verify changes by reading the
CSS/JS directly and checking values against what's documented. When
changing a token value, the practical check is: does it still match what's
live in `ajch_platform`'s `src/index.css` / `src/components/ui/GlassCard.tsx`
(`ACCENT` map) / `Badge.tsx` (`BADGE_VARIANTS`), since those were the source
this package was extracted from and other verticals key off it. There is no
automated way to catch drift — it's manual cross-repo comparison.

`tokens/tokens.js` is deliberately plain `.js`, not `.ts` — this package is
consumed via a raw git dependency, and Vite's dependency pre-bundler expects
pre-built JS in `node_modules`, not TypeScript to compile. Don't convert it.

## Architecture: "one brand, extended per vertical"

The core design rule, from `docs/BRAND.md`, is: **one brand, extended per
vertical — not one brand forked per vertical.** This package holds what's
canonical; each vertical adds a small, explicit extension on top rather than
copying the whole thing and letting it drift.

- **Canonical, never overridden by a vertical**: the full primitive color
  palette in `tokens/colors.css` (`--aarya-violet-*`, `--aarya-blue-*`,
  `--aarya-sky-*`, `--aarya-emerald-*`, `--aarya-amber-*`, `--aarya-rose-*`,
  `--aarya-purple-*`, `--aarya-slate-*`) and the type family (Inter) in
  `tokens/typography.css`.
- **The only extension surface**: exactly two custom properties,
  `--aarya-accent` and `--aarya-accent-2`. A vertical's own `src/index.css`
  imports this package, then redeclares those two vars to *one of the
  existing primitives* — it never invents a new hex value. Current
  assignments (see table in `docs/BRAND.md`): ajch_platform = violet-600 /
  sky-400 (the original), Spark = amber-400 / emerald-400 (warmer, kids),
  Compass = blue-700 / sky-400 (restrained, professional).
- **Not yet shared (known, deliberate gap)**: the dark glass-card visual
  language (blur, translucency, top-accent border) — `GlassCard`, `Badge`,
  `Button`, etc. — still lives copied per-repo in each vertical's own
  `src/components/ui/`, documented per-repo in that repo's own
  `design-sync.md`. This package covers tokens only, not components.
  Don't extract components into this package speculatively — per
  `docs/BRAND.md`, that's intentionally deferred until a second vertical's
  copy has actually drifted in a way that hurts.
- **Fonts are half-shared by necessity**: this package ships the
  `--aarya-font-sans` CSS var, but the Google Fonts `<link>` tags must still
  be added per-repo to each vertical's `index.html` `<head>`, since a CSS
  `@import` of Google Fonts is blocked by most CSPs. The exact snippet is in
  `docs/BRAND.md` under "Using this package."

## File map

- `tokens/colors.css` — primitive palette + `--aarya-bg`, `--aarya-accent` /
  `--aarya-accent-2` (default = ajch_platform's values), `--aarya-gradient`.
- `tokens/typography.css` — `--aarya-font-sans` only.
- `tokens/index.css` — single entry point, just imports the two files above.
- `tokens/tokens.js` — the same colors as a plain JS object (`AARYA_COLORS`,
  `AARYA_BG`, `AARYA_FONT_SANS`) for contexts that can't use `var()` (inline
  styles, icon `color` props, chart libraries).
- `docs/BRAND.md` — the actual spec: what's canonical, the extension
  mechanism, current per-vertical assignments, consumption instructions, and
  the "why a git dependency, not npm" rationale.
