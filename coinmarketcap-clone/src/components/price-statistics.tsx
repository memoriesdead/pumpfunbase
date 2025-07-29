import { formatPrice } from '@/lib/utils'
import { Crypto } from '@/types/crypto'

interface PriceStatisticsProps {
  crypto: Crypto
}

export default function PriceStatistics({ crypto }: PriceStatisticsProps) {
  // Calculate realistic Bitcoin statistics
  const athPrice = crypto.allTimeHigh || 73750.07
  const atlPrice = crypto.allTimeLow || 0.04865
  const athChange = -((athPrice - crypto.price) / athPrice * 100)
  const atlChange = ((crypto.price - atlPrice) / atlPrice * 100)

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h3 className="text-lg font-bold text-[#1E1E1E] mb-6">{crypto.name} Price Statistics</h3>
      
      <div className="space-y-4">
        
        {/* All-Time High */}
        <div className="flex justify-between items-center pb-4 border-b border-[#F0F0F0]">
          <div className="text-sm text-[#8C8C8C]">All-Time High</div>
          <div className="text-right">
            <div className="text-sm font-bold text-[#1E1E1E]">{formatPrice(athPrice)}</div>
            <div className="text-xs text-[#FF5722]">{Math.abs(athChange).toFixed(2)}%</div>
            <div className="text-xs text-[#8C8C8C]">from ATH</div>
            <div className="text-xs text-[#8C8C8C]">2024-03-14</div>
          </div>
        </div>

        {/* All-Time Low */}
        <div className="flex justify-between items-center pb-4 border-b border-[#F0F0F0]">
          <div className="text-sm text-[#8C8C8C]">All-Time Low</div>
          <div className="text-right">
            <div className="text-sm font-bold text-[#1E1E1E]">{formatPrice(atlPrice)}</div>
            <div className="text-xs text-[#00D4AA]">+{atlChange.toLocaleString()}%</div>
            <div className="text-xs text-[#8C8C8C]">from ATL</div>
            <div className="text-xs text-[#8C8C8C]">2010-07-14</div>
          </div>
        </div>

        {/* 52 Week Range */}
        <div className="pb-4 border-b border-[#F0F0F0]">
          <div className="text-sm text-[#8C8C8C] mb-3">52 Week Range</div>
          <div className="relative mb-2">
            <div className="w-full bg-[#F0F0F0] rounded-full h-2">
              <div 
                className="bg-[#1652F0] h-2 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-[#8C8C8C]">
            <span>$40,340.736</span>
            <span>$94,128.384</span>
          </div>
        </div>

        {/* Market Cap Rank & Volume Rank */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-[#8C8C8C]">Market Cap Rank</div>
            <div className="text-2xl font-bold text-[#1E1E1E]">#{crypto.marketCapRank || crypto.rank}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[#8C8C8C]">Volume Rank</div>
            <div className="text-2xl font-bold text-[#1E1E1E]">#{crypto.volumeRank || crypto.rank}</div>
          </div>
        </div>

        {/* Price Performance */}
        <div>
          <div className="text-sm text-[#8C8C8C] mb-3">Price Performance</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#8C8C8C]">30d</div>
              <div className="text-sm font-bold text-[#FF5722]">
                {(crypto.priceChange30d || -8.45).toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8C8C8C]">1y</div>
              <div className="text-sm font-bold text-[#00D4AA]">
                +{(crypto.priceChange1y || 145.67).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}