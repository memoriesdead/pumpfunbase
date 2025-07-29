import { Crypto } from '@/types/crypto'
import PriceConverter from './price-converter'
import Tags from './tags'

interface CryptoDetailRightSidebarProps {
  crypto: Crypto
}

export default function CryptoDetailRightSidebar({ crypto }: CryptoDetailRightSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Price Converter */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Bitcoin Price Calculator</h3>
        <PriceConverter cryptoSymbol={crypto.symbol} cryptoPrice={crypto.price} />
      </div>

      {/* Quick Buy/Sell */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Buy/Sell Bitcoin</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button className="w-full py-3 bg-[#00D4AA] text-white rounded-lg font-medium hover:bg-[#00B894] transition-colors">
              Buy BTC
            </button>
            <button className="w-full py-3 bg-[#FF5722] text-white rounded-lg font-medium hover:bg-[#E53E3E] transition-colors">
              Sell BTC
            </button>
          </div>
          
          <div className="text-xs text-[#8C8C8C] text-center">
            Trade Bitcoin on trusted exchanges
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8C8C8C]">Best Price:</span>
              <span className="font-medium text-[#1E1E1E]">${crypto.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8C8C8C]">24h Volume:</span>
              <span className="font-medium text-[#1E1E1E]">${crypto.volume24h.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">🔥 Trending</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Ethereum', symbol: 'ETH', change: '+8.24%', trending: 'up' },
            { name: 'Solana', symbol: 'SOL', change: '+12.45%', trending: 'up' },
            { name: 'Dogecoin', symbol: 'DOGE', change: '+15.67%', trending: 'up' },
            { name: 'Cardano', symbol: 'ADA', change: '-2.34%', trending: 'down' },
          ].map((coin, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-[#F8F9FA] rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#1652F0] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{coin.symbol.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1E1E1E]">{coin.name}</div>
                  <div className="text-xs text-[#8C8C8C]">{coin.symbol}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  coin.trending === 'up' ? 'text-[#00D4AA]' : 'text-[#FF5722]'
                }`}>
                  {coin.change}
                </span>
                <span className={`text-lg ${
                  coin.trending === 'up' ? 'text-[#00D4AA]' : 'text-[#FF5722]'
                }`}>
                  {coin.trending === 'up' ? '📈' : '📉'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-[#1652F0] to-[#4A90FF] rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm opacity-90 mb-4">
          Get the latest Bitcoin news and market insights delivered to your inbox.
        </p>
        
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg text-[#1E1E1E] placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="w-full py-2 bg-white text-[#1652F0] rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
        
        <p className="text-xs opacity-75 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Tags */}
      <Tags />

      {/* Fear & Greed Index */}
      <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Fear & Greed Index</h3>
        
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#F0F0F0"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#00D4AA"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${76 * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#00D4AA]">76</span>
            </div>
          </div>
          
          <div className="text-lg font-semibold text-[#00D4AA] mb-1">Extreme Greed</div>
          <div className="text-sm text-[#8C8C8C]">Market sentiment is very positive</div>
          
          <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
            <div className="flex justify-between text-xs text-[#8C8C8C] mb-2">
              <span>Fear</span>
              <span>Greed</span>
            </div>
            <div className="h-2 bg-gradient-to-r from-[#FF5722] via-[#FFB74D] to-[#00D4AA] rounded-full relative">
              <div 
                className="absolute top-0 w-3 h-3 bg-white border-2 border-[#00D4AA] rounded-full transform -translate-y-0.5"
                style={{ left: '76%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}