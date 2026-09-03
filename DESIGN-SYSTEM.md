# tAI Markets — Design System & Standards

**The brand reference page is `index.html` (the homepage).** Every new page must look like
it belongs to the same product. This document defines the system; `assets/theme.css` is its
implementation. If a page introduces a color, font, or component that isn't here, it's wrong.

## Rule zero

Every page links **`/assets/theme.css`** and uses the standard **nav** + **footer** markup
(copy them from `index.html` or `demo/index.html`). Never re-invent a palette.

## Direction

Light, clean, typographic, almost colorless. The product must read as acquirable
forward-compute infrastructure — not a crypto venue. Ink on warm white; one black CTA per
view; data in mono; steel reserved for links, the live-dot, and chart series 1.

Reference surfaces (restraint, not costumes): openai.com, claude.com, openrouter.ai,
logicalintelligence.com, amilabs.xyz, x.ai (discipline only — never its dark canvas).

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#fbfbfa` | page background (warm white) |
| `--bg-secondary` | `#ffffff` | cards, panels |
| `--bg-tertiary` | `#f3f2ee` | nested surfaces, code panels |
| `--bg-inverse` | `#111110` | inverse band / filled CTA |
| `--border-color` | `rgba(17,17,16,0.10)` | hairlines |
| `--border-strong` | `rgba(17,17,16,0.18)` | featured cards |
| `--text-primary` | `#111110` | headlines, body, KPI values (ink) |
| `--text-secondary` | `#5c5a55` | body text |
| `--text-muted` | `#8a8780` | labels, meta, footers |
| `--text-on-inverse` | `#fbfbfa` | text on black |
| `--accent-primary` | `#111110` | CTAs are black |
| `--accent-secondary` | `#3d3d3a` | hover ink |
| `--accent-signal` | `#2f6f8f` | steel — links, live-dot, chart series 1 **only** |
| `--accent-dim` | `rgba(47,111,143,0.10)` | steel wash (charts only) |

**Semantic state colors** (state only, never decoration):
`--semantic-up` = `#1f8a6e` · `--semantic-down` = `#c43c4e` · `--semantic-warn` = `#b5791d` ·
`--semantic-ok` = `--semantic-up` · `--semantic-error` = `--semantic-down`.

**Retired, must not appear in page CSS:** `#00a3e0`, `#0077b3`, `#0a0a0f`, `#0d1520`,
`#111b2b`, `#1a3a5c`, `#00ff9d`, and any 135deg brand gradient. Cyan headlines, matrix
rain, page grids, and pulsing glows are regressions.

### Color law

- Headlines, body, KPI labels, and KPI values are ink (`#111110`) — never cyan, never steel.
- Steel (`#2f6f8f`) is legal only on text links, the live-dot, and chart series 1.
- Signed market deltas use `--semantic-up` / `--semantic-down` only.
- One filled CTA per view: black background, white label. Everything else is ghost.
- No colored card borders. No accent wash behind the hero.

## Typography

Inter 400/500/600/700 (Google Fonts) for all UI. JetBrains Mono 400/500 for data, tickers
(`$tOpus`, `$tGLM`, …), addresses, code, and section eyebrows.

| Style | Spec |
|---|---|
| Display (hero only) | Inter 600, 72px desktop / 40px mobile, lh 1.05, tracking −0.035em, `--text-primary` |
| Section title | Inter 500, 36px, lh 1.15, tracking −0.02em, `--text-primary` |
| Body | Inter 400, 17px, lh 1.6, `--text-secondary` |
| Eyebrow (`.section-label`) | JetBrains Mono 500, 11px, uppercase, tracking 0.16em, `--text-muted` |
| Buttons | Inter 500, 14px |

## Shape / motion

- Radius: **8px** for cards, buttons, inputs; **999px** for status chips only. Nothing else.
- No drop shadows (optional `0 1px 2px rgba(17,17,16,0.04)` on raised desks only).
- No matrix rain, no `.bg-grid` page identity, no `.bg-glow` or pulse animations, no
  gradient fills. A live mono ticker of `$tModel` prints is allowed; falling hex is not.

## Components (implemented in theme.css)

- **Nav** — sticky, `rgba(251,251,250,0.82)` + `blur(16px)`, hairline bottom. Sharp logo
  tile (28–32px, radius 0) + optional "tAI Markets" text + links in `--text-secondary`.
  CTA = black rect, 8px radius, white text, label "Live Demo".
- **`.btn-primary`** — bg `#111110`, color `#fbfbfa`, radius 8, no gradient, no bounce.
  Hover: `opacity 0.88`.
- **`.btn-secondary`** — transparent, 1px `--border-color`, `--text-primary`.
- **`.card`** — `#fff`, `--border-color`, radius 8, padding 24–32.
- **Featured card** (Provider tier) — same + `--border-strong` + 11px mono eyebrow
  "RECOMMENDED". No glow.
- **KPI** — 11px mono muted label, 32px Inter or Mono value in `--text-primary`, 12px
  caption. Color the value only when it is a signed delta.
- **`table.data`** — mono cells, muted uppercase headers, hairline rows.
- **Badges** — semantic colors only, 8% fill, 40% border, pill.
- **Footer** — light, 4 columns, hairline top. Optional inverse closer band only if the
  rest of the page stays light.
- **Code / harness panels** (`.panel-code`) — `--bg-tertiary`, mono, no neon.
- **Stepper** (`.steps` / `.step`) — mono 11px uppercase chip row for multi-step
  conversion flows (demo buy flow). Current step: ink on surface, `--border-strong`.
  Done steps: check + clickable. Locked steps: 55% opacity. Numerals `.n` in mono.
  Never more than one stepper per view; transitions are instant or a single ≤200ms fade
  (respect `prefers-reduced-motion`). One `.btn-primary` per view — the stepper is
  never a CTA row.
- **`.input`** — shared form input: `--bg-primary`, 1px `--border-color`, radius 8,
  focus border `--border-strong`. `.btn[disabled]` — 50% opacity, no hover lift.

## Reference implementations

- Marketing page: `index.html`
- Data dashboard: `demo/index.html` (polls a gateway API, renders with the shared tokens)
- Commercial page: `licensing.html` (tier cards + panels)

## History

The green (`#00ff9d`) terminal theme on `demo/` and `licensing.html` (Aug 2026) was a
divergence — rebuilt Sep 2026. **Sep 2026: dark cyan-fintech surface retired. Light lab
canvas so the product reads as acquirable forward-compute infrastructure.** If you find
green or cyan accents, they're a regression.

## Asset caching (GitHub Pages)

GH Pages serves static assets with `Cache-Control: max-age=14400` (4h). If you replace an
asset (logo, theme.css) after a broken deployment, browsers that saw the broken state will
keep it for up to 4h — **cache-bust by changing the asset URL** (currently `?v=3`) rather
than waiting out the cache.
