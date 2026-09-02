---
sidebar_position: 6
title: Concepts — the Clearing House
---

# Concepts

## tModel tokens

Standardized AI inference: **1 tModel token = 1M output tokens** of a model class,
6 decimals. Buying $1 of `tGLM53F` credit means holding collateral-backed claims on
GLM-5.3 Flash output, priced by the live index.

## Collateralized providers

Providers lock stablecoins in per-provider **CDP vaults**. Minting requires a
**150% collateral ratio**; falling below **130%** triggers liquidation. Consumers are
therefore always backed by capital, not promises.

## Settlement

A redemption burns tokens, reduces provider debt by the net value (95%), and routes
the **5% fee** to the DAO treasury. Every settlement stores an on-chain receipt
(`redemptionRequests`) — auditable, composable, permanent.

## σ (service factor) and SLA

Providers are scored per model class. Failures raise σ (+0.025), successes decay it
toward 1.0 (−0.005). **Three consecutive failures suspend a provider.** Routing picks
the lowest σ first.

## Provider of Last Resort (PLR)

When no provider is available, the PLR module buys replacement inference with DAO
treasury funds (cost capped at 50% of gross) so redemptions stay whole.

## x402 and MPP

Payment standards for machine commerce. tAI speaks **x402** (EIP-3009 USDC on Base)
today and is architected for **MPP** (Stripe/Tempo's Machine Payments Protocol) —
whichever standard wins, the clearing house already sits on it.
