import { useState } from 'react'
import { Crypto } from '@/types/crypto'
import TradingChart from './trading-chart'

interface CryptoChartSectionProps {
  crypto: Crypto
}

export default function CryptoChartSection({ crypto }: CryptoChartSectionProps) {
  const [timeframe, setTimeframe] = useState('1D')
  const [chartType, setChartType] = useState('price')

  const timeframes = ['1H', '1D', '7D', '1M', '3M', '1Y', 'ALL']
  const chartTypes = [
    { id: 'price', label: 'Price' },
    { id: 'market-cap', label: 'Market Cap' },
    { id: 'trading-view', label: 'Trading View' }
  ]

  return (
    <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            {crypto.name} Price Chart ({crypto.symbol})
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-[#1E1E1E]">
              ${crypto.price.toLocaleString()}
            </div>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
              crypto.priceChange1h >= 0 
                ? 'bg-[#E8F5E8] text-[#00D4AA]' 
                : 'bg-[#FFF0F0] text-[#FF5722]'
            }`}>
              <span>{crypto.priceChange1h >= 0 ? '↗' : '↘'}</span>
              <span>{Math.abs(crypto.priceChange1h).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-col space-y-3">
          {/* Chart Type Selector */}
          <div className="flex bg-[#F8F9FA] rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setChartType(type.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  chartType === type.id
                    ? 'bg-white text-[#1652F0] shadow-sm'
                    : 'text-[#8C8C8C] hover:text-[#1E1E1E]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-[#F8F9FA] rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-white text-[#1652F0] shadow-sm'
                    : 'text-[#8C8C8C] hover:text-[#1E1E1E]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <TradingChart symbol={crypto.symbol} name={crypto.name} />
        
        {/* Chart Overlay Info */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-[#E6E6E6]">
          <div className="flex items-center space-x-4 text-sm">
            <div>
              <span className="text-[#8C8C8C]">24h High: </span>
              <span className="font-medium text-[#1E1E1E]">${(crypto.price * 1.08).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C]">24h Low: </span>
              <span className="font-medium text-[#1E1E1E]">${(crypto.price * 0.95).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C]">Volume: </span>
              <span className="font-medium text-[#1E1E1E]">${crypto.volume24h.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F0F0F0]">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#1652F0] text-white rounded-lg hover:bg-[#1347D4] transition-colors">
            <span>📊</span>
            <span className="text-sm font-medium">Compare</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#E6E6E6] text-[#1E1E1E] rounded-lg hover:bg-[#F8F9FA] transition-colors">
            <span>📱</span>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-sm text-[#8C8C8C]">
          <span>Powered by TradingView</span>
          <button className="text-[#1652F0] hover:underline">Fullscreen</button>
        </div>
      </div>
    </div>
  )
}
