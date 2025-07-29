'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface TradingPairData {
  pair: string
  baseToken: {
    symbol: string
    name: string
    logo: string
  }
  quoteToken: {
    symbol: string
    name: string
    logo: string
  }
  price: number
  priceChange24h: number
  volume: number
  high24h: number
  low24h: number
  exchange: string
  exchangeIcon: string
}

export default function TradingPairDisplay() {
  const searchParams = useSearchParams()
  const pairParam = searchParams.get('pair')
  const [pairData, setPairData] = useState<TradingPairData | null>(null)

  useEffect(() => {
    if (pairParam) {
      // Parse the pair parameter and create mock data
      const [baseSymbol, quoteSymbol] = pairParam.split('/')
      
      // Create deterministic trading pair data (no random values for SSR compatibility)
      const seed = baseSymbol.charCodeAt(0) + quoteSymbol.charCodeAt(0)
      const basePrice = ((seed % 1000) + 100) / 10 // Price between 10-110
      
      const mockData: TradingPairData = {
        pair: pairParam,
        baseToken: {
          symbol: baseSymbol,
          name: getTokenName(baseSymbol),
          logo: getTokenLogo(baseSymbol)
        },
        quoteToken: {
          symbol: quoteSymbol,
          name: getTokenName(quoteSymbol),
          logo: getTokenLogo(quoteSymbol)
        },
        price: basePrice,
        priceChange24h: ((seed % 200) - 100) / 10, // -10% to +10%
        volume: (seed % 9000000) + 1000000, // 1M-10M volume
        high24h: basePrice * 1.1,
        low24h: basePrice * 0.9,
        exchange: 'Raydium',
        exchangeIcon: 'https://raydium.io/logo.svg'
      }
      
      setPairData(mockData)
    }
  }, [pairParam])

  const getTokenName = (symbol: string): string => {
    const tokenNames: Record<string, string> = {
      'SOL': 'Solana',
      'USDC': 'USD Coin',
      'USDT': 'Tether USD',
      'RAY': 'Raydium',
      'SRM': 'Serum',
      'ORCA': 'Orca',
      'MNGO': 'Mango Markets',
      'SAMO': 'Samoyedcoin',
      'mSOL': 'Marinade staked SOL',
      'FIDA': 'Bonfida'
    }
    return tokenNames[symbol] || symbol
  }

  const getTokenLogo = (symbol: string): string => {
    const tokenLogos: Record<string, string> = {
      'SOL': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      'USDC': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      'USDT': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
      'RAY': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
      'SRM': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png',
      'ORCA': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png'
    }
    return tokenLogos[symbol] || `https://via.placeholder.com/32x32/f0f0f0/666?text=${symbol.charAt(0)}`
  }

  const formatCurrency = (amount: number) => {
    if (amount < 0.01) return `$${amount.toFixed(8)}`
    if (amount < 1) return `$${amount.toFixed(6)}`
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`
  }

  const formatVolume = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`
    return `$${amount.toFixed(0)}`
  }

  if (!pairParam || !pairData) {
    return null
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Token Icons */}
          <div className="flex items-center -space-x-2">
            <div className="relative w-10 h-10 z-20">
              <Image
                src={pairData.baseToken.logo}
                alt={pairData.baseToken.symbol}
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://via.placeholder.com/40x40/f0f0f0/666?text=${pairData.baseToken.symbol.charAt(0)}`
                }}
              />
            </div>
            <div className="relative w-10 h-10 z-10">
              <Image
                src={pairData.quoteToken.logo}
                alt={pairData.quoteToken.symbol}
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://via.placeholder.com/40x40/f0f0f0/666?text=${pairData.quoteToken.symbol.charAt(0)}`
                }}
              />
            </div>
          </div>

          {/* Pair Info */}
          <div>
            <h1 className="text-2xl font-bold">{pairData.pair}</h1>
            <p className="text-gray-600">
              {pairData.baseToken.name} / {pairData.quoteToken.name}
            </p>
          </div>

          {/* Exchange Badge */}
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
            <div className="relative w-5 h-5">
              <Image
                src={pairData.exchangeIcon}
                alt={pairData.exchange}
                width={20}
                height={20}
                className="rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/20x20/f0f0f0/666?text=EX'
                }}
              />
            </div>
            <span className="text-sm font-medium text-blue-700">{pairData.exchange}</span>
          </div>
        </div>

        {/* Price Info */}
        <div className="text-right">
          <div className="text-3xl font-mono font-bold">
            {formatCurrency(pairData.price)}
          </div>
          <div className={`text-lg font-semibold ${
            pairData.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {pairData.priceChange24h >= 0 ? '+' : ''}{pairData.priceChange24h.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
        <div>
          <div className="text-sm text-gray-500 mb-1">24h Volume</div>
          <div className="text-lg font-semibold">{formatVolume(pairData.volume)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">24h High</div>
          <div className="text-lg font-semibold">{formatCurrency(pairData.high24h)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">24h Low</div>
          <div className="text-lg font-semibold">{formatCurrency(pairData.low24h)}</div>
        </div>
      </div>

      {/* Trading Actions */}
      <div className="flex space-x-4 mt-6">
        <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
          Buy {pairData.baseToken.symbol}
        </button>
        <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
          Sell {pairData.baseToken.symbol}
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Add to Watchlist
        </button>
      </div>
    </div>
  )
}