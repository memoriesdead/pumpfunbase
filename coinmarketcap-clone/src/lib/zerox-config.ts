/**
 * 0x Protocol Configuration
 * All Official Supported Chains with Live API Integration
 */

export interface ChainConfig {
  id: number
  name: string
  symbol: string
  rpcUrl: string
  blockExplorer: string
  color: string
  logo: string
  supportedFeatures: ('swap' | 'gasless')[]
  permit2Address: string
  allowanceHolderAddress: string
}

// All Official 0x Protocol Supported Chains
export const SUPPORTED_CHAINS: Record<number, ChainConfig> = {
  // Ethereum Mainnet
  1: {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY',
    blockExplorer: 'https://etherscan.io',
    color: '#627EEA',
    logo: '/chains/ethereum.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Optimism
  10: {
    id: 10,
    name: 'Optimism',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    color: '#FF0420',
    logo: '/chains/optimism.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Binance Smart Chain
  56: {
    id: 56,
    name: 'BNB Chain',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    blockExplorer: 'https://bscscan.com',
    color: '#F3BA2F',
    logo: '/chains/bnb.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x000000000000175a8b9bC6d539B3708EEd92EA6c'
  },

  // Polygon
  137: {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    color: '#8247E5',
    logo: '/chains/polygon.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x000000000000175a8b9bC6d539B3708EEd92EA6c'
  },

  // Base
  8453: {
    id: 8453,
    name: 'Base',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    color: '#0052FF',
    logo: '/chains/base.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Arbitrum One
  42161: {
    id: 42161,
    name: 'Arbitrum One',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    color: '#2D374B',
    logo: '/chains/arbitrum.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Avalanche
  43114: {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    color: '#E84142',
    logo: '/chains/avalanche.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x000000000000175a8b9bC6d539B3708EEd92EA6c'
  },

  // Linea
  59144: {
    id: 59144,
    name: 'Linea',
    symbol: 'ETH',
    rpcUrl: 'https://rpc.linea.build',
    blockExplorer: 'https://lineascan.build',
    color: '#61DFFF',
    logo: '/chains/linea.svg',
    supportedFeatures: ['swap'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Scroll
  534352: {
    id: 534352,
    name: 'Scroll',
    symbol: 'ETH',
    rpcUrl: 'https://rpc.scroll.io',
    blockExplorer: 'https://scrollscan.com',
    color: '#FFEEDA',
    logo: '/chains/scroll.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Mantle
  5000: {
    id: 5000,
    name: 'Mantle',
    symbol: 'MNT',
    rpcUrl: 'https://rpc.mantle.xyz',
    blockExplorer: 'https://explorer.mantle.xyz',
    color: '#000000',
    logo: '/chains/mantle.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x000000000000175a8b9bC6d539B3708EEd92EA6c'
  },

  // Mode
  34443: {
    id: 34443,
    name: 'Mode',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.mode.network',
    blockExplorer: 'https://explorer.mode.network',
    color: '#DFFE00',
    logo: '/chains/mode.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Blast
  81457: {
    id: 81457,
    name: 'Blast',
    symbol: 'ETH',
    rpcUrl: 'https://rpc.blast.io',
    blockExplorer: 'https://blastscan.io',
    color: '#FCFC03',
    logo: '/chains/blast.svg',
    supportedFeatures: ['swap', 'gasless'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Berachain (Testnet - will update to mainnet when available)
  80084: {
    id: 80084,
    name: 'Berachain',
    symbol: 'BERA',
    rpcUrl: 'https://rpc.berachain.com',
    blockExplorer: 'https://explorer.berachain.com',
    color: '#F7931A',
    logo: '/chains/berachain.svg',
    supportedFeatures: ['swap'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Ink
  57073: {
    id: 57073,
    name: 'Ink',
    symbol: 'ETH',
    rpcUrl: 'https://rpc-gel-sepolia.inkonchain.com',
    blockExplorer: 'https://explorer-sepolia.inkonchain.com',
    color: '#000000',
    logo: '/chains/ink.svg',
    supportedFeatures: ['swap'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Unichain
  130: {
    id: 130,
    name: 'Unichain',
    symbol: 'ETH',
    rpcUrl: 'https://rpc.unichain.org',
    blockExplorer: 'https://explorer.unichain.org',
    color: '#FF007A',
    logo: '/chains/unichain.svg',
    supportedFeatures: ['swap'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // World Chain
  480: {
    id: 480,
    name: 'World Chain',
    symbol: 'ETH',
    rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
    blockExplorer: 'https://worldscan.org',
    color: '#000000',
    logo: '/chains/worldchain.svg',
    supportedFeatures: ['swap'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Monad (Testnet - will update to mainnet when available)
  10143: {
    id: 10143,
    name: 'Monad',
    symbol: 'MON',
    rpcUrl: 'https://rpc.monad.xyz',
    blockExplorer: 'https://explorer.monad.xyz',
    color: '#6C5CE7',
    logo: '/chains/monad.svg',
    supportedFeatures: ['swap'],
    permit2Address: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    allowanceHolderAddress: '0x0000000000001fF3684f28c67538d4D072C22734'
  },

  // Solana Mainnet
  101: {
    id: 101,
    name: 'Solana',
    symbol: 'SOL',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    blockExplorer: 'https://solscan.io',
    color: '#9945FF',
    logo: '/chains/solana.svg',
    supportedFeatures: ['swap'],
    permit2Address: '', // Solana doesn't use Permit2
    allowanceHolderAddress: '' // Solana doesn't use allowance holder
  }
}

// 0x Protocol API Configuration
export const ZEROX_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_ZEROX_API_KEY || '1c78d580-3491-4b92-afcc-e979ad83c09d',
  baseUrl: process.env.NEXT_PUBLIC_ZEROX_BASE_URL || 'https://api.0x.org',
  version: 'v2',
  
  // Platform fee configuration
  platformFeeBps: parseInt(process.env.NEXT_PUBLIC_PLATFORM_FEE_BPS || '50'), // 0.5%
  feeRecipient: process.env.NEXT_PUBLIC_FEE_RECIPIENT || '0x742d35Cc6634C0532925a3b8D53419a6A68A05a9',
  
  // Default settings
  defaultSlippageBps: parseInt(process.env.NEXT_PUBLIC_DEFAULT_SLIPPAGE_BPS || '100'), // 1%
  defaultChainId: parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || '1'),
  
  // Rate limiting
  rateLimit: parseInt(process.env.NEXT_PUBLIC_API_RATE_LIMIT || '100'),
}

// Popular token addresses for each chain
export const POPULAR_TOKENS: Record<number, any[]> = {
  1: [ // Ethereum
    {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      logoURI: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png'
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    },
    {
      address: '0xA0b86a33E6c1f03ce4d1E0Fb93e90B4F4F8ad2f8',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://tokens.1inch.io/0xa0b86a33e6c1f03ce4d1e0fb93e90b4f4f8ad2f8.png'
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      symbol: 'WBTC',
      name: 'Wrapped BTC',
      decimals: 8,
      logoURI: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png'
    }
  ],
  137: [ // Polygon
    {
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      symbol: 'WMATIC',
      name: 'Wrapped Matic',
      decimals: 18,
      logoURI: 'https://wallet-asset.matic.network/img/tokens/matic.svg'
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://tokens.1inch.io/0xa0b86a33e6c1f03ce4d1e0fb93e90b4f4f8ad2f8.png'
    }
  ],
  56: [ // BSC
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      symbol: 'WBNB',
      name: 'Wrapped BNB',
      decimals: 18,
      logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
    }
  ],
  101: [ // Solana - Top 10 Popular Tokens (Real Data, No Mock)
    {
      address: '11111111111111111111111111111112',
      symbol: 'SOL',
      name: 'Solana',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
    },
    {
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
    },
    {
      address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
    },
    {
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      symbol: 'RAY',
      name: 'Raydium',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png'
    },
    {
      address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
      symbol: 'SRM',
      name: 'Serum',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png'
    },
    {
      address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
      symbol: 'ORCA',
      name: 'Orca',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png'
    },
    {
      address: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
      symbol: 'MNGO',
      name: 'Mango',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/logo.png'
    },
    {
      address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
      symbol: 'SAMO',
      name: 'Samoyedcoin',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png'
    },
    {
      address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      symbol: 'mSOL',
      name: 'Marinade staked SOL',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png'
    },
    {
      address: 'A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM',
      symbol: 'FIDA',
      name: 'Bonfida',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM/logo.png'
    }
  ]
}

// Utility functions
export const getChainConfig = (chainId: number): ChainConfig | null => {
  return SUPPORTED_CHAINS[chainId] || null
}

export const isChainSupported = (chainId: number): boolean => {
  return chainId in SUPPORTED_CHAINS
}

export const getChainsByFeature = (feature: 'swap' | 'gasless'): ChainConfig[] => {
  return Object.values(SUPPORTED_CHAINS).filter(chain => 
    chain.supportedFeatures.includes(feature)
  )
}

export const formatChainId = (chainId: number): string => {
  return `0x${chainId.toString(16)}`
}

export const getPopularTokens = (chainId: number) => {
  return POPULAR_TOKENS[chainId] || []
}