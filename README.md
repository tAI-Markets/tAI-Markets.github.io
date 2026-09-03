# tAI Markets — Website & Live Dashboard

The public frontend of **tAI Markets** — the clearing house for AI inference — plus the
live dashboard, licensing page, agent-integration quickstarts and the documentation site.

**Live**: [tai.markets](https://tai.markets) · [demo dashboard](https://tai.markets/demo) ·
[licensing](https://tai.markets/licensing.html) · [docs](https://tai.markets/docs)

## Structure

| Path | What it is |
|---|---|
| `index.html` | marketing homepage — **the brand/design reference page** |
| `demo/index.html` | live clearing-house dashboard (polls the gateway `/v1/stats`) |
| `licensing.html` | commercial licensing tiers (BUSL-1.1, evaluation → enterprise) |
| `assets/theme.css` | **shared design system** — tokens, nav, footer, components |
| `DESIGN-SYSTEM.md` | written design standards (read before adding a page) |
| `docs-app/` | Docusaurus documentation site, deployed to `/docs` |

## Design system

The brand is the **light lab canvas**: ink `#111110` on warm white `#fbfbfa`, Inter for
UI, JetBrains Mono for data, steel `#2f6f8f` for links/live indicators only, black CTAs. Every page links `assets/theme.css` and reuses the standard
nav + footer. Full token table and rules: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).
(The green terminal theme was a divergence — rebuilt Sep 2026.)

## Gateway wiring

`demo/index.html` polls `${GATEWAY}/v1/stats` — default `https://api.tai.markets`
(the production gateway on Hostinger). Override with `?gateway=<url>` for local runs.
The dashboard renders vault collateral/CR, on-chain vs OpenRouter index prices,
provider σ board, settlement feed and totals from the live Tempo testnet deployment.

## Deploy

Push to `main` → GitHub Actions (`deploy.yml`) assembles the static root + the built
Docusaurus docs and deploys to Pages. The docs build needs `docs-app/package-lock.json`
(committed) and Node 22.

## Docs site

Docusaurus sources live in `docs-app/docs/` (API reference, tutorials: originate tokens,
consume via API, harness setup for Claude Code / Codex / ZCode, concepts). Local dev:

```bash
cd docs-app && npm install && npm start     # dev server
npm run build                               # production build → build/
```

## Related repos

- [`tAI-contracts`](https://github.com/tAI-Markets/tAI-contracts) — the clearing-house protocol (Foundry, live on Tempo testnet)
- [`tAI-gateway`](https://github.com/tAI-Markets/tAI-gateway) — the dual-rail payment gateway + `tai-mcp` MCP server
