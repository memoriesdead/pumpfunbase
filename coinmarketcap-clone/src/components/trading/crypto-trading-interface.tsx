'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ArrowUpDown, Settings, Info, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { tradingService, TradeQuote } from '@/lib/trading-service'
import { SUPPORTED_CHAINS, getPopularTokens } from '@/lib/zerox-config'

interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
}

interface TradeState {
  sellToken: Token | null
  buyToken: Token | null
  sellAmount: string
  buyAmount: string
  slippage: number
  quote: TradeQuote | null
  isLoading: boolean
  error: string | null
  needsApproval: boolean
  approvalTxHash: string | null
  tradeTxHash: string | null
  tradeStatus: 'idle' | 'quoting' | 'approving' | 'trading' | 'completed' | 'failed'
}

export function CryptoTradingInterface() {
  const [selectedChain, setSelectedChain] = useState(1) // Ethereum by default
  const [connectedAddress, setConnectedAddress] = useState<string>('')
  const [showSettings, setShowSettings] = useState(false)
  
  const [trade, setTrade] = useState<TradeState>({
    sellToken: null,
    buyToken: null,
    sellAmount: '',
    buyAmount: '',
    slippage: 1.0,
    quote: null,
    isLoading: false,
    error: null,
    needsApproval: false,
    approvalTxHash: null,
    tradeTxHash: null,
    tradeStatus: 'idle'
  })

  const supportedChains = tradingService.getSupportedChains()
  const availableTokens = getPopularTokens(selectedChain)

  // Mock wallet connection (replace with actual wallet integration)
  const connectWallet = useCallback(async () => {
    // In production, integrate with MetaMask, WalletConnect, etc.
    setConnectedAddress('0x742d35Cc6634C0532925a3b8D53419a6A68A05a9')
  }, [])

  // Get quote when trade parameters change
  const updateQuote = useCallback(async () => {
    if (!trade.sellToken || !trade.buyToken || !trade.sellAmount || parseFloat(trade.sellAmount) <= 0) {
      setTrade(prev => ({ ...prev, quote: null, buyAmount: '' }))
      return
    }

    setTrade(prev => ({ ...prev, isLoading: true, error: null, tradeStatus: 'quoting' }))

    try {
      const sellAmountWei = tradingService.parseTokenAmount(trade.sellAmount, trade.sellToken.decimals)
      
      const quote = await tradingService.getQuote({
        sellToken: trade.sellToken.address,
        buyToken: trade.buyToken.address,
        sellAmount: sellAmountWei,
        chainId: selectedChain,
        takerAddress: connectedAddress,
        slippageBps: Math.floor(trade.slippage * 100)
      })

      const buyAmountFormatted = tradingService.formatTokenAmount(quote.buyAmount, trade.buyToken.decimals)

      setTrade(prev => ({
        ...prev,
        quote,
        buyAmount: buyAmountFormatted,
        isLoading: false,
        tradeStatus: 'idle'
      }))

      // Check if approval is needed
      if (connectedAddress && trade.sellToken.address !== '0x0000000000000000000000000000000000000000') {
        const allowanceData = await tradingService.checkAllowance({
          tokenAddress: trade.sellToken.address,
          ownerAddress: connectedAddress,
          chainId: selectedChain
        })
        
        setTrade(prev => ({
          ...prev,
          needsApproval: allowanceData.isApprovalNeeded
        }))
      }

    } catch (error) {
      setTrade(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get quote',
        tradeStatus: 'failed'
      }))
    }
  }, [trade.sellToken, trade.buyToken, trade.sellAmount, trade.slippage, selectedChain, connectedAddress])

  // Execute token approval
  const approveToken = async () => {
    if (!trade.sellToken || !connectedAddress) return

    setTrade(prev => ({ ...prev, tradeStatus: 'approving' }))

    try {
      const allowanceData = await tradingService.checkAllowance({
        tokenAddress: trade.sellToken.address,
        ownerAddress: connectedAddress,
        chainId: selectedChain
      })

      if (allowanceData.approvalTransaction) {
        // In production, send this transaction through the user's wallet
        console.log('Approval transaction:', allowanceData.approvalTransaction)
        
        // Mock approval success
        setTimeout(() => {
          setTrade(prev => ({
            ...prev,
            needsApproval: false,
            approvalTxHash: '0x' + Math.random().toString(16).substring(2),
            tradeStatus: 'idle'
          }))
        }, 2000)
      }

    } catch (error) {
      setTrade(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Approval failed',
        tradeStatus: 'failed'
      }))
    }
  }

  // Execute the trade
  const executeTrade = async () => {
    if (!trade.sellToken || !trade.buyToken || !trade.sellAmount || !connectedAddress) return

    setTrade(prev => ({ ...prev, tradeStatus: 'trading' }))

    try {
      const sellAmountWei = tradingService.parseTokenAmount(trade.sellAmount, trade.sellToken.decimals)
      
      const swapTx = await tradingService.executeSwap({
        sellToken: trade.sellToken.address,
        buyToken: trade.buyToken.address,
        sellAmount: sellAmountWei,
        chainId: selectedChain,
        takerAddress: connectedAddress,
        slippageBps: Math.floor(trade.slippage * 100)
      })

      // In production, send this transaction through the user's wallet
      console.log('Swap transaction:', swapTx)
      
      // Mock trade success
      setTimeout(() => {
        setTrade(prev => ({
          ...prev,
          tradeTxHash: '0x' + Math.random().toString(16).substring(2),
          tradeStatus: 'completed'
        }))
      }, 3000)

    } catch (error) {
      setTrade(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Trade failed',
        tradeStatus: 'failed'
      }))
    }
  }

  // Swap sell and buy tokens
  const swapTokens = () => {
    setTrade(prev => ({
      ...prev,
      sellToken: prev.buyToken,
      buyToken: prev.sellToken,
      sellAmount: prev.buyAmount,
      buyAmount: prev.sellAmount,
      quote: null
    }))
  }

  // Update quote when relevant parameters change
  useEffect(() => {
    const timeoutId = setTimeout(updateQuote, 500)
    return () => clearTimeout(timeoutId)
  }, [updateQuote])

  const canTrade = trade.sellToken && trade.buyToken && trade.sellAmount && 
                  parseFloat(trade.sellAmount) > 0 && trade.quote && 
                  connectedAddress && !trade.needsApproval &&
                  trade.tradeStatus === 'idle'

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Swap Crypto</h2>
        <div className="flex items-center gap-2">
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(parseInt(e.target.value))}
            className="text-sm border rounded-lg px-2 py-1"
          >
            {supportedChains.map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Wallet Connection */}
      {!connectedAddress && (
        <button
          onClick={connectWallet}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mb-4 hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}

      {connectedAddress && (
        <div className="text-sm text-gray-600 mb-4">
          Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Slippage Tolerance</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={trade.slippage}
                onChange={(e) => setTrade(prev => ({ ...prev, slippage: parseFloat(e.target.value) || 0 }))}
                className="w-16 text-sm border rounded px-2 py-1"
                step="0.1"
                min="0.1"
                max="50"
              />
              <span className="text-sm">%</span>
            </div>
          </div>
        </div>
      )}

      {/* Sell Token Input */}
      <div className="border rounded-lg p-4 mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">You pay</span>
          <span className="text-sm text-gray-600">Balance: 0</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={trade.sellAmount}
            onChange={(e) => setTrade(prev => ({ ...prev, sellAmount: e.target.value }))}
            placeholder="0.0"
            className="flex-1 text-2xl font-medium outline-none"
          />
          <select
            value={trade.sellToken?.address || ''}
            onChange={(e) => {
              const token = availableTokens.find(t => t.address === e.target.value)
              setTrade(prev => ({ ...prev, sellToken: token || null }))
            }}
            className="border rounded-lg px-3 py-2 font-medium"
          >
            <option value="">Select token</option>
            {availableTokens.map(token => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-1 relative z-10">
        <button
          onClick={swapTokens}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full border-4 border-white"
        >
          <ArrowUpDown className="w-4 h-4" />
        </button>
      </div>

      {/* Buy Token Input */}
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">You receive</span>
          <span className="text-sm text-gray-600">Balance: 0</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={trade.buyAmount}
            readOnly
            placeholder="0.0"
            className="flex-1 text-2xl font-medium outline-none bg-gray-50"
          />
          <select
            value={trade.buyToken?.address || ''}
            onChange={(e) => {
              const token = availableTokens.find(t => t.address === e.target.value)
              setTrade(prev => ({ ...prev, buyToken: token || null }))
            }}
            className="border rounded-lg px-3 py-2 font-medium"
          >
            <option value="">Select token</option>
            {availableTokens.map(token => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quote Information */}
      {trade.quote && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between items-center mb-1">
            <span>Price Impact</span>
            <span className={trade.quote.priceImpact > 5 ? 'text-red-600' : 'text-green-600'}>
              {trade.quote.priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span>Platform Fee</span>
            <span>{trade.quote.platformFee.bps / 100}%</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span>Gas Fee</span>
            <span>~${(parseFloat(trade.quote.estimatedGas) * 20 / 1e9 * 2000).toFixed(2)}</span>
          </div>
          <div className="text-xs text-gray-600 mt-2">
            Route: {trade.quote.route.map(r => `${r.exchange} (${r.percentage.toFixed(1)}%)`).join(' + ')}
          </div>
        </div>
      )}

      {/* Error Message */}
      {trade.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700">{trade.error}</span>
        </div>
      )}

      {/* Trading Status */}
      {trade.tradeStatus !== 'idle' && trade.tradeStatus !== 'failed' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          {trade.tradeStatus === 'completed' ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          )}
          <span className="text-sm text-blue-700">
            {trade.tradeStatus === 'quoting' && 'Getting quote...'}
            {trade.tradeStatus === 'approving' && 'Approving token...'}
            {trade.tradeStatus === 'trading' && 'Executing trade...'}
            {trade.tradeStatus === 'completed' && 'Trade completed successfully!'}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        {trade.needsApproval && connectedAddress && (
          <button
            onClick={approveToken}
            disabled={trade.tradeStatus === 'approving'}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50"
          >
            {trade.tradeStatus === 'approving' ? 'Approving...' : `Approve ${trade.sellToken?.symbol}`}
          </button>
        )}

        <button
          onClick={executeTrade}
          disabled={!canTrade || trade.tradeStatus === 'trading'}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!connectedAddress ? 'Connect Wallet' :
           !trade.sellToken || !trade.buyToken ? 'Select tokens' :
           !trade.sellAmount ? 'Enter amount' :
           trade.needsApproval ? 'Approve required' :
           trade.isLoading ? 'Getting quote...' :
           trade.tradeStatus === 'trading' ? 'Trading...' :
           'Swap'}
        </button>
      </div>

      {/* Transaction Hashes */}
      {(trade.approvalTxHash || trade.tradeTxHash) && (
        <div className="mt-4 text-xs text-gray-600">
          {trade.approvalTxHash && (
            <div>Approval: {trade.approvalTxHash.slice(0, 10)}...{trade.approvalTxHash.slice(-8)}</div>
          )}
          {trade.tradeTxHash && (
            <div>Trade: {trade.tradeTxHash.slice(0, 10)}...{trade.tradeTxHash.slice(-8)}</div>
          )}
        </div>
      )}

      {/* Platform Fee Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Info className="w-4 h-4" />
          <span>Platform fee: {tradingService.getPlatformFeeConfig().percentage} on each trade</span>
        </div>
      </div>
    </div>
  )
}