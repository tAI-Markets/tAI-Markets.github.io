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

## Mobile & breakpoints

### Breakpoints
- `--bp-sm: 600px` — single column, drawer nav
- `--bp-md: 860px` — compact tablet; drawer still on
- `--bp-lg: 1080px` — inline nav allowed; homepage rails/pin allowed
Nav collapses at `max-width: 860px`. Same number on every page (docs-app: see its
subsection — the collapse is forced to 860 via custom.css override of Infima's 996).

### Viewport + tap
- `width=device-width, initial-scale=1` on every HTML page.
- Minimum tap target 44×44px for nav links, hamburger, buttons, stepper chips.
- Hamburger is 44×44, vertically centered with the 28px logo tile. Icon 20px,
  2px strokes, ink `#111110`. `aria-expanded` state + `aria-controls="nav-drawer"`.

### Page chrome
- Horizontal page padding: `20px` <600 · `24px` 600–1079 · `24–32px` ≥1080.
- Section padding: `96px` (lg) / `72px` (md ≤860) / `56px` (sm ≤600), implemented as
  the shared `.section` class. No page invents its own section rhythm.
- One `.btn-primary` per view. `<860px`: `.hero-actions` stack full-width, primary
  first, 12px gap. Buttons `height: 44px`, padding `12px 20px`, radius 8.

### Nav — desktop ≥861
Sticky frosted bar, hairline bottom, no shrink-on-scroll. Item order on every page:

> [sharp 28px logo] [tAI Markets] · Protocol · Models · Documentation · GitHub ·
> Licensing · [Live Demo]

Active page gets `.active`. `Live Demo` is `.nav-cta` (black pill) only — on the page
it points at (demo), it renders as `.active` text instead, so the view keeps a single
primary CTA.

Exact snippet (paste verbatim; no cousins):

```html
<nav class="nav">
  <div class="nav-container">
    <a href="/" class="logo" aria-label="tAI Markets home">
      <img src="/logo.jpg?v=3" alt="" width="28" height="28">
      <span>tAI Markets</span>
    </a>
    <div class="nav-links">
      <a href="/#architecture">Protocol</a>
      <a href="/#models">Models</a>
      <a href="/docs/">Documentation</a>
      <a href="https://github.com/tAI-Markets/tAI-contracts" target="_blank" rel="noopener">GitHub</a>
      <a href="/licensing.html">Licensing</a>
      <a href="/demo/" class="nav-cta">Live Demo</a>
    </div>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-drawer" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-drawer" id="nav-drawer">
    <a href="/#architecture">Protocol</a>
    <a href="/#models">Models</a>
    <a href="/docs/">Documentation</a>
    <a href="https://github.com/tAI-Markets/tAI-contracts" target="_blank" rel="noopener">GitHub</a>
    <a href="/licensing.html">Licensing</a>
    <a href="/demo/" class="nav-cta">Live Demo</a>
  </div>
</nav>
<script src="/assets/nav.js?v=1" defer></script>
```

Mark the active page's inline link with `.active` per page.

### Nav — mobile ≤860
- Inline links `display: none`. Hamburger only, right side. No Live Demo in the top bar.
- The drawer is a full-width panel under the bar (not a modal, not a right sheet):
  background `--bg-primary`; hairline top; padding `8px 20px 20px`; links vertical,
  each row 44px, left-aligned with the wordmark; Inter 500 / 16px / `--text-primary`;
  last item = black Live Demo, full width, 44px.
- Open: lock body scroll (`body.nav-locked`). Escape and hamburger both close.
  Drawer id `nav-drawer`. Toggle handled by `assets/nav.js` on every page.

### Type on small screens
- Display 40px; hero measure max 20em.
- Section title 28px below 860.
- Body 16px / 1.55 below 600.
- Eyebrow may wrap.
- KPI value 28px below 600, 32px above.
- Tables: never shrink mono below 12px; scroll inside `.table-wrap`.

### Data surfaces
- KPI grids (`.kpi-grid`): 4-col ≥1080 · 2-col 600–859 · 1-col <600.
  No 4-across on a phone.
- `table.data` sits inside `.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }`.
- Code panels wrap or scroll-x (`.panel-code`); never expand page width.
- Stepper chips wrap, 44px tall ≤860; current step always visible.

### Footer
- 1 column below 860. Link rows 44px on mobile.

### Docs-app → /docs
- `docs-app/src/css/custom.css` uses the same tokens (already mirrored as `--tai-*`).
- Same logo tile + wordmark + item set as the marketing nav.
- ≤860px the Docusaurus menu shows 44px left-aligned rows, black Live Demo last.
- No Infima purple, no second font. Collapse forced to 860 (custom.css override of
  Infima's 996 between 861–996).

### Future-page rule
> Every new page ships at 375px. If a component has no mobile spec in this file, it is
> not allowed to ship. Add the spec here first, implement it in assets/theme.css, then
> use the class. Do not add a one-off @media in a page stylesheet for nav, buttons, or
> section padding.

### QA checklist
- 375 / 390: drawer opens; links left-aligned with wordmark; no horizontal page
  scroll; hero CTAs stacked 44px; KPI grid 1-col; tables scroll inside wrap;
  hamburger 44×44 aligned with logo. Motion is fade-only (no pin, no rails).
- 768: 2-col KPIs; drawer still used.
- 861+: inline nav, no hamburger.
- 1080+: homepage rails allowed; no reserved stage field (tape follows the KPI band).

## Motion (Rekord-derived, tAI-constrained)

Reference mechanics (rekordsoftware.com): hero as a stage with a reserved empty field;
hairline column rails; micro-sheen on the black CTA; one-shot 16px rise reveals with
70ms stagger; stats count from 0 on enter; one desktop product pin; reduced-motion as
a first-class state. Adopted mechanics only — no Framer/Rive runtime, no particles,
no scroll-jacking, no parallax, no bounce.

### Tokens
```css
--motion-rise: 16px;
--motion-dur: 560ms;
--motion-stagger: 70ms;
--motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
--motion-count: 700ms;
```

### Classes (implemented in assets/theme.css + assets/motion.js)
- `.reveal` — `opacity: 0; transform: translateY(var(--motion-rise))` until
  `.is-inview`; then opacity 1, translateY 0, `var(--motion-dur) var(--motion-ease)`.
  Plays once; never reverses on scroll-up.
- `.reveal-stagger` — container whose direct children animate with per-child delay
  `calc(var(--i) * var(--motion-stagger))`; motion.js assigns `--i`. Max 6 children.
  Never stagger individual letters.
- `.countup` — homepage KPI values only. `data-count-to`, optional
  `data-count-prefix/suffix/decimals`; 700ms ease-out on enter. `data-count-snap`
  values (T+0) appear instantly.
- `.page-rails` — two 1px vertical guides `rgba(17,17,16,0.10)` pinning the content
  column. Desktop homepage only; hidden below 1080.
- `.pin-stage` / `.pin-hero-artifact` — reserved hooks, currently not pinned: the
  desktop stage field was removed (founder call — no reserved empty space), so the
  tape follows the KPI band with the shared 20px rhythm on every breakpoint.
- `.btn-primary::after` sheen — 8px square, `--text-on-inverse`, top-left corner,
  300ms opacity fade on hover/focus-visible. No scale, no shadow, no colored glint.

### Law
- Motion explains structure; it never substitutes for a missing layout.
- One pin per page, homepage only.
- Demo, licensing, docs: no `.reveal` required. The shared drawer animates instantly
  or with a ≤200ms fade.
- No animation may cause overflow-x.
- `prefers-reduced-motion: reduce` disables rise, stagger, count, pin, and sheen —
  content is fully visible immediately.
- Cache-bust `theme.css?v=` and `motion.js?v=` after any change.

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
