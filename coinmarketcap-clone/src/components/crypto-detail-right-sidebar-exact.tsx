import { useState } from 'react'
import { Crypto } from '@/types/crypto'
import CryptoSocialSidebar from './crypto-social-sidebar'

interface CryptoDetailRightSidebarExactProps {
  crypto: Crypto
}

export default function CryptoDetailRightSidebarExact({ crypto }: CryptoDetailRightSidebarExactProps) {
  const [convertAmount, setConvertAmount] = useState('1')
  const [convertFrom, setConvertFrom] = useState('BTC')
  const [convertTo, setConvertTo] = useState('USD')

  return (
    <div className="w-[330px] space-y-6 sticky top-24">
      {/* Calculator/Converter Tool */}
      <div className="bg-cmc-white rounded-lg border border-cmc-border p-6">
        <h3 className="text-lg font-semibold text-cmc-text-primary mb-4">Bitcoin Price Calculator</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-cmc-text-secondary mb-2">Amount</label>
            <div className="flex">
              <input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                className="flex-1 px-3 py-2 border border-cmc-border rounded-l-lg focus:outline-none focus:border-cmc-primary"
                placeholder="1"
              />
              <select 
                value={convertFrom}
                onChange={(e) => setConvertFrom(e.target.value)}
                className="px-3 py-2 border border-l-0 border-cmc-border rounded-r-lg bg-cmc-gray-light text-sm focus:outline-none"
              >
                <option value="BTC">BTC</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          
          <div className="text-center">
            <button className="w-8 h-8 bg-cmc-gray-light rounded-full flex items-center justify-center text-cmc-text-secondary hover:bg-cmc-border transition-colors">
              ⇅
            </button>
          </div>
          
          <div>
            <label className="block text-sm text-cmc-text-secondary mb-2">Converted Amount</label>
            <div className="flex">
              <input
                type="text"
                value={convertFrom === 'BTC' 
                  ? (parseFloat(convertAmount) * crypto.price).toLocaleString()
                  : (parseFloat(convertAmount) / crypto.price).toFixed(8)
                }
                readOnly
                className="flex-1 px-3 py-2 border border-cmc-border rounded-l-lg bg-cmc-gray-light text-cmc-text-primary"
              />
              <select 
                value={convertTo}
                onChange={(e) => setConvertTo(e.target.value)}
                className="px-3 py-2 border border-l-0 border-cmc-border rounded-r-lg bg-cmc-gray-light text-sm focus:outline-none"
              >
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Feed */}
      <CryptoSocialSidebar symbol={crypto.symbol} />

      {/* Watchlist & Alerts */}
      <div className="bg-cmc-white rounded-lg border border-cmc-border p-6">
        <h3 className="text-lg font-semibold text-cmc-text-primary mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full py-3 bg-cmc-primary text-white rounded-lg font-medium hover:bg-[#2651EB] transition-colors flex items-center justify-center space-x-2">
            <span>⭐</span>
            <span>Add to Watchlist</span>
          </button>
          
          <button className="w-full py-3 border border-cmc-border text-cmc-text-primary rounded-lg font-medium hover:bg-cmc-gray-light transition-colors flex items-center justify-center space-x-2">
            <span>🔔</span>
            <span>Set Price Alert</span>
          </button>
          
          <button className="w-full py-3 border border-cmc-border text-cmc-text-primary rounded-lg font-medium hover:bg-cmc-gray-light transition-colors flex items-center justify-center space-x-2">
            <span>📊</span>
            <span>Portfolio Tracker</span>
          </button>
        </div>
      </div>

      {/* Advertisement Placeholder */}
      <div className="bg-gradient-to-br from-cmc-primary to-cmc-green rounded-lg p-6 text-white text-center">
        <div className="text-lg font-semibold mb-2">Trade Bitcoin</div>
        <div className="text-sm opacity-90 mb-4">
          Start trading with zero fees on trusted exchanges
        </div>
        <button className="w-full py-2 bg-white text-cmc-primary rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  )
}
