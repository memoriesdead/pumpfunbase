/**
 * Card Payment Service using Transak On-Ramp API
 * Handles fiat-to-crypto purchases via credit/debit cards
 */

export interface CardPaymentConfig {
  apiKey: string
  environment: 'staging' | 'production'
  partnerId: string
  partnerOrderId?: string
  defaultFiatCurrency?: string
  defaultNetwork?: string
  defaultCryptoCurrency?: string
  walletAddress?: string
  disableWalletAddressForm?: boolean
  hideMenu?: boolean
  themeColor?: string
}

export interface CardPaymentRequest {
  fiatCurrency: string
  cryptoCurrency: string
  fiatAmount?: number
  cryptoAmount?: number
  network: string
  walletAddress: string
  email?: string
  userData?: {
    firstName?: string
    lastName?: string
    email?: string
    mobileNumber?: string
    dob?: string
    address?: {
      addressLine1?: string
      addressLine2?: string
      city?: string
      state?: string
      postCode?: string
      countryCode?: string
    }
  }
}

export interface CardPaymentResponse {
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED'
  transactionId: string
  partnerOrderId: string
  fiatCurrency: string
  fiatAmount: number
  cryptoCurrency: string
  cryptoAmount: number
  network: string
  walletAddress: string
  transactionHash?: string
  totalFeeInFiat: number
  conversionPrice: number
  createdAt: string
  completedAt?: string
  failureReason?: string
}

export interface TransakWidgetParams {
  apiKey: string
  environment: 'STAGING' | 'PRODUCTION'
  defaultCryptoCurrency?: string
  defaultFiatCurrency?: string
  defaultPaymentMethod?: string
  defaultFiatAmount?: number
  defaultNetwork?: string
  walletAddress?: string
  themeColor?: string
  hostURL: string
  widgetHeight?: string
  widgetWidth?: string
  hideMenu?: boolean
  hideExchangeScreen?: boolean
  disableWalletAddressForm?: boolean
  email?: string
  userData?: object
  partnerOrderId?: string
  partnerCustomerId?: string
  redirectURL?: string
}

class CardPaymentService {
  private config: CardPaymentConfig
  private baseUrl: string

  constructor(config: CardPaymentConfig) {
    this.config = config
    this.baseUrl = config.environment === 'production' 
      ? 'https://api.transak.com/api/v2' 
      : 'https://staging-api.transak.com/api/v2'
  }

  /**
   * Initialize Transak widget for card payments
   */
  initializeWidget(params: Partial<TransakWidgetParams>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // Load Transak SDK script if not already loaded
        if (!window.TransakSDK) {
          const script = document.createElement('script')
          script.src = 'https://global.transak.com/sdk/v1.2/transak-sdk.js'
          script.onload = () => {
            this.createWidget(params, resolve, reject)
          }
          script.onerror = () => reject(new Error('Failed to load Transak SDK'))
          document.head.appendChild(script)
        } else {
          this.createWidget(params, resolve, reject)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private createWidget(params: Partial<TransakWidgetParams>, resolve: Function, reject: Function) {
    try {
      const widgetParams: TransakWidgetParams = {
        apiKey: this.config.apiKey,
        environment: this.config.environment.toUpperCase() as 'STAGING' | 'PRODUCTION',
        hostURL: window.location.origin,
        themeColor: this.config.themeColor || '#1652F0',
        hideMenu: this.config.hideMenu ?? true,
        disableWalletAddressForm: this.config.disableWalletAddressForm ?? false,
        defaultFiatCurrency: this.config.defaultFiatCurrency || 'USD',
        defaultNetwork: this.config.defaultNetwork || 'ethereum',
        widgetHeight: '600px',
        widgetWidth: '400px',
        ...params
      }

      const transak = new window.TransakSDK(widgetParams)

      // Set up event listeners
      transak.on(transak.EVENTS.TRANSAK_WIDGET_INITIALISED, () => {
        console.log('Transak widget initialized')
      })

      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
        console.log('Order successful:', orderData)
        resolve({
          status: 'SUCCESS',
          transactionId: orderData.status.id,
          partnerOrderId: orderData.status.partnerOrderId,
          fiatAmount: orderData.status.fiatAmount,
          cryptoAmount: orderData.status.cryptoAmount,
          fiatCurrency: orderData.status.fiatCurrency,
          cryptoCurrency: orderData.status.cryptocurrency,
          network: orderData.status.network,
          walletAddress: orderData.status.walletAddress,
          transactionHash: orderData.status.transactionHash,
          totalFeeInFiat: orderData.status.totalFeeInFiat,
          conversionPrice: orderData.status.conversionPrice,
          createdAt: orderData.status.createdAt,
          completedAt: orderData.status.completedAt
        })
      })

      transak.on(transak.EVENTS.TRANSAK_ORDER_FAILED, (orderData: any) => {
        console.log('Order failed:', orderData)
        reject(new Error(orderData.status?.failureReason || 'Transaction failed'))
      })

      transak.on(transak.EVENTS.TRANSAK_ORDER_CANCELLED, (orderData: any) => {
        console.log('Order cancelled:', orderData)
        reject(new Error('Transaction cancelled by user'))
      })

      transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
        console.log('Widget closed')
        reject(new Error('Widget closed without completion'))
      })

      // Initialize the widget
      transak.init()

    } catch (error) {
      reject(error)
    }
  }

  /**
   * Get supported currencies and payment methods
   */
  async getSupportedAssets(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/currencies/crypto-currencies`, {
        headers: {
          'api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch supported assets: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching supported assets:', error)
      throw error
    }
  }

  /**
   * Get price quote for fiat to crypto conversion
   */
  async getPriceQuote(params: {
    fiatCurrency: string
    cryptoCurrency: string
    fiatAmount?: number
    cryptoAmount?: number
    network: string
    paymentMethod?: string
    partnerApiKey?: string
  }): Promise<any> {
    try {
      const queryParams = new URLSearchParams({
        fiatCurrency: params.fiatCurrency,
        cryptoCurrency: params.cryptoCurrency,
        network: params.network,
        paymentMethod: params.paymentMethod || 'credit_debit_card',
        partnerApiKey: params.partnerApiKey || this.config.apiKey,
        ...(params.fiatAmount && { fiatAmount: params.fiatAmount.toString() }),
        ...(params.cryptoAmount && { cryptoAmount: params.cryptoAmount.toString() })
      })

      const response = await fetch(`${this.baseUrl}/currencies/price?${queryParams}`, {
        headers: {
          'api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch price quote: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching price quote:', error)
      throw error
    }
  }

  /**
   * Get order status by transaction ID
   */
  async getOrderStatus(orderId: string): Promise<CardPaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        headers: {
          'api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch order status: ${response.status}`)
      }

      const data = await response.json()
      return {
        status: data.status,
        transactionId: data.id,
        partnerOrderId: data.partnerOrderId,
        fiatCurrency: data.fiatCurrency,
        fiatAmount: data.fiatAmount,
        cryptoCurrency: data.cryptoCurrency,
        cryptoAmount: data.cryptoAmount,
        network: data.network,
        walletAddress: data.walletAddress,
        transactionHash: data.transactionHash,
        totalFeeInFiat: data.totalFeeInFiat,
        conversionPrice: data.conversionPrice,
        createdAt: data.createdAt,
        completedAt: data.completedAt,
        failureReason: data.failureReason
      }
    } catch (error) {
      console.error('Error fetching order status:', error)
      throw error
    }
  }

  /**
   * Get supported payment methods for a specific country
   */
  async getPaymentMethods(countryCode: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/payment-methods?countryCode=${countryCode}`, {
        headers: {
          'api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch payment methods: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      throw error
    }
  }

  /**
   * Validate wallet address for a specific network
   */
  async validateWalletAddress(address: string, network: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/validate-wallet-address`, {
        method: 'POST',
        headers: {
          'api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: address,
          network: network
        })
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()
      return data.isValid === true
    } catch (error) {
      console.error('Error validating wallet address:', error)
      return false
    }
  }
}

// Default configuration for development
export const defaultCardPaymentConfig: CardPaymentConfig = {
  apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY || 'test_api_key',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'staging') as 'staging' | 'production',
  partnerId: process.env.NEXT_PUBLIC_TRANSAK_PARTNER_ID || 'coinmarketcap_clone',
  defaultFiatCurrency: 'USD',
  defaultNetwork: 'ethereum',
  themeColor: '#1652F0',
  hideMenu: true,
  disableWalletAddressForm: false
}

// Export singleton instance
export const cardPaymentService = new CardPaymentService(defaultCardPaymentConfig)

// Types for global window object
declare global {
  interface Window {
    TransakSDK: any
  }
}

export default CardPaymentService