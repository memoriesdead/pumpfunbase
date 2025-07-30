import { NextResponse } from 'next/server'
import { SUPPORTED_CHAINS } from '@/lib/zerox-config'

// Single mock token for testing
const MOCK_TOKEN_DATA = {
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
}

// Generate realistic market fluctuations for mock token
function generateMockTokenData() {
  const token = MOCK_TOKEN_DATA
  
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
  
  return [{
    id: 1,
    rank: 1,
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
  }]
}

export async function GET() {
  try {
    console.log('API: Generating mock token data...')
    
    // Generate realistic market data with live-like fluctuations for single mock token
    const mockTokens = generateMockTokenData()
    
    console.log(`API: Returning ${mockTokens.length} mock token`)
    console.log('Token:', mockTokens[0].name, mockTokens[0].symbol)
    
    return NextResponse.json(mockTokens)
  } catch (error) {
    console.error('API error:', error)
    
    // Simple fallback with mock token
    const fallbackData = [{
      id: 1,
      rank: 1,
      name: MOCK_TOKEN_DATA.name,
      symbol: MOCK_TOKEN_DATA.symbol,
      logo: MOCK_TOKEN_DATA.logo,
      price: MOCK_TOKEN_DATA.basePrice,
      priceChange24h: MOCK_TOKEN_DATA.basePriceChange24h,
      change24h: MOCK_TOKEN_DATA.basePriceChange24h,
      change7d: MOCK_TOKEN_DATA.basePriceChange7d,
      marketCap: MOCK_TOKEN_DATA.marketCap,
      volume24h: MOCK_TOKEN_DATA.volume24h,
      supply: MOCK_TOKEN_DATA.supply,
      sparkline: [MOCK_TOKEN_DATA.basePrice, MOCK_TOKEN_DATA.basePrice * 1.02, MOCK_TOKEN_DATA.basePrice * 0.98, MOCK_TOKEN_DATA.basePrice * 1.05, MOCK_TOKEN_DATA.basePrice * 0.97, MOCK_TOKEN_DATA.basePrice * 1.03, MOCK_TOKEN_DATA.basePrice],
      chainId: MOCK_TOKEN_DATA.chainId,
      chainName: SUPPORTED_CHAINS[MOCK_TOKEN_DATA.chainId]?.name || 'Unknown'
    }]
    
    return NextResponse.json(fallbackData)
  }
}
