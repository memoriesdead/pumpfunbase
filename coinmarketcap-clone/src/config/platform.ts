/**
 * Platform Configuration
 * Central configuration for payment, fees, and platform settings
 */

// Platform Wallet Addresses (UPDATE THESE WITH YOUR ACTUAL ADDRESSES)
export const PLATFORM_CONFIG = {
  // Main platform wallet for fee collection
  MAIN_WALLET_ADDRESS: '0x742d35Cc6634C0532925a3b8D53419a6A68A05a9',
  
  // Backup wallet for redundancy
  BACKUP_WALLET_ADDRESS: '0x1234567890123456789012345678901234567890',
  
  // Solana wallet address for Solana-based transactions
  SOLANA_WALLET_ADDRESS: 'DdzFFzCqrhsuwJhKKE7dDJc4QpkLqneCQD7ZP7HGr7Fg',
  
  // Platform fee in basis points (50 = 0.5%)
  PLATFORM_FEE_BPS: 50,
  
  // Platform fee in percentage (for display)
  PLATFORM_FEE_PERCENTAGE: 0.5,
  
  // Minimum transaction amount (in USD)
  MIN_TRANSACTION_AMOUNT: 10,
  
  // Maximum transaction amount (in USD) for basic verification
  MAX_TRANSACTION_AMOUNT: 10000,
  
  // Platform information
  PLATFORM_NAME: 'CoinMarketCap Clone',
  PLATFORM_DESCRIPTION: 'Advanced cryptocurrency trading and portfolio management platform',
  
  // Contact and support
  SUPPORT_EMAIL: 'support@coinmarketcap-clone.com',
  TELEGRAM_SUPPORT: '@coinmarketcap_support',
  
  // Social media
  TWITTER_HANDLE: '@coinmarketcap_clone',
  DISCORD_SERVER: 'https://discord.gg/coinmarketcap',
  
  // API endpoints
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api',
  WEBSOCKET_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3005/ws',
}

// Fee Distribution Configuration
export const FEE_DISTRIBUTION = {
  // Platform development and maintenance
  PLATFORM_SHARE: 0.6, // 60%
  
  // Liquidity rewards and user incentives
  REWARDS_SHARE: 0.25, // 25%
  
  // Marketing and partnerships
  MARKETING_SHARE: 0.1, // 10%
  
  // Emergency fund
  EMERGENCY_SHARE: 0.05, // 5%
}

// Payment Methods Configuration
export const PAYMENT_METHODS = {
  // Supported cryptocurrencies for payments
  SUPPORTED_TOKENS: {
    // Ethereum ecosystem
    ETH: {
      name: 'Ethereum',
      symbol: 'ETH',
      address: 'native',
      decimals: 18,
      chainId: 1,
      minAmount: 0.01,
      maxAmount: 100
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0xA0b86a33E6c1f03ce4d1E0Fb93e90B4F4F8ad2f8',
      decimals: 6,
      chainId: 1,
      minAmount: 10,
      maxAmount: 50000
    },
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      chainId: 1,
      minAmount: 10,
      maxAmount: 50000
    },
    
    // BSC ecosystem
    BNB: {
      name: 'BNB',
      symbol: 'BNB',
      address: 'native',
      decimals: 18,
      chainId: 56,
      minAmount: 0.1,
      maxAmount: 1000
    },
    
    // Solana ecosystem
    SOL: {
      name: 'Solana',
      symbol: 'SOL',
      address: 'native',
      decimals: 9,
      chainId: 101,
      minAmount: 0.5,
      maxAmount: 1000
    }
  },
  
  // Transaction limits
  DAILY_LIMIT: 50000, // USD
  MONTHLY_LIMIT: 500000, // USD
  
  // KYC requirements
  KYC_REQUIRED_ABOVE: 1000, // USD
  ENHANCED_KYC_ABOVE: 10000, // USD
}

// Trading Configuration
export const TRADING_CONFIG = {
  // Default slippage tolerance
  DEFAULT_SLIPPAGE: 0.5, // 0.5%
  
  // Maximum allowed slippage
  MAX_SLIPPAGE: 15, // 15%
  
  // Minimum trade amount
  MIN_TRADE_AMOUNT: 1, // USD
  
  // Maximum trade amount for new users
  MAX_TRADE_AMOUNT_NEW_USER: 1000, // USD
  
  // Maximum trade amount for verified users
  MAX_TRADE_AMOUNT_VERIFIED: 100000, // USD
  
  // Supported DEX protocols
  SUPPORTED_DEXES: {
    UNISWAP_V3: {
      name: 'Uniswap V3',
      chainId: 1,
      routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      fee: 0.3 // 0.3%
    },
    PANCAKESWAP: {
      name: 'PancakeSwap',
      chainId: 56,
      routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      fee: 0.25 // 0.25%
    },
    JUPITER: {
      name: 'Jupiter',
      chainId: 101,
      fee: 0.1 // 0.1%
    }
  }
}

// Revenue Tracking Configuration
export const REVENUE_CONFIG = {
  // Revenue streams
  TRADING_FEES: 'trading_fees',
  PLATFORM_FEES: 'platform_fees',
  PREMIUM_SUBSCRIPTIONS: 'premium_subscriptions',
  API_ACCESS_FEES: 'api_access_fees',
  
  // Revenue goals (monthly, in USD)
  MONTHLY_TARGET: 10000,
  QUARTERLY_TARGET: 30000,
  YEARLY_TARGET: 120000,
  
  // Performance metrics
  TARGET_DAILY_TRADES: 100,
  TARGET_MONTHLY_USERS: 1000,
  TARGET_TVL: 1000000, // Total Value Locked
}

// Security Configuration
export const SECURITY_CONFIG = {
  // Rate limiting
  MAX_API_CALLS_PER_MINUTE: 100,
  MAX_TRADES_PER_HOUR: 50,
  MAX_LOGIN_ATTEMPTS: 5,
  
  // Session timeouts
  SESSION_TIMEOUT_MINUTES: 60,
  WALLET_CONNECTION_TIMEOUT_MINUTES: 30,
  
  // Required confirmations
  MIN_CONFIRMATIONS_ETH: 3,
  MIN_CONFIRMATIONS_BSC: 10,
  MIN_CONFIRMATIONS_SOLANA: 32,
  
  // Monitoring
  SUSPICIOUS_TRANSACTION_THRESHOLD: 10000, // USD
  FRAUD_DETECTION_ENABLED: true,
  
  // Blacklisted addresses (examples - update with real addresses if needed)
  BLACKLISTED_ADDRESSES: [
    '0x0000000000000000000000000000000000000000',
    // Add known malicious addresses
  ]
}

// Feature Flags
export const FEATURE_FLAGS = {
  // Trading features
  SPOT_TRADING_ENABLED: true,
  FUTURES_TRADING_ENABLED: false,
  MARGIN_TRADING_ENABLED: false,
  
  // Advanced features
  PORTFOLIO_ANALYTICS_ENABLED: true,
  ADVANCED_CHARTS_ENABLED: true,
  SOCIAL_TRADING_ENABLED: false,
  
  // Platform features
  NFT_TRADING_ENABLED: false,
  STAKING_ENABLED: false,
  LENDING_ENABLED: false,
  
  // Payment features
  FIAT_DEPOSITS_ENABLED: false,
  CREDIT_CARD_PAYMENTS_ENABLED: false,
  BANK_TRANSFERS_ENABLED: false,
  
  // Beta features
  AI_TRADING_SUGGESTIONS: false,
  COPY_TRADING: false,
  AUTOMATED_PORTFOLIO_REBALANCING: false
}

// Export helper functions
export const PlatformUtils = {
  /**
   * Calculate platform fee for a given amount
   */
  calculatePlatformFee: (amount: number): number => {
    return amount * (PLATFORM_CONFIG.PLATFORM_FEE_BPS / 10000)
  },

  /**
   * Get the current active wallet address based on chain
   */
  getWalletAddress: (chainId?: number): string => {
    if (chainId === 101) {
      return PLATFORM_CONFIG.SOLANA_WALLET_ADDRESS
    }
    return PLATFORM_CONFIG.MAIN_WALLET_ADDRESS
  },

  /**
   * Check if an amount is within platform limits
   */
  isAmountValid: (amount: number): { valid: boolean; reason?: string } => {
    if (amount < PLATFORM_CONFIG.MIN_TRANSACTION_AMOUNT) {
      return { valid: false, reason: `Minimum amount is $${PLATFORM_CONFIG.MIN_TRANSACTION_AMOUNT}` }
    }
    if (amount > PLATFORM_CONFIG.MAX_TRANSACTION_AMOUNT) {
      return { valid: false, reason: `Maximum amount is $${PLATFORM_CONFIG.MAX_TRANSACTION_AMOUNT}` }
    }
    return { valid: true }
  },

  /**
   * Get fee breakdown for an amount
   */
  getFeeBreakdown: (amount: number) => {
    const platformFee = PlatformUtils.calculatePlatformFee(amount)
    const platformShare = platformFee * FEE_DISTRIBUTION.PLATFORM_SHARE
    const rewardsShare = platformFee * FEE_DISTRIBUTION.REWARDS_SHARE
    const marketingShare = platformFee * FEE_DISTRIBUTION.MARKETING_SHARE
    const emergencyShare = platformFee * FEE_DISTRIBUTION.EMERGENCY_SHARE

    return {
      totalFee: platformFee,
      platformShare,
      rewardsShare,
      marketingShare,
      emergencyShare,
      breakdown: {
        platform: `$${platformShare.toFixed(4)} (${(FEE_DISTRIBUTION.PLATFORM_SHARE * 100)}%)`,
        rewards: `$${rewardsShare.toFixed(4)} (${(FEE_DISTRIBUTION.REWARDS_SHARE * 100)}%)`,
        marketing: `$${marketingShare.toFixed(4)} (${(FEE_DISTRIBUTION.MARKETING_SHARE * 100)}%)`,
        emergency: `$${emergencyShare.toFixed(4)} (${(FEE_DISTRIBUTION.EMERGENCY_SHARE * 100)}%)`
      }
    }
  }
}

export default PLATFORM_CONFIG