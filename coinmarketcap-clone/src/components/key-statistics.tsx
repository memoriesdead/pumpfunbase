import { Crypto } from '@/types/crypto'
import { formatPrice } from '@/lib/utils'

interface KeyStatisticsProps {
  crypto: Crypto
}

export default function KeyStatistics({ crypto }: KeyStatisticsProps) {
  const statistics = [
    {
      label: 'Market Cap',
      value: `$${(crypto.marketCap / 1e12).toFixed(2)}T`,
      rank: `#${crypto.rank}`,
      description: 'The total market value of a cryptocurrency\'s circulating supply'
    },
    {
      label: 'Fully Diluted Market Cap',
      value: `$${((crypto.fullyDilutedMarketCap || crypto.marketCap * 1.05) / 1e12).toFixed(2)}T`,
      description: 'The market cap if the max supply was in circulation'
    },
    {
      label: 'Volume (24h)',
      value: `$${(crypto.volume24h / 1e9).toFixed(2)}B`,
      rank: `#${crypto.volumeRank || crypto.rank}`,
      description: 'A measure of how much of a cryptocurrency was traded in the last 24 hours'
    },
    {
      label: 'Volume/Market Cap',
      value: `${((crypto.volume24h / crypto.marketCap) * 100).toFixed(4)}`,
      description: 'The ratio between volume and market cap'
    },
    {
      label: 'Circulating Supply',
      value: `${(crypto.supply / 1e6).toFixed(2)}M ${crypto.symbol}`,
      description: 'The amount of coins that are circulating in the market'
    },
    {
      label: 'Total Supply',
      value: `${((crypto.totalSupply || crypto.supply) / 1e6).toFixed(2)}M ${crypto.symbol}`,
      description: 'The total amount of coins in existence right now'
    },
    {
      label: 'Max Supply',
      value: crypto.maxSupply ? `${(crypto.maxSupply / 1e6).toFixed(2)}M ${crypto.symbol}` : '21.00M BTC',
      description: 'The maximum amount of coins that will ever exist'
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h2 className="text-2xl font-bold text-[#1E1E1E] mb-6">Key Statistics</h2>
      
      <div className="space-y-6">
        {statistics.map((stat, index) => (
          <div key={index} className="flex items-start justify-between py-3 border-b border-[#F0F0F0] last:border-b-0">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-[#8C8C8C]">{stat.label}</span>
                {stat.rank && (
                  <span className="text-xs bg-[#F0F0F0] text-[#8C8C8C] px-2 py-1 rounded">
                    {stat.rank}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">{stat.description}</p>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-bold text-[#1E1E1E]">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
        <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">Additional Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-[#8C8C8C] mb-1">All-Time High</div>
            <div className="text-lg font-bold text-[#1E1E1E]">$73,750.07</div>
            <div className="text-xs text-[#FF5722]">-8.83% from ATH</div>
            <div className="text-xs text-[#8C8C8C]">Mar 14, 2024</div>
          </div>
          <div>
            <div className="text-sm text-[#8C8C8C] mb-1">All-Time Low</div>
            <div className="text-lg font-bold text-[#1E1E1E]">$0.04865</div>
            <div className="text-xs text-[#00D4AA]">+138,200,434% from ATL</div>
            <div className="text-xs text-[#8C8C8C]">Jul 14, 2010</div>
          </div>
        </div>
      </div>
    </div>
  )
}