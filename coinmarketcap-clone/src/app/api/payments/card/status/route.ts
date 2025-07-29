import { NextRequest, NextResponse } from 'next/server'
import { cardPaymentService } from '@/lib/card-payment-service'

/**
 * API endpoint to check card payment status
 */

interface PaymentStatusRequest {
  orderId: string
  partnerOrderId?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const partnerOrderId = searchParams.get('partnerOrderId')

    if (!orderId && !partnerOrderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Either orderId or partnerOrderId is required'
        },
        { status: 400 }
      )
    }

    // Get order status from Transak
    const orderStatus = await cardPaymentService.getOrderStatus(orderId || partnerOrderId!)

    return NextResponse.json({
      success: true,
      data: {
        id: orderStatus.transactionId,
        status: orderStatus.status,
        fiatCurrency: orderStatus.fiatCurrency,
        fiatAmount: orderStatus.fiatAmount,
        cryptoCurrency: orderStatus.cryptoCurrency,
        cryptoAmount: orderStatus.cryptoAmount,
        network: orderStatus.network,
        walletAddress: orderStatus.walletAddress,
        transactionHash: orderStatus.transactionHash,
        totalFeeInFiat: orderStatus.totalFeeInFiat,
        conversionPrice: orderStatus.conversionPrice,
        createdAt: orderStatus.createdAt,
        completedAt: orderStatus.completedAt,
        failureReason: orderStatus.failureReason
      }
    })

  } catch (error) {
    console.error('Error fetching payment status:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch payment status'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentStatusRequest = await request.json()
    const { orderId, partnerOrderId } = body

    if (!orderId && !partnerOrderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Either orderId or partnerOrderId is required'
        },
        { status: 400 }
      )
    }

    // Get order status from Transak
    const orderStatus = await cardPaymentService.getOrderStatus(orderId || partnerOrderId!)

    // Check if payment is completed and update internal records
    if (orderStatus.status === 'SUCCESS' && orderStatus.transactionHash) {
      // In a real application, you would update your database here
      console.log('Payment completed:', {
        orderId: orderStatus.transactionId,
        txHash: orderStatus.transactionHash,
        amount: orderStatus.cryptoAmount,
        currency: orderStatus.cryptoCurrency
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: orderStatus.transactionId,
        status: orderStatus.status,
        fiatCurrency: orderStatus.fiatCurrency,
        fiatAmount: orderStatus.fiatAmount,
        cryptoCurrency: orderStatus.cryptoCurrency,
        cryptoAmount: orderStatus.cryptoAmount,
        network: orderStatus.network,
        walletAddress: orderStatus.walletAddress,
        transactionHash: orderStatus.transactionHash,
        totalFeeInFiat: orderStatus.totalFeeInFiat,
        conversionPrice: orderStatus.conversionPrice,
        createdAt: orderStatus.createdAt,
        completedAt: orderStatus.completedAt,
        failureReason: orderStatus.failureReason,
        // Additional metadata
        isCompleted: orderStatus.status === 'SUCCESS',
        isPending: ['PENDING', 'PROCESSING'].includes(orderStatus.status),
        isFailed: ['FAILED', 'CANCELLED'].includes(orderStatus.status)
      }
    })

  } catch (error) {
    console.error('Error fetching payment status:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch payment status'
      },
      { status: 500 }
    )
  }
}