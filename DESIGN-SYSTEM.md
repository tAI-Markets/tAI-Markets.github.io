# tAI Markets — Design System & Standards

**The brand reference page is `index.html` (the homepage).** Every new page must look like
it belongs to the same product. This document defines the system; `assets/theme.css` is its
implementation. If a page introduces a color, font, or component that isn't here, it's wrong.

## Rule zero

Every page links **`/assets/theme.css`** and uses the standard **nav** + **footer** markup
(copy them from `index.html` or `demo/index.html`). Never re-invent a palette.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#0a0a0f` | page background |
| `--bg-secondary` | `#0d1520` | cards, panels, KPIs |
| `--bg-tertiary` | `#111b2b` | nested surfaces, secondary buttons |
| `--accent-primary` | `#00a3e0` | **the brand blue** — links, CTAs, data highlights, status-ok |
| `--accent-secondary` | `#0077b3` | gradients, hover states |
| `--accent-glow` | `rgba(0,163,224,.15)` | glows, shadows |
| `--text-primary` | `#ffffff` | headings, primary text |
| `--text-secondary` | `#a8c5e0` | body text |
| `--text-muted` | `#6b8cae` | labels, meta, footers |
| `--border-color` | `#1a3a5c` | all borders |
| gradient | `#00a3e0 → #0077b3` (135deg) | CTAs, logo tile, price text |

**Semantic state colors** (only for state, never decoration):
`--semantic-ok` = brand blue `#00a3e0` · `--semantic-warn` = `#e0a338` · `--semantic-error` = `#e0526b`.

**Never**: green as the primary accent (the brand is blue), pure `#000` backgrounds, colors
outside this table without adding them here first.

## Typography

| Font | Weight | Use |
|---|---|---|
| Inter 400/500/600/700 | body | all UI text, headings, buttons |
| JetBrains Mono 400/500 | data | **only** terminal, code, addresses, numeric data tables |

## Components (implemented in theme.css)

- **Nav** — sticky, blurred (`rgba(10,10,15,.75)` + blur 20px), `logo.jpg` + links + gradient `nav-cta` pill.
- **Buttons** — `.btn` radius 12px; `.btn-primary` gradient; `.btn-secondary` tertiary + border.
- **Cards** — `.card` (radius 16px, bg-secondary, border) / `.card-raised` (radius 24px).
- **Badges** — `.badge-ok` / `.badge-warn` / `.badge-error` (state only).
- **Data tables** — `table.data` (JetBrains Mono cells, muted headers, hairline rows).
- **Sections** — `.section-label` (blue caps) → `.section-title` (42px/700) → `.section-desc`.
- **Footer** — 4-column grid (brand + link groups) + `.footer-bottom` bar. Standard on every page.
- **Atmosphere** — `.bg-grid` + `.bg-glow` divs (blue grid + radial glow) on every page.

## Radius scale

8 (small) · 12 (buttons) · 16 (cards) · 24 (hero/panels). Nothing else without updating this file.

## Reference implementations

- Marketing page: `index.html`
- Data dashboard: `demo/index.html` (polls a gateway API, renders with the shared tokens)
- Commercial page: `licensing.html` (tier cards + panels)

## History

The green (`#00ff9d`) terminal theme on `demo/` and `licensing.html` (Aug 2026) was a
divergence — rebuilt onto this system Sep 2026. If you find green accents, they're a regression.
