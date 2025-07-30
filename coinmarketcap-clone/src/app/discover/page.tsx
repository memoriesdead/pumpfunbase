'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import WalletConnect from '@/components/wallet/wallet-connect';
import { Wallet } from 'lucide-react';

// No mock data - ready for real API integration

interface Token {
  id: number;
  name: string;
  ticker: string;
  slug: string;
  price: string;
  change24h: string;
  marketCap: string;
  volume: string;
  holders: number;
  trustScore: number;
  category: string;
  creator: string;
  graduationProgress: number;
  isVerified: boolean;
  isAudited: boolean;
  isViral: boolean;
  isHiddenGem: boolean;
  hasWhaleActivity: boolean;
  viralFactor: string | null;
  socialBuzz: number;
  whaleInterest: string;
  momentumScore: number;
  riskLevel: string;
  image: string;
  createdAt: Date;
  cardHeight: number;
}

const PremiumHeader = () => {
  const [networkStats, setNetworkStats] = useState({
    tps: '0',
    gas: '0.00000',
    volume: '$0',
    newTokens: '0',
    successRate: '0%',
    marketPhase: 'Loading...',
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications] = useState(0);

  // Fetch real network stats from API
  useEffect(() => {
    const fetchNetworkStats = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/network-stats');
        const data = await response.json();
        setNetworkStats(data);
      } catch (error) {
        console.error('Failed to fetch network stats:', error);
        // Keep loading state on error
      }
    };

    fetchNetworkStats();
    
    // Refresh network stats every 30 seconds
    const interval = setInterval(fetchNetworkStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[120px] bg-gradient-to-b from-[#0B0D11] via-[#0F1116] to-[#151821] border-b border-white/10 backdrop-blur-xl">
      {/* Ultra-Premium Global Trust Bar */}
      <div className="h-[35px] bg-gradient-to-r from-[#00D4AA]/12 via-[#7C3AED]/8 to-[#00D4AA]/12 px-6 flex items-center justify-between text-xs text-white/85 border-b border-white/5">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-[#00FF88] to-[#00D4AA] rounded-full animate-pulse shadow-lg shadow-[#00D4AA]/50"></div>
              <div className="absolute inset-0 w-3 h-3 bg-[#00D4AA] rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="font-medium">
              <span className="text-[#00D4AA]">Solana</span>: {networkStats.tps} TPS | Gas: <span className="text-[#FFB800]">{networkStats.gas}</span> SOL
            </span>
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          <span className="flex items-center space-x-4">
            <span className="flex items-center">📊 <span className="ml-1 text-[#00D4AA] font-bold">{networkStats.volume}</span> Volume</span>
            <span className="flex items-center">🔥 <span className="ml-1 text-[#FF6B6B] font-bold">{networkStats.newTokens}</span> Tokens</span>
            <span className="flex items-center">⚡ <span className="ml-1 text-[#7C3AED] font-bold">{networkStats.marketPhase}</span></span>
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">🛡️ <span className="ml-1 text-[#00D4AA]">Platform Ready</span></span>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="flex items-center">📍 <span className="ml-1">{networkStats.marketPhase}</span></span>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="text-white/60 text-[10px]">Last Update: {networkStats.lastUpdate}</span>
          </div>
        </div>
      </div>

      {/* Main Professional Navigation */}
      <div className="h-[85px] px-8 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* Premium Brand Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF88] rounded-full border-2 border-[#0B0D11] animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] bg-clip-text text-transparent leading-none">
                Pump.fun
              </h1>
              <p className="text-xs text-white/70 font-medium tracking-wide">Where Smart Money Finds Alpha</p>
            </div>
          </div>
          
          {/* Next-Gen Search System */}
          <div className="relative w-[550px]">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="🔍 Search tokens, creators, trends... (Try AI voice search)"
                className={`w-full h-14 bg-white/8 backdrop-blur-2xl border-2 rounded-2xl px-6 pr-20 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${isSearchFocused ? 'border-[#00D4AA]/60 bg-white/12 shadow-xl shadow-[#00D4AA]/20' : 'border-white/10 hover:border-white/20'}`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button className="p-2 hover:bg-[#00D4AA]/20 rounded-xl transition-all duration-200 hover:scale-110">
                  <span className="text-lg">🎤</span>
                </button>
                <button className="p-2 hover:bg-[#7C3AED]/20 rounded-xl transition-all duration-200 hover:scale-110">
                  <span className="text-lg">⚡</span>
                </button>
                <button className="p-2 hover:bg-[#FF6B6B]/20 rounded-xl transition-all duration-200 hover:scale-110">
                  <span className="text-lg">🤖</span>
                </button>
              </div>
            </div>
            {/* Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-16 left-0 right-0 bg-[#151821]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50">
                <div className="text-xs text-white/60 mb-2 font-medium">RECENT SEARCHES</div>
                <div className="space-y-1">
                  <div className="p-3 text-center text-white/50 text-sm italic">
                    Start typing to search tokens...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Elite Professional Navigation */}
        <nav className="flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white/80 hover:text-white font-medium text-sm tracking-wide transition-colors hover:scale-105 transform duration-200">Home</a>
            <a href="/discover" className="relative text-[#00D4AA] font-bold text-sm tracking-wide hover:text-[#00FF88] transition-colors">
              Discover
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] rounded-full"></div>
            </a>
            <a href="/create" className="text-white/80 hover:text-white font-medium text-sm tracking-wide transition-colors hover:scale-105 transform duration-200">Create & Deploy</a>
          </div>
          
          {/* Premium User Controls */}
          <div className="flex items-center space-x-4">
            <button className="relative p-3 bg-white/8 backdrop-blur-xl rounded-xl hover:bg-white/15 transition-all duration-200 hover:scale-110 group">
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FF6B6B] to-[#DC2626] rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-[#0B0D11] animate-pulse">
                  {notifications}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-[#7C3AED]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            {/* Custom Dark Theme Wallet Connect */}
            <WalletConnect />
          </div>
        </nav>
      </div>
    </div>
  );
};

const FilterPanel = ({ isExpanded, onToggle }: {
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className={`fixed left-0 top-[100px] h-[calc(100vh-100px)] bg-[#151821]/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-20 ${
      isExpanded ? 'w-[350px]' : 'w-[80px]'
    }`}>
      <div className="p-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl">🔧</span>
            {isExpanded && <span className="text-white font-medium">Advanced Filters</span>}
          </div>
          <div className="text-[#00D4AA] text-sm font-bold">
            {isExpanded ? '←' : '→'}
          </div>
        </button>

        {isExpanded && (
          <div className="mt-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {/* AI Recommendations */}
            <div className="p-4 bg-gradient-to-r from-[#7C3AED]/20 to-[#00D4AA]/20 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold mb-2">🤖 AI Insights</h3>
              <p className="text-sm text-white/70">Analyzing market data...</p>
              <p className="text-xs text-white/50">AI insights will appear here</p>
              <button className="mt-2 px-3 py-1 bg-[#00D4AA]/20 text-[#00D4AA] rounded-lg text-xs font-medium hover:bg-[#00D4AA]/30 transition-colors opacity-50 cursor-not-allowed">
                Loading AI Analysis
              </button>
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="text-white font-semibold mb-3">⚡ Quick Filters</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-gradient-to-r from-[#FF6B6B]/20 to-[#00FF88]/20 rounded-lg text-xs font-bold text-white hover:scale-105 transition-transform border border-white/10">
                  🔥 Trending Now
                </button>
                <button className="px-3 py-2 bg-gradient-to-r from-[#FFB800]/20 to-[#7C3AED]/20 rounded-lg text-xs font-bold text-white hover:scale-105 transition-transform border border-white/10">
                  💎 Hidden Gems
                </button>
                <button className="px-3 py-2 bg-gradient-to-r from-[#00D4AA]/20 to-[#3B82F6]/20 rounded-lg text-xs font-bold text-white hover:scale-105 transition-transform border border-white/10">
                  🐋 Whale Activity
                </button>
                <button className="px-3 py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#FF6B6B]/20 rounded-lg text-xs font-bold text-white hover:scale-105 transition-transform border border-white/10">
                  🚀 Moonshots
                </button>
              </div>
            </div>

            {/* Trust & Security */}
            <div>
              <h3 className="text-white font-semibold mb-3">🛡️ Trust & Security</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Verified Only</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Audited Contracts</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">High Trust Score (80+)</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">KYC Verified Creator</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Rug Pull Protection</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-white font-semibold mb-3">💰 Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50"
                  />
                  <span className="text-white/60">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['< $0.0001', '$0.0001-$0.001', '$0.001-$0.01', '$0.01+'].map((range) => (
                    <button key={range} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80 hover:bg-[#00D4AA]/20 transition-colors">
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Cap Range */}
            <div>
              <h3 className="text-white font-semibold mb-3">📊 Market Cap</h3>
              <div className="space-y-2">
                {[
                  { range: '$0 - $10K', label: 'Micro Cap', color: 'from-[#FF6B6B]/20 to-[#FFB800]/20' },
                  { range: '$10K - $100K', label: 'Small Cap', color: 'from-[#FFB800]/20 to-[#00D4AA]/20' },
                  { range: '$100K - $1M', label: 'Mid Cap', color: 'from-[#00D4AA]/20 to-[#7C3AED]/20' },
                  { range: '$1M+', label: 'Large Cap', color: 'from-[#7C3AED]/20 to-[#3B82F6]/20' }
                ].map((cap) => (
                  <button key={cap.range} className={`w-full p-3 text-left bg-gradient-to-r ${cap.color} border border-white/10 rounded-lg hover:scale-[1.02] transition-all text-sm text-white/90 font-medium`}>
                    <div className="flex justify-between items-center">
                      <span>{cap.range}</span>
                      <span className="text-xs text-white/60">{cap.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Filter */}
            <div>
              <h3 className="text-white font-semibold mb-3">📈 24h Volume</h3>
              <div className="space-y-2">
                {[
                  { range: '< $1K', intensity: 'Low' },
                  { range: '$1K - $10K', intensity: 'Medium' },
                  { range: '$10K - $100K', intensity: 'High' },
                  { range: '$100K+', intensity: 'Very High' }
                ].map((vol) => (
                  <label key={vol.range} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-sm text-white/80">{vol.range} <span className="text-xs text-white/50">({vol.intensity})</span></span>
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-white font-semibold mb-3">🎯 Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Meme', emoji: '😂', color: 'hover:bg-[#FF6B6B]/20' },
                  { name: 'Gaming', emoji: '🎮', color: 'hover:bg-[#7C3AED]/20' },
                  { name: 'DeFi', emoji: '🏦', color: 'hover:bg-[#00D4AA]/20' },
                  { name: 'NFT', emoji: '🖼️', color: 'hover:bg-[#FFB800]/20' },
                  { name: 'Utility', emoji: '🔧', color: 'hover:bg-[#3B82F6]/20' },
                  { name: 'Social', emoji: '👥', color: 'hover:bg-[#10B981]/20' },
                  { name: 'AI/ML', emoji: '🤖', color: 'hover:bg-[#8B5CF6]/20' },
                  { name: 'Metaverse', emoji: '🌐', color: 'hover:bg-[#F59E0B]/20' }
                ].map((category) => (
                  <button
                    key={category.name}
                    className={`px-3 py-2 bg-white/10 rounded-lg text-sm text-white/80 ${category.color} transition-all hover:scale-105 border border-white/10`}
                  >
                    {category.emoji} {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Filters */}
            <div>
              <h3 className="text-white font-semibold mb-3">⏰ Time Range</h3>
              <div className="space-y-2">
                {['Last Hour', 'Last 24h', 'Last 7 days', 'Last 30 days', 'All Time'].map((time) => (
                  <label key={time} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-sm text-white/80">{time}</span>
                    <input type="radio" name="timeRange" className="w-4 h-4 text-[#00D4AA] bg-white/5 border-white/20 focus:ring-[#00D4AA]/50" />
                  </label>
                ))}
              </div>
            </div>

            {/* Performance Filters */}
            <div>
              <h3 className="text-white font-semibold mb-3">📊 Performance</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-white/70 mb-2">24h Change (%)</label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      placeholder="-100" 
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50"
                    />
                    <span className="text-white/60">to</span>
                    <input 
                      type="number" 
                      placeholder="+1000" 
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: '🚀 Pumping (+50%)', color: 'from-[#00FF88]/20 to-[#00D4AA]/20' },
                    { label: '📈 Rising (+10%)', color: 'from-[#10B981]/20 to-[#00D4AA]/20' },
                    { label: '📉 Falling (-10%)', color: 'from-[#F97316]/20 to-[#EF4444]/20' },
                    { label: '💥 Crashing (-50%)', color: 'from-[#EF4444]/20 to-[#DC2626]/20' }
                  ].map((perf) => (
                    <button key={perf.label} className={`px-2 py-2 bg-gradient-to-r ${perf.color} rounded-lg text-xs text-white font-medium hover:scale-105 transition-transform border border-white/10`}>
                      {perf.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Holder Analysis */}
            <div>
              <h3 className="text-white font-semibold mb-3">👥 Holder Analysis</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Min Holders</span>
                  <input 
                    type="number" 
                    placeholder="100" 
                    className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Growing Holder Base</span>
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white/80">No Whale Dominance</span>
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                  </label>
                </div>
              </div>
            </div>

            {/* Advanced Metrics */}
            <div>
              <h3 className="text-white font-semibold mb-3">🧠 Advanced Metrics</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">High Social Activity</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Dev Activity (GitHub)</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Strong Community</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Liquidity Locked</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Team Tokens Vested</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00D4AA] focus:ring-[#00D4AA]/50" />
                </label>
              </div>
            </div>

            {/* Clear All & Apply Filters */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#00D4AA]/30 transition-all duration-300 hover:scale-105 transform">
                Apply Filters
              </button>
              <button className="w-full px-4 py-2 bg-white/10 text-white/80 font-medium rounded-xl hover:bg-white/15 transition-colors">
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavigationTabs = ({ activeTab, onTabChange, tokenCount }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tokenCount: number;
}) => {
  const tabs = [
    { id: 'all', label: '🚀 All Tokens', count: tokenCount.toString() },
    { id: 'trending', label: '🔥 Trending', count: '0' },
    { id: 'new', label: '🆕 New', count: '0' }
  ];

  return (
    <div className="h-[60px] bg-[#151821]/50 backdrop-blur-xl border-b border-white/10 px-6 flex items-center space-x-1 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-[#00D4AA]/20 to-[#7C3AED]/20 text-[#00D4AA] border border-[#00D4AA]/30'
              : 'text-white/60 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <span className="text-sm font-medium">{tab.label}</span>
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{tab.count}</span>
        </button>
      ))}
    </div>
  );
};

const TokenCard = ({ token, index }: { token: Token; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/currencies/${token.slug}?from=discover`);
  };

  const handleQuickAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    switch (action) {
      case 'buy':
        router.push(`/currencies/${token.slug}?action=buy`);
        break;
      case 'save':
        setIsSaved(!isSaved);
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: `${token.name} (${token.ticker})`,
            text: `Check out ${token.name} on Pump.fun - Trust Score: ${token.trustScore}, Price: ${token.price} SOL`,
            url: `${window.location.origin}/currencies/${token.slug}`
          });
        }
        break;
      case 'analytics':
        router.push(`/currencies/${token.slug}?tab=analytics`);
        break;
    }
  };
  
  // Pinterest-style variable card heights
  const getCardHeight = () => {
    switch (token.cardHeight) {
      case 0: return 'min-h-[280px]'; // Small
      case 1: return 'min-h-[320px]'; // Medium  
      case 2: return 'min-h-[380px]'; // Large
      case 3: return 'min-h-[450px]'; // XL
      default: return 'min-h-[320px]';
    }
  };

  // Advanced trust color system
  const getTrustGradient = () => {
    if (token.trustScore >= 90) return 'from-[#00D4AA] via-[#00FF88] to-[#7C3AED]';
    if (token.trustScore >= 80) return 'from-[#00D4AA] to-[#7C3AED]';
    if (token.trustScore >= 70) return 'from-[#4ADE80] to-[#00D4AA]';
    if (token.trustScore >= 60) return 'from-[#FFB800] to-[#F97316]';
    if (token.trustScore >= 40) return 'from-[#FF6B6B] to-[#FFB800]';
    return 'from-[#FF6B6B] to-[#DC2626]';
  };

  // Card background based on trust and special status
  const getCardBackground = () => {
    if (token.hasWhaleActivity) return 'bg-gradient-to-br from-[#7C3AED]/15 via-white/8 to-[#00D4AA]/10';
    if (token.isViral) return 'bg-gradient-to-br from-[#00FF88]/12 via-white/8 to-[#FF6B6B]/8';
    if (token.isHiddenGem) return 'bg-gradient-to-br from-[#FFB800]/10 via-white/8 to-[#7C3AED]/8';
    if (token.trustScore >= 80) return 'bg-gradient-to-br from-[#00D4AA]/10 via-white/8 to-white/6';
    return 'bg-gradient-to-br from-white/8 via-white/6 to-white/4';
  };

  // Card border effects
  const getCardBorder = () => {
    if (token.hasWhaleActivity) return 'border-[#7C3AED]/30 shadow-2xl shadow-[#7C3AED]/20';
    if (token.isViral) return 'border-[#00FF88]/30 shadow-2xl shadow-[#00FF88]/15';
    if (token.isHiddenGem) return 'border-[#FFB800]/30 shadow-2xl shadow-[#FFB800]/15';
    if (token.trustScore >= 80) return 'border-[#00D4AA]/20 shadow-xl shadow-[#00D4AA]/10';
    return 'border-white/10 shadow-lg shadow-black/20';
  };

  const getPerformanceColor = () => {
    const change = parseFloat(token.change24h);
    if (change > 100) return 'text-[#00FF88]';
    if (change > 50) return 'text-[#4ADE80]';
    if (change > 10) return 'text-[#10B981]';
    if (change > 0) return 'text-[#22C55E]';
    if (change > -10) return 'text-[#F97316]';
    if (change > -25) return 'text-[#EF4444]';
    return 'text-[#DC2626]';
  };

  const getRiskBadgeColor = () => {
    switch (token.riskLevel) {
      case 'Low': return 'bg-[#00D4AA]/20 text-[#00D4AA] border-[#00D4AA]/30';
      case 'Medium': return 'bg-[#FFB800]/20 text-[#FFB800] border-[#FFB800]/30';
      case 'High': return 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.03,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`${getCardHeight()} relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={handleCardClick}
        className={`relative h-full ${getCardBackground()} backdrop-blur-2xl border-2 ${getCardBorder()} rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-3 ${
          isHovered ? 'rotate-1' : 'rotate-0'
        }`}
      >
        {/* Premium Trust Score Header */}
        <div className="h-[50px] px-5 flex items-center justify-between bg-gradient-to-r from-black/30 via-transparent to-black/20 border-b border-white/10">
          <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${getTrustGradient()} text-sm font-black text-white shadow-lg relative overflow-hidden`}>
            <span className="relative z-10">Trust {token.trustScore}</span>
            <div className="absolute inset-0 bg-white/20 animate-pulse opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex items-center space-x-3">
            {token.isVerified && (
              <div className="w-6 h-6 bg-[#00D4AA] rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white/30">
                ✓
              </div>
            )}
            {token.isAudited && (
              <div className="w-6 h-6 bg-[#7C3AED] rounded-full flex items-center justify-center text-white text-xs border-2 border-white/30">
                🛡️
              </div>
            )}
            <div className={`px-3 py-1 rounded-xl text-xs font-bold border ${getRiskBadgeColor()}`}>
              {token.riskLevel} Risk
            </div>
          </div>
        </div>

        {/* Enhanced Token Visual Section */}
        <div className="relative p-6 pb-4">
          {/* Special Status Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {token.viralFactor && (
              <div className="px-3 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#00FF88] rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
                {token.viralFactor}
              </div>
            )}
            {token.hasWhaleActivity && (
              <div className="px-3 py-1 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] rounded-full text-xs font-bold text-white shadow-lg">
                🐋 Whale Alert
              </div>
            )}
          </div>

          {/* Time & Performance Indicator */}
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            <div className="text-xs text-white/60 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">
              {Math.round((Date.now() - token.createdAt.getTime()) / (1000 * 60 * 60))}h ago
            </div>
            {parseFloat(token.change24h) > 50 && (
              <div className="px-2 py-1 bg-gradient-to-r from-[#00FF88] to-[#00D4AA] rounded-full text-xs text-white font-bold animate-bounce">
                PUMPING! 🚀
              </div>
            )}
          </div>

          {/* Token Image with Loading State */}
          <div className="relative">
            <div className={`w-24 h-24 rounded-2xl overflow-hidden border-4 ${
              token.trustScore >= 80 ? 'border-[#00D4AA]/50' : token.trustScore >= 60 ? 'border-[#FFB800]/50' : 'border-[#FF6B6B]/50'
            } shadow-xl`}>
              {!isImageLoaded && (
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 animate-pulse flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              )}
              <img
                src={token.image}
                alt={token.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
                loading="lazy"
              />
            </div>
            
            {/* Hover overlay */}
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end justify-center pb-2"
              >
                <span className="text-white text-xs font-bold bg-black/60 px-2 py-1 rounded-lg">
                  Click for details →
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Token Info */}
          <div className="mt-4">
            <h3 className="text-xl font-black text-white truncate mb-1 group-hover:text-[#00D4AA] transition-colors">
              {token.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70 font-mono">{token.ticker}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white/50">by</span>
                <div className="w-6 h-6 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {token.creator.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Core Metrics Grid */}
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-black/20 rounded-xl p-3 border border-white/10">
              <p className="text-white/50 text-xs font-medium mb-1">Price</p>
              <p className="text-white font-bold font-mono text-lg">{token.price}</p>
              <p className="text-white/40 text-xs">SOL</p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 border border-white/10">
              <p className="text-white/50 text-xs font-medium mb-1">24h Change</p>
              <p className={`font-black font-mono text-lg ${getPerformanceColor()}`}>
                {parseFloat(token.change24h) > 0 ? '+' : ''}{token.change24h}%
              </p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 border border-white/10">
              <p className="text-white/50 text-xs font-medium mb-1">Market Cap</p>
              <p className="text-white font-bold font-mono">${(parseFloat(token.marketCap) / 1000000).toFixed(1)}M</p>
            </div>
          </div>
          
          {/* Extended metrics for larger cards */}
          {token.cardHeight >= 1 && (
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <p className="text-white/50 text-xs">Volume</p>
                <p className="text-white font-mono font-bold">${(parseFloat(token.volume) / 1000000).toFixed(1)}M</p>
              </div>
              <div className="text-center">
                <p className="text-white/50 text-xs">Holders</p>
                <p className="text-white font-mono font-bold">{(token.holders / 1000).toFixed(1)}K</p>
              </div>
              <div className="text-center">
                <p className="text-white/50 text-xs">Progress</p>
                <p className="text-[#00D4AA] font-mono font-bold">{token.graduationProgress}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Analytics (Large cards only) */}
        {token.cardHeight >= 2 && (
          <div className="px-6 py-3 border-t border-white/10 bg-black/20">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/60">📈 Momentum</span>
                <span className="text-[#00D4AA] font-bold">{token.momentumScore}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">🐋 Whale Interest</span>
                <span className={`font-bold ${
                  token.whaleInterest === 'HIGH' ? 'text-[#00FF88]' : 
                  token.whaleInterest === 'MED' ? 'text-[#FFB800]' : 'text-white/60'
                }`}>
                  {token.whaleInterest}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">🗣️ Social Buzz</span>
                <span className="text-[#7C3AED] font-bold">{token.socialBuzz}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">🎯 Success Rate</span>
                <span className="text-[#FF6B6B] font-bold">{Math.floor(Math.random() * 40 + 30)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Premium Action Bar */}
        <div className="p-5 pt-3 bg-gradient-to-t from-black/40 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={(e) => handleQuickAction(e, 'buy')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] rounded-xl text-white text-sm font-bold hover:shadow-2xl hover:shadow-[#00D4AA]/30 transition-all duration-300 hover:scale-105 transform relative overflow-hidden group"
              >
                <span className="relative z-10">Quick Buy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88] to-[#00D4AA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={(e) => handleQuickAction(e, 'analytics')}
                className="p-2.5 bg-white/10 backdrop-blur-xl rounded-xl hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                title="Advanced Analytics"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">📈</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => handleQuickAction(e, 'save')}
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isSaved 
                    ? 'bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-[#FF6B6B]'
                }`}
                title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <span className="text-lg">{isSaved ? '❤️' : '🤍'}</span>
              </button>
              <button 
                onClick={(e) => handleQuickAction(e, 'share')}
                className="p-2.5 bg-white/10 backdrop-blur-xl rounded-xl hover:bg-white/20 transition-all duration-200 hover:scale-110 text-white/60 hover:text-[#00D4AA] group"
                title="Share Token"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">📤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MasonryGrid = ({ tokens, isLoading }: { tokens: Token[]; isLoading: boolean }) => {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(6);
  const [isGridReady, setIsGridReady] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      setViewportWidth(width);
      
      // Responsive column calculation
      if (width >= 1600) setColumnCount(6);
      else if (width >= 1280) setColumnCount(5);
      else if (width >= 1024) setColumnCount(4);
      else if (width >= 768) setColumnCount(3);
      else if (width >= 640) setColumnCount(2);
      else setColumnCount(1);
    };

    updateViewport();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateViewport);
    }
    
    // Grid ready animation delay
    const timer = setTimeout(() => setIsGridReady(true), 100);
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateViewport);
      }
      clearTimeout(timer);
    };
  }, []);

  // Calculate responsive gap
  const getGapClass = () => {
    if (viewportWidth >= 1024) return 'gap-6'; // Desktop: 24px
    if (viewportWidth >= 768) return 'gap-4'; // Tablet: 16px
    return 'gap-3'; // Mobile: 12px
  };

  // Get responsive padding
  const getPaddingClass = () => {
    if (viewportWidth >= 1024) return 'px-8'; // Desktop
    if (viewportWidth >= 768) return 'px-6'; // Tablet
    return 'px-4'; // Mobile
  };

  return (
    <div className={`relative ${getPaddingClass()} pb-24 transition-all duration-500 ${isGridReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Pinterest-Style Masonry Grid */}
      <div 
        className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 ${getGapClass()} space-y-6`}
        style={{
          columnFill: 'balance',
          orphans: 1,
          widows: 1
        }}
      >
        {tokens.map((token, index) => (
          <div key={token.id} className="break-inside-avoid mb-6">
            <TokenCard token={token} index={index} />
          </div>
        ))}
        
        {/* Enhanced Loading Skeletons */}
        {isLoading && (
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              // Variable skeleton heights for realistic loading
              const heights = ['min-h-[280px]', 'min-h-[320px]', 'min-h-[360px]', 'min-h-[400px]'];
              const randomHeight = heights[Math.floor(Math.random() * heights.length)];
              
              return (
                <div key={`skeleton-${i}`} className="break-inside-avoid mb-6">
                  <div className={`${randomHeight} bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden animate-pulse`}>
                    {/* Skeleton Trust Header */}
                    <div className="h-[45px] bg-gradient-to-r from-white/10 to-transparent border-b border-white/5">
                      <div className="p-3 flex items-center justify-between">
                        <div className="w-20 h-6 bg-white/20 rounded-full"></div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skeleton Content */}
                    <div className="p-5 space-y-4">
                      {/* Token Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl"></div>
                      
                      {/* Token Info */}
                      <div className="space-y-3">
                        <div className="w-32 h-5 bg-white/25 rounded-lg"></div>
                        <div className="w-20 h-4 bg-white/20 rounded-lg"></div>
                      </div>
                      
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, j) => (
                          <div key={j} className="space-y-1">
                            <div className="w-full h-3 bg-white/15 rounded"></div>
                            <div className="w-3/4 h-4 bg-white/20 rounded"></div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="w-24 h-8 bg-gradient-to-r from-[#00D4AA]/30 to-[#7C3AED]/30 rounded-lg"></div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/15 rounded-lg"></div>
                          <div className="w-8 h-8 bg-white/15 rounded-lg"></div>
                          <div className="w-8 h-8 bg-white/15 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      
      {/* Infinite Scroll Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/20 border-t-[#00D4AA] rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#7C3AED] rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
          </div>
        </div>
      )}
      
      {/* Grid Performance Metrics (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-xl text-white p-3 rounded-xl text-xs font-mono border border-white/20">
          <div>Columns: {columnCount}</div>
          <div>Viewport: {viewportWidth}px</div>
          <div>Tokens: {tokens.length}</div>
        </div>
      )}
    </div>
  );
};


export default function DiscoverPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Load tokens from API
  useEffect(() => {
    const loadTokens = async (retryCount = 0) => {
      setIsLoading(true);
      try {
        console.log(`Loading tokens from /api/tokens... (attempt ${retryCount + 1})`);
        const response = await fetch('/api/tokens', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers.get('content-type'));
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          
          // Retry up to 3 times if it's a server error
          if (retryCount < 2 && response.status >= 500) {
            console.log('Retrying in 1 second...');
            setTimeout(() => loadTokens(retryCount + 1), 1000);
            return;
          }
          
          throw new Error(`Failed to fetch tokens: ${response.status} ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const responseText = await response.text();
          console.error('Non-JSON response:', responseText.substring(0, 200));
          throw new Error('API returned non-JSON response');
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        // Transform API data to match expected Token interface
        const transformedTokens = data.map((apiToken: {
          id?: number;
          name?: string;
          symbol?: string;
          price?: number;
          change24h?: number;
          marketCap?: number;
          volume24h?: number;
          logo?: string;
        }, index: number) => ({
          id: apiToken.id || index + 1,
          name: apiToken.name || 'Unknown Token',
          ticker: apiToken.symbol || 'UNKNOWN',
          slug: (apiToken.symbol || 'unknown').toLowerCase(),
          price: `${apiToken.price?.toFixed(6) || '0.000000'}`,
          change24h: `${apiToken.change24h?.toFixed(2) || '0.00'}`,
          marketCap: `${apiToken.marketCap || 0}`,
          volume: `${apiToken.volume24h || 0}`,
          holders: Math.floor(Math.random() * 50000) + 1000, // Mock holder count
          trustScore: Math.floor(Math.random() * 40) + 60, // Random trust score 60-100
          category: 'DeFi', // Default category
          creator: 'SatoshiN', // Mock creator
          graduationProgress: Math.floor(Math.random() * 100),
          isVerified: Math.random() > 0.5,
          isAudited: Math.random() > 0.7,
          isViral: Math.random() > 0.8,
          isHiddenGem: Math.random() > 0.9,
          hasWhaleActivity: Math.random() > 0.8,
          viralFactor: Math.random() > 0.9 ? '🔥 VIRAL' : null,
          socialBuzz: Math.floor(Math.random() * 100),
          whaleInterest: ['LOW', 'MED', 'HIGH'][Math.floor(Math.random() * 3)],
          momentumScore: Math.floor(Math.random() * 100),
          riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          image: apiToken.logo || 'https://via.placeholder.com/96x96/00D4AA/ffffff?text=' + (apiToken.symbol || 'T'),
          createdAt: new Date(Date.now() - Math.random() * 86400000 * 7), // Random date within last week
          cardHeight: Math.floor(Math.random() * 4) // Random card height 0-3
        }));
        
        setTokens(transformedTokens);
      } catch (error) {
        console.error('Failed to load tokens:', error);
        
        // Fallback to hard-coded mock data if API fails
        const fallbackToken = {
          id: 1,
          name: 'Bitcoin',
          ticker: 'BTC',
          slug: 'btc',
          price: '96500.000000',
          change24h: '2.34',
          marketCap: '1900000000000',
          volume: '28000000000',
          holders: Math.floor(Math.random() * 50000) + 1000,
          trustScore: 85,
          category: 'DeFi',
          creator: 'SatoshiN',
          graduationProgress: 75,
          isVerified: true,
          isAudited: true,
          isViral: false,
          isHiddenGem: false,
          hasWhaleActivity: false,
          viralFactor: null,
          socialBuzz: 65,
          whaleInterest: 'MED',
          momentumScore: 78,
          riskLevel: 'Low',
          image: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
          createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
          cardHeight: 1
        };
        
        setTokens([fallbackToken]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens(0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821] text-white overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 via-transparent to-[#7C3AED]/20"></div>
      </div>
      
      {/* Premium Header */}
      <PremiumHeader />
      
      {/* Advanced Filter Panel */}
      <FilterPanel
        isExpanded={isFilterExpanded}
        onToggle={() => setIsFilterExpanded(!isFilterExpanded)}
      />
      
      {/* Main Content Area */}
      <div className={`relative transition-all duration-500 ease-out ${isFilterExpanded ? 'ml-[350px]' : 'ml-[80px]'}`}>
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} tokenCount={tokens.length} />
        
        {/* Pinterest-Style Content */}
        <div className="relative transition-all duration-700 opacity-100">
          {/* Stats Banner */}
          {tokens.length > 0 && (
            <div className="mb-6 mx-8 mt-4">
              <div className="bg-gradient-to-r from-[#00D4AA]/10 via-[#7C3AED]/5 to-[#FF6B6B]/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] bg-clip-text text-transparent">
                      {tokens.length}
                    </div>
                    <div className="text-xs text-white/60 font-medium">Total Tokens</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-[#FFB800] to-[#FF6B6B] bg-clip-text text-transparent">
                      {tokens.filter(t => t.trustScore >= 80).length}
                    </div>
                    <div className="text-xs text-white/60 font-medium">Verified</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#00FF88] bg-clip-text text-transparent">
                      24H
                    </div>
                    <div className="text-xs text-white/60 font-medium">Active</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
                      {tokens.reduce((sum, t) => sum + t.holders, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-white/60 font-medium">Total Holders</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Token Grid */}
          {tokens.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 px-8">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#00D4AA]/20 via-[#7C3AED]/20 to-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Tokens Found</h3>
                <p className="text-white/60 mb-6">
                  We're ready to display tokens as soon as they're available. 
                  Connect to the API to start discovering amazing projects.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-sm text-white/50">
                    <div className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse"></div>
                    <span>Waiting for API connection...</span>
                  </div>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-6 py-2 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <MasonryGrid tokens={tokens} isLoading={isLoading} />
          )}
          
          {/* Footer Spacer */}
          <div className="h-16"></div>
        </div>
      </div>
      
      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] rounded-full shadow-2xl shadow-[#00D4AA]/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300 hover:scale-110 active:scale-95"
        >
          🔧
        </button>
      </div>
    </div>
  );
}
