---
sidebar_position: 5
title: Use from Claude Code, Codex & ZCode
---

# Use tAI from your coding harness

Two integration surfaces:

1. **Consume** — point your harness at the OpenAI/Anthropic-compatible gateway with a
   `tk_` API key (prepaid credits, metered per actual usage).
2. **Purchase** — add the `tai-mcp` MCP server so agents can buy credits with x402
   USDC on Base, no UI required.

## Purchase credits: the `tai-mcp` MCP server

```bash
# Claude Code
claude mcp add tai-mcp -e TAI_BASE_KEY=0x…your-Base-key… -- npx -y @tai-markets/mcp

# Codex / ZCode / any MCP client (JSON)
{
  "mcpServers": {
    "tai-mcp": {
      "command": "npx",
      "args": ["-y", "@tai-markets/mcp"],
      "env": { "TAI_BASE_KEY": "0x…" }
    }
  }
}
```

Then, inside your agent session: *"buy $2 of tAI credits"* → the agent calls
`tai_buy_credits` → x402 payment settles on Base → a `tk_` API key comes back funded.

## Claude Code

```bash
export ANTHROPIC_BASE_URL="https://api.tai.markets"
export ANTHROPIC_AUTH_TOKEN="tk_…"          # your tAI API key
export ANTHROPIC_MODEL="tGLM53F"            # any tAI model class

claude   # every request now burns tModel tokens and settles on-chain
```

The gateway implements the Anthropic Messages protocol at `/v1/messages` and the
OpenAI protocol at `/v1/chat/completions` — same key, same credits, same on-chain
settlement either way.

## Codex CLI

`~/.codex/config.toml`:

```toml
model_provider = "tai"
model = "tGPT56L"

[model_providers.tai]
name = "tAI Markets"
base_url = "https://api.tai.markets/v1"
env_key = "TAI_API_KEY"
wire_api = "chat"
```

```bash
export TAI_API_KEY="tk_…"
codex "explain what a clearing house does"
```

## ZCode

Add an OpenAI-compatible provider in settings (`~/.zcode/settings.json`):

```json
{
  "apiProviders": {
    "tai": {
      "name": "tAI Markets",
      "baseUrl": "https://api.tai.markets/v1",
      "apiKey": "tk_…",
      "models": ["tGLM53F", "tDeepseekV4F", "tGPT56L"]
    }
  }
}
```

## Top models right now (OpenRouter usage rankings)

| Model class | Upstream | ≈ Output price |
|---|---|---|
| `tDeepseekV4F` | `deepseek/deepseek-v4-flash-0731` | $0.18 / 1M |
| `tGLM53F` | `z-ai/glm-5.3-flash` | $0.25 / 1M |
| `tGPT56L` | `openai/gpt-5.6-luna` | $1.20 / 1M |

## x402 direct (no key, no account)

Autonomous agents can pay per request without an API key: send the request, receive
the **402** with an `accepts[]` block, sign an EIP-3009 USDC authorization, and retry
with the `X-Payment` header. Reference implementation: the `tai_buy_credits` tool in
`tai-mcp` (source in `tAI-gateway/mcp/index.mjs`).
