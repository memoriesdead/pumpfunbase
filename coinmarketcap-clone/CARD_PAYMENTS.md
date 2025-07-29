# Card Payment Integration Guide

This document explains how to set up and use the credit card payment feature powered by Transak's on-ramp API.

## Overview

The card payment integration allows users to buy cryptocurrency directly with their credit/debit cards through a secure, professional interface. The integration uses Transak's API and SDK for processing fiat-to-crypto transactions.

## Features

- ✅ **Secure Card Processing**: Bank-grade security with encrypted transactions
- ✅ **Real-time Price Quotes**: Live conversion rates and fee calculation
- ✅ **Multi-Currency Support**: 136+ cryptocurrencies across 17+ blockchain networks
- ✅ **Global Coverage**: Available in 64+ countries
- ✅ **Payment Methods**: Credit cards, debit cards, Apple Pay, Google Pay, bank transfers
- ✅ **Webhook Integration**: Real-time transaction status updates
- ✅ **Fraud Protection**: Built-in KYC and fraud prevention measures

## Setup Instructions

### 1. Get Transak API Credentials

1. Visit [Transak's website](https://transak.com/) and sign up for a developer account
2. Get your API key and Partner ID from the dashboard
3. Configure your webhook URL in the Transak dashboard

### 2. Environment Variables

Add the following to your `.env.local` file:

```env
# Transak API Configuration
NEXT_PUBLIC_TRANSAK_API_KEY=your_transak_api_key_here
NEXT_PUBLIC_TRANSAK_PARTNER_ID=your_partner_id_here
TRANSAK_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Install Dependencies

The integration uses the Transak SDK, which is loaded dynamically. No additional npm packages are required.

## Usage

### Basic Integration

```tsx
import { cardPaymentService } from '@/lib/card-payment-service'

// Initialize card payment
const result = await cardPaymentService.initializeWidget({
  defaultCryptoCurrency: 'ETH',
  defaultFiatCurrency: 'USD',
  defaultFiatAmount: 100,
  defaultNetwork: 'ethereum',
  walletAddress: userWalletAddress
})
```

### Enhanced Trading Component

The `EnhancedCryptoTrading` component automatically includes card payment functionality:

```tsx
import { EnhancedCryptoTrading } from '@/components/trading/enhanced-crypto-trading'

// Component with card payment support
<EnhancedCryptoTrading 
  preselectedToken={{
    symbol: 'ETH',
    name: 'Ethereum',
    logo: '/ethereum-logo.png'
  }}
/>
```

## API Endpoints

### Get Price Quote

```typescript
GET /api/payments/card/quote
```

Parameters:
- `fiatCurrency`: USD, EUR, GBP, etc.
- `cryptoCurrency`: ETH, BTC, SOL, etc.
- `fiatAmount`: Amount in fiat currency
- `network`: ethereum, solana, polygon, etc.

### Check Payment Status

```typescript
GET /api/payments/card/status?orderId=txn_123
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "txn_123",
    "status": "COMPLETED",
    "fiatAmount": 100,
    "cryptoAmount": 0.045,
    "transactionHash": "0x123...",
    "isCompleted": true
  }
}
```

### Webhook Handler

```typescript
POST /api/payments/card/webhook
```

Handles Transak webhooks for real-time status updates.

## Payment Flow

1. **User Initiates Payment**: User selects cryptocurrency and amount
2. **Get Price Quote**: System fetches real-time conversion rate
3. **Show Transaction Summary**: Display fees, conversion rate, and total
4. **Open Transak Widget**: Secure payment interface loads
5. **Process Payment**: User enters card details and completes KYC
6. **Webhook Notification**: System receives status updates
7. **Transaction Complete**: Cryptocurrency delivered to user's wallet

## Security Features

- **PCI Compliance**: Transak handles all sensitive card data
- **KYC/AML**: Built-in compliance checks
- **Fraud Detection**: Real-time risk assessment
- **Encryption**: End-to-end encryption for all transactions
- **Webhook Verification**: Signed webhooks prevent tampering

## Supported Networks

- Ethereum (ETH)
- Bitcoin (BTC)
- Solana (SOL)
- Polygon (MATIC)
- Binance Smart Chain (BNB)
- Arbitrum (ARB)
- Optimism (OP)
- Avalanche (AVAX)
- Base
- And 15+ more...

## Fee Structure

- **Card Processing Fee**: ~3.5% (varies by region and payment method)
- **Network Fees**: Blockchain gas fees (paid by user)
- **Platform Fee**: 0.5% (configurable)

## Error Handling

The integration includes comprehensive error handling:

```typescript
try {
  const result = await cardPaymentService.initializeWidget(params)
  // Handle success
} catch (error) {
  if (error.message.includes('cancelled')) {
    // User cancelled payment
  } else if (error.message.includes('failed')) {
    // Payment failed
  } else {
    // Other errors
  }
}
```

## Testing

### Development Mode

In development, use Transak's staging environment:

```env
NEXT_PUBLIC_TRANSAK_API_KEY=staging_api_key
```

### Test Cards

Transak provides test card numbers for development:

- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **Decline**: 4000 0000 0000 0002

## Production Deployment

1. **Switch to Production API**: Update environment variables
2. **Configure Webhooks**: Set production webhook URL
3. **SSL Certificate**: Ensure HTTPS is enabled
4. **Compliance**: Complete any required compliance steps with Transak

## Monitoring

Monitor card payments through:

- Transak Dashboard: Transaction volume and status
- Webhook Logs: Real-time status updates
- Application Logs: Error tracking and debugging

## Support

For issues with the card payment integration:

1. Check the browser console for JavaScript errors
2. Verify API credentials and environment variables
3. Review webhook logs for status updates
4. Contact Transak support for payment-specific issues

## Examples

### Custom Payment Widget

```typescript
const customWidget = await cardPaymentService.initializeWidget({
  defaultCryptoCurrency: 'BTC',
  defaultFiatCurrency: 'EUR',
  defaultFiatAmount: 500,
  defaultNetwork: 'bitcoin',
  themeColor: '#FF6B35',
  hideMenu: true,
  partnerOrderId: 'order_123'
})
```

### Price Quote with Error Handling

```typescript
try {
  const quote = await cardPaymentService.getPriceQuote({
    fiatCurrency: 'USD',
    cryptoCurrency: 'ETH',
    fiatAmount: 100,
    network: 'ethereum'
  })
  console.log('Price:', quote.conversionPrice)
  console.log('Fees:', quote.totalFee)
} catch (error) {
  console.error('Quote failed:', error.message)
}
```

## Troubleshooting

### Common Issues

1. **Widget Not Loading**: Check API key and network connection
2. **Payment Failed**: Verify card details and limits
3. **Webhook Not Received**: Check webhook URL and SSL certificate
4. **Currency Not Supported**: Verify supported assets list

### Debug Mode

Enable debug logging:

```typescript
// Add to your component
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    window.TransakSDK?.setLogLevel('debug')
  }
}, [])
```

This integration provides a complete, production-ready card payment solution for cryptocurrency purchases.