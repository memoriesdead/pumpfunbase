'use client'

import React, { useState, useEffect } from 'react'
import { Wallet, CreditCard, ArrowRight, Shield, Zap, TrendingUp, Info, X, CheckCircle, AlertCircle } from 'lucide-react'
import { tradingService } from '@/lib/trading-service'
import { getPopularTokens } from '@/lib/zerox-config'
import { moonPayService } from '@/lib/moonpay-service'

interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

interface EnhancedTradingProps {
  preselectedToken?: {
    symbol: string
    name: string
    logo: string
  }
}

export function EnhancedCryptoTrading({ preselectedToken }: EnhancedTradingProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('card')
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  
  // Trading state
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [fiatAmount, setFiatAmount] = useState('')
  const [cryptoAmount, setCryptoAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange24h, setPriceChange24h] = useState(0)
  
  // Transaction state
  const [txStatus, setTxStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [txHash, setTxHash] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Card payment state
  const [cardOrderId, setCardOrderId] = useState('')
  const [supportedCurrencies, setSupportedCurrencies] = useState<any[]>([])
  const [priceQuote, setPriceQuote] = useState<any>(null)

  const availableTokens = getPopularTokens(1) // Ethereum tokens
  const platformFee = 0.5 // 0.5% platform fee

  // Initialize with preselected token
  useEffect(() => {
    if (preselectedToken) {
      const token = availableTokens.find(t => t.symbol === preselectedToken.symbol)
      if (token) {
        setSelectedToken(token)
        // Mock price data
        setCurrentPrice(Math.random() * 100 + 10)
        setPriceChange24h((Math.random() - 0.5) * 10)
      }
    }
  }, [preselectedToken, availableTokens])

  // Calculate crypto amount when fiat amount changes
  useEffect(() => {
    if (fiatAmount && currentPrice) {
      const cryptoValue = parseFloat(fiatAmount) / currentPrice
      setCryptoAmount(cryptoValue.toFixed(6))
    }
  }, [fiatAmount, currentPrice])

  // Load supported currencies on mount
  useEffect(() => {
    const loadSupportedCurrencies = async () => {
      try {
        const currencies = await moonPayService.getSupportedCurrencies()
        setSupportedCurrencies(currencies || [])
      } catch (error) {
        console.error('Failed to load supported currencies:', error)
      }
    }
    loadSupportedCurrencies()
  }, [])

  // Get price quote for card payments
  useEffect(() => {
    const getPriceQuote = async () => {
      if (selectedToken && fiatAmount && parseFloat(fiatAmount) > 0 && paymentMethod === 'card') {
        try {
          const quote = await moonPayService.getBuyQuote({
            baseCurrency: 'USD',
            currency: selectedToken.symbol.toLowerCase(),
            baseCurrencyAmount: parseFloat(fiatAmount)
          })
          setPriceQuote(quote)
        } catch (error) {
          console.error('Failed to get price quote:', error)
        }
      }
    }
    
    const timeoutId = setTimeout(getPriceQuote, 500)
    return () => clearTimeout(timeoutId)
  }, [selectedToken, fiatAmount, paymentMethod])

  // Mock wallet connection
  const connectWallet = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsConnected(true)
    setUserAddress('0x742d35Cc6634C0532925a3b8D53419a6A68A05a9')
    setIsLoading(false)
  }

  // Execute card payment with MoonPay
  const executeCardPayment = async () => {
    if (!selectedToken || !fiatAmount) return

    setTxStatus('processing')
    setIsLoading(true)

    try {
      const result = await moonPayService.initializeWidget({
        currencyCode: selectedToken.symbol.toLowerCase(),
        baseCurrencyCode: 'USD',
        baseCurrencyAmount: parseFloat(fiatAmount),
        walletAddress: userAddress,
        colorCode: '#1652F0',
        showWalletAddressForm: false,
        redirectURL: window.location.href,
        externalCustomerId: `user_${Date.now()}`
      })

      setCardOrderId(result.transactionId)
      setTxHash(result.cryptoTransactionId || result.transactionId)
      setTxStatus('success')
    } catch (error) {
      setTxStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Card payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Execute crypto wallet transaction
  const executeCryptoTransaction = async () => {
    if (!selectedToken || !fiatAmount) return

    setTxStatus('processing')
    setIsLoading(true)

    try {
      // Use existing 0x protocol integration
      const sellAmountWei = tradingService.parseTokenAmount(fiatAmount, 18) // USDC decimals
      
      const quote = await tradingService.getQuote({
        sellToken: '0xA0b86a33E6c58f5CF7D8F0b22a2E9C8D6d8A8e8b', // USDC on Ethereum
        buyToken: selectedToken.address,
        sellAmount: sellAmountWei,
        chainId: 1,
        takerAddress: userAddress,
        slippageBps: 100
      })

      const swapTx = await tradingService.executeSwap({
        sellToken: '0xA0b86a33E6c58f5CF7D8F0b22a2E9C8D6d8A8e8b',
        buyToken: selectedToken.address,
        sellAmount: sellAmountWei,
        chainId: 1,
        takerAddress: userAddress,
        slippageBps: 100
      })

      // Mock success for demo
      setTimeout(() => {
        setTxHash('0x' + Math.random().toString(16).substring(2, 66))
        setTxStatus('success')
        setIsLoading(false)
      }, 3000)

    } catch (error) {
      setTxStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Transaction failed. Please try again.')
      setIsLoading(false)
    }
  }

  // Main execution function
  const executeBuy = async () => {
    if (paymentMethod === 'card') {
      await executeCardPayment()
    } else {
      await executeCryptoTransaction()
    }
  }

  const resetTransaction = () => {
    setTxStatus('idle')
    setTxHash('')
    setErrorMessage('')
    setFiatAmount('')
    setCryptoAmount('')
    setCardOrderId('')
    setPriceQuote(null)
  }

  // Calculate fees based on payment method
  const totalFees = paymentMethod === 'card' 
    ? (priceQuote?.feeAmount || parseFloat(fiatAmount) * 0.045) // MoonPay fees ~4.5%
    : parseFloat(fiatAmount) * (platformFee / 100) // Crypto fees are 0.5%
  const totalAmount = paymentMethod === 'card' 
    ? (priceQuote?.totalAmount || parseFloat(fiatAmount) + totalFees)
    : parseFloat(fiatAmount) + totalFees

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Buy Cryptocurrency</h2>
            <p className="text-blue-100 mt-1">Powered by 0x Protocol</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
            <Shield className="w-4 h-4" />
            <span>Secure & Fast</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'buy'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <CreditCard className="w-5 h-5 mx-auto mb-1" />
            Buy Crypto
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'sell'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-1" />
            Sell Crypto
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Transaction Success */}
        {txStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Transaction Successful!</h3>
                <p className="text-sm text-green-600 mt-1">
                  You bought {cryptoAmount} {selectedToken?.symbol}
                </p>
                {txHash && (
                  <p className="text-xs text-green-600 mt-1 font-mono">
                    TX: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </p>
                )}
              </div>
              <button
                onClick={resetTransaction}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Transaction Error */}
        {txStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Transaction Failed</h3>
                <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
              </div>
              <button
                onClick={resetTransaction}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border-2 rounded-xl text-center transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">Credit Card</div>
              <div className="text-xs text-gray-500">Instant purchase</div>
            </button>
            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`p-4 border-2 rounded-xl text-center transition-all ${
                paymentMethod === 'crypto'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Wallet className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">Crypto Wallet</div>
              <div className="text-xs text-gray-500">0x Protocol</div>
            </button>
          </div>
        </div>

        {/* Token Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Cryptocurrency
          </label>
          <div className="relative">
            <select
              value={selectedToken?.address || ''}
              onChange={(e) => {
                const token = availableTokens.find(t => t.address === e.target.value)
                setSelectedToken(token || null)
                if (token) {
                  setCurrentPrice(Math.random() * 100 + 10)
                  setPriceChange24h((Math.random() - 0.5) * 10)
                }
              }}
              className="w-full p-4 border border-gray-300 rounded-xl appearance-none bg-white text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a cryptocurrency</option>
              {availableTokens.map(token => (
                <option key={token.address} value={token.address}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Token Info */}
          {selectedToken && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
              <img
                src={selectedToken.logoURI || '/crypto-fallback.png'}
                alt={selectedToken.name}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#3B82F6"/>
                      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">
                        ${selectedToken.symbol.slice(0, 2)}
                      </text>
                    </svg>
                  `)}`
                }}
              />
              <div className="flex-1">
                <div className="font-medium">{selectedToken.name}</div>
                <div className="text-sm text-gray-600">
                  ${currentPrice.toFixed(2)} 
                  <span className={`ml-2 ${priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Amount to Buy
          </label>
          <div className="space-y-3">
            {/* Fiat Amount */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <input
                type="number"
                value={fiatAmount}
                onChange={(e) => setFiatAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-4 text-xl font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                USD
              </span>
            </div>

            {/* Conversion Arrow */}
            {selectedToken && (
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            )}

            {/* Crypto Amount */}
            {selectedToken && cryptoAmount && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">You will receive</div>
                <div className="text-xl font-bold text-gray-900">
                  {cryptoAmount} {selectedToken.symbol}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-2">
            {['$50', '$100', '$250', '$500'].map(amount => (
              <button
                key={amount}
                onClick={() => setFiatAmount(amount.slice(1))}
                className="py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Summary */}
        {fiatAmount && selectedToken && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-3">Transaction Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Purchase Amount</span>
                <span className="font-medium">${fiatAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {paymentMethod === 'card' ? 'Card Processing Fee (~3.5%)' : `Platform Fee (${platformFee}%)`}
                </span>
                <span className="font-medium">${totalFees.toFixed(2)}</span>
              </div>
              {paymentMethod === 'card' && priceQuote && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exchange Rate</span>
                    <span className="font-medium">1 {selectedToken.symbol} = ${(priceQuote.baseCurrencyAmount / priceQuote.currencyAmount)?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">You'll Receive</span>
                    <span className="font-medium">{priceQuote.currencyAmount?.toFixed(6)} {selectedToken.symbol}</span>
                  </div>
                </>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Connection / Action Button */}
        {paymentMethod === 'crypto' && !isConnected ? (
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </>
            )}
          </button>
        ) : (
          <button
            onClick={executeBuy}
            disabled={!selectedToken || !fiatAmount || isLoading || txStatus === 'processing'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {txStatus === 'processing' ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing Transaction...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                {paymentMethod === 'card' ? 'Buy with Card' : 'Buy with Crypto'}
              </>
            )}
          </button>
        )}

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center gap-1">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-gray-600">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-gray-600">Instant</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="text-gray-600">Low Fees</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              {paymentMethod === 'card' 
                ? 'Card payments powered by MoonPay. Crypto wallet transactions powered by 0x Protocol. All transactions are secure and cannot be reversed.'
                : 'Powered by 0x Protocol. Transactions are executed on-chain and cannot be reversed.'
              } Platform fees support continued development and maintenance.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}