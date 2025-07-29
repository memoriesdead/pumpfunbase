'use client'

import { useState } from 'react'
import { Crypto } from '@/types/crypto'
import CryptoChartExact from './crypto-chart-exact'
import CryptoNewsExact from './crypto-news-exact'
import CryptoMarkets from './crypto-markets'
import TopCryptocurrencies from './top-cryptocurrencies'
import { BarChart3, TrendingUp, Users, BookOpen, History, Newspaper, ChevronDown } from 'lucide-react'

interface CryptoDetailCenterExactProps {
  crypto: Crypto
}

export default function CryptoDetailCenterExact({ crypto }: CryptoDetailCenterExactProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'historical', label: 'Historical Data', icon: History },
    { id: 'news', label: 'News', icon: Newspaper }
  ]

  const renderMarketsContent = () => (
    <div className="space-y-4">
      {/* Markets Table */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421] mb-4">Bitcoin Markets</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EFF2F5]">
                <th className="text-left py-3 cmc-text-sm cmc-font-medium text-[#616E85]">#</th>
                <th className="text-left py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Exchange</th>
                <th className="text-left py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Pair</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Price</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">24h Volume</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Volume %</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, exchange: 'Binance', pair: 'BTC/USDT', price: crypto.price, volume: '$2.1B', volumePercent: '15.2%' },
                { rank: 2, exchange: 'Coinbase Pro', pair: 'BTC/USD', price: crypto.price * 0.999, volume: '$1.8B', volumePercent: '12.8%' },
                { rank: 3, exchange: 'Kraken', pair: 'BTC/USD', price: crypto.price * 1.001, volume: '$987M', volumePercent: '7.1%' },
                { rank: 4, exchange: 'Bitstamp', pair: 'BTC/USD', price: crypto.price * 0.998, volume: '$654M', volumePercent: '4.7%' },
                { rank: 5, exchange: 'Gemini', pair: 'BTC/USD', price: crypto.price * 1.002, volume: '$432M', volumePercent: '3.1%' }
              ].map((market, index) => (
                <tr key={index} className="border-b border-[#EFF2F5] hover:bg-[#F8FAFD] transition-colors">
                  <td className="py-3 cmc-text-sm text-[#616E85]">{market.rank}</td>
                  <td className="py-3 cmc-text-sm cmc-font-medium text-[#0D1421]">{market.exchange}</td>
                  <td className="py-3 cmc-text-sm text-[#0D1421]">{market.pair}</td>
                  <td className="py-3 cmc-text-sm cmc-font-medium text-[#0D1421] text-right">
                    ${market.price.toLocaleString()}
                  </td>
                  <td className="py-3 cmc-text-sm text-[#0D1421] text-right">{market.volume}</td>
                  <td className="py-3 cmc-text-sm text-[#16C784] text-right">{market.volumePercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <button className="cmc-text-sm text-[#3861FB] hover:underline">
            View All Markets
          </button>
        </div>
      </div>
    </div>
  )

  const renderHistoricalContent = () => (
    <div className="space-y-4">
      {/* Historical Data Table */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">Historical Data</h3>
          <select className="px-3 py-2 border border-[#EFF2F5] cmc-border-radius-md cmc-text-sm text-[#616E85] focus:outline-none focus:border-[#3861FB]">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EFF2F5]">
                <th className="text-left py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Date</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Open</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">High</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Low</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Close</th>
                <th className="text-right py-3 cmc-text-sm cmc-font-medium text-[#616E85]">Volume</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date()
                date.setDate(date.getDate() - i)
                const price = crypto.price * (0.98 + Math.random() * 0.04)
                return {
                  date: date.toLocaleDateString(),
                  open: price * 0.999,
                  high: price * 1.02,
                  low: price * 0.98,
                  close: price,
                  volume: (Math.random() * 2000000000).toFixed(0)
                }
              }).map((day, index) => (
                <tr key={index} className="border-b border-[#EFF2F5] hover:bg-[#F8FAFD] transition-colors">
                  <td className="py-3 cmc-text-sm text-[#0D1421]">{day.date}</td>
                  <td className="py-3 cmc-text-sm text-[#0D1421] text-right">${day.open.toLocaleString()}</td>
                  <td className="py-3 cmc-text-sm text-[#0D1421] text-right">${day.high.toLocaleString()}</td>
                  <td className="py-3 cmc-text-sm text-[#0D1421] text-right">${day.low.toLocaleString()}</td>
                  <td className="py-3 cmc-text-sm cmc-font-medium text-[#0D1421] text-right">${day.close.toLocaleString()}</td>
                  <td className="py-3 cmc-text-sm text-[#616E85] text-right">${parseInt(day.volume).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Chart Section */}
            <CryptoChartExact crypto={crypto} />
            
            {/* Top 10 Cryptocurrencies Section Only */}
            <div className="space-y-6">
              <TopCryptocurrencies />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
                <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-3">Market Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Market Cap Rank</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">#{crypto.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Market Dominance</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">54.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Volume/Market Cap</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">2.1%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
                <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-3">Supply Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Circulating Supply</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">19.89M BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Total Supply</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">19.89M BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Max Supply</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">21M BTC</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
                <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-3">Network Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Hash Rate</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">621 EH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Difficulty</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">83.1T</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="cmc-text-sm text-[#616E85]">Block Time</span>
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">10 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* News Section */}
            <CryptoNewsExact symbol={crypto.symbol} />
          </div>
        )
        
      case 'markets':
        return <CryptoMarkets crypto={crypto} />
        
      case 'historical':
        return renderHistoricalContent()
        
      case 'news':
        return <CryptoNewsExact symbol={crypto.symbol} />
        
      default:
        return null
    }
  }

  return (
    <div className="flex-1 max-w-none">
      {/* Tab Navigation */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md mb-4">
        <div className="flex border-b border-[#EFF2F5]">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 cmc-text-sm cmc-font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#3861FB] border-b-2 border-[#3861FB] bg-[#F0F9FF]'
                    : 'text-[#616E85] hover:text-[#0D1421] hover:bg-[#F8FAFD]'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {renderTabContent()}
      </div>
    </div>
  )
}
