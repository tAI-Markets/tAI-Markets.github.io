---
sidebar_position: 1
slug: /
title: What is tAI Markets?
---

# tAI Markets — the clearing house for AI inference

tAI Markets turns AI inference into a **collateralized, on-chain financial market**:

1. **Providers** collateralize stablecoins (150% minimum) in per-provider vaults and mint
   **tModel tokens** — 1 token = 1M output tokens, 6 decimals.
2. **Agents and buyers** pay with tModel tokens (Tempo rail) or **x402 USDC** (Base rail).
3. Every redemption **burns tokens on-chain**, reduces the provider's vault debt, and routes
   a **5% settlement fee** to the DAO treasury — with an auditable on-chain receipt.
4. Provider quality is enforced by **σ (service factor)**: failures raise σ, three consecutive
   failures suspend a provider, and the **Provider of Last Resort** backstops redemptions.

## The two rails

| Rail | What it's for | How |
|---|---|---|
| **Acquire** | Buy AI-token credits cryptographically | x402 USDC on Base (EIP-3009) · MCP server · Tempo deposits |
| **Consume** | Use credits from any harness | OpenAI-compatible + Anthropic-compatible API with a `tk_` API key |

```text
MCP / x402 purchase ──credit──▶ Claude Code · Codex · ZCode ──▶ inference
                                                                ▼
                                              on-chain burn + settlement (every request)
```

## Live endpoints

| Service | URL |
|---|---|
| Gateway (production) | `https://api.tai.markets` |
| Health | `https://api.tai.markets/health` |
| Dashboard | `https://tai.markets/demo` |
| Chain | Tempo Moderato testnet (42431) · explorer: [explore.testnet.tempo.xyz](https://explore.testnet.tempo.xyz) |

Start with the [API reference](/api) or jump straight to
[consuming tokens from your harness](/tutorials/harness-setup).
