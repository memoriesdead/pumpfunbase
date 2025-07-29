import { ZEROX_CONFIG, getChainConfig, SUPPORTED_CHAINS } from './zerox-config'

export interface TradeQuote {
  sellToken: string
  buyToken: string
  sellAmount: string
  buyAmount: string
  price: string
  guaranteedPrice: string
  chainId: number
  platformFee: {
    bps: number
    amount: string
    recipient: string
  }
  route: Array<{
    exchange: string
    percentage: number
  }>
  estimatedGas: string
  allowanceTarget: string
  priceImpact: number
  expiresAt: number
}

export interface SwapTransaction {
  to: string
  data: string
  value: string
  gasPrice: string
  estimatedGas: string
  chainId: number
  tradeId: string
}

export interface TradeOrder {
  id: string
  type: 'buy' | 'sell'
  sellToken: string
  buyToken: string
  amount: string
  price: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  chainId: number
  userAddress: string
  platformFee: string
  createdAt: string
  updatedAt: string
  transactionHash?: string
}

export class TradingService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = ZEROX_CONFIG.baseUrl
    this.apiKey = ZEROX_CONFIG.apiKey
  }

  /**
   * Get a quote for a potential trade
   */
  async getQuote(params: {
    sellToken: string
    buyToken: string
    sellAmount?: string
    buyAmount?: string
    chainId: number
    takerAddress?: string
    slippageBps?: number
  }): Promise<TradeQuote> {
    const response = await fetch('/api/trade/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to get quote')
    }

    return response.json()
  }

  /**
   * Execute a swap transaction
   */
  async executeSwap(params: {
    sellToken: string
    buyToken: string
    sellAmount?: string
    buyAmount?: string
    chainId: number
    takerAddress: string
    slippageBps?: number
    gasPrice?: string
  }): Promise<SwapTransaction> {
    const response = await fetch('/api/trade/swap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to execute swap')
    }

    const data = await response.json()
    return {
      ...data.transaction,
      chainId: data.parameters.chainId,
      tradeId: data.trade.id
    }
  }

  /**
   * Check token allowance and get approval transaction if needed
   */
  async checkAllowance(params: {
    tokenAddress: string
    ownerAddress: string
    chainId: number
  }) {
    const response = await fetch('/api/trade/allowance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to check allowance')
    }

    return response.json()
  }

  /**
   * Calculate platform fees for a trade
   */
  async calculateFees(params: {
    buyAmount: string
    sellAmount: string
    customFeeBps?: number
  }) {
    const response = await fetch('/api/trade/fees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to calculate fees')
    }

    return response.json()
  }

  /**
   * Get trading fee history and statistics
   */
  async getFeeHistory() {
    const response = await fetch('/api/trade/fees?action=history')
    
    if (!response.ok) {
      throw new Error('Failed to get fee history')
    }

    return response.json()
  }

  /**
   * Update trade status
   */
  async updateTradeStatus(tradeId: string, status: string, transactionHash?: string) {
    const response = await fetch(`/api/trade/swap?tradeId=${tradeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, transactionHash })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update trade status')
    }

    return response.json()
  }

  /**
   * Get trade details by ID
   */
  async getTradeDetails(tradeId: string) {
    const response = await fetch(`/api/trade/swap?tradeId=${tradeId}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Trade not found')
    }

    return response.json()
  }

  /**
   * Get supported chains for trading
   */
  getSupportedChains() {
    return Object.values(SUPPORTED_CHAINS).filter(chain => 
      chain.supportedFeatures.includes('swap')
    )
  }

  /**
   * Validate trading parameters
   */
  validateTradeParams(params: {
    sellToken: string
    buyToken: string
    amount: string
    chainId: number
    userAddress: string
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!params.sellToken || !this.isValidAddress(params.sellToken)) {
      errors.push('Invalid sell token address')
    }

    if (!params.buyToken || !this.isValidAddress(params.buyToken)) {
      errors.push('Invalid buy token address')
    }

    if (!params.amount || parseFloat(params.amount) <= 0) {
      errors.push('Invalid amount')
    }

    if (!getChainConfig(params.chainId)) {
      errors.push('Unsupported chain')
    }

    if (!params.userAddress || !this.isValidAddress(params.userAddress)) {
      errors.push('Invalid user address')
    }

    if (params.sellToken.toLowerCase() === params.buyToken.toLowerCase()) {
      errors.push('Cannot trade token with itself')
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Estimate trade outcome with fees
   */
  async estimateTradeOutcome(params: {
    sellToken: string
    buyToken: string
    sellAmount: string
    chainId: number
    slippageBps?: number
  }) {
    try {
      const quote = await this.getQuote(params)
      const fees = await this.calculateFees({
        buyAmount: quote.buyAmount,
        sellAmount: quote.sellAmount
      })

      return {
        quote,
        fees,
        summary: {
          youPay: quote.sellAmount,
          youReceive: fees.breakdown.userReceives,
          platformFee: fees.platformFee.amount,
          priceImpact: quote.priceImpact,
          gasEstimate: quote.estimatedGas,
          route: quote.route
        }
      }
    } catch (error) {
      throw new Error(`Failed to estimate trade outcome: ${error}`)
    }
  }

  /**
   * Validate Ethereum address format
   */
  private isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  /**
   * Format token amount for display
   */
  formatTokenAmount(amount: string, decimals: number): string {
    const factor = Math.pow(10, decimals)
    const formatted = (parseFloat(amount) / factor).toFixed(6)
    return parseFloat(formatted).toString()
  }

  /**
   * Parse token amount from user input
   */
  parseTokenAmount(amount: string, decimals: number): string {
    const factor = Math.pow(10, decimals)
    const parsed = Math.floor(parseFloat(amount) * factor)
    return parsed.toString()
  }

  /**
   * Get platform fee configuration
   */
  getPlatformFeeConfig() {
    return {
      bps: ZEROX_CONFIG.platformFeeBps,
      percentage: (ZEROX_CONFIG.platformFeeBps / 100).toString() + '%',
      recipient: ZEROX_CONFIG.feeRecipient
    }
  }
}

// Export singleton instance
export const tradingService = new TradingService()