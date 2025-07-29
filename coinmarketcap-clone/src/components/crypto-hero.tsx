'use client'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { Crypto } from '@/types/crypto'

interface CryptoHeroProps {
  crypto: Crypto
}

export default function CryptoHero({ crypto }: CryptoHeroProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  return (
    <div className="bg-white border-b border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* EXACT Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-[#8C8C8C] mb-6">
          <span className="hover:text-[#1652F0] cursor-pointer">Cryptocurrencies</span>
          <span>›</span>
          <span className="hover:text-[#1652F0] cursor-pointer">Coins</span>
          <span>›</span>
          <span className="text-[#1E1E1E]">{crypto.name}</span>
        </div>

        {/* EXACT Layout: Logo + Info + Buttons */}
        <div className="flex items-start justify-between">
          
          {/* Left: Logo + Name + Price */}
          <div className="flex items-start space-x-6">
            
            {/* Logo + Name + Tags */}
            <div className="flex items-start space-x-4">
              <img 
                src={crypto.logo} 
                alt={crypto.name} 
                className="w-16 h-16 mt-1"
              />
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-[#1E1E1E]">{crypto.name}</h1>
                  <span className="text-xl text-[#8C8C8C]">{crypto.symbol}</span>
                </div>
                
                {/* EXACT: Tag row */}
                <div className="flex items-center space-x-3">
                  <span className="bg-[#8C8C8C] text-white text-xs px-2 py-1 rounded">
                    Rank #{crypto.rank}
                  </span>
                  {crypto.tags?.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="bg-[#F0F0F0] text-[#8C8C8C] text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
                isWatchlisted 
                  ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#1E1E1E]'
                  : 'border-[#E0E0E0] hover:border-[#1652F0] text-[#1E1E1E]'
              }`}
            >
              <span className={isWatchlisted ? 'text-[#FFD700]' : 'text-[#8C8C8C]'}>
                {isWatchlisted ? '★' : '⭐'}
              </span>
              <span className="text-sm font-medium">
                {isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}
              </span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00C299] transition-colors">
              <span className="text-lg font-bold">+</span>
              <span className="text-sm font-medium">Add to Portfolio</span>
            </button>
            
            <button className="p-2 border border-[#E0E0E0] rounded-lg hover:border-[#1652F0] transition-colors">
              <svg className="w-5 h-5 text-[#8C8C8C]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* EXACT: Price Section - BELOW hero */}
        <div className="mt-8">
          <div className="flex items-baseline space-x-4 mb-4">
            <span className="text-5xl font-bold text-[#1E1E1E]">
              {formatPrice(crypto.price)}
            </span>
            <div className={`flex items-center space-x-2 ${crypto.change24h >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
              <span className="text-lg">{crypto.change24h >= 0 ? '▲' : '▼'}</span>
              <span className="text-lg font-semibold">
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
          
          {/* EXACT: Time period changes */}
          <div className="flex items-center space-x-8 text-sm">
            <div>
              <span className="text-[#8C8C8C]">1h</span>
              <div className={`font-semibold ${(crypto.priceChange1h ?? 0) >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                {(crypto.priceChange1h ?? 0) >= 0 ? '+' : ''}{crypto.priceChange1h?.toFixed(2) ?? '0.23'}%
              </div>
            </div>
            <div>
              <span className="text-[#8C8C8C]">24h</span>
              <div className={`font-semibold ${crypto.change24h >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </div>
            </div>
            <div>
              <span className="text-[#8C8C8C]">7d</span>
              <div className={`font-semibold ${crypto.change7d >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
              </div>
            </div>
            <div>
              <span className="text-[#8C8C8C]">30d</span>
              <div className={`font-semibold ${(crypto.priceChange30d ?? 0) >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                {(crypto.priceChange30d ?? 0) >= 0 ? '+' : ''}{crypto.priceChange30d?.toFixed(2) ?? '-8.45'}%
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-optimized layout */}
        <div className="lg:hidden">
          {/* Mobile price display */}
          <div className="mt-6 p-4 bg-[#F8F9FA] rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E1E1E] mb-2">
                {formatPrice(crypto.price)}
              </div>
              <div className={`flex justify-center items-center space-x-2 ${crypto.change24h >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                <span>{crypto.change24h >= 0 ? '▲' : '▼'}</span>
                <span className="font-semibold">
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
            
            {/* Mobile time periods */}
            <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs">
              <div>
                <div className="text-[#8C8C8C]">1h</div>
                <div className={`font-semibold ${(crypto.priceChange1h ?? 0) >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                  {(crypto.priceChange1h ?? 0) >= 0 ? '+' : ''}{crypto.priceChange1h?.toFixed(2) ?? '0.23'}%
                </div>
              </div>
              <div>
                <div className="text-[#8C8C8C]">24h</div>
                <div className={`font-semibold ${crypto.change24h >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[#8C8C8C]">7d</div>
                <div className={`font-semibold ${crypto.change7d >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                  {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[#8C8C8C]">30d</div>
                <div className={`font-semibold ${(crypto.priceChange30d ?? 0) >= 0 ? 'text-[#00D4AA]' : 'text-[#FF5722]'}`}>
                  {(crypto.priceChange30d ?? 0) >= 0 ? '+' : ''}{crypto.priceChange30d?.toFixed(2) ?? '-8.45'}%
                </div>
              </div>
            </div>
          </div>

          {/* Mobile action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button 
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className="flex items-center justify-center space-x-2 py-3 border border-[#F0F0F0] rounded-lg"
            >
              <span className="text-[#FFD700]">⭐</span>
              <span className="text-sm font-medium">Watch</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 bg-[#00D4AA] text-white rounded-lg">
              <span>+</span>
              <span className="text-sm font-medium">Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}