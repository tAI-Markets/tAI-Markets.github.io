---
sidebar_position: 7
title: Payment Rails — x402 on Base and Tempo
---

# Payment Rails — x402 on Base and Tempo

x402 revives HTTP 402: an API responds "Payment Required" with machine-readable
terms, the client signs a payment, a **facilitator** settles it on-chain, and the
original request is retried and served. tAI Markets accepts x402 credit purchases
on **two rails** that fund the same prepaid credit balance.

## The two rails

| | **Base rail** | **Tempo rail** |
|---|---|---|
| Network | Base Sepolia (chain 84532) | Tempo Moderato (chain 42431) |
| Asset | USDC | pathUSD (TIP-20) |
| Authorization | EIP-3009 `transferWithAuthorization` | TIP-1004-style `permit` + facilitator `transferFrom` |
| Why this primitive | USDC implements EIP-3009 — the client signature alone authorizes the transfer, no gas from the payer | **Tempo charges gas in stablecoins**, so the payer always has gas; the signature provides consent + replay protection |
| Facilitator | Gateway verifies + settles on Base | Gateway verifies + settles on Tempo |

## Flow (identical shape on both rails)

1. `POST /v1/credits` without payment → **402** with an `accepts[]` block per rail
2. Client signs: EIP-3009 typed data (Base) or a TIP-1004 permit digest (Tempo)
3. Retry with the signed payment (`X-PAYMENT` for Base, `Payment-Signature` for Tempo)
4. Gateway verifies signature + balance + nonce/replay, settles on-chain
5. Response: `credits_added_usd`, `balance_usd`, settlement tx — and a `tk_` API key
   (issued on first purchase, or topped up if you pass an existing key)

## Why two rails

- **Base** interoperates with the standard x402 ecosystem (Coinbase/Cloudflare
  tooling, facilitators, clients).
- **Tempo** is where the clearing house settles — gas in stablecoins, sub-second
  finality, and the same token (pathUSD) that collateralizes the vaults.
- The credits are **rail-agnostic**: buy on either, spend on both.

:::note EIP-3009 on Tempo
TIP-20 deliberately does not implement EIP-3009 (TIP-1004 provides EIP-2612 permit
instead, with transferWithAuthorization under consideration). The Tempo rail uses
permit + facilitator `transferFrom`, which achieves the same outcome with official
TIP-20 primitives.
:::

## MPP context

Tempo's own Machine Payments Protocol (MPP) targets the same machine-commerce layer.
tAI Markets' settlement core is rail-agnostic — x402 and MPP sessions can both drive
the same on-chain burn-and-settle pipeline.
