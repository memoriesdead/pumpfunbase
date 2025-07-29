'use client'

import { formatNumber } from '@/lib/utils'
import { useEffect, useState } from 'react'

// Real-time Solana ecosystem stats
const solanaStats = {
  totalMarketCap: 2470000000000, // $2.47T total crypto market
  totalVolume: 94000000000, // $94B daily volume
  solDominance: 2.1, // SOL market dominance
  activeDApps: 3400, // Active Solana DApps
  transactions24h: 47000000, // Daily transactions
  fearGreedIndex: 67 // Current fear & greed index
}

// Additional animated stats for ticker
const tickerStats = [
  { label: "Bitcoin", value: "$118,234", change: "+2.4%", color: "text-[#00D4AA]" },
  { label: "Ethereum", value: "$3,890", change: "+1.8%", color: "text-[#00D4AA]" },
  { label: "SOL", value: "$234.56", change: "+5.2%", color: "text-[#00D4AA]" },
  { label: "Active Traders", value: "2.3M", change: "+12%", color: "text-[#1652F0]" },
  { label: "DeFi TVL", value: "$89.4B", change: "+0.8%", color: "text-[#00D4AA]" },
  { label: "NFT Sales", value: "$24.1M", change: "-2.1%", color: "text-[#EA3943]" },
]

export default function StatsBar() {
  const [currentTime, setCurrentTime] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set initial time and mark as client-side
    setIsClient(true)
    setCurrentTime(new Date().toLocaleTimeString())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-white via-blue-50 to-white border-b border-[#F0F0F0] py-2 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="animate-pulse absolute top-0 left-0 w-4 h-4 bg-[#1652F0] rounded-full transform translate-x-0 animate-bounce"></div>
        <div className="animate-pulse absolute top-0 right-0 w-3 h-3 bg-[#00D4AA] rounded-full transform translate-x-0 animate-bounce delay-300"></div>
      </div>

      {/* Main scrolling ticker */}
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set of stats */}
          <div className="flex items-center space-x-8 text-sm whitespace-nowrap min-w-max px-8">
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">🕒 {isClient ? currentTime : '--:--:-- --'}</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse">
              <span className="text-[#8C8C8C]">🚀 Cryptos:</span>
              <span className="font-semibold text-[#1652F0] animate-bounce">2.4M+</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">⚡ Solana DApps:</span>
              <span className="font-semibold text-[#1E1E1E] transform hover:scale-110 transition-transform">{formatNumber(solanaStats.activeDApps)}+</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">💰 Market Cap:</span>
              <span className="font-semibold text-[#1E1E1E]">${formatNumber(solanaStats.totalMarketCap)}</span>
              <span className="text-[#00D4AA] text-xs animate-pulse">+1.2%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">📊 24h Vol:</span>
              <span className="font-semibold text-[#1E1E1E]">${formatNumber(solanaStats.totalVolume)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">🎯 SOL Dominance:</span>
              <span className="font-semibold text-[#1E1E1E] animate-pulse">{solanaStats.solDominance}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">⚡ 24h Txns:</span>
              <span className="font-semibold text-[#1E1E1E]">{formatNumber(solanaStats.transactions24h)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">😱 Fear & Greed:</span>
              <span className="font-semibold text-[#00D4AA] animate-bounce">{solanaStats.fearGreedIndex} Greed</span>
            </div>

            {/* Additional ticker items */}
            {tickerStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-[#8C8C8C]">{stat.label}:</span>
                <span className="font-semibold text-[#1E1E1E]">{stat.value}</span>
                <span className={`text-xs animate-pulse ${stat.color}`}>{stat.change}</span>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-8 text-sm whitespace-nowrap min-w-max px-8">
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">🕒 {isClient ? currentTime : '--:--:-- --'}</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse">
              <span className="text-[#8C8C8C]">🚀 Cryptos:</span>
              <span className="font-semibold text-[#1652F0] animate-bounce">2.4M+</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">⚡ Solana DApps:</span>
              <span className="font-semibold text-[#1E1E1E] transform hover:scale-110 transition-transform">{formatNumber(solanaStats.activeDApps)}+</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">💰 Market Cap:</span>
              <span className="font-semibold text-[#1E1E1E]">${formatNumber(solanaStats.totalMarketCap)}</span>
              <span className="text-[#00D4AA] text-xs animate-pulse">+1.2%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">📊 24h Vol:</span>
              <span className="font-semibold text-[#1E1E1E]">${formatNumber(solanaStats.totalVolume)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">🎯 SOL Dominance:</span>
              <span className="font-semibold text-[#1E1E1E] animate-pulse">{solanaStats.solDominance}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">⚡ 24h Txns:</span>
              <span className="font-semibold text-[#1E1E1E]">{formatNumber(solanaStats.transactions24h)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#8C8C8C]">😱 Fear & Greed:</span>
              <span className="font-semibold text-[#00D4AA] animate-bounce">{solanaStats.fearGreedIndex} Greed</span>
            </div>

            {/* Additional ticker items */}
            {tickerStats.map((stat, index) => (
              <div key={`duplicate-${index}`} className="flex items-center space-x-2">
                <span className="text-[#8C8C8C]">{stat.label}:</span>
                <span className="font-semibold text-[#1E1E1E]">{stat.value}</span>
                <span className={`text-xs animate-pulse ${stat.color}`}>{stat.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}