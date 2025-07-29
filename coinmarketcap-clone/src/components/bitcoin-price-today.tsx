import { Crypto } from '@/types/crypto'
import { formatPrice } from '@/lib/utils'

interface BitcoinPriceTodayProps {
  crypto: Crypto
}

export default function BitcoinPriceToday({ crypto }: BitcoinPriceTodayProps) {
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h2 className="text-2xl font-bold text-[#1E1E1E] mb-6">Bitcoin Price Today</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Price */}
        <div className="space-y-2">
          <div className="text-sm text-[#8C8C8C]">Price to USD</div>
          <div className="text-2xl font-bold text-[#1E1E1E]">{formatPrice(crypto.price)}</div>
          <div className={`text-sm font-semibold ${crypto.change24h >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
            {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
          </div>
        </div>

        {/* 24h Low / 24h High */}
        <div className="space-y-2">
          <div className="text-sm text-[#8C8C8C]">24h Low / 24h High</div>
          <div className="text-lg font-semibold text-[#1E1E1E]">
            ${(crypto.price * 0.97).toLocaleString()} / ${(crypto.price * 1.03).toLocaleString()}
          </div>
        </div>

        {/* Trading Volume */}
        <div className="space-y-2">
          <div className="text-sm text-[#8C8C8C]">Trading Volume</div>
          <div className="text-lg font-semibold text-[#1E1E1E]">
            ${(crypto.volume24h / 1e9).toFixed(2)}B
          </div>
        </div>

        {/* Market Cap Rank */}
        <div className="space-y-2">
          <div className="text-sm text-[#8C8C8C]">Market Cap Rank</div>
          <div className="text-lg font-semibold text-[#1E1E1E]">#{crypto.rank}</div>
        </div>

        {/* Market Cap */}
        <div className="space-y-2">
          <div className="text-sm text-[#8C8C8C]">Market Cap</div>
          <div className="text-lg font-semibold text-[#1E1E1E]">
            ${(crypto.marketCap / 1e12).toFixed(2)}T
          </div>
        </div>

        {/* Market Cap Dominance */}
        <div className="space-y-2">
          <div className="text-sm text-[#8C8C8C]">Market Cap Dominance</div>
          <div className="text-lg font-semibold text-[#1E1E1E]">54.75%</div>
        </div>
      </div>

      {/* Price Performance */}
      <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
        <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">Price Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-[#8C8C8C] mb-1">7d</div>
            <div className={`font-bold ${crypto.change7d >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
              {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[#8C8C8C] mb-1">14d</div>
            <div className="font-bold text-[#00D4AA]">+12.34%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[#8C8C8C] mb-1">30d</div>
            <div className="font-bold text-[#FF5722]">-8.45%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[#8C8C8C] mb-1">1y</div>
            <div className="font-bold text-[#00D4AA]">+145.67%</div>
          </div>
        </div>
      </div>
    </div>
  )
}