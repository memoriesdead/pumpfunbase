import { NextResponse } from 'next/server'
import { getPopularTokens, SUPPORTED_CHAINS } from '@/lib/zerox-config'

// Top 50 most popular cryptocurrencies across multiple chains supported by 0x.org
// Ranked by market cap from highest to lowest
const TOP_50_POPULAR_CRYPTO_DATA = [
  // Top 10 - Major cryptocurrencies
  {
    id: 1,
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    basePrice: 96500.00,
    basePriceChange24h: 2.34,
    basePriceChange7d: 8.76,
    marketCap: 1900000000000, // ~$1.9T
    volume24h: 28000000000,
    supply: 19700000,
    chainId: 1, // Ethereum (WBTC)
  },
  {
    id: 2,
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    basePrice: 3650.00,
    basePriceChange24h: 3.21,
    basePriceChange7d: 12.45,
    marketCap: 440000000000, // ~$440B
    volume24h: 15000000000,
    supply: 120500000,
    chainId: 1, // Ethereum
  },
  {
    id: 3,
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    basePrice: 1.00,
    basePriceChange24h: 0.01,
    basePriceChange7d: -0.02,
    marketCap: 125000000000, // ~$125B
    volume24h: 45000000000,
    supply: 125000000000,
    chainId: 1, // Ethereum
  },
  {
    id: 4,
    rank: 4,
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
    basePrice: 715.50,
    basePriceChange24h: 1.87,
    basePriceChange7d: 9.34,
    marketCap: 105000000000, // ~$105B
    volume24h: 2100000000,
    supply: 147000000,
    chainId: 56, // BSC
  },
  {
    id: 5,
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    basePrice: 234.56,
    basePriceChange24h: 5.23,
    basePriceChange7d: 12.45,
    marketCap: 112850000000, // ~$113B
    volume24h: 4200000000,
    supply: 481000000,
    chainId: 101, // Solana
  },
  {
    id: 6,
    rank: 6,
    name: 'USD Coin',
    symbol: 'USDC',
    logo: 'https://tokens.1inch.io/0xa0b86a33e6c1f03ce4d1e0fb93e90b4f4f8ad2f8.png',
    basePrice: 1.00,
    basePriceChange24h: -0.01,
    basePriceChange7d: 0.02,
    marketCap: 85000000000, // ~$85B
    volume24h: 8500000000,
    supply: 85000000000,
    chainId: 1, // Ethereum
  },
  {
    id: 7,
    rank: 7,
    name: 'XRP',
    symbol: 'XRP',
    logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    basePrice: 2.45,
    basePriceChange24h: 4.67,
    basePriceChange7d: 15.32,
    marketCap: 140000000000, // ~$140B
    volume24h: 8900000000,
    supply: 57000000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 8,
    rank: 8,
    name: 'Dogecoin',
    symbol: 'DOGE',
    logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    basePrice: 0.38,
    basePriceChange24h: 6.21,
    basePriceChange7d: 18.90,
    marketCap: 56000000000, // ~$56B
    volume24h: 3400000000,
    supply: 147000000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 9,
    rank: 9,
    name: 'Cardano',
    symbol: 'ADA',
    logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    basePrice: 1.12,
    basePriceChange24h: 3.45,
    basePriceChange7d: 11.23,
    marketCap: 39000000000, // ~$39B
    volume24h: 1800000000,
    supply: 35000000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 10,
    rank: 10,
    name: 'Avalanche',
    symbol: 'AVAX',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    basePrice: 45.67,
    basePriceChange24h: 7.89,
    basePriceChange7d: 14.56,
    marketCap: 18000000000, // ~$18B
    volume24h: 890000000,
    supply: 394000000,
    chainId: 43114, // Avalanche
  },
  // 11-20
  {
    id: 11,
    rank: 11,
    name: 'Polygon',
    symbol: 'MATIC',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    basePrice: 0.52,
    basePriceChange24h: 4.32,
    basePriceChange7d: 9.87,
    marketCap: 5200000000, // ~$5.2B
    volume24h: 345000000,
    supply: 10000000000,
    chainId: 137, // Polygon
  },
  {
    id: 12,
    rank: 12,
    name: 'Chainlink',
    symbol: 'LINK',
    logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    basePrice: 28.34,
    basePriceChange24h: 5.67,
    basePriceChange7d: 12.34,
    marketCap: 17000000000, // ~$17B
    volume24h: 890000000,
    supply: 600000000,
    chainId: 1, // Ethereum
  },
  {
    id: 13,
    rank: 13,
    name: 'Polkadot',
    symbol: 'DOT',
    logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    basePrice: 8.45,
    basePriceChange24h: 3.21,
    basePriceChange7d: 8.90,
    marketCap: 12000000000, // ~$12B
    volume24h: 456000000,
    supply: 1420000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 14,
    rank: 14,
    name: 'Litecoin',
    symbol: 'LTC',
    logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    basePrice: 108.50,
    basePriceChange24h: 2.87,
    basePriceChange7d: 7.65,
    marketCap: 8100000000, // ~$8.1B
    volume24h: 567000000,
    supply: 74700000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 15,
    rank: 15,
    name: 'Uniswap',
    symbol: 'UNI',
    logo: 'https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
    basePrice: 14.78,
    basePriceChange24h: 6.45,
    basePriceChange7d: 13.21,
    marketCap: 11000000000, // ~$11B
    volume24h: 234000000,
    supply: 745000000,
    chainId: 1, // Ethereum
  },
  {
    id: 16,
    rank: 16,
    name: 'Internet Computer',
    symbol: 'ICP',
    logo: 'https://cryptologos.cc/logos/internet-computer-icp-logo.png',
    basePrice: 11.23,
    basePriceChange24h: 4.56,
    basePriceChange7d: 9.78,
    marketCap: 5200000000, // ~$5.2B
    volume24h: 189000000,
    supply: 463000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 17,
    rank: 17,
    name: 'Ethereum Classic',
    symbol: 'ETC',
    logo: 'https://cryptologos.cc/logos/ethereum-classic-etc-logo.png',
    basePrice: 32.45,
    basePriceChange24h: 3.89,
    basePriceChange7d: 8.12,
    marketCap: 4800000000, // ~$4.8B
    volume24h: 123000000,
    supply: 148000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 18,
    rank: 18,
    name: 'Raydium',
    symbol: 'RAY',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
    basePrice: 2.34,
    basePriceChange24h: 8.76,
    basePriceChange7d: 15.32,
    marketCap: 890000000, // ~$890M
    volume24h: 145000000,
    supply: 380000000,
    chainId: 101, // Solana
  },
  {
    id: 19,
    rank: 19,
    name: 'Stellar',
    symbol: 'XLM',
    logo: 'https://cryptologos.cc/logos/stellar-xlm-logo.png',
    basePrice: 0.45,
    basePriceChange24h: 5.23,
    basePriceChange7d: 11.67,
    marketCap: 13500000000, // ~$13.5B
    volume24h: 890000000,
    supply: 30000000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 20,
    rank: 20,
    name: 'VeChain',
    symbol: 'VET',
    logo: 'https://cryptologos.cc/logos/vechain-vet-logo.png',
    basePrice: 0.051,
    basePriceChange24h: 4.12,
    basePriceChange7d: 9.45,
    marketCap: 3700000000, // ~$3.7B
    volume24h: 67000000,
    supply: 72600000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  // 21-30
  {
    id: 21,
    rank: 21,
    name: 'Orca',
    symbol: 'ORCA',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png',
    basePrice: 3.78,
    basePriceChange24h: 4.21,
    basePriceChange7d: 9.87,
    marketCap: 378000000, // ~$378M
    volume24h: 89000000,
    supply: 100000000,
    chainId: 101, // Solana
  },
  {
    id: 22,
    rank: 22,
    name: 'Filecoin',
    symbol: 'FIL',
    logo: 'https://cryptologos.cc/logos/filecoin-fil-logo.png',
    basePrice: 6.78,
    basePriceChange24h: 3.45,
    basePriceChange7d: 7.89,
    marketCap: 4200000000, // ~$4.2B
    volume24h: 234000000,
    supply: 620000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 23,
    rank: 23,
    name: 'Cosmos',
    symbol: 'ATOM',
    logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    basePrice: 7.89,
    basePriceChange24h: 5.67,
    basePriceChange7d: 12.34,
    marketCap: 3100000000, // ~$3.1B
    volume24h: 156000000,
    supply: 390000000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 24,
    rank: 24,
    name: 'Monero',
    symbol: 'XMR',
    logo: 'https://cryptologos.cc/logos/monero-xmr-logo.png',
    basePrice: 198.50,
    basePriceChange24h: 2.34,
    basePriceChange7d: 6.78,
    marketCap: 3600000000, // ~$3.6B
    volume24h: 89000000,
    supply: 18200000,
    chainId: 1, // Ethereum (Wrapped)
  },
  {
    id: 25,
    rank: 25,
    name: 'Serum',
    symbol: 'SRM',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png',
    basePrice: 0.45,
    basePriceChange24h: -2.15,
    basePriceChange7d: 3.45,
    marketCap: 135000000, // ~$135M
    volume24h: 34000000,
    supply: 300000000,
    chainId: 101, // Solana
  },
  {
    id: 26,
    rank: 26,
    name: 'Aave',
    symbol: 'AAVE',
    logo: 'https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
    basePrice: 345.67,
    basePriceChange24h: 4.56,
    basePriceChange7d: 11.23,
    marketCap: 5200000000, // ~$5.2B
    volume24h: 234000000,
    supply: 15000000,
    chainId: 1, // Ethereum
  },
  {
    id: 27,
    rank: 27,
    name: 'Compound',
    symbol: 'COMP',
    logo: 'https://tokens.1inch.io/0xc00e94cb662c3520282e6f5717214004a7f26888.png',
    basePrice: 89.45,
    basePriceChange24h: 3.21,
    basePriceChange7d: 8.90,
    marketCap: 890000000, // ~$890M
    volume24h: 45000000,
    supply: 10000000,
    chainId: 1, // Ethereum
  },
  {
    id: 28,
    rank: 28,
    name: 'Maker',
    symbol: 'MKR',
    logo: 'https://tokens.1inch.io/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png',
    basePrice: 1678.90,
    basePriceChange24h: 2.87,
    basePriceChange7d: 7.65,
    marketCap: 1500000000, // ~$1.5B
    volume24h: 67000000,
    supply: 894000,
    chainId: 1, // Ethereum
  },
  {
    id: 29,
    rank: 29,
    name: 'Curve DAO Token',
    symbol: 'CRV',
    logo: 'https://tokens.1inch.io/0xd533a949740bb3306d119cc777fa900ba034cd52.png',
    basePrice: 0.78,
    basePriceChange24h: 5.43,
    basePriceChange7d: 12.67,
    marketCap: 890000000, // ~$890M
    volume24h: 123000000,
    supply: 1140000000,
    chainId: 1, // Ethereum
  },
  {
    id: 30,
    rank: 30,
    name: 'Marinade Staked SOL',
    symbol: 'mSOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
    basePrice: 256.23,
    basePriceChange24h: 5.12,
    basePriceChange7d: 11.87,
    marketCap: 1200000000, // ~$1.2B
    volume24h: 78000000,
    supply: 4700000,
    chainId: 101, // Solana
  },
  // 31-40
  {
    id: 31,
    rank: 31,
    name: 'Synthetix',
    symbol: 'SNX',
    logo: 'https://tokens.1inch.io/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png',
    basePrice: 3.45,
    basePriceChange24h: 4.67,
    basePriceChange7d: 9.12,
    marketCap: 1100000000, // ~$1.1B
    volume24h: 89000000,
    supply: 318000000,
    chainId: 1, // Ethereum
  },
  {
    id: 32,
    rank: 32,
    name: 'Yearn Finance',
    symbol: 'YFI',
    logo: 'https://tokens.1inch.io/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png',
    basePrice: 8970.50,
    basePriceChange24h: 3.78,
    basePriceChange7d: 8.45,
    marketCap: 328000000, // ~$328M
    volume24h: 23000000,
    supply: 36600,
    chainId: 1, // Ethereum
  },
  {
    id: 33,
    rank: 33,
    name: 'SushiSwap',
    symbol: 'SUSHI',
    logo: 'https://tokens.1inch.io/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png',
    basePrice: 1.23,
    basePriceChange24h: 6.78,
    basePriceChange7d: 14.56,
    marketCap: 156000000, // ~$156M
    volume24h: 45000000,
    supply: 127000000,
    chainId: 1, // Ethereum
  },
  {
    id: 34,
    rank: 34,
    name: 'Mango',
    symbol: 'MNGO',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/logo.svg',
    basePrice: 0.032,
    basePriceChange24h: 12.34,
    basePriceChange7d: 18.76,
    marketCap: 96000000, // ~$96M
    volume24h: 23000000,
    supply: 3000000000,
    chainId: 101, // Solana
  },
  {
    id: 35,
    rank: 35,
    name: 'Alpha Homora',
    symbol: 'ALPHA',
    logo: 'https://tokens.1inch.io/0xa1faa113cbe53436df28ff0aee54275c13b40975.png',
    basePrice: 0.087,
    basePriceChange24h: 5.67,
    basePriceChange7d: 11.23,
    marketCap: 87000000, // ~$87M
    volume24h: 12000000,
    supply: 1000000000,
    chainId: 1, // Ethereum
  },
  {
    id: 36,
    rank: 36,
    name: 'Samoyedcoin',
    symbol: 'SAMO',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png',
    basePrice: 0.0089,
    basePriceChange24h: -5.67,
    basePriceChange7d: 2.34,
    marketCap: 58000000, // ~$58M
    volume24h: 12000000,
    supply: 6500000000,
    chainId: 101, // Solana
  },
  {
    id: 37,
    rank: 37,
    name: 'Bonfida',
    symbol: 'FIDA',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp/logo.png',
    basePrice: 0.76,
    basePriceChange24h: 6.78,
    basePriceChange7d: 14.23,
    marketCap: 76000000, // ~$76M
    volume24h: 8500000,
    supply: 100000000,
    chainId: 101, // Solana
  },
  {
    id: 38,
    rank: 38,
    name: 'Star Atlas',
    symbol: 'ATLAS',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx/logo.png',
    basePrice: 0.0034,
    basePriceChange24h: -3.21,
    basePriceChange7d: 8.90,
    marketCap: 45000000, // ~$45M
    volume24h: 5600000,
    supply: 13200000000,
    chainId: 101, // Solana
  },
  {
    id: 39,
    rank: 39,
    name: 'Step Finance',
    symbol: 'STEP',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png',
    basePrice: 0.087,
    basePriceChange24h: 7.43,
    basePriceChange7d: 11.56,
    marketCap: 26000000, // ~$26M
    volume24h: 3200000,
    supply: 300000000,
    chainId: 101, // Solana
  },
  {
    id: 40,
    rank: 40,
    name: 'Audius',
    symbol: 'AUDIO',
    logo: 'https://tokens.1inch.io/0x18aaa7115705e8be94bffebde57af9bfc265b998.png',
    basePrice: 0.234,
    basePriceChange24h: 4.56,
    basePriceChange7d: 9.78,
    marketCap: 234000000, // ~$234M
    volume24h: 12000000,
    supply: 1000000000,
    chainId: 1, // Ethereum
  },
  // 41-50
  {
    id: 41,
    rank: 41,
    name: 'Balancer',
    symbol: 'BAL',
    logo: 'https://tokens.1inch.io/0xba100000625a3754423978a60c9317c58a424e3d.png',
    basePrice: 2.78,
    basePriceChange24h: 3.45,
    basePriceChange7d: 7.89,
    marketCap: 278000000, // ~$278M
    volume24h: 23000000,
    supply: 100000000,
    chainId: 1, // Ethereum
  },
  {
    id: 42,
    rank: 42,
    name: 'Bancor',
    symbol: 'BNT',
    logo: 'https://tokens.1inch.io/0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c.png',
    basePrice: 0.567,
    basePriceChange24h: 5.23,
    basePriceChange7d: 11.67,
    marketCap: 89000000, // ~$89M
    volume24h: 8900000,
    supply: 157000000,
    chainId: 1, // Ethereum
  },
  {
    id: 43,
    rank: 43,
    name: 'Kyber Network',
    symbol: 'KNC',
    logo: 'https://tokens.1inch.io/0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202.png',
    basePrice: 0.678,
    basePriceChange24h: 4.32,
    basePriceChange7d: 8.76,
    marketCap: 134000000, // ~$134M
    volume24h: 15000000,
    supply: 198000000,
    chainId: 1, // Ethereum
  },
  {
    id: 44,
    rank: 44,
    name: 'Loopring',
    symbol: 'LRC',
    logo: 'https://tokens.1inch.io/0xbbbbca6a901c926f240b89eacb641d8aec7aeafd.png',
    basePrice: 0.234,
    basePriceChange24h: 6.78,
    basePriceChange7d: 13.45,
    marketCap: 312000000, // ~$312M
    volume24h: 45000000,
    supply: 1330000000,
    chainId: 1, // Ethereum
  },
  {
    id: 45,
    rank: 45,
    name: 'Enjin Coin',
    symbol: 'ENJ',
    logo: 'https://tokens.1inch.io/0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png',
    basePrice: 0.345,
    basePriceChange24h: 3.67,
    basePriceChange7d: 8.12,
    marketCap: 345000000, // ~$345M
    volume24h: 34000000,
    supply: 1000000000,
    chainId: 1, // Ethereum
  },
  {
    id: 46,
    rank: 46,
    name: 'Basic Attention Token',
    symbol: 'BAT',
    logo: 'https://tokens.1inch.io/0x0d8775f648430679a709e98d2b0cb6250d2887ef.png',
    basePrice: 0.287,
    basePriceChange24h: 4.23,
    basePriceChange7d: 9.56,
    marketCap: 430000000, // ~$430M
    volume24h: 67000000,
    supply: 1500000000,
    chainId: 1, // Ethereum
  },
  {
    id: 47,
    rank: 47,
    name: 'Decentraland',
    symbol: 'MANA',
    logo: 'https://tokens.1inch.io/0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png',
    basePrice: 0.567,
    basePriceChange24h: 5.78,
    basePriceChange7d: 12.34,
    marketCap: 1200000000, // ~$1.2B
    volume24h: 156000000,
    supply: 2200000000,
    chainId: 1, // Ethereum
  },
  {
    id: 48,
    rank: 48,
    name: 'The Sandbox',
    symbol: 'SAND',
    logo: 'https://tokens.1inch.io/0x3845badade8e6dff049820680d1f14bd3903a5d0.png',
    basePrice: 0.456,
    basePriceChange24h: 6.12,
    basePriceChange7d: 14.78,
    marketCap: 1100000000, // ~$1.1B
    volume24h: 234000000,
    supply: 2400000000,
    chainId: 1, // Ethereum
  },
  {
    id: 49,
    rank: 49,
    name: '0x',
    symbol: 'ZRX',
    logo: 'https://tokens.1inch.io/0xe41d2489571d322189246dafa5ebde1f4699f498.png',
    basePrice: 0.567,
    basePriceChange24h: 4.56,
    basePriceChange7d: 10.23,
    marketCap: 567000000, // ~$567M
    volume24h: 89000000,
    supply: 1000000000,
    chainId: 1, // Ethereum
  },
  {
    id: 50,
    rank: 50,
    name: 'PancakeSwap',
    symbol: 'CAKE',
    logo: 'https://tokens.1inch.io/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
    basePrice: 2.34,
    basePriceChange24h: 3.78,
    basePriceChange7d: 8.90,
    marketCap: 789000000, // ~$789M
    volume24h: 123000000,
    supply: 337000000,
    chainId: 56, // BSC
  }
]

// Generate realistic market fluctuations for top 50 tokens
function generateTop50RealisticData() {
  return TOP_50_POPULAR_CRYPTO_DATA
    .sort((a, b) => b.marketCap - a.marketCap) // Sort by market cap highest to lowest
    .map((token, index) => {
      // Add small random variations (±2% max) to simulate live market movement
      const priceVariation = 1 + (Math.random() - 0.5) * 0.04 // ±2%
      const volumeVariation = 1 + (Math.random() - 0.5) * 0.20 // ±10%
      const changeVariation = (Math.random() - 0.5) * 1.5 // ±0.75% additional change
      
      const currentPrice = parseFloat((token.basePrice * priceVariation).toFixed(token.basePrice > 1 ? 2 : 6))
      
      // Generate realistic sparkline data based on price movements
      const generateSparkline = (basePrice: number, change7d: number) => {
        const points: number[] = []
        let currentValue = basePrice * 0.95 // Start slightly below current price
        const trend = change7d / 100 / 7 // Daily trend
        
        for (let i = 0; i < 7; i++) {
          const dailyVariation = (Math.random() - 0.5) * 0.04 // ±2% daily variation
          currentValue *= (1 + trend + dailyVariation)
          points.push(parseFloat(currentValue.toFixed(basePrice > 1 ? 2 : 6)))
        }
        
        return points
      }
      
      // Get chain info for display
      const chainConfig = SUPPORTED_CHAINS[token.chainId] || { name: 'Unknown', symbol: 'UNKNOWN' }
      
      return {
        id: index + 1,
        rank: index + 1, // Rank by market cap
        name: token.name,
        symbol: token.symbol,
        logo: token.logo,
        price: currentPrice,
        priceChange24h: parseFloat((token.basePriceChange24h + changeVariation).toFixed(2)),
        change24h: parseFloat((token.basePriceChange24h + changeVariation).toFixed(2)), // Duplicate for compatibility
        change7d: parseFloat((token.basePriceChange7d + changeVariation * 2).toFixed(2)),
        marketCap: Math.floor(token.marketCap * priceVariation),
        volume24h: Math.floor(token.volume24h * volumeVariation),
        supply: token.supply,
        sparkline: generateSparkline(currentPrice, token.basePriceChange7d),
        chainId: token.chainId,
        chainName: chainConfig.name,
        chainSymbol: chainConfig.symbol
      }
    })
}

export async function GET() {
  try {
    console.log('API: Generating top 50 popular cryptocurrencies from 0x.org supported chains...')
    
    // Generate realistic market data with live-like fluctuations for top 50 tokens
    const top50Tokens = generateTop50RealisticData()
    
    console.log(`API: Returning ${top50Tokens.length} tokens ranked by market cap (highest to lowest)`)
    console.log('Chains included:', [...new Set(top50Tokens.map(t => t.chainName))].join(', '))
    
    return NextResponse.json(top50Tokens)
  } catch (error) {
    console.error('API error:', error)
    
    // Simple fallback with top 10 tokens
    const fallbackData = TOP_50_POPULAR_CRYPTO_DATA
      .slice(0, 10)
      .sort((a, b) => b.marketCap - a.marketCap)
      .map((token, index) => ({
        id: index + 1,
        rank: index + 1,
        name: token.name,
        symbol: token.symbol,
        logo: token.logo,
        price: token.basePrice,
        priceChange24h: token.basePriceChange24h,
        change24h: token.basePriceChange24h,
        change7d: token.basePriceChange7d,
        marketCap: token.marketCap,
        volume24h: token.volume24h,
        supply: token.supply,
        sparkline: [token.basePrice, token.basePrice * 1.02, token.basePrice * 0.98, token.basePrice * 1.05, token.basePrice * 0.97, token.basePrice * 1.03, token.basePrice],
        chainId: token.chainId,
        chainName: SUPPORTED_CHAINS[token.chainId]?.name || 'Unknown'
      }))
    
    return NextResponse.json(fallbackData)
  }
}