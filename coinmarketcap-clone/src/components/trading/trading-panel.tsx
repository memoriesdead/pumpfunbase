'use client'

import { useState, useEffect } from 'react'
import { ArrowUpDown, TrendingUp, TrendingDown, DollarSign, Zap, Shield, Info } from 'lucide-react'
import { PLATFORM_WALLET_ADDRESS, PLATFORM_FEE_BPS } from '../wallet/wallet-connect'

interface TradingPanelProps {
  crypto: {
    symbol: string
    name: string
    price: number
    logo: string
    chainId: number
    chainName: string
  }
  wallet?: {
    isConnected: boolean
    address: string | null
    chainId: number | null
  }
}

interface SwapQuote {
  fromAmount: string
  toAmount: string
  priceImpact: number
  platformFee: number
  networkFee: number
  totalFee: number
  minimumReceived: string
}

export default function TradingPanel({ crypto, wallet }: TradingPanelProps) {
  const [swapDirection, setSwapDirection] = useState<'buy' | 'sell'>('buy')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [isLoading, setIsLoading] = useState(false)
  const [quote, setQuote] = useState<SwapQuote | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Calculate swap quote
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      calculateQuote()
    } else {
      setQuote(null)
      setToAmount('')
    }
  }, [fromAmount, swapDirection, slippage])

  const calculateQuote = async () => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const amount = parseFloat(fromAmount)
    if (isNaN(amount) || amount <= 0) {
      setQuote(null)
      setToAmount('')
      setIsLoading(false)
      return
    }

    // Simulate price calculation with some variation
    const basePrice = swapDirection === 'buy' ? crypto.price : 1 / crypto.price
    const priceVariation = 1 + (Math.random() - 0.5) * 0.02 // ±1% variation
    const adjustedPrice = basePrice * priceVariation
    
    const rawToAmount = amount * adjustedPrice
    const platformFeeAmount = rawToAmount * (PLATFORM_FEE_BPS / 10000)
    const networkFeeAmount = amount * 0.003 // 0.3% network fee simulation
    const totalFeeAmount = platformFeeAmount + networkFeeAmount
    const finalToAmount = rawToAmount - totalFeeAmount
    
    const priceImpact = Math.abs((adjustedPrice - basePrice) / basePrice) * 100
    const minimumReceived = finalToAmount * (1 - slippage / 100)

    const newQuote: SwapQuote = {
      fromAmount: fromAmount,
      toAmount: finalToAmount.toFixed(6),
      priceImpact: priceImpact,
      platformFee: platformFeeAmount,
      networkFee: networkFeeAmount,
      totalFee: totalFeeAmount,
      minimumReceived: minimumReceived.toFixed(6)
    }

    setQuote(newQuote)
    setToAmount(newQuote.toAmount)
    setIsLoading(false)
  }

  const handleSwapDirectionToggle = () => {
    setSwapDirection(swapDirection === 'buy' ? 'sell' : 'buy')
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const executeSwap = async () => {
    if (!wallet?.isConnected || !quote) return

    setIsLoading(true)
    
    try {
      // Simulate transaction
      console.log('Executing swap:', {
        from: swapDirection === 'buy' ? 'USDC' : crypto.symbol,
        to: swapDirection === 'buy' ? crypto.symbol : 'USDC',
        fromAmount: quote.fromAmount,
        toAmount: quote.toAmount,
        platformFee: quote.platformFee,
        platformWallet: PLATFORM_WALLET_ADDRESS,
        userWallet: wallet.address
      })

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert(`✅ Swap successful!\n\nSwapped ${quote.fromAmount} ${swapDirection === 'buy' ? 'USDC' : crypto.symbol} for ${quote.toAmount} ${swapDirection === 'buy' ? crypto.symbol : 'USDC'}\n\nPlatform fee: $${quote.platformFee.toFixed(4)} sent to ${PLATFORM_WALLET_ADDRESS}`)
      
      // Reset form
      setFromAmount('')
      setToAmount('')
      setQuote(null)
      
    } catch (error) {
      console.error('Swap failed:', error)
      alert('❌ Swap failed. Please try again.')
    }
    
    setIsLoading(false)
  }

  const fromCurrency = swapDirection === 'buy' ? 'USDC' : crypto.symbol
  const toCurrency = swapDirection === 'buy' ? crypto.symbol : 'USDC'

  return (
    <div className="bg-white border border-[#EFF2F5] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#1E1932]">Trade {crypto.symbol}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSwapDirection('buy')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              swapDirection === 'buy' 
                ? 'bg-[#16C784] text-white' 
                : 'bg-[#F8F9FF] text-[#8C8C8C] hover:bg-[#F0F0F0]'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setSwapDirection('sell')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              swapDirection === 'sell' 
                ? 'bg-[#EA3943] text-white' 
                : 'bg-[#F8F9FF] text-[#8C8C8C] hover:bg-[#F0F0F0]'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Network Badge */}
      <div className="mb-4 p-3 bg-[#F8F9FF] rounded-lg border border-[#E0E7FF]">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#3861FB]" />
          <span className="text-sm font-medium text-[#3861FB]">
            Trading on {crypto.chainName} Network
          </span>
        </div>
      </div>

      {/* From Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#8C8C8C] mb-2">
          From
        </label>
        <div className="relative">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.00"
            className="w-full p-4 pr-20 border border-[#F0F0F0] rounded-lg focus:outline-none focus:border-[#3861FB] focus:ring-2 focus:ring-[#3861FB]/20 text-lg"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {fromCurrency === 'USDC' ? (
              <div className="w-6 h-6 bg-[#2775CA] rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            ) : (
              <img src={crypto.logo} alt={crypto.symbol} className="w-6 h-6 rounded-full" />
            )}
            <span className="font-semibold text-[#1E1932]">{fromCurrency}</span>
          </div>
        </div>
      </div>

      {/* Swap Direction Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleSwapDirectionToggle}
          className="p-2 border border-[#F0F0F0] rounded-lg hover:border-[#3861FB] hover:bg-[#F8F9FF] transition-colors"
        >
          <ArrowUpDown className="w-5 h-5 text-[#8C8C8C]" />
        </button>
      </div>

      {/* To Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#8C8C8C] mb-2">
          To
        </label>
        <div className="relative">
          <input
            type="number"
            value={toAmount}
            readOnly
            placeholder="0.00"
            className="w-full p-4 pr-20 border border-[#F0F0F0] rounded-lg bg-[#F8F9FF] text-lg text-[#8C8C8C]"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {toCurrency === 'USDC' ? (
              <div className="w-6 h-6 bg-[#2775CA] rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            ) : (
              <img src={crypto.logo} alt={crypto.symbol} className="w-6 h-6 rounded-full" />
            )}
            <span className="font-semibold text-[#1E1932]">{toCurrency}</span>
          </div>
        </div>
      </div>

      {/* Quote Information */}
      {quote && (
        <div className="mb-4 p-4 bg-[#F8F9FF] rounded-lg border border-[#E0E7FF]">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#8C8C8C]">Rate</span>
              <span className="font-medium text-[#1E1932]">
                1 {fromCurrency} = {(parseFloat(quote.toAmount) / parseFloat(quote.fromAmount)).toFixed(6)} {toCurrency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8C8C]">Platform Fee (0.5%)</span>
              <span className="font-medium text-[#1E1932]">${quote.platformFee.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8C8C]">Network Fee</span>
              <span className="font-medium text-[#1E1932]">${quote.networkFee.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8C8C]">Price Impact</span>
              <span className={`font-medium ${quote.priceImpact > 3 ? 'text-[#EA3943]' : 'text-[#16C784]'}`}>
                {quote.priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between border-t border-[#E0E7FF] pt-2">
              <span className="text-[#8C8C8C]">Minimum Received</span>
              <span className="font-medium text-[#1E1932]">{quote.minimumReceived} {toCurrency}</span>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Settings */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-[#3861FB] hover:text-[#3861FB]/80 mb-3"
        >
          <span>Advanced Settings</span>
          <ArrowUpDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>
        
        {showAdvanced && (
          <div className="p-4 bg-[#F8F9FF] rounded-lg border border-[#E0E7FF]">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#8C8C8C] mb-2">
                Slippage Tolerance
              </label>
              <div className="flex space-x-2">
                {[0.1, 0.5, 1.0].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSlippage(value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      slippage === value
                        ? 'bg-[#3861FB] text-white'
                        : 'bg-white border border-[#F0F0F0] text-[#8C8C8C] hover:border-[#3861FB]'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border border-[#F0F0F0] rounded-lg text-sm text-center"
                  step="0.1"
                  min="0"
                  max="50"
                />
              </div>
            </div>
            
            <div className="p-3 bg-[#FFF3CD] border border-[#FFEAA7] rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-[#D69E2E] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-[#D69E2E]">
                  <div className="font-medium mb-1">Platform Fee Information</div>
                  <div>0.5% of each trade goes to our platform wallet:</div>
                  <div className="font-mono text-xs mt-1 break-all">{PLATFORM_WALLET_ADDRESS}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trade Button */}
      <button
        onClick={executeSwap}
        disabled={!wallet?.isConnected || !quote || isLoading || parseFloat(fromAmount) <= 0}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
          !wallet?.isConnected
            ? 'bg-[#F0F0F0] text-[#8C8C8C] cursor-not-allowed'
            : !quote || parseFloat(fromAmount) <= 0
            ? 'bg-[#F0F0F0] text-[#8C8C8C] cursor-not-allowed'
            : isLoading
            ? 'bg-[#8C8C8C] text-white cursor-wait'
            : swapDirection === 'buy'
            ? 'bg-[#16C784] text-white hover:bg-[#16C784]/90 shadow-lg'
            : 'bg-[#EA3943] text-white hover:bg-[#EA3943]/90 shadow-lg'
        }`}
      >
        {!wallet?.isConnected
          ? 'Connect Wallet to Trade'
          : isLoading
          ? 'Processing...'
          : !quote || parseFloat(fromAmount) <= 0
          ? 'Enter Amount'
          : `${swapDirection === 'buy' ? 'Buy' : 'Sell'} ${crypto.symbol}`
        }
      </button>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['25%', '50%', '75%', 'Max'].map((percentage) => (
          <button
            key={percentage}
            onClick={() => {
              // Simulate balance and set percentage
              const mockBalance = 1000 // Mock balance
              const amount = percentage === 'Max' ? mockBalance : (mockBalance * parseInt(percentage)) / 100
              setFromAmount(amount.toString())
            }}
            className="py-2 border border-[#F0F0F0] rounded-lg text-sm font-medium text-[#8C8C8C] hover:border-[#3861FB] hover:text-[#3861FB] transition-colors"
          >
            {percentage}
          </button>
        ))}
      </div>
    </div>
  )
}