---
sidebar_position: 4
title: Consume Tokens via API
---

# Consume AI tokens via the API

## 1. Issue an API key

```bash
curl -X POST https://api.tai.markets/v1/keys \
  -H "Content-Type: application/json" -d '{"label":"my-agent"}'
# → {"key":"tk_…","credits_usd":0,…}
```

## 2. Fund it with credits

Either buy credits with **x402 USDC**:

```bash
curl -X POST https://api.tai.markets/v1/credits \
  -H "X-Payment: <base64 x402 payload>" -H "Content-Type: application/json" \
  -d '{"key":"tk_…","usd":5}'
```

…or deposit tModel tokens / stablecoins to the gateway wallet and email licensing with
the tx hash (Tempo deposits are credited manually during testnet).

## 3. Run inference

```bash
curl -X POST https://api.tai.markets/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tk_…" \
  -d '{"model":"tGLM53F","messages":[{"role":"user","content":"Explain clearing houses"}],"max_tokens":512}'
```

## What happens under the hood

1. The gateway quotes your request at the **on-chain index price** (live OpenRouter data).
2. Real inference runs on the upstream model.
3. **Actual usage tokens are burned on-chain** (`requestRedemption`), the provider vault's
   debt is reduced, and the **5% fee** goes to the DAO treasury.
4. Your key's credit balance is deducted by actual usage; anything un-used stays credited.
5. The response's `tAI.settlement` object carries the **on-chain receipt**
   (request id + settlement tx + explorer link).

## Check your balance

```bash
curl https://api.tai.markets/v1/keys/me/balance -H "Authorization: Bearer tk_…"
```

## Model classes

| Class | Upstream | Index (≈$/1M out) |
|---|---|---|
| `tGLM5` / `tGLM53F` | z-ai/glm-5 / glm-5.3-flash | live |
| `tDeepseekV4F` | deepseek/deepseek-v4-flash-0731 | live |
| `tGPT5` / `tGPT56L` | openai/gpt-5 / gpt-5.6-luna | live |
| `tSonnet4` | anthropic/claude-sonnet-5 | live |
| `tOpus46` | anthropic/claude-opus-5 | live |

`GET /v1/models` always returns the current list with live prices.
