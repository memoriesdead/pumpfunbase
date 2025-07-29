import { NextResponse } from 'next/server'
import { ZEROX_CONFIG, getChainConfig } from '@/lib/zerox-config'

interface QuoteRequest {
  sellToken: string
  buyToken: string
  sellAmount?: string
  buyAmount?: string
  chainId: number
  takerAddress?: string
  slippageBps?: number
  includePlatformFee?: boolean
}

interface ZeroxQuoteResponse {
  price: string
  guaranteedPrice: string
  estimatedGas: string
  gasPrice: string
  sellAmount: string
  buyAmount: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  sources: Array<{
    name: string
    proportion: string
  }>
  allowanceTarget: string
  decodedUniqueId: string
  to: string
  data: string
  value: string
}

export async function POST(request: Request) {
  try {
    const body: QuoteRequest = await request.json()
    
    const {
      sellToken,
      buyToken,
      sellAmount,
      buyAmount,
      chainId,
      takerAddress,
      slippageBps = ZEROX_CONFIG.defaultSlippageBps,
      includePlatformFee = true
    } = body

    // Validate required parameters
    if (!sellToken || !buyToken || !chainId) {
      return NextResponse.json(
        { error: 'sellToken, buyToken, and chainId are required' },
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
    if (!chainConfig) {
      return NextResponse.json(
        { error: `Chain ${chainId} is not supported` },
        { status: 400 }
      )
    }

    // Build 0x API URL
    const baseUrl = `${ZEROX_CONFIG.baseUrl}/swap/v1/quote`
    const params = new URLSearchParams({
      sellToken,
      buyToken,
      slippagePercentage: (slippageBps / 10000).toString(),
    })

    if (sellAmount) params.append('sellAmount', sellAmount)
    if (buyAmount) params.append('buyAmount', buyAmount)
    if (takerAddress) params.append('takerAddress', takerAddress)

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
      console.error('0x API error:', response.status, errorText)
      
      return NextResponse.json(
        { 
          error: 'Failed to get quote from 0x API',
          details: errorText 
        },
        { status: response.status }
      )
    }

    const quoteData: ZeroxQuoteResponse = await response.json()

    // Calculate our platform fee details
    const platformFeeAmount = includePlatformFee && ZEROX_CONFIG.platformFeeBps > 0
      ? (BigInt(quoteData.buyAmount) * BigInt(ZEROX_CONFIG.platformFeeBps)) / BigInt(10000)
      : BigInt(0)

    // Enhance response with our platform data
    const enhancedQuote = {
      ...quoteData,
      chainId,
      chainName: chainConfig.name,
      platformFee: {
        enabled: includePlatformFee,
        bps: ZEROX_CONFIG.platformFeeBps,
        amount: platformFeeAmount.toString(),
        recipient: ZEROX_CONFIG.feeRecipient,
        percentage: (ZEROX_CONFIG.platformFeeBps / 100).toString() + '%'
      },
      trading: {
        slippageBps,
        priceImpact: calculatePriceImpact(quoteData.price, quoteData.guaranteedPrice),
        route: quoteData.sources.map(source => ({
          exchange: source.name,
          percentage: parseFloat(source.proportion) * 100
        }))
      },
      metadata: {
        timestamp: new Date().toISOString(),
        quotedAt: Date.now(),
        expiresAt: Date.now() + 30000, // 30 seconds
      }
    }

    return NextResponse.json(enhancedQuote)

  } catch (error) {
    console.error('Quote API error:', error)
    
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

function calculatePriceImpact(price: string, guaranteedPrice: string): number {
  const priceNum = parseFloat(price)
  const guaranteedPriceNum = parseFloat(guaranteedPrice)
  
  if (priceNum === 0 || guaranteedPriceNum === 0) return 0
  
  return Math.abs((priceNum - guaranteedPriceNum) / priceNum) * 100
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Convert GET parameters to POST body format
  const quoteRequest: QuoteRequest = {
    sellToken: searchParams.get('sellToken') || '',
    buyToken: searchParams.get('buyToken') || '',
    sellAmount: searchParams.get('sellAmount') || undefined,
    buyAmount: searchParams.get('buyAmount') || undefined,
    chainId: parseInt(searchParams.get('chainId') || '1'),
    takerAddress: searchParams.get('takerAddress') || undefined,
    slippageBps: parseInt(searchParams.get('slippageBps') || ZEROX_CONFIG.defaultSlippageBps.toString()),
    includePlatformFee: searchParams.get('includePlatformFee') !== 'false'
  }

  // Create a new request object with JSON body
  const mockRequest = new Request(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quoteRequest)
  })

  return POST(mockRequest)
}