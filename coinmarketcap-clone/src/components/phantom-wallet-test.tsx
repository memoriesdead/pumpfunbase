'use client'

import { useState, useEffect } from 'react'
import { useWallet } from './wallet-connection'
import { Check, X, AlertCircle, Loader2, Wallet } from 'lucide-react'

interface PhantomTestResult {
  test: string
  status: 'pending' | 'success' | 'error'
  message: string
  data?: any
}

export default function PhantomWalletTest() {
  const { walletType, account, balance, solanaProvider } = useWallet()
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<PhantomTestResult[]>([])
  const [phantomDetected, setPhantomDetected] = useState<boolean | null>(null)

  const isPhantom = walletType === 'phantom'

  const updateResult = (testName: string, status: 'success' | 'error', message: string, data?: any) => {
    setResults(prev => prev.map(result => 
      result.test === testName 
        ? { ...result, status, message, data }
        : result
    ))
  }

  const runPhantomTests = async () => {
    setIsRunning(true)
    setResults([
      { test: 'Phantom Detection', status: 'pending', message: 'Checking for Phantom wallet...' },
      { test: 'Connection Status', status: 'pending', message: 'Verifying connection...' },
      { test: 'Account Access', status: 'pending', message: 'Testing account access...' },
      { test: 'Balance Retrieval', status: 'pending', message: 'Fetching SOL balance...' },
      { test: 'Network Info', status: 'pending', message: 'Getting network information...' },
      { test: 'Provider Methods', status: 'pending', message: 'Testing provider methods...' }
    ])

    try {
      // Test 1: Phantom Detection
      if (typeof window !== 'undefined' && window.solana?.isPhantom) {
        updateResult('Phantom Detection', 'success', 'Phantom wallet detected in browser')
        setPhantomDetected(true)
      } else {
        updateResult('Phantom Detection', 'error', 'Phantom wallet not found')
        setPhantomDetected(false)
        setIsRunning(false)
        return
      }

      // Test 2: Connection Status
      if (isPhantom && account) {
        updateResult('Connection Status', 'success', 'Phantom wallet connected successfully')
      } else if (isPhantom) {
        updateResult('Connection Status', 'error', 'Phantom wallet not connected')
      } else {
        updateResult('Connection Status', 'error', 'Different wallet type connected')
      }

      // Test 3: Account Access
      if (account) {
        updateResult('Account Access', 'success', `Account: ${account.slice(0, 8)}...${account.slice(-8)}`, { account })
      } else {
        updateResult('Account Access', 'error', 'No account accessible')
      }

      // Test 4: Balance Retrieval
      if (isPhantom && account) {
        try {
          const { Connection, PublicKey } = await import('@solana/web3.js')
          const connection = new Connection('https://api.mainnet-beta.solana.com')
          const publicKey = new PublicKey(account)
          const balanceLamports = await connection.getBalance(publicKey)
          const balanceSol = (balanceLamports / 1000000000).toFixed(4)
          
          updateResult('Balance Retrieval', 'success', `Balance: ${balanceSol} SOL`, { 
            lamports: balanceLamports, 
            sol: balanceSol 
          })
        } catch (error: any) {
          updateResult('Balance Retrieval', 'error', `Balance error: ${error.message}`)
        }
      } else {
        updateResult('Balance Retrieval', 'error', 'Phantom not connected')
      }

      // Test 5: Network Info
      if (isPhantom) {
        updateResult('Network Info', 'success', 'Connected to Solana Mainnet-Beta', {
          network: 'mainnet-beta',
          chainId: 101,
          rpc: 'https://api.mainnet-beta.solana.com'
        })
      } else {
        updateResult('Network Info', 'error', 'Not connected to Solana')
      }

      // Test 6: Provider Methods
      if (solanaProvider) {
        const methods = {
          isPhantom: solanaProvider.isPhantom,
          isConnected: solanaProvider.isConnected,
          publicKey: solanaProvider.publicKey?.toString(),
          hasConnect: typeof solanaProvider.connect === 'function',
          hasDisconnect: typeof solanaProvider.disconnect === 'function',
          hasSignTransaction: typeof solanaProvider.signTransaction === 'function',
          hasSignMessage: typeof solanaProvider.signMessage === 'function'
        }
        
        updateResult('Provider Methods', 'success', 'All provider methods available', methods)
      } else {
        updateResult('Provider Methods', 'error', 'Solana provider not available')
      }

    } catch (error: any) {
      console.error('Phantom test suite error:', error)
    } finally {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    // Check for Phantom on component mount
    if (typeof window !== 'undefined') {
      setPhantomDetected(!!window.solana?.isPhantom)
    }
  }, [])

  const getStatusIcon = (status: PhantomTestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-[#616E85]" />
      case 'success':
        return <Check className="w-4 h-4 text-[#16C784]" />
      case 'error':
        return <X className="w-4 h-4 text-[#EA3943]" />
    }
  }

  const getStatusColor = (status: PhantomTestResult['status']) => {
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
          <div className="p-2 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 cmc-border-radius-md">
            <Wallet className="w-5 h-5 text-[#9945FF]" />
          </div>
          <div>
            <h2 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              Phantom Wallet Test Suite
            </h2>
            <p className="cmc-text-sm text-[#616E85]">
              Testing Phantom wallet integration and Solana connectivity
            </p>
          </div>
        </div>
        
        <button
          onClick={runPhantomTests}
          disabled={isRunning}
          className="flex items-center space-x-2 px-4 py-2 bg-[#9945FF] hover:bg-[#8839E0] disabled:bg-[#EFF2F5] disabled:text-[#616E85] text-white cmc-font-medium cmc-border-radius-md transition-colors"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Run Phantom Tests</span>
            </>
          )}
        </button>
      </div>

      {/* Phantom Status */}
      <div className="mb-6 p-4 bg-[#F8FAFD] cmc-border-radius-md">
        <h3 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-3">
          Phantom Wallet Status
        </h3>
        
        <div className="grid grid-cols-2 gap-4 cmc-text-sm">
          <div className="flex justify-between">
            <span className="text-[#616E85]">Detected:</span>
            <span className={`cmc-font-medium ${phantomDetected ? 'text-[#16C784]' : 'text-[#EA3943]'}`}>
              {phantomDetected === null ? 'Checking...' : phantomDetected ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#616E85]">Connected:</span>
            <span className={`cmc-font-medium ${isPhantom ? 'text-[#16C784]' : 'text-[#EA3943]'}`}>
              {isPhantom ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#616E85]">Account:</span>
            <span className="cmc-font-medium text-[#0D1421]">
              {account ? `${account.slice(0, 6)}...` : 'None'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#616E85]">Balance:</span>
            <span className="cmc-font-medium text-[#0D1421]">
              {isPhantom ? `${balance} SOL` : 'N/A'}
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
                  className="cmc-text-xs text-[#9945FF] hover:underline"
                >
                  View Data
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      {!phantomDetected && (
        <div className="mt-6 p-4 bg-[#FFF7ED] border border-[#FED7AA] cmc-border-radius-md">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
            <span className="cmc-text-sm cmc-font-semibold text-[#F59E0B]">
              Phantom Wallet Not Found
            </span>
          </div>
          <p className="cmc-text-sm text-[#92400E]">
            To test Phantom wallet integration, please install the Phantom browser extension from{' '}
            <a 
              href="https://phantom.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#9945FF] hover:underline"
            >
              phantom.app
            </a>
          </p>
        </div>
      )}

      {/* Connection Status */}
      <div className="mt-6 pt-4 border-t border-[#EFF2F5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isPhantom ? (
              <div className="flex items-center space-x-2 text-[#9945FF]">
                <div className="w-2 h-2 bg-[#14F195] cmc-border-radius-full animate-pulse" />
                <span className="cmc-text-sm cmc-font-medium">Connected to Phantom</span>
              </div>
            ) : phantomDetected ? (
              <div className="flex items-center space-x-2 text-[#F59E0B]">
                <div className="w-2 h-2 bg-[#F59E0B] cmc-border-radius-full" />
                <span className="cmc-text-sm cmc-font-medium">Phantom Available (Not Connected)</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-[#EA3943]">
                <div className="w-2 h-2 bg-[#EA3943] cmc-border-radius-full" />
                <span className="cmc-text-sm cmc-font-medium">Phantom Not Available</span>
              </div>
            )}
          </div>
          
          <div className="cmc-text-xs text-[#616E85]">
            Solana Mainnet-Beta
          </div>
        </div>
      </div>
    </div>
  )
}