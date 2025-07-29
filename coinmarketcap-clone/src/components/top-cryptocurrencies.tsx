'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Crypto } from '@/types/crypto'

export default function TopCryptocurrencies() {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopCryptos = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/tokens')
        const data = await response.json()
        setCryptos(data.slice(0, 10)) // Ensure we only get top 10
      } catch (error) {
        console.error('Failed to fetch top cryptocurrencies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopCryptos()
  }, [])

  const formatCurrency = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)}T`
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`
    return `$${amount.toFixed(2)}`
  }

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(8)}`
    if (price < 1) return `$${price.toFixed(6)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h2>
        <div className="animate-pulse">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Top 10 Cryptocurrencies</h2>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 text-sm font-semibold text-gray-500">#</th>
              <th className="pb-3 text-sm font-semibold text-gray-500">Name</th>
              <th className="pb-3 text-sm font-semibold text-gray-500 text-right">Price</th>
              <th className="pb-3 text-sm font-semibold text-gray-500 text-right">24h</th>
              <th className="pb-3 text-sm font-semibold text-gray-500 text-right">7d</th>
              <th className="pb-3 text-sm font-semibold text-gray-500 text-right">Market Cap</th>
              <th className="pb-3 text-sm font-semibold text-gray-500 text-right">Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 text-gray-500 font-medium">{crypto.rank}</td>
                
                {/* Name & Logo */}
                <td className="py-4">
                  <Link 
                    href={`/currencies/${crypto.symbol.toLowerCase()}`}
                    className="flex items-center space-x-3 hover:text-blue-600 transition-colors"
                  >
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={crypto.logo}
                        alt={crypto.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://via.placeholder.com/32x32/f0f0f0/666?text=${crypto.symbol.charAt(0)}`
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{crypto.name}</div>
                      <div className="text-sm text-gray-500 uppercase">{crypto.symbol}</div>
                    </div>
                  </Link>
                </td>

                {/* Price */}
                <td className="py-4 text-right font-mono font-semibold">
                  {formatPrice(crypto.price)}
                </td>

                {/* 24h Change */}
                <td className="py-4 text-right">
                  <span className={`font-semibold ${
                    crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </span>
                </td>

                {/* 7d Change */}
                <td className="py-4 text-right">
                  <span className={`font-semibold ${
                    crypto.change7d >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                  </span>
                </td>

                {/* Market Cap */}
                <td className="py-4 text-right font-mono">
                  {formatCurrency(crypto.marketCap)}
                </td>

                {/* Volume */}
                <td className="py-4 text-right font-mono">
                  {formatCurrency(crypto.volume24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Showing top 10 cryptocurrencies by market cap • 
          <span className="text-blue-600 ml-1">Real-time data via 0x Protocol</span>
        </p>
      </div>
    </div>
  )
}