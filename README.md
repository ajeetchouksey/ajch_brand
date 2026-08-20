# @aaryaai/brand

Shared design tokens for the Aarya vertical family — [ajch_platform](https://github.com/ajeetchouksey/ajch_platform) (main platform), [Spark](https://github.com/ajeetchouksey/ajch_spark) (kids), and Compass (non-technical professionals), with more verticals expected.

One brand, extended per vertical — not one brand forked per vertical.
See [docs/BRAND.md](docs/BRAND.md) for what's canonical, what a vertical
may extend, and how to consume this package.

## Contents

- `tokens/colors.css` — the full primitive color palette + the 2-variable
  extension surface (`--aarya-accent`, `--aarya-accent-2`)
- `tokens/typography.css` — the type family
- `tokens/index.css` — imports both, single entry point
- `tokens/tokens.js` — the same color values as plain JS, for inline
  styles / icon props that can't use `var()`
