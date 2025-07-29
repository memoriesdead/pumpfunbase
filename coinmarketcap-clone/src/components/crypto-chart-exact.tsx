'use client'

import { useState } from 'react'
import { Crypto } from '@/types/crypto'
import { TrendingUp, TrendingDown, Maximize2, BarChart3, Settings, Download, Share } from 'lucide-react'
import MobulaChart from './mobula-chart'

interface CryptoChartExactProps {
  crypto: Crypto
}

export default function CryptoChartExact({ crypto }: CryptoChartExactProps) {
  const [timeframe, setTimeframe] = useState('1D')
  const [chartType, setChartType] = useState('line')
  const [fullscreen, setFullscreen] = useState(false)

  const timeframes = ['1D', '7D', '1M', '3M', '1Y', 'ALL']
  const chartTypes = [
    { value: 'line', label: 'Line' },
    { value: 'candlestick', label: 'Candlestick' },
    { value: 'area', label: 'Area' }
  ]


  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md mb-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-md">
            Price
          </button>
          <button className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-md">
            Market cap
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {['1D', '7D', '1M', '1Y', 'All'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-md ${
                timeframe === tf
                  ? 'bg-gray-200 text-black'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-[600px] p-4">
        <MobulaChart
          crypto={crypto}
          timeframe={timeframe}
          height={550}
          width="100%"
        />
      </div>
    </div>
  )
}
