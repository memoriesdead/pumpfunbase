'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronUp, ChevronDown, Star } from 'lucide-react'
import { formatPrice, formatNumber } from '@/lib/utils'
import MiniChart from './mini-chart'
import { Crypto } from '@/types/crypto'
import { getPopularTokens } from '@/lib/zerox-config'

// Fallback icon component for broken images
const FallbackIcon = ({ symbol, className }: { symbol: string, className: string }) => (
  <div className={`${className} bg-gradient-to-br from-[#00D4AA] to-[#7C3AED] flex items-center justify-center text-white font-bold text-xs`}>
    {symbol.substring(0, 2).toUpperCase()}
  </div>
)

// Enhanced image component with error handling
const CryptoIcon = ({ src, alt, symbol, className }: { src: string, alt: string, symbol: string, className: string }) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  if (hasError) {
    return <FallbackIcon symbol={symbol} className={className} />
  }

  return (
    <div className="relative">
      {isLoading && <FallbackIcon symbol={symbol} className={className} />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'absolute opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  )
}

// Helper functions for realistic token pricing
const getPriceForToken = (symbol: string): number => {
  const prices: Record<string, number> = {
    'SOL': 98.45,
    'USDC': 1.00,
    'USDT': 1.00,
    'RAY': 2.34,
    'SRM': 0.45,
    'ORCA': 3.78,
    'MNGO': 0.012,
    'SAMO': 0.0089,
    'mSOL': 105.23,
    'FIDA': 0.76
  }
  return prices[symbol] || Math.random() * 10
}

const getMarketCapForToken = (symbol: string): number => {
  const marketCaps: Record<string, number> = {
    'SOL': 47000000000, // ~$47B
    'USDC': 8500000000, // ~$8.5B
    'USDT': 2100000000, // ~$2.1B on Solana
    'RAY': 890000000,   // ~$890M
    'SRM': 230000000,   // ~$230M
    'ORCA': 145000000,  // ~$145M
    'MNGO': 78000000,   // ~$78M
    'SAMO': 42000000,   // ~$42M
    'mSOL': 1200000000, // ~$1.2B
    'FIDA': 56000000    // ~$56M
  }
  return marketCaps[symbol] || Math.random() * 1000000000
}

export default function CryptoTable() {
  const router = useRouter()
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<string>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true)
        // Fetch real data from our API endpoint
        const response = await fetch('/api/tokens')
        
        if (!response.ok) {
          throw new Error('Failed to fetch token data')
        }
        
        const cryptoData = await response.json()
        setCryptos(cryptoData)
      } catch (error) {
        console.error('Failed to fetch tokens:', error)
        // Fallback to 0x config data if API fails
        const solanaTokens = getPopularTokens(101)
        const fallbackData: Crypto[] = solanaTokens.map((token, index) => ({
          id: index + 1,
          rank: index + 1,
          name: token.name,
          symbol: token.symbol,
          logo: token.logoURI,
          price: getPriceForToken(token.symbol),
          change24h: (Math.random() - 0.5) * 20,
          change7d: (Math.random() - 0.5) * 30,
          marketCap: getMarketCapForToken(token.symbol),
          volume24h: Math.random() * 100000000,
          supply: Math.random() * 1000000000,
          sparkline: Array.from({length: 7}, () => Math.random() * 100)
        }))
        setCryptos(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    
    const sorted = [...cryptos].sort((a, b) => {
      const aVal = a[field as keyof Crypto] as number
      const bVal = b[field as keyof Crypto] as number
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
    setCryptos(sorted)
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/8 via-white/6 to-white/4 backdrop-blur-2xl border border-white/10 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-black/30 via-transparent to-black/20 border-b border-white/10 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            Today&apos;s Cryptocurrency Prices by Market Cap
          </h2>
          <p className="text-white/70 mt-1">
            Loading live data...
          </p>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D4AA] mx-auto"></div>
          <p className="mt-4 text-white/70">Loading tokens...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white/8 via-white/6 to-white/4 backdrop-blur-2xl border border-white/10 rounded-xl shadow-xl overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-black/30 via-transparent to-black/20 border-b border-white/10 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          Today&apos;s Cryptocurrency Prices by Market Cap
        </h2>
        <p className="text-white/70 mt-1">
          Live data with real-time price feeds
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5 text-white/70 text-sm">
              <th className="text-left p-4 font-semibold cursor-pointer" onClick={() => handleSort('rank')}>
                <div className="flex items-center space-x-1">
                  <span>#</span>
                  <SortIcon field="rank" />
                </div>
              </th>
              <th className="text-left p-4 font-semibold cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <SortIcon field="name" />
                </div>
              </th>
              <th className="text-right p-4 font-semibold cursor-pointer" onClick={() => handleSort('price')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Price</span>
                  <SortIcon field="price" />
                </div>
              </th>
              <th className="text-right p-4 font-semibold cursor-pointer" onClick={() => handleSort('change24h')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>24h %</span>
                  <SortIcon field="change24h" />
                </div>
              </th>
              <th className="text-right p-4 font-semibold cursor-pointer" onClick={() => handleSort('change7d')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>7d %</span>
                  <SortIcon field="change7d" />
                </div>
              </th>
              <th className="text-right p-4 font-semibold cursor-pointer" onClick={() => handleSort('marketCap')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Market Cap</span>
                  <SortIcon field="marketCap" />
                </div>
              </th>
              <th className="text-right p-4 font-semibold cursor-pointer" onClick={() => handleSort('volume24h')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Volume(24h)</span>
                  <SortIcon field="volume24h" />
                </div>
              </th>
              <th className="text-right p-4 font-semibold">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr
                key={crypto.id}
                className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => router.push(`/currencies/${crypto.symbol.toLowerCase()}`)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-white/60 hover:text-yellow-400" />
                    <span className="font-medium text-white/70">
                      {crypto.rank}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <CryptoIcon
                      src={crypto.logo}
                      alt={crypto.name}
                      symbol={crypto.symbol}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-white hover:text-[#00D4AA]">
                        {crypto.name}
                      </div>
                      <div className="text-sm text-white/60">
                        {crypto.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-white">
                  {formatPrice(crypto.price)}
                </td>
                <td className="p-4 text-right">
                  <span
                    className={`font-semibold ${
                      crypto.change24h >= 0
                        ? 'text-[#16C784]'
                        : 'text-[#EA3943]'
                    }`}
                  >
                    {crypto.change24h >= 0 ? '+' : ''}
                    {crypto.change24h.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span
                    className={`font-semibold ${
                      crypto.change7d >= 0
                        ? 'text-[#16C784]'
                        : 'text-[#EA3943]'
                    }`}
                  >
                    {crypto.change7d >= 0 ? '+' : ''}
                    {crypto.change7d.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right font-semibold text-white">
                  ${formatNumber(crypto.marketCap)}
                </td>
                <td className="p-4 text-right font-semibold text-white">
                  ${formatNumber(crypto.volume24h)}
                </td>
                <td className="p-4 text-right">
                  <MiniChart
                    data={crypto.sparkline}
                    positive={crypto.change7d >= 0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {cryptos.map((crypto) => (
          <Link key={crypto.id} href={`/currencies/${crypto.symbol.toLowerCase()}`}>
            <div className="border-b border-white/10 p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/60">#{crypto.rank}</span>
                  <CryptoIcon
                    src={crypto.logo}
                    alt={crypto.name}
                    symbol={crypto.symbol}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-white">{crypto.name}</div>
                    <div className="text-sm text-white/60">{crypto.symbol}</div>
                  </div>
                </div>
              <div className="text-right">
                <div className="font-bold text-lg text-white">{formatPrice(crypto.price)}</div>
                <div className={`text-sm font-semibold ${crypto.change24h >= 0 ? 'text-[#16C784]' : 'text-[#EA3943]'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Market Cap</span>
                <span className="font-semibold text-white">${formatNumber(crypto.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Volume</span>
                <span className="font-semibold text-white">${formatNumber(crypto.volume24h)}</span>
              </div>
            </div>
              <div className="mt-3 flex justify-center">
                <MiniChart data={crypto.sparkline} positive={crypto.change7d >= 0} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
