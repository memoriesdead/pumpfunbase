/**
 * 0x Protocol API Client
 * Live API Integration with Real Data
 */

import { ZEROX_CONFIG, SUPPORTED_CHAINS, ChainConfig } from './zerox-config'

// Types for 0x API responses
export interface ZeroxPriceResponse {
  sellAmount: string
  buyAmount: string
  price: string
  guaranteedPrice: string
  to: string
  data: string
  value: string
  gas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: string
  sellTokenAddress: string
  sources: Array<{
    name: string
    proportion: string
  }>
  orders: any[]
  allowanceTarget: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  estimatedPriceImpact: string
  expectedSlippage: string
}

export interface ZeroxQuoteResponse extends ZeroxPriceResponse {
  to: string
  data: string
  value: string
}

export interface ZeroxGaslessResponse {
  sellAmount: string
  buyAmount: string
  price: string
  to: string
  data: string
  value: string
  gas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: string
  sellTokenAddress: string
  sources: Array<{
    name: string
    proportion: string
  }>
  tradeHash: string
}

export interface SwapParams {
  chainId: number
  sellToken: string
  buyToken: string
  sellAmount?: string
  buyAmount?: string
  taker?: string
  slippageBps?: number
  gasless?: boolean
}

export interface TradeAnalyticsParams {
  chainId: number
  taker?: string
  token?: string
  startTime?: number
  endTime?: number
  limit?: number
}

class ZeroxAPI {
  private apiKey: string
  private baseUrl: string
  private headers: Record<string, string>

  constructor() {
    this.apiKey = ZEROX_CONFIG.apiKey
    this.baseUrl = ZEROX_CONFIG.baseUrl
    this.headers = {
      '0x-api-key': this.apiKey,
      '0x-version': ZEROX_CONFIG.version,
      'Content-Type': 'application/json'
    }
  }

  /**
   * Get price quote for a token swap
   */
  async getPrice(params: SwapParams): Promise<ZeroxPriceResponse> {
    const url = new URL(`${this.baseUrl}/swap/permit2/price`)
    
    // Add query parameters
    url.searchParams.append('chainId', params.chainId.toString())
    url.searchParams.append('sellToken', params.sellToken)
    url.searchParams.append('buyToken', params.buyToken)
    
    if (params.sellAmount) {
      url.searchParams.append('sellAmount', params.sellAmount)
    }
    if (params.buyAmount) {
      url.searchParams.append('buyAmount', params.buyAmount)
    }
    if (params.taker) {
      url.searchParams.append('taker', params.taker)
    }
    
    // Add platform fee parameters
    url.searchParams.append('swapFeeBps', ZEROX_CONFIG.platformFeeBps.toString())
    url.searchParams.append('swapFeeRecipient', ZEROX_CONFIG.feeRecipient)
    url.searchParams.append('swapFeeToken', 'buyToken')
    
    // Add slippage
    const slippage = params.slippageBps || ZEROX_CONFIG.defaultSlippageBps
    url.searchParams.append('slippageBps', slippage.toString())

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching price from 0x:', error)
      throw error
    }
  }

  /**
   * Get firm quote for a token swap
   */
  async getQuote(params: SwapParams): Promise<ZeroxQuoteResponse> {
    const url = new URL(`${this.baseUrl}/swap/permit2/quote`)
    
    // Add query parameters
    url.searchParams.append('chainId', params.chainId.toString())
    url.searchParams.append('sellToken', params.sellToken)
    url.searchParams.append('buyToken', params.buyToken)
    
    if (params.sellAmount) {
      url.searchParams.append('sellAmount', params.sellAmount)
    }
    if (params.buyAmount) {
      url.searchParams.append('buyAmount', params.buyAmount)
    }
    if (params.taker) {
      url.searchParams.append('taker', params.taker)
    }
    
    // Add platform fee parameters
    url.searchParams.append('swapFeeBps', ZEROX_CONFIG.platformFeeBps.toString())
    url.searchParams.append('swapFeeRecipient', ZEROX_CONFIG.feeRecipient)
    url.searchParams.append('swapFeeToken', 'buyToken')
    
    // Add slippage
    const slippage = params.slippageBps || ZEROX_CONFIG.defaultSlippageBps
    url.searchParams.append('slippageBps', slippage.toString())

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching quote from 0x:', error)
      throw error
    }
  }

  /**
   * Get gasless price quote
   */
  async getGaslessPrice(params: SwapParams): Promise<ZeroxGaslessResponse> {
    const url = new URL(`${this.baseUrl}/gasless/price`)
    
    // Add query parameters
    url.searchParams.append('chainId', params.chainId.toString())
    url.searchParams.append('sellToken', params.sellToken)
    url.searchParams.append('buyToken', params.buyToken)
    
    if (params.sellAmount) {
      url.searchParams.append('sellAmount', params.sellAmount)
    }
    if (params.buyAmount) {
      url.searchParams.append('buyAmount', params.buyAmount)
    }
    if (params.taker) {
      url.searchParams.append('taker', params.taker)
    }
    
    // Add platform fee parameters
    url.searchParams.append('swapFeeBps', ZEROX_CONFIG.platformFeeBps.toString())
    url.searchParams.append('swapFeeRecipient', ZEROX_CONFIG.feeRecipient)
    
    // Add slippage
    const slippage = params.slippageBps || ZEROX_CONFIG.defaultSlippageBps
    url.searchParams.append('slippageBps', slippage.toString())

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x Gasless API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching gasless price from 0x:', error)
      throw error
    }
  }

  /**
   * Get gasless quote
   */
  async getGaslessQuote(params: SwapParams): Promise<ZeroxGaslessResponse> {
    const url = new URL(`${this.baseUrl}/gasless/quote`)
    
    // Add query parameters
    url.searchParams.append('chainId', params.chainId.toString())
    url.searchParams.append('sellToken', params.sellToken)
    url.searchParams.append('buyToken', params.buyToken)
    
    if (params.sellAmount) {
      url.searchParams.append('sellAmount', params.sellAmount)
    }
    if (params.buyAmount) {
      url.searchParams.append('buyAmount', params.buyAmount)
    }
    if (params.taker) {
      url.searchParams.append('taker', params.taker)
    }
    
    // Add platform fee parameters
    url.searchParams.append('swapFeeBps', ZEROX_CONFIG.platformFeeBps.toString())
    url.searchParams.append('swapFeeRecipient', ZEROX_CONFIG.feeRecipient)
    
    // Add slippage
    const slippage = params.slippageBps || ZEROX_CONFIG.defaultSlippageBps
    url.searchParams.append('slippageBps', slippage.toString())

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x Gasless API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching gasless quote from 0x:', error)
      throw error
    }
  }

  /**
   * Submit gasless transaction
   */
  async submitGaslessTransaction(signedTransaction: any): Promise<any> {
    const url = `${this.baseUrl}/gasless/submit`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(signedTransaction)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x Gasless Submit Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error submitting gasless transaction:', error)
      throw error
    }
  }

  /**
   * Get trading analytics
   */
  async getTradeAnalytics(params: TradeAnalyticsParams): Promise<any> {
    const url = new URL(`${this.baseUrl}/trade-analytics/swap`)
    
    url.searchParams.append('chainId', params.chainId.toString())
    
    if (params.taker) {
      url.searchParams.append('taker', params.taker)
    }
    if (params.token) {
      url.searchParams.append('token', params.token)
    }
    if (params.startTime) {
      url.searchParams.append('startTime', params.startTime.toString())
    }
    if (params.endTime) {
      url.searchParams.append('endTime', params.endTime.toString())
    }
    if (params.limit) {
      url.searchParams.append('limit', params.limit.toString())
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x Analytics API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching trade analytics from 0x:', error)
      throw error
    }
  }

  /**
   * Get supported sources for a chain
   */
  async getSources(chainId: number): Promise<any> {
    const url = `${this.baseUrl}/sources?chainId=${chainId}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`0x Sources API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching sources from 0x:', error)
      throw error
    }
  }

  /**
   * Health check for API connectivity
   */
  async healthCheck(): Promise<boolean> {
    try {
      // Try to get sources for Ethereum mainnet as a health check
      await this.getSources(1)
      return true
    } catch (error) {
      console.error('0x API health check failed:', error)
      return false
    }
  }
}

// Create singleton instance
export const zeroxAPI = new ZeroxAPI()

// Helper functions
export const formatTokenAmount = (amount: string, decimals: number): string => {
  const value = BigInt(amount)
  const divisor = BigInt(10 ** decimals)
  const wholePart = value / divisor
  const fractionalPart = value % divisor
  
  if (fractionalPart === BigInt(0)) {
    return wholePart.toString()
  }
  
  const fractionalString = fractionalPart.toString().padStart(decimals, '0')
  const trimmedFractional = fractionalString.replace(/0+$/, '')
  
  return trimmedFractional.length > 0 
    ? `${wholePart}.${trimmedFractional}`
    : wholePart.toString()
}

export const parseTokenAmount = (amount: string, decimals: number): string => {
  const [wholePart, fractionalPart = ''] = amount.split('.')
  const paddedFractional = fractionalPart.padEnd(decimals, '0').slice(0, decimals)
  return BigInt(wholePart + paddedFractional).toString()
}

export const calculatePriceImpact = (
  expectedAmount: string,
  actualAmount: string,
  decimals: number
): number => {
  const expected = parseFloat(formatTokenAmount(expectedAmount, decimals))
  const actual = parseFloat(formatTokenAmount(actualAmount, decimals))
  
  if (expected === 0) return 0
  
  return ((expected - actual) / expected) * 100
}

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const isValidChainId = (chainId: number): boolean => {
  return chainId in SUPPORTED_CHAINS
}