export interface Crypto {
  id: number
  rank: number
  name: string
  symbol: string
  logo: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  supply: number
  sparkline: number[]
  // Extended detail page data
  description?: string
  website?: string
  whitepaper?: string
  github?: string
  twitter?: string
  reddit?: string
  allTimeHigh?: number
  allTimeLow?: number
  athDate?: string
  atlDate?: string
  tags?: string[]
  categories?: string[]
  maxSupply?: number
  totalSupply?: number
  volumeChange24h?: number
  volumeRank?: number
  marketCapChange24h?: number
  marketCapRank?: number
  priceChange1h?: number
  priceChange30d?: number
  priceChange1y?: number
  fullyDilutedMarketCap?: number
}

export interface GlobalStats {
  totalMarketCap: number
  totalVolume: number
  btcDominance: number
  ethDominance: number
  activeCryptos: number
  exchanges: number
  fearGreedIndex: number
}