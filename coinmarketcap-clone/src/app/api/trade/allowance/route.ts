import { NextResponse } from 'next/server'
import { ZEROX_CONFIG, getChainConfig } from '@/lib/zerox-config'

interface AllowanceRequest {
  tokenAddress: string
  ownerAddress: string
  chainId: number
}

interface AllowanceResponse {
  allowance: string
  isApprovalNeeded: boolean
  allowanceTarget: string
  approvalTransaction?: {
    to: string
    data: string
    value: string
    gasPrice?: string
    estimatedGas?: string
  }
}

export async function POST(request: Request) {
  try {
    const body: AllowanceRequest = await request.json()
    
    const { tokenAddress, ownerAddress, chainId } = body

    // Validate required parameters
    if (!tokenAddress || !ownerAddress || !chainId) {
      return NextResponse.json(
        { error: 'tokenAddress, ownerAddress, and chainId are required' },
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

    // Get allowance target from 0x API
    const allowanceTarget = await getAllowanceTarget(chainId)
    if (!allowanceTarget) {
      return NextResponse.json(
        { error: 'Failed to get allowance target' },
        { status: 500 }
      )
    }

    // Check current allowance
    const currentAllowance = await checkTokenAllowance(
      tokenAddress,
      ownerAddress,
      allowanceTarget,
      chainId
    )

    // Determine if approval is needed (check if allowance is less than a reasonable amount)
    const minAllowanceAmount = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') // Max uint256
    const isApprovalNeeded = BigInt(currentAllowance) < minAllowanceAmount

    const response: AllowanceResponse = {
      allowance: currentAllowance,
      isApprovalNeeded,
      allowanceTarget,
    }

    // If approval is needed, get approval transaction
    if (isApprovalNeeded) {
      const approvalTx = await getApprovalTransaction(
        tokenAddress,
        allowanceTarget,
        chainId
      )
      
      if (approvalTx) {
        response.approvalTransaction = approvalTx
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Allowance API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getAllowanceTarget(chainId: number): Promise<string | null> {
  try {
    const baseUrl = `${ZEROX_CONFIG.baseUrl}/swap/v1/quote`
    const params = new URLSearchParams({
      sellToken: '0xA0b86a33E6c1f03ce4d1E0Fb93e90B4F4F8ad2f8', // USDC
      buyToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
      sellAmount: '1000000', // 1 USDC
    })

    const apiUrl = `${baseUrl}?${params.toString()}`
    
    const response = await fetch(apiUrl, {
      headers: {
        '0x-api-key': ZEROX_CONFIG.apiKey,
        '0x-version': 'v2',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.allowanceTarget || null

  } catch (error) {
    console.error('Error getting allowance target:', error)
    return null
  }
}

async function checkTokenAllowance(
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string,
  chainId: number
): Promise<string> {
  try {
    // For demo purposes, we'll return a mock allowance
    // In production, you would make an actual blockchain call
    
    // ERC20 allowance function signature: allowance(address,address)
    const allowanceFunctionSelector = '0xdd62ed3e'
    const encodedOwner = ownerAddress.toLowerCase().replace('0x', '').padStart(64, '0')
    const encodedSpender = spenderAddress.toLowerCase().replace('0x', '').padStart(64, '0')
    const callData = allowanceFunctionSelector + encodedOwner + encodedSpender

    // Mock response - in production, use ethers.js or web3.js to make actual call
    const mockAllowance = '0' // Assume no allowance for demo
    
    return mockAllowance

  } catch (error) {
    console.error('Error checking allowance:', error)
    return '0'
  }
}

async function getApprovalTransaction(
  tokenAddress: string,
  spenderAddress: string,
  chainId: number
): Promise<{
  to: string
  data: string
  value: string
  gasPrice?: string
  estimatedGas?: string
} | null> {
  try {
    // ERC20 approve function signature: approve(address,uint256)
    const approveFunctionSelector = '0x095ea7b3'
    const encodedSpender = spenderAddress.toLowerCase().replace('0x', '').padStart(64, '0')
    const maxUint256 = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    
    const approvalData = approveFunctionSelector + encodedSpender + maxUint256

    return {
      to: tokenAddress,
      data: approvalData,
      value: '0',
      estimatedGas: '50000', // Typical gas for ERC20 approval
    }

  } catch (error) {
    console.error('Error creating approval transaction:', error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Convert GET parameters to POST body format
  const allowanceRequest: AllowanceRequest = {
    tokenAddress: searchParams.get('tokenAddress') || '',
    ownerAddress: searchParams.get('ownerAddress') || '',
    chainId: parseInt(searchParams.get('chainId') || '1'),
  }

  // Create a new request object with JSON body
  const mockRequest = new Request(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(allowanceRequest)
  })

  return POST(mockRequest)
}