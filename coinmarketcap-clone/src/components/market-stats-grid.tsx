import { formatNumber } from '@/lib/utils'
import { Crypto } from '@/types/crypto'

interface MarketStatsProps {
  crypto: Crypto
}

export default function MarketStatsGrid({ crypto }: MarketStatsProps) {
  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h3 className="text-lg font-bold text-[#1E1E1E] mb-6">{crypto.name} Market Data</h3>
      
      <div className="space-y-5">
        
        {/* Market Cap */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-[#8C8C8C]">Market Cap</div>
            <div className="text-xs bg-[#F0F0F0] text-[#8C8C8C] px-2 py-1 rounded mt-1">
              Rank #{crypto.marketCapRank || crypto.rank}
            </div>
          </div>
          <div className="text-lg font-bold text-[#1E1E1E]">
            {formatMarketCap(crypto.marketCap)}
          </div>
        </div>

        {/* 24 Hour Trading Vol */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-[#8C8C8C]">24 Hour Trading Vol</div>
            <div className="text-xs bg-[#F0F0F0] text-[#8C8C8C] px-2 py-1 rounded mt-1">
              Rank #{crypto.volumeRank || crypto.rank}
            </div>
          </div>
          <div className="text-lg font-bold text-[#1E1E1E]">
            {formatMarketCap(crypto.volume24h)}
          </div>
        </div>

        {/* Fully Diluted Market Cap */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#8C8C8C]">Fully Diluted Market Cap</div>
          <div className="text-lg font-bold text-[#1E1E1E]">
            {crypto.fullyDilutedMarketCap ? formatMarketCap(crypto.fullyDilutedMarketCap) : formatMarketCap(crypto.marketCap * 1.05)}
          </div>
        </div>

        {/* Circulating Supply */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-[#8C8C8C]">Circulating Supply</div>
            <div className="text-lg font-bold text-[#1E1E1E]">
              {formatNumber(crypto.supply)}M {crypto.symbol}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#F0F0F0] rounded-full h-2">
            <div 
              className="bg-[#1652F0] h-2 rounded-full"
              style={{ 
                width: crypto.maxSupply 
                  ? `${Math.min((crypto.supply / crypto.maxSupply) * 100, 100)}%` 
                  : '93.7%' 
              }}
            />
          </div>
        </div>

        {/* Total Supply */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#8C8C8C]">Total Supply</div>
          <div className="text-lg font-bold text-[#1E1E1E]">
            {formatNumber(crypto.totalSupply || crypto.supply)}M {crypto.symbol}
          </div>
        </div>

        {/* Max Supply */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#8C8C8C]">Max Supply</div>
          <div className="text-lg font-bold text-[#1E1E1E]">
            {crypto.maxSupply ? `${formatNumber(crypto.maxSupply)}M ${crypto.symbol}` : "21.00M BTC"}
          </div>
        </div>
      </div>
    </div>
  )
}