'use client'
import { useState } from 'react'
import { useAuth } from '@/app/context/auth-context'
import Header from './header'
import StatsBar from './stats-bar'
import CryptoHero from './crypto-hero'
import CryptoTabs from './crypto-tabs'
import TradingChart from './trading-chart'
import MarketStatsGrid from './market-stats-grid'
import CryptoAbout from './crypto-about'
import PriceStatistics from './price-statistics'
import SimilarCryptocurrencies from './similar-cryptocurrencies'
import PriceConverter from './price-converter'
import CryptoMarkets from './crypto-markets'
import CryptoNews from './crypto-news'
import BitcoinPriceToday from './bitcoin-price-today'
import BitcoinUnique from './bitcoin-unique'
import KeyStatistics from './key-statistics'
import SocialCommunity from './social-community'
import ValueProposition from './value-proposition'
import BitcoinStoreValue from './bitcoin-store-value'
import { Crypto } from '@/types/crypto'
import Tags from './tags'
import ProjectOwnership from './project-ownership'
import CoinBites from './coin-bites'
import CryptoDetailLeftSidebarExact from './crypto-detail-left-sidebar-exact'
import CryptoDetailCenterExact from './crypto-detail-center-exact'
import CryptoDetailRightSidebarExact from './crypto-detail-right-sidebar-exact'
import CryptoSocialSidebar from './crypto-social-sidebar'
import PaymentModal from './payment-modal'
import { EnhancedCryptoTrading } from './trading/enhanced-crypto-trading'

interface CryptoDetailPageProps {
  crypto: Crypto
}

export default function CryptoDetailPage({ crypto }: CryptoDetailPageProps) {
  const { isLoggedIn } = useAuth()
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [showTrading, setShowTrading] = useState(false)

  return (
    <div className="min-h-screen bg-cmc-background">
      <StatsBar />
      <Header />
      <CryptoHero crypto={crypto} />
      
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex justify-end mb-4 gap-3">
          <button
            onClick={() => setShowTrading(!showTrading)}
            className="px-6 py-3 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00D4AA]/90 font-medium transition-colors"
          >
            {showTrading ? 'Hide' : 'Trade'} {crypto.symbol}
          </button>
          {isLoggedIn && (
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-6 py-3 bg-[#1652F0] text-white rounded-lg hover:bg-[#1652F0]/90 font-medium"
            >
              Buy {crypto.symbol}
            </button>
          )}
        </div>

        {/* Enhanced Trading Interface */}
        {showTrading && (
          <div className="mb-8">
            <EnhancedCryptoTrading 
              preselectedToken={{
                symbol: crypto.symbol,
                name: crypto.name,
                logo: crypto.logo
              }}
            />
          </div>
        )}
        <div className="flex gap-6">
          {/* EXACT: Left Sidebar - Fixed 330px width */}
          <div className="hidden lg:block flex-shrink-0">
            <CryptoDetailLeftSidebarExact crypto={crypto} />
          </div>
          
          {/* EXACT: Center Content - Flexible width */}
          <div className="flex-1 min-w-0">
            <CryptoDetailCenterExact crypto={crypto} />
          </div>
          
          {/* EXACT: Right Sidebar - Fixed 330px width */}
          <div className="hidden lg:block flex-shrink-0">
            <CryptoSocialSidebar symbol={crypto.symbol} />
          </div>
        </div>
      </div>
      {isPaymentModalOpen && (
        <PaymentModal
          crypto={crypto}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  )
}
