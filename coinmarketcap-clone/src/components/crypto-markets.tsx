'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Crypto } from '@/types/crypto'
import TopCryptocurrencies from './top-cryptocurrencies'

interface Market {
  id: number
  currency: string
  pair: string
  price: number
  depth_plus_2: number
  depth_minus_2: number
  volume: number
  volume_percent: number
  updated: string
  exchange: string
  exchangeIcon: string
  baseToken: {
    symbol: string
    name: string
    logo: string
    address: string
  }
  quoteToken: {
    symbol: string
    name: string
    logo: string
    address: string
  }
  priceChange24h?: number
  trust_score?: number
}

export default function CryptoMarkets({ crypto }: { crypto: Crypto }) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/markets/${crypto.symbol}`)
        const data = await response.json()
        setMarkets(data)
      } catch (error) {
        console.error('Failed to fetch markets:', error)
      } finally {
        setLoading(false)
      }
    }

    if (crypto.symbol) {
      fetchMarkets()
    }
  }, [crypto.symbol])

  if (loading) {
    return <div>Loading markets...</div>
  }

  const formatCurrency = (amount: number) => {
    if (amount === 0) return '$0.00'
    if (amount < 0.01) return `$${amount.toFixed(8)}`
    if (amount < 1) return `$${amount.toFixed(6)}`
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`
  }

  const formatVolume = (amount: number) => {
    if (amount === 0) return '$0'
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`
    return `$${amount.toFixed(0)}`
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Top 10 Cryptocurrencies Section */}
      <TopCryptocurrencies />
      
      {/* Markets Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">#</th>
              <th className="text-left py-3 px-4 font-semibold">Exchange</th>
              <th className="text-left py-3 px-4 font-semibold">Pair</th>
              <th className="text-right py-3 px-4 font-semibold">Price</th>
              <th className="text-right py-3 px-4 font-semibold">24h Change</th>
              <th className="text-right py-3 px-4 font-semibold">Volume</th>
              <th className="text-right py-3 px-4 font-semibold">Volume %</th>
              <th className="text-right py-3 px-4 font-semibold">Trust Score</th>
              <th className="text-right py-3 px-4 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market) => (
              <tr key={market.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="py-3 px-4 text-gray-500">{market.id}</td>
                
                {/* Exchange with icon */}
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={market.exchangeIcon}
                        alt={market.exchange}
                        width={24}
                        height={24}
                        className="rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://via.placeholder.com/24x24/f0f0f0/666?text=EX'
                        }}
                      />
                    </div>
                    <span className="font-medium text-sm">{market.exchange}</span>
                  </div>
                </td>
                
                {/* Trading pair with token icons */}
                <td className="py-3 px-4">
                  <Link 
                    href={`/trading?pair=${market.pair}`}
                    className="flex items-center space-x-2 group-hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center -space-x-1">
                      <div className="relative w-5 h-5 z-20">
                        <Image
                          src={market.baseToken.logo}
                          alt={market.baseToken.symbol}
                          width={20}
                          height={20}
                          className="rounded-full border border-white"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'https://via.placeholder.com/20x20/f0f0f0/666?text=' + market.baseToken.symbol.charAt(0)
                          }}
                        />
                      </div>
                      <div className="relative w-5 h-5 z-10">
                        <Image
                          src={market.quoteToken.logo}
                          alt={market.quoteToken.symbol}
                          width={20}
                          height={20}
                          className="rounded-full border border-white"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'https://via.placeholder.com/20x20/f0f0f0/666?text=' + market.quoteToken.symbol.charAt(0)
                          }}
                        />
                      </div>
                    </div>
                    <span className="font-medium">{market.pair}</span>
                  </Link>
                </td>
                
                {/* Price */}
                <td className="py-3 px-4 text-right font-mono text-sm">
                  {formatCurrency(market.price)}
                </td>
                
                {/* 24h Change */}
                <td className="py-3 px-4 text-right">
                  {market.priceChange24h !== undefined && (
                    <span className={`text-sm font-medium ${
                      market.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {market.priceChange24h >= 0 ? '+' : ''}{market.priceChange24h.toFixed(2)}%
                    </span>
                  )}
                </td>
                
                {/* Volume */}
                <td className="py-3 px-4 text-right font-mono text-sm">
                  {formatVolume(market.volume)}
                </td>
                
                {/* Volume % */}
                <td className="py-3 px-4 text-right text-sm">
                  {market.volume_percent.toFixed(2)}%
                </td>
                
                {/* Trust Score */}
                <td className="py-3 px-4 text-right">
                  {market.trust_score && (
                    <div className="flex items-center justify-end space-x-1">
                      <div className="flex space-x-0.5">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < market.trust_score! ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{market.trust_score}/10</span>
                    </div>
                  )}
                </td>
                
                {/* Updated */}
                <td className="py-3 px-4 text-right text-xs text-gray-500">
                  {getTimeAgo(market.updated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {markets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No market data available</p>
        </div>
      )}
      </div>
    </div>
  )
}
