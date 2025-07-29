import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook handler for Transak card payment events
 * Handles payment status updates and transaction confirmations
 */

interface TransakWebhookPayload {
  eventID: string
  webhookData: {
    id: string
    status: 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PENDING' | 'PROCESSING'
    fiatCurrency: string
    fiatAmount: number
    cryptoCurrency: string
    cryptoAmount: number
    network: string
    walletAddress: string
    transactionHash?: string
    partnerOrderId: string
    totalFeeInFiat: number
    conversionPrice: number
    createdAt: string
    completedAt?: string
    failureReason?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: TransakWebhookPayload = await request.json()
    const { eventID, webhookData } = body
    
    // Verify webhook signature (in production, validate with Transak's signature)
    const signature = request.headers.get('x-webhook-signature')
    if (!signature) {
      console.warn('Missing webhook signature')
    }
    
    console.log('Received Transak webhook:', {
      eventID,
      orderId: webhookData.id,
      status: webhookData.status,
      amount: webhookData.fiatAmount,
      currency: webhookData.fiatCurrency
    })

    // Process the webhook based on status
    switch (webhookData.status) {
      case 'COMPLETED':
        await handleCompletedPayment(webhookData)
        break
      
      case 'FAILED':
        await handleFailedPayment(webhookData)
        break
      
      case 'CANCELLED':
        await handleCancelledPayment(webhookData)
        break
      
      case 'PROCESSING':
        await handleProcessingPayment(webhookData)
        break
      
      default:
        console.log(`Unhandled payment status: ${webhookData.status}`)
    }

    // Respond with success to acknowledge webhook receipt
    return NextResponse.json({
      success: true,
      eventID,
      message: 'Webhook processed successfully'
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process webhook'
      },
      { status: 500 }
    )
  }
}

async function handleCompletedPayment(data: TransakWebhookPayload['webhookData']) {
  console.log('Payment completed:', {
    orderId: data.id,
    amount: data.cryptoAmount,
    currency: data.cryptoCurrency,
    txHash: data.transactionHash
  })

  // In a real application, you would:
  // 1. Update your database with the completed transaction
  // 2. Send confirmation email to user
  // 3. Update user's portfolio/balance
  // 4. Notify any listening services

  try {
    // Example: Update transaction record
    // await updateTransactionStatus(data.partnerOrderId, {
    //   status: 'completed',
    //   transactionHash: data.transactionHash,
    //   cryptoAmount: data.cryptoAmount,
    //   completedAt: data.completedAt
    // })

    // Example: Send confirmation email
    // await sendPaymentConfirmationEmail(data.walletAddress, {
    //   amount: data.cryptoAmount,
    //   currency: data.cryptoCurrency,
    //   txHash: data.transactionHash
    // })

    console.log(`Successfully processed completed payment for order ${data.id}`)
  } catch (error) {
    console.error('Error handling completed payment:', error)
  }
}

async function handleFailedPayment(data: TransakWebhookPayload['webhookData']) {
  console.log('Payment failed:', {
    orderId: data.id,
    reason: data.failureReason
  })

  try {
    // Example: Update transaction record
    // await updateTransactionStatus(data.partnerOrderId, {
    //   status: 'failed',
    //   failureReason: data.failureReason
    // })

    // Example: Send failure notification
    // await sendPaymentFailureEmail(data.walletAddress, {
    //   reason: data.failureReason,
    //   orderId: data.id
    // })

    console.log(`Successfully processed failed payment for order ${data.id}`)
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}

async function handleCancelledPayment(data: TransakWebhookPayload['webhookData']) {
  console.log('Payment cancelled:', {
    orderId: data.id
  })

  try {
    // Example: Update transaction record
    // await updateTransactionStatus(data.partnerOrderId, {
    //   status: 'cancelled'
    // })

    console.log(`Successfully processed cancelled payment for order ${data.id}`)
  } catch (error) {
    console.error('Error handling cancelled payment:', error)
  }
}

async function handleProcessingPayment(data: TransakWebhookPayload['webhookData']) {
  console.log('Payment processing:', {
    orderId: data.id
  })

  try {
    // Example: Update transaction record
    // await updateTransactionStatus(data.partnerOrderId, {
    //   status: 'processing'
    // })

    console.log(`Successfully processed processing payment for order ${data.id}`)
  } catch (error) {
    console.error('Error handling processing payment:', error)
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Card payment webhook endpoint is active',
    timestamp: new Date().toISOString()
  })
}