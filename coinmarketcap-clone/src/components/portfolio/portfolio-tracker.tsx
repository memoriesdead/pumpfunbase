'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, PlusCircle, MinusCircle, ExternalLink, Calendar, DollarSign } from 'lucide-react'
import { PLATFORM_WALLET_ADDRESS } from '../wallet/wallet-connect'

interface Transaction {
  id: string
  type: 'buy' | 'sell'
  symbol: string
  amount: number
  price: number
  value: number
  fee: number
  timestamp: Date
  txHash: string
  status: 'completed' | 'pending' | 'failed'
}

interface Holding {
  symbol: string
  name: string
  logo: string
  amount: number
  avgBuyPrice: number
  currentPrice: number
  value: number
  pnl: number
  pnlPercentage: number
}

interface PortfolioStats {
  totalValue: number
  totalInvested: number
  totalPnL: number
  totalPnLPercentage: number
  totalFeesPaid: number
  bestPerformer: Holding | null
  worstPerformer: Holding | null
}

export default function PortfolioTracker({ wallet }: { wallet?: any }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'transactions'>('overview')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [stats, setStats] = useState<PortfolioStats | null>(null)

  // Mock data - in real app this would come from blockchain/database
  useEffect(() => {
    if (wallet?.isConnected) {
      loadPortfolioData()
    }
  }, [wallet])

  const loadPortfolioData = () => {
    // Mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'buy',
        symbol: 'BTC',
        amount: 0.1,
        price: 95000,
        value: 9500,
        fee: 47.5,
        timestamp: new Date('2024-07-25T10:30:00Z'),
        txHash: '0x1234...5678',
        status: 'completed'
      },
      {
        id: '2',
        type: 'buy',
        symbol: 'ETH',
        amount: 2.5,
        price: 3600,
        value: 9000,
        fee: 45,
        timestamp: new Date('2024-07-24T15:20:00Z'),
        txHash: '0x2345...6789',
        status: 'completed'
      },
      {
        id: '3',
        type: 'sell',
        symbol: 'SOL',
        amount: 20,
        price: 230,
        value: 4600,
        fee: 23,
        timestamp: new Date('2024-07-23T09:15:00Z'),
        txHash: '0x3456...7890',
        status: 'completed'
      },
      {
        id: '4',
        type: 'buy',
        symbol: 'LINK',
        amount: 100,
        price: 28,
        value: 2800,
        fee: 14,
        timestamp: new Date('2024-07-22T14:45:00Z'),
        txHash: '0x4567...8901',
        status: 'completed'
      }
    ]

    // Mock holdings
    const mockHoldings: Holding[] = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        amount: 0.1,
        avgBuyPrice: 95000,
        currentPrice: 98500,
        value: 9850,
        pnl: 350,
        pnlPercentage: 3.68
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        logo: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        amount: 2.5,
        avgBuyPrice: 3600,
        currentPrice: 3750,
        value: 9375,
        pnl: 375,
        pnlPercentage: 4.17
      },
      {
        symbol: 'LINK',
        name: 'Chainlink',
        logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
        amount: 100,
        avgBuyPrice: 28,
        currentPrice: 29.5,
        value: 2950,
        pnl: 150,
        pnlPercentage: 5.36
      }
    ]

    setTransactions(mockTransactions)
    setHoldings(mockHoldings)

    // Calculate stats
    const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.value, 0)
    const totalInvested = mockHoldings.reduce((sum, holding) => sum + (holding.amount * holding.avgBuyPrice), 0)
    const totalPnL = mockHoldings.reduce((sum, holding) => sum + holding.pnl, 0)
    const totalFeesPaid = mockTransactions.reduce((sum, tx) => sum + tx.fee, 0)
    const bestPerformer = mockHoldings.reduce((best, current) => 
      current.pnlPercentage > (best?.pnlPercentage || -Infinity) ? current : best, null)
    const worstPerformer = mockHoldings.reduce((worst, current) => 
      current.pnlPercentage < (worst?.pnlPercentage || Infinity) ? current : worst, null)

    setStats({
      totalValue,
      totalInvested,
      totalPnL,
      totalPnLPercentage: (totalPnL / totalInvested) * 100,
      totalFeesPaid,
      bestPerformer,
      worstPerformer
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (!wallet?.isConnected) {
    return (
      <div className="bg-white border border-[#EFF2F5] rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-[#F8F9FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-[#3861FB]" />
        </div>
        <h3 className="text-xl font-bold text-[#1E1932] mb-2">Track Your Portfolio</h3>
        <p className="text-[#8C8C8C] mb-6">
          Connect your wallet to view your trading history and portfolio performance.
        </p>
        <button className="px-6 py-3 bg-[#3861FB] text-white rounded-lg hover:bg-[#3861FB]/90 transition-colors font-semibold">
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#EFF2F5] rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-[#EFF2F5] px-6 pt-6">
        <div className="flex space-x-6">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'holdings', label: 'Holdings', icon: DollarSign },
            { id: 'transactions', label: 'Transactions', icon: Calendar }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-[#3861FB] text-[#3861FB]'
                  : 'border-transparent text-[#8C8C8C] hover:text-[#1E1932]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#3861FB] to-[#1652F0] rounded-lg p-6 text-white">
                <div className="text-sm opacity-80 mb-2">Total Portfolio Value</div>
                <div className="text-3xl font-bold">{formatCurrency(stats.totalValue)}</div>
                <div className="flex items-center space-x-2 mt-2">
                  {stats.totalPnL >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {stats.totalPnL >= 0 ? '+' : ''}{formatCurrency(stats.totalPnL)} ({stats.totalPnLPercentage.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="bg-[#F8F9FF] rounded-lg p-6">
                <div className="text-sm text-[#8C8C8C] mb-2">Total Invested</div>
                <div className="text-2xl font-bold text-[#1E1932]">{formatCurrency(stats.totalInvested)}</div>
                <div className="text-sm text-[#8C8C8C] mt-2">
                  Fees Paid: {formatCurrency(stats.totalFeesPaid)}
                </div>
              </div>

              <div className="bg-[#F8F9FF] rounded-lg p-6">
                <div className="text-sm text-[#8C8C8C] mb-2">Platform Fees Contributed</div>
                <div className="text-2xl font-bold text-[#1E1932]">{formatCurrency(stats.totalFeesPaid)}</div>
                <div className="text-xs text-[#8C8C8C] mt-2 font-mono break-all">
                  To: {PLATFORM_WALLET_ADDRESS.slice(0, 10)}...
                </div>
              </div>
            </div>

            {/* Best/Worst Performers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.bestPerformer && (
                <div className="border border-[#16C784]/20 bg-[#16C784]/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={stats.bestPerformer.logo} alt={stats.bestPerformer.symbol} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-semibold text-[#1E1932]">{stats.bestPerformer.symbol}</div>
                        <div className="text-sm text-[#8C8C8C]">Best Performer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#16C784] font-bold">+{stats.bestPerformer.pnlPercentage.toFixed(2)}%</div>
                      <div className="text-sm text-[#16C784]">{formatCurrency(stats.bestPerformer.pnl)}</div>
                    </div>
                  </div>
                </div>
              )}

              {stats.worstPerformer && (
                <div className="border border-[#EA3943]/20 bg-[#EA3943]/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={stats.worstPerformer.logo} alt={stats.worstPerformer.symbol} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-semibold text-[#1E1932]">{stats.worstPerformer.symbol}</div>
                        <div className="text-sm text-[#8C8C8C]">Worst Performer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#EA3943] font-bold">{stats.worstPerformer.pnlPercentage.toFixed(2)}%</div>
                      <div className="text-sm text-[#EA3943]">{formatCurrency(stats.worstPerformer.pnl)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Holdings Tab */}
        {activeTab === 'holdings' && (
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.symbol} className="border border-[#F0F0F0] rounded-lg p-4 hover:border-[#3861FB]/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={holding.logo} alt={holding.symbol} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold text-[#1E1932]">{holding.name}</div>
                      <div className="text-sm text-[#8C8C8C]">{holding.amount} {holding.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#1E1932]">{formatCurrency(holding.value)}</div>
                    <div className={`text-sm flex items-center space-x-1 ${
                      holding.pnl >= 0 ? 'text-[#16C784]' : 'text-[#EA3943]'
                    }`}>
                      {holding.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)} ({holding.pnlPercentage.toFixed(2)}%)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#F0F0F0] text-sm">
                  <div>
                    <span className="text-[#8C8C8C]">Avg Buy Price: </span>
                    <span className="font-medium">{formatCurrency(holding.avgBuyPrice)}</span>
                  </div>
                  <div>
                    <span className="text-[#8C8C8C]">Current Price: </span>
                    <span className="font-medium">{formatCurrency(holding.currentPrice)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border border-[#F0F0F0] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' ? 'bg-[#16C784]/10' : 'bg-[#EA3943]/10'
                    }`}>
                      {tx.type === 'buy' ? (
                        <PlusCircle className="w-5 h-5 text-[#16C784]" />
                      ) : (
                        <MinusCircle className="w-5 h-5 text-[#EA3943]" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1E1932]">
                        {tx.type.toUpperCase()} {tx.symbol}
                      </div>
                      <div className="text-sm text-[#8C8C8C]">
                        {tx.amount} @ {formatCurrency(tx.price)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#1E1932]">{formatCurrency(tx.value)}</div>
                    <div className="text-sm text-[#8C8C8C]">
                      Fee: {formatCurrency(tx.fee)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0F0F0] text-sm">
                  <div className="text-[#8C8C8C]">
                    {formatDate(tx.timestamp)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-[#16C784]/10 text-[#16C784]' :
                      tx.status === 'pending' ? 'bg-[#FFA500]/10 text-[#FFA500]' :
                      'bg-[#EA3943]/10 text-[#EA3943]'
                    }`}>
                      {tx.status}
                    </span>
                    <button
                      onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, '_blank')}
                      className="text-[#3861FB] hover:text-[#3861FB]/80"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}