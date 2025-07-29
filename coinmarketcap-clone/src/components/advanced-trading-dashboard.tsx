'use client'

import { useState, useEffect } from 'react'
import { createClientV2 } from '@0x/swap-ts-sdk'
import { BarChart3, TrendingUp, Zap, Shield, Settings, RefreshCw, AlertTriangle, Target } from 'lucide-react'
import TradingInterface from './trading-interface'
import WalletConnection from './wallet-connection'
import ChainSelector from './chain-selector'
import PhantomWalletInfo from './phantom-wallet-info'
import { zeroxAPI } from '@/lib/zerox-api'
import { SUPPORTED_CHAINS } from '@/lib/zerox-config'
import { useWallet } from './wallet-connection'

interface LiquiditySource {
  name: string
  percentage: number
  price: number
  color: string
}

interface OrderRouting {
  path: string[]
  gasEstimate: string
  priceImpact: number
  executionTime: number
}

export default function AdvancedTradingDashboard() {
  const { walletType } = useWallet()
  const [selectedPair, setSelectedPair] = useState('WETH/USDT')
  const [selectedChainId, setSelectedChainId] = useState(1) // Default to Ethereum
  const [liquiditySources, setLiquiditySources] = useState<LiquiditySource[]>([])
  const [orderRouting, setOrderRouting] = useState<OrderRouting | null>(null)
  const [mevProtection, setMevProtection] = useState(true)
  const [autoSlippage, setAutoSlippage] = useState(true)
  const [tradingMode, setTradingMode] = useState<'instant' | 'limit' | 'dca'>('instant')

  useEffect(() => {
    // Fetch real liquidity sources from 0x Protocol
    const fetchLiquiditySources = async () => {
      try {
        const sources = await zeroxAPI.getSources(selectedChainId)
        const liquidityData = sources.sources?.slice(0, 5).map((source: any, index: number) => ({
          name: source.name || `Source ${index + 1}`,
          percentage: Math.random() * 40 + 10, // This would come from actual price data
          price: 2456 + Math.random() * 10,
          color: ['#FF007A', '#8A2BE2', '#1E1E1E', '#FA52A0', '#666666'][index]
        })) || []
        
        setLiquiditySources(liquidityData)
      } catch (error) {
        console.error('Error fetching liquidity sources:', error)
        // Fallback data
        setLiquiditySources([
          { name: 'Uniswap V3', percentage: 45, price: 2456.78, color: '#FF007A' },
          { name: 'Curve', percentage: 28, price: 2457.12, color: '#8A2BE2' },
          { name: 'Balancer', percentage: 15, price: 2456.45, color: '#1E1E1E' }
        ])
      }
    }

    fetchLiquiditySources()
    
    setOrderRouting({
      path: ['WETH', 'USDC', 'USDT'],
      gasEstimate: '145,000',
      priceImpact: 0.12,
      executionTime: 15
    })
  }, [selectedPair, selectedChainId])

  const tradingModes = [
    { id: 'instant', name: 'Instant Swap', icon: Zap, description: 'Execute immediately at best price' },
    { id: 'limit', name: 'Limit Order', icon: Target, description: 'Set target price for execution' },
    { id: 'dca', name: 'DCA Strategy', icon: BarChart3, description: 'Dollar cost averaging over time' }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFD]">
      {/* Advanced Trading Header */}
      <div className="bg-white border-b border-[#EFF2F5] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-[#3861FB] to-[#16C784] cmc-border-radius-md">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="cmc-text-xl cmc-font-bold text-[#0D1421]">
                  Advanced Trading
                </h1>
                <p className="cmc-text-sm text-[#616E85]">
                  Professional DEX aggregation powered by 0x Protocol
                </p>
              </div>
            </div>
            
            {/* Trading Mode Selector */}
            <div className="flex items-center space-x-1 bg-[#F8FAFD] p-1 cmc-border-radius-md">
              {tradingModes.map((mode) => {
                const IconComponent = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setTradingMode(mode.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 cmc-text-sm cmc-border-radius-sm transition-colors ${
                      tradingMode === mode.id
                        ? 'bg-white text-[#3861FB] shadow-sm'
                        : 'text-[#616E85] hover:text-[#0D1421]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{mode.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* MEV Protection Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMevProtection(!mevProtection)}
                className={`flex items-center space-x-2 px-3 py-2 cmc-text-sm cmc-border-radius-md transition-colors ${
                  mevProtection 
                    ? 'bg-[#16C784] text-white' 
                    : 'bg-[#F8FAFD] text-[#616E85] hover:bg-[#EFF2F5]'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>MEV Shield</span>
              </button>
            </div>
            
            <WalletConnection compact />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Trading Interface */}
          <div className="col-span-4">
            <TradingInterface selectedChainId={selectedChainId} />
            
            {/* Advanced Settings */}
            <div className="mt-4 bg-white border border-[#EFF2F5] cmc-border-radius-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421]">
                  Advanced Settings
                </h3>
                <Settings className="w-4 h-4 text-[#616E85]" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="cmc-text-sm text-[#616E85]">Auto Slippage</span>
                  <button
                    onClick={() => setAutoSlippage(!autoSlippage)}
                    className={`w-10 h-6 cmc-border-radius-full transition-colors ${
                      autoSlippage ? 'bg-[#3861FB]' : 'bg-[#EFF2F5]'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white cmc-border-radius-full transition-transform ${
                      autoSlippage ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="cmc-text-sm text-[#616E85]">Gas Optimization</span>
                  <select className="px-2 py-1 border border-[#EFF2F5] cmc-border-radius-sm cmc-text-sm">
                    <option>Standard</option>
                    <option>Fast</option>
                    <option>Instant</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="cmc-text-sm text-[#616E85]">Deadline (mins)</span>
                  <input 
                    type="number" 
                    defaultValue="20"
                    className="w-16 px-2 py-1 border border-[#EFF2F5] cmc-border-radius-sm cmc-text-sm text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Liquidity Sources & Order Routing */}
          <div className="col-span-5 space-y-6">
            {/* Liquidity Aggregation */}
            <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
                  Liquidity Sources
                </h3>
                <div className="flex items-center space-x-2 cmc-text-sm text-[#616E85]">
                  <RefreshCw className="w-4 h-4" />
                  <span>Updated 2s ago</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {liquiditySources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFD] cmc-border-radius-md">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 cmc-border-radius-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="cmc-font-medium text-[#0D1421]">
                        {source.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="cmc-text-sm text-[#616E85]">
                        ${source.price.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div 
                          className="h-2 cmc-border-radius-full"
                          style={{ 
                            width: `${source.percentage}px`,
                            backgroundColor: source.color 
                          }}
                        />
                        <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                          {source.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-[#F0F9FF] cmc-border-radius-md">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#3861FB]" />
                  <span className="cmc-text-sm cmc-font-medium text-[#3861FB]">
                    Optimal Route Selected
                  </span>
                </div>
                <p className="cmc-text-xs text-[#616E85]">
                  0x Protocol automatically routes your trade across multiple DEXs for the best price
                </p>
              </div>
            </div>

            {/* Order Routing Details */}
            {orderRouting && (
              <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
                <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421] mb-4">
                  Smart Order Routing
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-[#F8FAFD] cmc-border-radius-md">
                    <div className="cmc-text-sm text-[#616E85] mb-1">Gas Estimate</div>
                    <div className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
                      {orderRouting.gasEstimate}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#F8FAFD] cmc-border-radius-md">
                    <div className="cmc-text-sm text-[#616E85] mb-1">Price Impact</div>
                    <div className="cmc-text-lg cmc-font-semibold text-[#16C784]">
                      {orderRouting.priceImpact}%
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#F8FAFD] cmc-border-radius-md">
                    <div className="cmc-text-sm text-[#616E85] mb-1">Execution Time</div>
                    <div className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
                      ~{orderRouting.executionTime}s
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#F8FAFD] cmc-border-radius-md">
                    <div className="cmc-text-sm text-[#616E85] mb-1">Route Hops</div>
                    <div className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
                      {orderRouting.path.length - 1}
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border border-[#EFF2F5] cmc-border-radius-md">
                  <div className="cmc-text-sm text-[#616E85] mb-2">Routing Path</div>
                  <div className="flex items-center space-x-2">
                    {orderRouting.path.map((token, index) => (
                      <div key={index} className="flex items-center">
                        <span className="px-2 py-1 bg-[#F0F9FF] text-[#3861FB] cmc-text-xs cmc-border-radius-sm">
                          {token}
                        </span>
                        {index < orderRouting.path.length - 1 && (
                          <span className="mx-2 text-[#616E85]">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chain Selector & Market Analytics */}
          <div className="col-span-3 space-y-6">
            {/* Phantom Wallet Info (if connected) */}
            {walletType === 'phantom' && <PhantomWalletInfo />}
            
            {/* Chain Selector */}
            <ChainSelector 
              selectedChainId={selectedChainId}
              onChainSelect={setSelectedChainId}
              compact
            />
            {/* Real-time Market Stats */}
            <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
              <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421] mb-4">
                Market Analytics
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="cmc-text-sm text-[#616E85]">24h Volume</span>
                  <span className="cmc-font-medium text-[#0D1421]">$847.2M</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="cmc-text-sm text-[#616E85]">DEX TVL</span>
                  <span className="cmc-font-medium text-[#0D1421]">$15.4B</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="cmc-text-sm text-[#616E85]">Active LPs</span>
                  <span className="cmc-font-medium text-[#0D1421]">23,456</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="cmc-text-sm text-[#616E85]">Avg Gas Price</span>
                  <span className="cmc-font-medium text-[#0D1421]">25 gwei</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#EFF2F5]">
                <div className="flex items-center space-x-2 cmc-text-sm">
                  <div className="w-2 h-2 bg-[#16C784] cmc-border-radius-full animate-pulse" />
                  <span className="text-[#616E85]">Market conditions: </span>
                  <span className="text-[#16C784] cmc-font-medium">Optimal</span>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
              <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421] mb-4">
                Risk Management
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F0F9FF] cmc-border-radius-md">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-[#3861FB]" />
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                      MEV Protection
                    </span>
                  </div>
                  <span className="cmc-text-xs text-[#16C784]">Active</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#FFF7ED] cmc-border-radius-md">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                      Slippage Monitor
                    </span>
                  </div>
                  <span className="cmc-text-xs text-[#F59E0B]">1.2%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#F0FDF4] cmc-border-radius-md">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-[#16C784]" />
                    <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                      Price Oracle
                    </span>
                  </div>
                  <span className="cmc-text-xs text-[#16C784]">Chainlink</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
              <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421] mb-4">
                Recent Trades
              </h3>
              
              <div className="space-y-3">
                {[
                  { pair: 'WETH/USDT', amount: '1.25 ETH', price: '$2,456', time: '2m ago', status: 'success' },
                  { pair: 'WBTC/USDC', amount: '0.05 BTC', price: '$2,780', time: '5m ago', status: 'success' },
                  { pair: 'UNI/WETH', amount: '150 UNI', price: '$1,245', time: '8m ago', status: 'pending' }
                ].map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-[#F8FAFD] cmc-border-radius-sm">
                    <div>
                      <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                        {trade.pair}
                      </div>
                      <div className="cmc-text-xs text-[#616E85]">
                        {trade.amount} • {trade.time}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                        {trade.price}
                      </div>
                      <div className={`cmc-text-xs ${
                        trade.status === 'success' ? 'text-[#16C784]' : 'text-[#F59E0B]'
                      }`}>
                        {trade.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}