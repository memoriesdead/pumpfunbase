'use client'

import { useState, useEffect } from 'react'
import { Loader2, TrendingUp, TrendingDown, ExternalLink, RefreshCw } from 'lucide-react'
import { solanaTokensAPI, formatPrice, formatVolume, SolanaToken } from '@/lib/solana-tokens-api'

export default function SolanaTokensDisplay() {
  const [tokens, setTokens] = useState<SolanaToken[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchTokens = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const solanaTokens = await solanaTokensAPI.getTop10SolanaTokens()
      setTokens(solanaTokens)
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch Solana tokens')
      console.error('Error fetching Solana tokens:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokens()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTokens, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  const openTokenExplorer = (address: string) => {
    window.open(`https://solscan.io/token/${address}`, '_blank')
  }

  if (error) {
    return (
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
        <div className="text-center">
          <div className="text-[#EA3943] mb-4">
            <TrendingDown className="w-12 h-12 mx-auto mb-2" />
            <h3 className="cmc-text-lg cmc-font-semibold">Failed to Load Solana Tokens</h3>
            <p className="cmc-text-sm text-[#616E85] mt-1">{error}</p>
          </div>
          <button
            onClick={fetchTokens}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-[#9945FF] hover:bg-[#8839E0] text-white cmc-border-radius-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF] to-[#14F195] cmc-border-radius-full flex items-center justify-center">
            <span className="text-2xl">🟣</span>
          </div>
          <div>
            <h2 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              Top 10 Solana Tokens
            </h2>
            <p className="cmc-text-sm text-[#616E85]">
              Real-time data from Jupiter & CoinGecko APIs
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {lastUpdated && (
            <span className="cmc-text-xs text-[#616E85]">
              Updated {getTimeAgo(lastUpdated)}
            </span>
          )}
          <button
            onClick={fetchTokens}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 bg-[#9945FF] hover:bg-[#8839E0] disabled:bg-[#EFF2F5] disabled:text-[#616E85] text-white cmc-text-sm cmc-border-radius-md transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && tokens.length === 0 && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#9945FF] mx-auto mb-4" />
          <p className="cmc-text-sm text-[#616E85]">
            Fetching real-time Solana token data...
          </p>
        </div>
      )}

      {/* Tokens List */}
      {tokens.length > 0 && (
        <div className="space-y-3">
          {tokens.map((token, index) => (
            <div
              key={token.address}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F8FAFD] to-[#F0F9FF] hover:from-[#F0F9FF] hover:to-[#E0F2FE] cmc-border-radius-md transition-colors cursor-pointer"
              onClick={() => openTokenExplorer(token.address)}
            >
              {/* Token Info */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="cmc-text-sm cmc-font-bold text-[#616E85] w-6">
                    #{index + 1}
                  </span>
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-8 h-8 cmc-border-radius-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/32/9945FF/FFFFFF?text=${token.symbol.charAt(0)}`
                    }}
                  />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="cmc-text-base cmc-font-semibold text-[#0D1421]">
                      {token.symbol}
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#616E85]" />
                  </div>
                  <div className="cmc-text-sm text-[#616E85]">
                    {token.name}
                  </div>
                </div>
              </div>

              {/* Token Stats */}
              <div className="flex items-center space-x-6">
                {/* Price */}
                {token.price && (
                  <div className="text-right">
                    <div className="cmc-text-base cmc-font-semibold text-[#0D1421]">
                      {formatPrice(token.price)}
                    </div>
                    {token.price_change_24h && (
                      <div className={`flex items-center space-x-1 cmc-text-sm ${
                        token.price_change_24h >= 0 ? 'text-[#16C784]' : 'text-[#EA3943]'
                      }`}>
                        {token.price_change_24h >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(token.price_change_24h).toFixed(2)}%</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Market Cap */}
                {token.market_cap && (
                  <div className="text-right">
                    <div className="cmc-text-sm text-[#616E85] mb-1">Market Cap</div>
                    <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                      {formatVolume(token.market_cap)}
                    </div>
                  </div>
                )}

                {/* Volume */}
                {(token.volume_24h || token.daily_volume) && (
                  <div className="text-right">
                    <div className="cmc-text-sm text-[#616E85] mb-1">24h Volume</div>
                    <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                      {formatVolume(token.volume_24h || token.daily_volume)}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {token.tags && token.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {token.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-[#9945FF]/10 text-[#9945FF] cmc-text-xs cmc-border-radius-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-[#EFF2F5]">
        <div className="flex items-center justify-between cmc-text-xs text-[#616E85]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#14F195] cmc-border-radius-full animate-pulse" />
              <span>Live Data</span>
            </div>
            <span>Solana Chain ID: 101</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>Powered by Jupiter API</span>
            <span>•</span>
            <span>Price data from CoinGecko</span>
          </div>
        </div>
      </div>
    </div>
  )
}