import { NextResponse } from 'next/server'
import { ZEROX_CONFIG } from '@/lib/zerox-config'

interface FeeCalculationRequest {
  buyAmount: string
  sellAmount: string
  customFeeBps?: number
}

interface FeeCalculationResponse {
  platformFee: {
    bps: number
    percentage: string
    amount: string
    recipient: string
    enabled: boolean
  }
  gas: {
    estimatedGas: string
    gasPrice?: string
    totalGasCost?: string
  }
  breakdown: {
    userReceives: string
    platformFeeAmount: string
    totalCost: string
  }
  recommendations: {
    optimalSlippage: number
    minReceived: string
    priceImpactWarning: boolean
  }
}

interface FeeHistoryResponse {
  totalFeesCollected: string
  totalTrades: number
  averageFeePerTrade: string
  last24Hours: {
    feesCollected: string
    tradeCount: number
  }
  last7Days: {
    feesCollected: string
    tradeCount: number
  }
  topTradingPairs: Array<{
    pair: string
    volume: string
    fees: string
    count: number
  }>
}

// Mock fee collection history (in production, use a database)
const mockFeeHistory = {
  totalFeesCollected: '125847.32',
  totalTrades: 2847,
  averageFeePerTrade: '44.23',
  last24Hours: {
    feesCollected: '3247.89',
    tradeCount: 73
  },
  last7Days: {
    feesCollected: '18934.57',
    tradeCount: 428
  },
  topTradingPairs: [
    { pair: 'ETH/USDC', volume: '2847293.45', fees: '14236.47', count: 387 },
    { pair: 'WBTC/ETH', volume: '1923847.32', fees: '9619.24', count: 234 },
    { pair: 'USDT/USDC', volume: '892374.23', fees: '4461.87', count: 156 },
    { pair: 'MATIC/ETH', volume: '674829.38', fees: '3374.15', count: 123 },
    { pair: 'LINK/ETH', volume: '483729.47', fees: '2418.65', count: 89 }
  ]
}

export async function POST(request: Request) {
  try {
    const body: FeeCalculationRequest = await request.json()
    
    const {
      buyAmount,
      sellAmount,
      customFeeBps = ZEROX_CONFIG.platformFeeBps
    } = body

    // Validate required parameters
    if (!buyAmount || !sellAmount) {
      return NextResponse.json(
        { error: 'buyAmount and sellAmount are required' },
        { status: 400 }
      )
    }

    // Calculate platform fee
    const buyAmountBigInt = BigInt(buyAmount)
    const platformFeeAmount = (buyAmountBigInt * BigInt(customFeeBps)) / BigInt(10000)
    const userReceives = buyAmountBigInt - platformFeeAmount

    // Calculate gas estimates (mock values for demo)
    const estimatedGas = '150000'
    const gasPrice = '20000000000' // 20 gwei
    const totalGasCost = (BigInt(estimatedGas) * BigInt(gasPrice)).toString()

    // Calculate recommendations
    const optimalSlippage = 100 // 1%
    const slippageAmount = (buyAmountBigInt * BigInt(optimalSlippage)) / BigInt(10000)
    const minReceived = (userReceives - slippageAmount).toString()
    
    // Price impact warning (if fee is > 1%)
    const priceImpactWarning = customFeeBps > 100

    const feeCalculation: FeeCalculationResponse = {
      platformFee: {
        bps: customFeeBps,
        percentage: (customFeeBps / 100).toString() + '%',
        amount: platformFeeAmount.toString(),
        recipient: ZEROX_CONFIG.feeRecipient,
        enabled: customFeeBps > 0
      },
      gas: {
        estimatedGas,
        gasPrice,
        totalGasCost
      },
      breakdown: {
        userReceives: userReceives.toString(),
        platformFeeAmount: platformFeeAmount.toString(),
        totalCost: sellAmount
      },
      recommendations: {
        optimalSlippage,
        minReceived,
        priceImpactWarning
      }
    }

    return NextResponse.json(feeCalculation)

  } catch (error) {
    console.error('Fee calculation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'history') {
      // Return fee collection history
      return NextResponse.json(mockFeeHistory)
    }

    if (action === 'config') {
      // Return current fee configuration
      return NextResponse.json({
        platformFeeBps: ZEROX_CONFIG.platformFeeBps,
        feeRecipient: ZEROX_CONFIG.feeRecipient,
        defaultSlippageBps: ZEROX_CONFIG.defaultSlippageBps,
        rateLimit: ZEROX_CONFIG.rateLimit,
        supportedChains: Object.keys(ZEROX_CONFIG).length,
        version: ZEROX_CONFIG.version
      })
    }

    // Default: calculate fees from query parameters
    const buyAmount = searchParams.get('buyAmount')
    const sellAmount = searchParams.get('sellAmount')
    const customFeeBps = searchParams.get('customFeeBps')

    if (!buyAmount || !sellAmount) {
      return NextResponse.json(
        { error: 'buyAmount and sellAmount are required for fee calculation' },
        { status: 400 }
      )
    }

    const feeRequest: FeeCalculationRequest = {
      buyAmount,
      sellAmount,
      customFeeBps: customFeeBps ? parseInt(customFeeBps) : undefined
    }

    // Create a new request object with JSON body
    const mockRequest = new Request(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feeRequest)
    })

    return POST(mockRequest)

  } catch (error) {
    console.error('Fee API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}