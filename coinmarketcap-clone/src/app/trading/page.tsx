'use client'

import { Suspense } from 'react'
import AdvancedTradingDashboard from '@/components/advanced-trading-dashboard'
import LiveTradingTest from '@/components/live-trading-test'
import PhantomWalletTest from '@/components/phantom-wallet-test'
import SolanaTokensDisplay from '@/components/solana-tokens-display'
import { WalletProvider } from '@/components/wallet-connection'
import TradingPairDisplay from '@/components/trading-pair-display'

function TradingPageContent() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#F8FAFD]">
        {/* Page Header */}
        <div className="bg-white border-b border-[#EFF2F5] px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="cmc-text-3xl cmc-font-bold text-[#0D1421] mb-2">
                Professional Trading Platform
              </h1>
              <p className="cmc-text-lg text-[#616E85] mb-6">
                Trade across 100+ DEXs with 0x Protocol integration on 17 blockchains
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F0F9FF] cmc-border-radius-full flex items-center justify-center mx-auto mb-3">
                    <span className="cmc-text-2xl">⚡</span>
                  </div>
                  <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-1">
                    Gasless Trading
                  </h3>
                  <p className="cmc-text-sm text-[#616E85]">
                    Trade without holding ETH for gas fees
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F0FDF4] cmc-border-radius-full flex items-center justify-center mx-auto mb-3">
                    <span className="cmc-text-2xl">🛡️</span>
                  </div>
                  <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-1">
                    MEV Protection
                  </h3>
                  <p className="cmc-text-sm text-[#616E85]">
                    Protected against sandwich attacks
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FFF7ED] cmc-border-radius-full flex items-center justify-center mx-auto mb-3">
                    <span className="cmc-text-2xl">🌐</span>
                  </div>
                  <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-1">
                    Multi-Chain
                  </h3>
                  <p className="cmc-text-sm text-[#616E85]">
                    Trade on 17 different blockchains
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F3F4F6] cmc-border-radius-full flex items-center justify-center mx-auto mb-3">
                    <span className="cmc-text-2xl">💰</span>
                  </div>
                  <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-1">
                    Best Prices
                  </h3>
                  <p className="cmc-text-sm text-[#616E85]">
                    Aggregated liquidity from 100+ DEXs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Pair Display */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <TradingPairDisplay />
        </div>

        {/* Live Trading Test */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveTradingTest />
            <PhantomWalletTest />
          </div>
        </div>

        {/* Solana Tokens Display */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <SolanaTokensDisplay />
        </div>

        {/* Main Trading Dashboard */}
        <AdvancedTradingDashboard />
      </div>
    </WalletProvider>
  )
}

export default function TradingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFD] flex items-center justify-center">Loading...</div>}>
      <TradingPageContent />
    </Suspense>
  )
}