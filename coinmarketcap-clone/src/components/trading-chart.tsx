'use client'
import { useEffect, useRef, useState } from 'react'

interface TradingChartProps {
  symbol: string
  name: string
}

export default function TradingChart({ symbol, name }: TradingChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [timeframe, setTimeframe] = useState('1D')
  const [isLoading, setIsLoading] = useState(false)
  
  const timeframes = ['1H', '24H', '7D', '30D', '90D', '1Y', 'ALL']

  // Simulate chart updates
  useEffect(() => {
    if (!chartRef.current) return
    
    return () => {
      // Cleanup TradingView widget
    }
  }, [symbol, timeframe])

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf)
    // Simulate chart update
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0]">
      
      {/* EXACT: Chart Header */}
      <div className="px-6 py-4 border-b border-[#F0F0F0]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1E1E1E]">
            {name} to USD Chart
          </h2>
          
          {/* EXACT: Timeframe Selector */}
          <div className="flex items-center space-x-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-[#1652F0] text-white'
                    : 'text-[#8C8C8C] hover:text-[#1E1E1E] hover:bg-[#F8F9FA]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EXACT: Chart Area */}
      <div className="p-6">
        <div 
          ref={chartRef}
          className="h-96 bg-[#FAFBFC] rounded border border-[#F0F0F0] flex flex-col items-center justify-center relative overflow-hidden"
        >
          {isLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#1652F0] border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="text-sm text-[#8C8C8C]">Loading chart data...</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1652F0] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-lg font-semibold text-[#1E1E1E] mb-2">
                Interactive Chart
              </div>
              <div className="text-sm text-[#8C8C8C]">
                TradingView integration would go here
              </div>
              <div className="text-xs text-[#8C8C8C] mt-1">
                Showing {timeframe} data for {symbol}
              </div>
            </div>
          )}
          
          {/* Background chart pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1652F0" />
                  <stop offset="100%" stopColor="#00D4AA" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#chartGradient)"
                strokeWidth="2"
                points="0,150 50,120 100,140 150,90 200,110 250,70 300,80 350,50 400,60"
              />
              <polyline
                fill="url(#chartGradient)"
                fillOpacity="0.1"
                stroke="none"
                points="0,150 50,120 100,140 150,90 200,110 250,70 300,80 350,50 400,60 400,200 0,200"
              />
            </svg>
          </div>
        </div>
        
        {/* EXACT: Chart Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0F0F0]">
          <div className="flex items-center space-x-6 text-sm">
            <button className="text-[#1652F0] hover:underline">Indicators</button>
            <button className="text-[#1652F0] hover:underline">Compare</button>
            <button className="text-[#1652F0] hover:underline">Fullscreen</button>
          </div>
          <div className="text-xs text-[#8C8C8C]">
            Powered by TradingView
          </div>
        </div>
      </div>
    </div>
  )
}