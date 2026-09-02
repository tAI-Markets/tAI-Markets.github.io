---
sidebar_position: 3
title: Originate Tokens (Mint)
---

# Originate tModel tokens

tModel tokens are **minted against collateral**. A provider locks stablecoins in a
per-provider CDP vault and mints tModel tokens at a minimum 150% collateral ratio.

## Prerequisites

- A wallet with testnet stablecoins (pathUSD on Tempo Moderato — [faucet](https://tempo.xyz/developers/docs/quickstart/faucet))
- Foundry (`forge` + `cast`) installed
- The deployed contract addresses (`deployments.json` in `tAI-contracts`)

## 1. Deploy your provider vault

```bash
# env: PRIVATE_KEY (provider key), GATEWAY_ADDRESS, USDC_ADDRESS (pathUSD)
forge create src/CDPVault.sol:CDPVault \
  --rpc-url https://rpc.moderato.tempo.xyz \
  --tempo.fee-token $USDC_ADDRESS --private-key $PRIVATE_KEY --broadcast \
  --constructor-args $YOUR_PROVIDER_ADDRESS $PROXY_ADDRESS $USDC_ADDRESS
```

## 2. Register as provider + attach the vault

```bash
cast send $PROXY_ADDRESS "registerProvider(address)" $YOUR_PROVIDER_ADDRESS \
  --rpc-url $RPC --tempo.fee-token $USDC --private-key $PRIVATE_KEY
cast send $PROXY_ADDRESS "registerProviderVault(address,address)" $YOUR_PROVIDER_ADDRESS $VAULT_ADDRESS \
  --rpc-url $RPC --tempo.fee-token $USDC --private-key $PRIVATE_KEY
```

## 3. Register in routing (σ starts at 1.0)

```bash
cast send $ROUTING_ADDRESS "registerProvider(bytes32,address,uint256)" \
  $(cast format-bytes32-string tGLM53F) $YOUR_PROVIDER_ADDRESS 10000 \
  --rpc-url $RPC --tempo.fee-token $USDC --private-key $PRIVATE_KEY
```

## 4. Collateralize and mint (the originate step)

```bash
# Approve the vault, deposit 150k pathUSD, mint 100k tGLM53F
cast send $USDC_ADDRESS "approve(address,uint256)" $VAULT_ADDRESS 150000000000 \
  --rpc-url $RPC --tempo.fee-token $USDC --private-key $PRIVATE_KEY
cast send $VAULT_ADDRESS "depositCollateral(bytes32,uint256)" $(cast format-bytes32-string tGLM53F) 150000000000 \
  --rpc-url $RPC --tempo.fee-token $USDC --private-key $PRIVATE_KEY
cast send $VAULT_ADDRESS "mint(bytes32,uint256)" $(cast format-bytes32-string tGLM53F) 100000000000 \
  --rpc-url $RPC --tempo.fee-token $USDC --private-key $PRIVATE_KEY
```

The one-liner alternative (deploys + seeds everything):

```bash
cd tAI-contracts && ./script/seed-tempo.sh
```

## Invariants enforced on-chain

| Invariant | Where |
|---|---|
| Mint requires ≥150% collateral ratio | `CDPVault.mint` |
| Liquidation at &lt;130%lt;130% | `CDPVault.liquidate` |
| 5% settlement fee to DAO treasury | `TAIProxy._settle` |
| SLA failures suspend after 3 strikes | `RoutingEngine.recordFailure` |
