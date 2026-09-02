---
sidebar_position: 2
title: API Reference
---

# API Reference

Base URL: `https://api.tai.markets` · All request/response bodies are JSON.

## Authentication

Three rails are accepted on inference routes (`/v1/chat/completions`, `/v1/messages`, `/v1/inference`):

| Rail | Header | Notes |
|---|---|---|
| API key | `Authorization: Bearer tk_…` | prepaid credits, metered per actual usage |
| x402 | `X-Payment: <base64 x402 payload>` | EIP-3009 USDC on Base, per-request |
| Tempo tModel | `X-Payment-Token/Amount/Tx/From` | on-chain transfer verification |

## Models

```bash
curl https://api.tai.markets/v1/models
```
Returns every model class with its on-chain index price, OpenRouter spot price,
upstream model id and provider σ.

## Chat completions (OpenAI-compatible)

```bash
curl -X POST https://api.tai.markets/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tk_…" \
  -d '{"model":"tGLM53F","messages":[{"role":"user","content":"Hello"}],"max_tokens":512}'
```

Response adds a `tAI` object:

```json
{
  "tAI": {
    "model_class": "tGLM53F",
    "upstream_model": "z-ai/glm-5.3-flash",
    "latency_ms": 842,
    "tokens_quoted": "512",
    "tokens_burned": "413",
    "tokens_credited": "99",
    "payment": { "rail": "api-key", "payer": "key:…" },
    "settlement": {
      "settled": true,
      "request_id": "0x…",
      "tx_hash": "0x…",
      "explorer": "https://explore.testnet.tempo.xyz/tx/0x…",
      "fee_to_dao": "1032"
    }
  }
}
```

Also sets `X-tAI-Settlement-Tx` and `X-tAI-Settlement-Request-Id` headers.

### Without payment → HTTP 402

The 402 body carries both payment rails: Tempo `payment_options[]` and an
`accepts[]` x402 block. Pay and retry with your rail's header.

## Messages (Anthropic-compatible)

`POST /v1/messages` — same flow, Anthropic request/response shape.

## API keys

```bash
# Issue (secret shown once)
curl -X POST https://api.tai.markets/v1/keys -H "Content-Type: application/json" \
  -d '{"label":"claude-code"}'

# Balance
curl https://api.tai.markets/v1/keys/me/balance -H "Authorization: Bearer tk_…"
```

## Credits (x402 purchase)

```bash
# Quote
curl "https://api.tai.markets/v1/credits/quote?usd=5"

# Purchase (sign an EIP-3009 USDC authorization — see tai-mcp for a reference impl)
curl -X POST https://api.tai.markets/v1/credits \
  -H "X-Payment: <base64 x402 payload>" -H "Content-Type: application/json" \
  -d '{"key":"tk_…"}'
```

## Stats

`GET /v1/stats` — everything the dashboard renders: vault collateral/CR, per-class
on-chain vs OpenRouter prices, provider σ board, settlement feed, totals.

## Errors

| Status | Meaning |
|---|---|
| 402 | Payment required (quote + both rails) or insufficient credits |
| 400 | Unknown model class / malformed payment |
| 502 | Upstream (OpenRouter) error — no charge, tokens refunded |
| 503 | No upstream available / settlement deferred |
