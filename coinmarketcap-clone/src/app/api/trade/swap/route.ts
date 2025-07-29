import { NextResponse } from 'next/server'
import { ZEROX_CONFIG, getChainConfig } from '@/lib/zerox-config'

interface SwapRequest {
  sellToken: string
  buyToken: string
  sellAmount?: string
  buyAmount?: string
  chainId: number
  takerAddress: string
  slippageBps?: number
  gasPrice?: string
  enableSlippageProtection?: boolean
  includePlatformFee?: boolean
}

interface ZeroxSwapResponse {
  price: string
  guaranteedPrice: string
  estimatedGas: string
  gasPrice: string
  sellAmount: string
  buyAmount: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  allowanceTarget: string
  to: string
  data: string
  value: string
  sources: Array<{
    name: string
    proportion: string
  }>
  orders: Array<{
    makerToken: string
    takerToken: string
    makerAmount: string
    takerAmount: string
    fillData: {
      tokenAddressPath: string[]
      router: string
    }
    source: string
    sourcePathId: string
    type: number
  }>
}

interface TradeRecord {
  id: string
  chainId: number
  sellToken: string
  buyToken: string
  sellAmount: string
  buyAmount: string
  takerAddress: string
  platformFeeAmount: string
  transactionHash?: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
}

// In-memory trade tracking (in production, use a database)
const tradeRecords: Map<string, TradeRecord> = new Map()

export async function POST(request: Request) {
  try {
    const body: SwapRequest = await request.json()
    
    const {
      sellToken,
      buyToken,
      sellAmount,
      buyAmount,
      chainId,
      takerAddress,
      slippageBps = ZEROX_CONFIG.defaultSlippageBps,
      gasPrice,
      enableSlippageProtection = true,
      includePlatformFee = true
    } = body

    // Validate required parameters
    if (!sellToken || !buyToken || !chainId || !takerAddress) {
      return NextResponse.json(
        { error: 'sellToken, buyToken, chainId, and takerAddress are required' },
        { status: 400 }
      )
    }

    if (!sellAmount && !buyAmount) {
      return NextResponse.json(
        { error: 'Either sellAmount or buyAmount must be provided' },
        { status: 400 }
      )
    }

    // Validate chain support
    const chainConfig = getChainConfig(chainId)
    if (!chainConfig || !chainConfig.supportedFeatures.includes('swap')) {
      return NextResponse.json(
        { error: `Swap not supported on chain ${chainId}` },
        { status: 400 }
      )
    }

    // Build 0x API URL
    const baseUrl = `${ZEROX_CONFIG.baseUrl}/swap/v1/quote`
    const params = new URLSearchParams({
      sellToken,
      buyToken,
      takerAddress,
      slippagePercentage: (slippageBps / 10000).toString(),
      skipValidation: 'false',
      enableSlippageProtection: enableSlippageProtection.toString(),
    })

    if (sellAmount) params.append('sellAmount', sellAmount)
    if (buyAmount) params.append('buyAmount', buyAmount)
    if (gasPrice) params.append('gasPrice', gasPrice)

    // Add platform fee if enabled
    if (includePlatformFee && ZEROX_CONFIG.platformFeeBps > 0) {
      params.append('feeRecipient', ZEROX_CONFIG.feeRecipient)
      params.append('buyTokenPercentageFee', (ZEROX_CONFIG.platformFeeBps / 10000).toString())
    }

    const apiUrl = `${baseUrl}?${params.toString()}`

    // Make request to 0x API with timeout protection
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(apiUrl, {
      headers: {
        '0x-api-key': ZEROX_CONFIG.apiKey,
        '0x-version': 'v2',
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('0x Swap API error:', response.status, errorText)
      
      return NextResponse.json(
        { 
          error: 'Failed to get swap transaction from 0x API',
          details: errorText 
        },
        { status: response.status }
      )
    }

    const swapData: ZeroxSwapResponse = await response.json()

    // Calculate platform fee
    const platformFeeAmount = includePlatformFee && ZEROX_CONFIG.platformFeeBps > 0
      ? (BigInt(swapData.buyAmount) * BigInt(ZEROX_CONFIG.platformFeeBps)) / BigInt(10000)
      : BigInt(0)

    // Generate trade ID and record
    const tradeId = generateTradeId()
    const tradeRecord: TradeRecord = {
      id: tradeId,
      chainId,
      sellToken,
      buyToken,
      sellAmount: swapData.sellAmount,
      buyAmount: swapData.buyAmount,
      takerAddress,
      platformFeeAmount: platformFeeAmount.toString(),
      status: 'pending',
      timestamp: new Date().toISOString()
    }

    // Store trade record
    tradeRecords.set(tradeId, tradeRecord)

    // Enhanced swap response with our platform data
    const enhancedSwap = {
      // 0x transaction data
      transaction: {
        to: swapData.to,
        data: swapData.data,
        value: swapData.value,
        gasPrice: swapData.gasPrice,
        estimatedGas: swapData.estimatedGas,
      },
      
      // Trade details
      trade: {
        id: tradeId,
        sellToken,
        buyToken,
        sellAmount: swapData.sellAmount,
        buyAmount: swapData.buyAmount,
        price: swapData.price,
        guaranteedPrice: swapData.guaranteedPrice,
        allowanceTarget: swapData.allowanceTarget,
      },

      // Platform fee information
      platformFee: {
        enabled: includePlatformFee,
        bps: ZEROX_CONFIG.platformFeeBps,
        amount: platformFeeAmount.toString(),
        recipient: ZEROX_CONFIG.feeRecipient,
        percentage: (ZEROX_CONFIG.platformFeeBps / 100).toString() + '%'
      },

      // Trading parameters
      parameters: {
        chainId,
        chainName: chainConfig.name,
        slippageBps,
        enableSlippageProtection,
        priceImpact: calculatePriceImpact(swapData.price, swapData.guaranteedPrice),
      },

      // Liquidity sources
      route: swapData.sources.map(source => ({
        exchange: source.name,
        percentage: parseFloat(source.proportion) * 100
      })),

      // Orders breakdown
      orders: swapData.orders?.map(order => ({
        source: order.source,
        type: order.type,
        makerToken: order.makerToken,
        takerToken: order.takerToken,
        makerAmount: order.makerAmount,
        takerAmount: order.takerAmount,
      })) || [],

      // Metadata
      metadata: {
        timestamp: new Date().toISOString(),
        expiresAt: Date.now() + 60000, // 1 minute expiry
        apiVersion: 'v2',
      }
    }

    return NextResponse.json(enhancedSwap)

  } catch (error) {
    console.error('Swap API error:', error)
    
    // Handle specific timeout errors
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - please try again' },
        { status: 408 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Update trade status endpoint
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tradeId = searchParams.get('tradeId')
    const body = await request.json()
    
    if (!tradeId) {
      return NextResponse.json(
        { error: 'tradeId is required' },
        { status: 400 }
      )
    }

    const tradeRecord = tradeRecords.get(tradeId)
    if (!tradeRecord) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      )
    }

    // Update trade record
    if (body.transactionHash) {
      tradeRecord.transactionHash = body.transactionHash
    }
    if (body.status) {
      tradeRecord.status = body.status
    }

    tradeRecords.set(tradeId, tradeRecord)

    return NextResponse.json({
      success: true,
      trade: tradeRecord
    })

  } catch (error) {
    console.error('Trade update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get trade details endpoint
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tradeId = searchParams.get('tradeId')
    
    if (!tradeId) {
      return NextResponse.json(
        { error: 'tradeId is required' },
        { status: 400 }
      )
    }

    const tradeRecord = tradeRecords.get(tradeId)
    if (!tradeRecord) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(tradeRecord)

  } catch (error) {
    console.error('Trade lookup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculatePriceImpact(price: string, guaranteedPrice: string): number {
  const priceNum = parseFloat(price)
  const guaranteedPriceNum = parseFloat(guaranteedPrice)
  
  if (priceNum === 0 || guaranteedPriceNum === 0) return 0
  
  return Math.abs((priceNum - guaranteedPriceNum) / priceNum) * 100
}

function generateTradeId(): string {
  return `trade_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}