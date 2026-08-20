// Aarya brand tokens — JS values, for places that need a color string
// (inline styles, Lucide icon `color` props, chart libraries) rather than
// a CSS custom property. Kept as plain values, not CSS var() references,
// so they work with any component regardless of where in the DOM it renders.
//
// Plain .js (not .ts) deliberately — this package is consumed via a git
// dependency, and Vite's dependency pre-bundler expects pre-built JS in
// node_modules, not raw TypeScript. Keep it framework-agnostic.

export const AARYA_BG = '#0e1a2d';

export const AARYA_COLORS = {
  violet: { 600: '#7c3aed', 400: '#a78bfa' },
  blue: { 700: '#1d4ed8', 400: '#60a5fa' },
  sky: { 400: '#38bdf8' },
  emerald: { 800: '#065f46', 400: '#34d399' },
  amber: { 800: '#92400e', 400: '#fbbf24' },
  rose: { 800: '#9f1239', 400: '#fb7185' },
  purple: { 900: '#581c87', 400: '#c084fc' },
  slate: { 700: '#334155', 400: '#94a3b8' },
};

export const AARYA_FONT_SANS =
  "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
