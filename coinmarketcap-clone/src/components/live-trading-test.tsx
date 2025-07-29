'use client'

import { useState, useEffect } from 'react'
import { zeroxAPI } from '@/lib/zerox-api'
import { SUPPORTED_CHAINS, ZEROX_CONFIG } from '@/lib/zerox-config'
import { Check, X, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react'

interface TestResult {
  test: string
  status: 'pending' | 'success' | 'error'
  message: string
  data?: any
}

export default function LiveTradingTest() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [apiConnected, setApiConnected] = useState<boolean | null>(null)

  const updateResult = (testName: string, status: 'success' | 'error', message: string, data?: any) => {
    setResults(prev => prev.map(result => 
      result.test === testName 
        ? { ...result, status, message, data }
        : result
    ))
  }

  const runTests = async () => {
    setIsRunning(true)
    setResults([
      { test: 'API Connection', status: 'pending', message: 'Testing connection...' },
      { test: 'Sources Fetch', status: 'pending', message: 'Fetching liquidity sources...' },
      { test: 'Price Quote', status: 'pending', message: 'Getting price quote...' },
      { test: 'Multi-Chain Support', status: 'pending', message: 'Testing chain support...' },
      { test: 'Gasless Quote', status: 'pending', message: 'Testing gasless functionality...' },
      { test: 'Error Handling', status: 'pending', message: 'Testing error handling...' }
    ])

    try {
      // Test 1: API Connection
      const healthCheck = await zeroxAPI.healthCheck()
      if (healthCheck) {
        updateResult('API Connection', 'success', 'Successfully connected to 0x API')
        setApiConnected(true)
      } else {
        updateResult('API Connection', 'error', 'Failed to connect to 0x API')
        setApiConnected(false)
        setIsRunning(false)
        return
      }

      // Test 2: Sources Fetch
      try {
        const sources = await zeroxAPI.getSources(1) // Ethereum
        updateResult('Sources Fetch', 'success', `Found ${sources.sources?.length || 0} liquidity sources`, sources)
      } catch (error: any) {
        updateResult('Sources Fetch', 'error', `Error: ${error.message}`)
      }

      // Test 3: Price Quote
      try {
        const priceQuote = await zeroxAPI.getPrice({
          chainId: 1,
          sellToken: '0xA0b86a33E6c1f03ce4d1E0Fb93e90B4F4F8ad2f8', // USDC
          buyToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
          sellAmount: '1000000' // 1 USDC
        })
        updateResult('Price Quote', 'success', `Price: ${parseFloat(priceQuote.price).toFixed(6)} WETH per USDC`, priceQuote)
      } catch (error: any) {
        updateResult('Price Quote', 'error', `Error: ${error.message}`)
      }

      // Test 4: Multi-Chain Support
      try {
        const chainTests = await Promise.allSettled([
          zeroxAPI.getSources(137), // Polygon
          zeroxAPI.getSources(42161), // Arbitrum
          zeroxAPI.getSources(8453) // Base
        ])
        
        const successCount = chainTests.filter(result => result.status === 'fulfilled').length
        updateResult('Multi-Chain Support', 'success', `${successCount}/3 chains tested successfully`)
      } catch (error: any) {
        updateResult('Multi-Chain Support', 'error', `Error: ${error.message}`)
      }

      // Test 5: Gasless Quote (if supported)
      try {
        const gaslessQuote = await zeroxAPI.getGaslessPrice({
          chainId: 1,
          sellToken: '0xA0b86a33E6c1f03ce4d1E0Fb93e90B4F4F8ad2f8', // USDC
          buyToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
          sellAmount: '1000000' // 1 USDC
        })
        updateResult('Gasless Quote', 'success', 'Gasless trading functionality working', gaslessQuote)
      } catch (error: any) {
        updateResult('Gasless Quote', 'error', `Error: ${error.message}`)
      }

      // Test 6: Error Handling
      try {
        await zeroxAPI.getPrice({
          chainId: 1,
          sellToken: '0x0000000000000000000000000000000000000000', // Invalid token
          buyToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          sellAmount: '1000000'
        })
        updateResult('Error Handling', 'error', 'Error handling failed - should have thrown error')
      } catch (error: any) {
        updateResult('Error Handling', 'success', 'Error handling working correctly')
      }

    } catch (error: any) {
      console.error('Test suite error:', error)
    } finally {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    // Run initial health check
    zeroxAPI.healthCheck().then(setApiConnected)
  }, [])

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-[#616E85]" />
      case 'success':
        return <Check className="w-4 h-4 text-[#16C784]" />
      case 'error':
        return <X className="w-4 h-4 text-[#EA3943]" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return 'text-[#616E85]'
      case 'success':
        return 'text-[#16C784]'
      case 'error':
        return 'text-[#EA3943]'
    }
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
      {/* Test Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#F0F9FF] cmc-border-radius-md">
            {apiConnected === true ? (
              <Wifi className="w-5 h-5 text-[#16C784]" />
            ) : apiConnected === false ? (
              <WifiOff className="w-5 h-5 text-[#EA3943]" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-[#616E85]" />
            )}
          </div>
          <div>
            <h2 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              Live Trading Test Suite
            </h2>
            <p className="cmc-text-sm text-[#616E85]">
              Testing 0x Protocol integration with API key
            </p>
          </div>
        </div>
        
        <button
          onClick={runTests}
          disabled={isRunning}
          className="flex items-center space-x-2 px-4 py-2 bg-[#3861FB] hover:bg-[#2952CC] disabled:bg-[#EFF2F5] disabled:text-[#616E85] text-white cmc-font-medium cmc-border-radius-md transition-colors"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Run Tests</span>
            </>
          )}
        </button>
      </div>

      {/* API Configuration Display */}
      <div className="mb-6 p-4 bg-[#F8FAFD] cmc-border-radius-md">
        <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-3">
          Configuration Status
        </h3>
        
        <div className="grid grid-cols-2 gap-4 cmc-text-sm">
          <div className="flex justify-between">
            <span className="text-[#616E85]">API Key:</span>
            <span className="cmc-font-medium text-[#0D1421]">
              {ZEROX_CONFIG.apiKey ? `${ZEROX_CONFIG.apiKey.slice(0, 8)}...` : 'Not Set'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#616E85]">Base URL:</span>
            <span className="cmc-font-medium text-[#0D1421]">
              {ZEROX_CONFIG.baseUrl}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#616E85]">Platform Fee:</span>
            <span className="cmc-font-medium text-[#0D1421]">
              {ZEROX_CONFIG.platformFeeBps / 100}%
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#616E85]">Supported Chains:</span>
            <span className="cmc-font-medium text-[#0D1421]">
              {Object.keys(SUPPORTED_CHAINS).length}
            </span>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421]">
            Test Results
          </h3>
          
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-[#EFF2F5] cmc-border-radius-md"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(result.status)}
                <div>
                  <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                    {result.test}
                  </div>
                  <div className={`cmc-text-xs ${getStatusColor(result.status)}`}>
                    {result.message}
                  </div>
                </div>
              </div>
              
              {result.data && (
                <button 
                  onClick={() => console.log(`${result.test} data:`, result.data)}
                  className="cmc-text-xs text-[#3861FB] hover:underline"
                >
                  View Data
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Connection Status */}
      <div className="mt-6 pt-4 border-t border-[#EFF2F5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {apiConnected === true ? (
              <div className="flex items-center space-x-2 text-[#16C784]">
                <div className="w-2 h-2 bg-[#16C784] cmc-border-radius-full animate-pulse" />
                <span className="cmc-text-sm cmc-font-medium">Connected to 0x Protocol</span>
              </div>
            ) : apiConnected === false ? (
              <div className="flex items-center space-x-2 text-[#EA3943]">
                <div className="w-2 h-2 bg-[#EA3943] cmc-border-radius-full" />
                <span className="cmc-text-sm cmc-font-medium">Disconnected from 0x Protocol</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-[#616E85]">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="cmc-text-sm">Checking connection...</span>
              </div>
            )}
          </div>
          
          <div className="cmc-text-xs text-[#616E85]">
            API Version: {ZEROX_CONFIG.version}
          </div>
        </div>
      </div>
    </div>
  )
}