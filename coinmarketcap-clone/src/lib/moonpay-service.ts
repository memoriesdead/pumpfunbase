/**
 * MoonPay Service - Instant setup crypto payment integration
 * No application required - works immediately with test API key
 */

export interface MoonPayConfig {
  apiKey: string
  environment: 'sandbox' | 'production'
  baseUrl?: string
}

export interface MoonPayWidgetParams {
  apiKey: string
  environment?: 'sandbox' | 'production'
  currencyCode?: string
  baseCurrencyCode?: string
  baseCurrencyAmount?: number
  walletAddress?: string
  colorCode?: string
  showWalletAddressForm?: boolean
  redirectURL?: string
  externalCustomerId?: string
  lockAmount?: boolean
  showOnlyCurrencies?: string
}

export interface MoonPayTransaction {
  id: string
  status: 'pending' | 'waitingPayment' | 'waitingAuthorization' | 'waitingCapture' | 'pending' | 'completed' | 'failed'
  baseCurrency: string
  baseCurrencyAmount: number
  currency: string
  currencyAmount: number
  feeAmount: number
  networkFeeAmount: number
  totalAmount: number
  walletAddress: string
  cryptoTransactionId?: string
  createdAt: string
  updatedAt: string
}

class MoonPayService {
  private config: MoonPayConfig

  constructor(config: MoonPayConfig) {
    this.config = config
  }

  /**
   * Initialize MoonPay widget for instant crypto purchases
   */
  async initializeWidget(params: Partial<MoonPayWidgetParams>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // Load MoonPay SDK if not already loaded
        if (!window.MoonPaySDK) {
          const script = document.createElement('script')
          script.src = 'https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js'
          script.onload = () => {
            this.createWidget(params, resolve, reject)
          }
          script.onerror = () => reject(new Error('Failed to load MoonPay SDK'))
          document.head.appendChild(script)
        } else {
          this.createWidget(params, resolve, reject)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private createWidget(params: Partial<MoonPayWidgetParams>, resolve: Function, reject: Function) {
    try {
      const widgetParams: MoonPayWidgetParams = {
        apiKey: this.config.apiKey,
        environment: this.config.environment,
        colorCode: '#1652F0',
        showWalletAddressForm: false,
        redirectURL: window.location.href,
        ...params
      }

      const moonpay = new window.MoonPaySDK(widgetParams)

      // Set up event listeners
      moonpay.on('transactionCompleted', (transaction: any) => {
        console.log('MoonPay transaction completed:', transaction)
        resolve({
          success: true,
          transactionId: transaction.id,
          status: transaction.status,
          amount: transaction.currencyAmount,
          currency: transaction.currency,
          walletAddress: transaction.walletAddress,
          cryptoTransactionId: transaction.cryptoTransactionId
        })
      })

      moonpay.on('transactionFailed', (error: any) => {
        console.log('MoonPay transaction failed:', error)
        reject(new Error(error.message || 'Transaction failed'))
      })

      moonpay.on('close', () => {
        console.log('MoonPay widget closed')
        reject(new Error('Widget closed without completion'))
      })

      // Show the widget
      moonpay.show()

    } catch (error) {
      reject(error)
    }
  }

  /**
   * Get supported currencies
   */
  async getSupportedCurrencies(): Promise<any> {
    try {
      const baseUrl = this.config.environment === 'sandbox' 
        ? 'https://api.moonpay.com' 
        : 'https://api.moonpay.com'
        
      const response = await fetch(`${baseUrl}/v3/currencies`, {
        headers: {
          'Authorization': `Api-Key ${this.config.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch currencies: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching supported currencies:', error)
      throw error
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<MoonPayTransaction> {
    try {
      const baseUrl = this.config.environment === 'sandbox' 
        ? 'https://api.moonpay.com' 
        : 'https://api.moonpay.com'
        
      const response = await fetch(`${baseUrl}/v1/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Api-Key ${this.config.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch transaction status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching transaction status:', error)
      throw error
    }
  }

  /**
   * Create payment URL for redirect flow
   */
  createPaymentUrl(params: Partial<MoonPayWidgetParams>): string {
    const baseUrl = this.config.environment === 'sandbox' 
      ? 'https://buy-sandbox.moonpay.com' 
      : 'https://buy.moonpay.com'
    
    const urlParams = new URLSearchParams({
      apiKey: this.config.apiKey,
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      )
    })

    return `${baseUrl}?${urlParams.toString()}`
  }

  /**
   * Get buy quote
   */
  async getBuyQuote(params: {
    baseCurrency: string
    currency: string
    baseCurrencyAmount?: number
    currencyAmount?: number
  }): Promise<any> {
    try {
      const baseUrl = this.config.environment === 'sandbox' 
        ? 'https://api.moonpay.com' 
        : 'https://api.moonpay.com'
      
      const queryParams = new URLSearchParams({
        apiKey: this.config.apiKey,
        baseCurrency: params.baseCurrency,
        currency: params.currency,
        ...(params.baseCurrencyAmount && { baseCurrencyAmount: params.baseCurrencyAmount.toString() }),
        ...(params.currencyAmount && { currencyAmount: params.currencyAmount.toString() })
      })

      const response = await fetch(`${baseUrl}/v3/currencies/${params.currency}/buy_quote?${queryParams}`)

      if (!response.ok) {
        throw new Error(`Failed to get quote: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching buy quote:', error)
      throw error
    }
  }
}

// Test configuration for immediate use
export const moonPayConfig: MoonPayConfig = {
  apiKey: process.env.NEXT_PUBLIC_MOONPAY_API_KEY || 'pk_test_123', // Replace with your test key
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
}

// Export singleton instance
export const moonPayService = new MoonPayService(moonPayConfig)

// Types for global window object
declare global {
  interface Window {
    MoonPaySDK: any
  }
}

export default MoonPayService