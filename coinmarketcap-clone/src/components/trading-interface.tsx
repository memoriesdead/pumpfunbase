'use client'

import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { TrendingUp, TrendingDown, ArrowUpDown, Settings, Zap, Shield, Clock } from 'lucide-react'
import { zeroxAPI, formatTokenAmount, parseTokenAmount } from '@/lib/zerox-api'
import { SUPPORTED_CHAINS, getPopularTokens, ZEROX_CONFIG } from '@/lib/zerox-config'
import { useWallet } from './wallet-connection'

interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

interface TradingInterfaceProps {
  crypto?: any
  selectedChainId?: number
}

export default function TradingInterface({ crypto, selectedChainId = 1 }: TradingInterfaceProps) {
  const { chainId: walletChainId, account } = useWallet()
  const activeChainId = walletChainId || selectedChainId
  
  // Get popular tokens for the current chain
  const popularTokens = getPopularTokens(activeChainId)
  
  const [sellToken, setSellToken] = useState<Token>(
    popularTokens[1] || {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      name: 'Tether',
      decimals: 6
    }
  )
  
  const [buyToken, setBuyToken] = useState<Token>(
    popularTokens[0] || {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      name: 'Wrapped Ethereum',
      decimals: 18
    }
  )

  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [priceData, setPriceData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [gasless, setGasless] = useState(false)
  const [slippage, setSlippage] = useState('1.0')
  const [error, setError] = useState<string | null>(null)
  const [sources, setSources] = useState<any[]>([])

  // Fetch available liquidity sources for the current chain
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const sourcesData = await zeroxAPI.getSources(activeChainId)
        setSources(sourcesData.sources || [])
      } catch (error) {
        console.error('Error fetching sources:', error)
      }
    }
    
    fetchSources()
  }, [activeChainId])

  const fetchPrice = useCallback(async () => {
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      setPriceData(null)
      setBuyAmount('')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const sellAmountWei = parseTokenAmount(sellAmount, sellToken.decimals)
      
      const params = {
        chainId: activeChainId,
        sellToken: sellToken.address,
        buyToken: buyToken.address,
        sellAmount: sellAmountWei,
        slippageBps: Math.floor(parseFloat(slippage) * 100),
        taker: account || undefined
      }

      let price
      if (gasless && SUPPORTED_CHAINS[activeChainId]?.supportedFeatures.includes('gasless')) {
        price = await zeroxAPI.getGaslessPrice(params)
      } else {
        price = await zeroxAPI.getPrice(params)
      }
      
      setPriceData(price)
      const buyAmountFormatted = formatTokenAmount(price.buyAmount, buyToken.decimals)
      setBuyAmount(buyAmountFormatted)
      
    } catch (error: any) {
      console.error('Price fetch error:', error)
      setError(error.message || 'Failed to fetch price')
      setPriceData(null)
      setBuyAmount('')
    } finally {
      setLoading(false)
    }
  }, [sellAmount, sellToken, buyToken, slippage, gasless, activeChainId, account])

  useEffect(() => {
    const timeoutId = setTimeout(fetchPrice, 500)
    return () => clearTimeout(timeoutId)
  }, [fetchPrice])

  const swapTokens = () => {
    const tempToken = sellToken
    setSellToken(buyToken)
    setBuyToken(tempToken)
    setSellAmount(buyAmount)
    setBuyAmount('')
  }

  const executeTrade = async () => {
    if (!priceData || !account) return
    
    setLoading(true)
    setError(null)
    
    try {
      const sellAmountWei = parseTokenAmount(sellAmount, sellToken.decimals)
      
      const params = {
        chainId: activeChainId,
        sellToken: sellToken.address,
        buyToken: buyToken.address,
        sellAmount: sellAmountWei,
        slippageBps: Math.floor(parseFloat(slippage) * 100),
        taker: account
      }

      let quote
      if (gasless && SUPPORTED_CHAINS[activeChainId]?.supportedFeatures.includes('gasless')) {
        quote = await zeroxAPI.getGaslessQuote(params)
        
        // For gasless trades, submit the transaction through 0x
        const result = await zeroxAPI.submitGaslessTransaction(quote)
        console.log('Gasless trade submitted:', result)
      } else {
        quote = await zeroxAPI.getQuote(params)
        
        // For regular trades, user needs to sign and submit through their wallet
        console.log('Quote for wallet execution:', quote)
        // Implementation would handle wallet signing and transaction submission
      }
      
    } catch (error: any) {
      console.error('Trade execution error:', error)
      setError(error.message || 'Failed to execute trade')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
      {/* Trading Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#F0F9FF] cmc-border-radius-md">
            <ArrowUpDown className="w-5 h-5 text-[#3861FB]" />
          </div>
          <div>
            <h2 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              Instant Swap
            </h2>
            <p className="cmc-text-sm text-[#616E85]">
              Best prices across 100+ DEXs
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setGasless(!gasless)}
            className={`flex items-center space-x-1 px-3 py-2 cmc-text-sm cmc-border-radius-md transition-colors ${
              gasless 
                ? 'bg-[#16C784] text-white' 
                : 'bg-[#F8FAFD] text-[#616E85] hover:bg-[#EFF2F5]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Gasless</span>
          </button>
          
          <button className="p-2 text-[#616E85] hover:text-[#3861FB] hover:bg-[#F8FAFD] cmc-border-radius-md transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sell Token Input */}
      <div className="space-y-4">
        <div className="border border-[#EFF2F5] cmc-border-radius-md p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="cmc-text-sm text-[#616E85]">You Pay</span>
            <span className="cmc-text-sm text-[#616E85]">
              Balance: 1,234.56 {sellToken.symbol}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-[#F8FAFD] px-3 py-2 cmc-border-radius-md">
              <div className="w-6 h-6 bg-[#F7931A] cmc-border-radius-full" />
              <span className="cmc-font-medium text-[#0D1421]">{sellToken.symbol}</span>
            </div>
            
            <input
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 text-right cmc-text-lg cmc-font-medium text-[#0D1421] bg-transparent border-none outline-none"
            />
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-1">
              {['25%', '50%', '75%', 'MAX'].map((pct) => (
                <button
                  key={pct}
                  className="px-2 py-1 cmc-text-xs text-[#616E85] hover:text-[#3861FB] hover:bg-[#F0F9FF] cmc-border-radius-sm transition-colors"
                >
                  {pct}
                </button>
              ))}
            </div>
            <span className="cmc-text-sm text-[#616E85]">
              ~$1,234.56
            </span>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button 
            onClick={swapTokens}
            className="p-2 bg-[#F8FAFD] hover:bg-[#EFF2F5] border border-[#EFF2F5] cmc-border-radius-full transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 text-[#616E85]" />
          </button>
        </div>

        {/* Buy Token Input */}
        <div className="border border-[#EFF2F5] cmc-border-radius-md p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="cmc-text-sm text-[#616E85]">You Receive</span>
            <span className="cmc-text-sm text-[#616E85]">
              Balance: 0.00 {buyToken.symbol}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-[#F8FAFD] px-3 py-2 cmc-border-radius-md">
              <div className="w-6 h-6 bg-[#627EEA] cmc-border-radius-full" />
              <span className="cmc-font-medium text-[#0D1421]">{buyToken.symbol}</span>
            </div>
            
            <div className="flex-1 text-right">
              {loading ? (
                <div className="cmc-text-lg text-[#616E85]">Loading...</div>
              ) : (
                <div className="cmc-text-lg cmc-font-medium text-[#0D1421]">
                  {buyAmount || '0.00'}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-2">
            <span className="cmc-text-sm text-[#616E85]">
              ~$1,234.56
            </span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#FCA5A5] cmc-border-radius-md">
          <p className="cmc-text-sm text-[#DC2626]">{error}</p>
        </div>
      )}

      {/* Trade Info */}
      {priceData && (
        <div className="mt-4 p-3 bg-[#F8FAFD] cmc-border-radius-md">
          <div className="grid grid-cols-2 gap-4 cmc-text-sm">
            <div className="flex justify-between">
              <span className="text-[#616E85]">Rate:</span>
              <span className="cmc-font-medium text-[#0D1421]">
                1 {sellToken.symbol} = {(parseFloat(buyAmount) / parseFloat(sellAmount) || 0).toFixed(6)} {buyToken.symbol}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#616E85]">Network Fee:</span>
              <span className="cmc-font-medium text-[#0D1421]">
                {gasless ? 'Free' : `~$${formatTokenAmount(priceData.gas || '0', 18).slice(0, 6)}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#616E85]">Platform Fee:</span>
              <span className="cmc-font-medium text-[#0D1421]">{ZEROX_CONFIG.platformFeeBps / 100}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#616E85]">Price Impact:</span>
              <span className={`cmc-font-medium ${
                parseFloat(priceData.estimatedPriceImpact || '0') > 3 ? 'text-[#EA3943]' : 'text-[#16C784]'
              }`}>
                {(parseFloat(priceData.estimatedPriceImpact || '0') * 100).toFixed(2)}%
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#616E85]">Slippage:</span>
              <span className="cmc-font-medium text-[#0D1421]">{slippage}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#616E85]">Chain:</span>
              <span className="cmc-font-medium text-[#0D1421]">
                {SUPPORTED_CHAINS[activeChainId]?.name || 'Unknown'}
              </span>
            </div>
          </div>
          
          {/* Liquidity Sources */}
          {priceData.sources && priceData.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#EFF2F5]">
              <div className="cmc-text-xs text-[#616E85] mb-2">Liquidity Sources:</div>
              <div className="flex flex-wrap gap-2">
                {priceData.sources.slice(0, 3).map((source: any, index: number) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span className="cmc-text-xs cmc-font-medium text-[#0D1421]">
                      {source.name}
                    </span>
                    <span className="cmc-text-xs text-[#616E85]">
                      ({(parseFloat(source.proportion) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
                {priceData.sources.length > 3 && (
                  <span className="cmc-text-xs text-[#616E85]">
                    +{priceData.sources.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#EFF2F5]">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#16C784]" />
              <span className="cmc-text-xs text-[#616E85]">
                MEV Protected via 0x Protocol
              </span>
            </div>
            
            <div className="flex items-center space-x-1 cmc-text-xs text-[#616E85]">
              <Clock className="w-3 h-3" />
              <span>~15 seconds</span>
            </div>
          </div>
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={executeTrade}
        disabled={!priceData || loading || !account}
        className="w-full mt-4 py-3 bg-[#3861FB] hover:bg-[#2952CC] disabled:bg-[#EFF2F5] disabled:text-[#616E85] text-white cmc-font-medium cmc-border-radius-md transition-colors"
      >
        {loading ? (
          gasless ? 'Executing Gasless Trade...' : 'Getting Quote...'
        ) : !account ? (
          'Connect Wallet to Trade'
        ) : !priceData ? (
          'Enter Amount'
        ) : gasless ? (
          'Execute Gasless Trade'
        ) : (
          'Get Quote'
        )}
      </button>

      {/* Trading Features */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#EFF2F5]">
        <div className="text-center">
          <div className="cmc-text-lg cmc-font-bold text-[#16C784]">{sources.length || '100+'}+</div>
          <div className="cmc-text-xs text-[#616E85]">DEX Sources</div>
        </div>
        <div className="text-center">
          <div className="cmc-text-lg cmc-font-bold text-[#16C784]">{ZEROX_CONFIG.platformFeeBps / 100}%</div>
          <div className="cmc-text-xs text-[#616E85]">Platform Fee</div>
        </div>
        <div className="text-center">
          <div className="cmc-text-lg cmc-font-bold text-[#16C784]">
            {SUPPORTED_CHAINS[activeChainId]?.supportedFeatures.includes('gasless') ? 'Yes' : 'No'}
          </div>
          <div className="cmc-text-xs text-[#616E85]">Gasless Available</div>
        </div>
      </div>
      
      {/* Chain Info */}
      <div className="mt-4 p-3 bg-[#F0F9FF] cmc-border-radius-md">
        <div className="flex items-center justify-between cmc-text-sm">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 cmc-border-radius-full"
              style={{ backgroundColor: SUPPORTED_CHAINS[activeChainId]?.color || '#666' }}
            />
            <span className="cmc-font-medium text-[#0D1421]">
              Trading on {SUPPORTED_CHAINS[activeChainId]?.name || 'Unknown Chain'}
            </span>
          </div>
          <span className="cmc-text-xs text-[#616E85]">
            Chain ID: {activeChainId}
          </span>
        </div>
      </div>
    </div>
  )
}