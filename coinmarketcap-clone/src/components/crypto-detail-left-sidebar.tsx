import { Crypto } from '@/types/crypto'

interface CryptoDetailLeftSidebarProps {
  crypto: Crypto
}

export default function CryptoDetailLeftSidebar({ crypto }: CryptoDetailLeftSidebarProps) {
  // Safe property access with fallbacks
  const marketCap = crypto.marketCap || crypto.price * (crypto.supply || 19500000)
  const fullyDilutedMarketCap = crypto.fullyDilutedMarketCap || crypto.price * 21000000
  const circulatingSupply = crypto.supply || 19500000
  const totalSupply = crypto.totalSupply || 19500000
  const maxSupply = crypto.maxSupply || 21000000
  
  const stats = [
    { label: 'Market Cap', value: `$${marketCap.toLocaleString()}`, change: '+2.34%' },
    { label: 'Fully Diluted Market Cap', value: `$${fullyDilutedMarketCap.toLocaleString()}`, change: '+2.34%' },
    { label: 'Volume', value: `$${crypto.volume24h.toLocaleString()}`, subtext: 'Volume / Market Cap: 0.0532' },
    { label: 'Volume/Market Cap', value: '0.0532', change: null },
    { label: 'Circulating Supply', value: `${circulatingSupply.toLocaleString()} BTC`, progress: (circulatingSupply / maxSupply) * 100 },
    { label: 'Total Supply', value: `${totalSupply.toLocaleString()} BTC`, change: null },
    { label: 'Max Supply', value: `${maxSupply.toLocaleString()} BTC`, change: null },
  ]

  return (
    <div className="space-y-4">
      {/* Price Statistics */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Statistics</h3>
        
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-sm text-[#8C8C8C] mb-1">{stat.label}</div>
                <div className="text-sm font-medium text-[#1E1E1E]">{stat.value}</div>
                {stat.subtext && (
                  <div className="text-xs text-[#8C8C8C] mt-1">{stat.subtext}</div>
                )}
                {stat.progress && (
                  <div className="mt-2">
                    <div className="w-full bg-[#F0F0F0] rounded-full h-1.5">
                      <div 
                        className="bg-[#1652F0] h-1.5 rounded-full" 
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-[#8C8C8C] mt-1">{stat.progress}%</div>
                  </div>
                )}
              </div>
              {stat.change && (
                <div className={`text-sm font-medium ml-4 ${
                  stat.change.startsWith('+') ? 'text-[#00D4AA]' : 'text-[#FF5722]'
                }`}>
                  {stat.change}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Prediction */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1E1E1E]">Bitcoin Price Prediction</h3>
          <span className="text-xs text-[#8C8C8C]">Powered by AI</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8C8C8C]">Today</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-[#1E1E1E]">$118,432</span>
              <span className="text-sm text-[#00D4AA]">+2.1%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8C8C8C]">This Week</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-[#1E1E1E]">$125,000</span>
              <span className="text-sm text-[#00D4AA]">+8.3%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8C8C8C]">This Month</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-[#1E1E1E]">$135,000</span>
              <span className="text-sm text-[#00D4AA]">+16.9%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#F8F9FA] rounded-lg">
          <div className="text-xs text-[#8C8C8C] mb-1">Fear & Greed Index</div>
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-[#00D4AA]">76</div>
            <div className="text-sm text-[#00D4AA]">Extreme Greed</div>
          </div>
        </div>
      </div>

      {/* Top Cryptocurrencies */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Top Cryptocurrencies</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Bitcoin', symbol: 'BTC', price: '$115,432', change: '+2.34%', isActive: true },
            { name: 'Ethereum', symbol: 'ETH', price: '$4,234', change: '+1.82%', isActive: false },
            { name: 'Tether USDt', symbol: 'USDT', price: '$1.00', change: '+0.01%', isActive: false },
            { name: 'XRP', symbol: 'XRP', price: '$2.89', change: '+15.23%', isActive: false },
            { name: 'Solana', symbol: 'SOL', price: '$218.45', change: '+3.45%', isActive: false },
          ].map((coin, index) => (
            <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
              coin.isActive ? 'bg-[#F0F8FF] border border-[#1652F0]' : 'hover:bg-[#F8F9FA]'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#1652F0] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{coin.symbol.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1E1E1E]">{coin.name}</div>
                  <div className="text-xs text-[#8C8C8C]">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[#1E1E1E]">{coin.price}</div>
                <div className={`text-xs ${
                  coin.change.startsWith('+') ? 'text-[#00D4AA]' : 'text-[#FF5722]'
                }`}>
                  {coin.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-sm text-[#1652F0] hover:bg-[#F8F9FA] rounded-lg transition-colors">
          View all cryptocurrencies →
        </button>
      </div>
    </div>
  )
}