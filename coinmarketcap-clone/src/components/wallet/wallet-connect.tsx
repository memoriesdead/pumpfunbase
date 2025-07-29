'use client'

import { useState, useEffect } from 'react'
import { Wallet, ChevronDown, ExternalLink, Copy, CheckCircle } from 'lucide-react'

// Our platform fee wallet address
export const PLATFORM_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b8D53419a6A68A05a9'
export const PLATFORM_FEE_BPS = 50 // 0.5% platform fee

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  provider: any
}

interface SupportedWallet {
  name: string
  icon: string
  connector: string
  available: boolean
}

const SUPPORTED_WALLETS: SupportedWallet[] = [
  {
    name: 'MetaMask',
    icon: '🦊',
    connector: 'metamask',
    available: typeof window !== 'undefined' && !!(window as any)?.ethereum?.isMetaMask
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    connector: 'walletconnect',
    available: true
  },
  {
    name: 'Coinbase Wallet',
    icon: '💙',
    connector: 'coinbase',
    available: typeof window !== 'undefined' && !!(window as any)?.ethereum?.isCoinbaseWallet
  },
  {
    name: 'Phantom (Solana)',
    icon: '👻',
    connector: 'phantom',
    available: typeof window !== 'undefined' && !!(window as any)?.solana?.isPhantom
  }
]

export default function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    provider: null
  })
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [copied, setCopied] = useState(false)

  // Check for existing wallet connection on load
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window === 'undefined') return

    try {
      // Check MetaMask
      if ((window as any)?.ethereum?.isMetaMask) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          await connectMetaMask(false)
        }
      }
      
      // Check Phantom
      if ((window as any)?.solana?.isPhantom) {
        const response = await (window as any).solana.connect({ onlyIfTrusted: true })
        if (response.publicKey) {
          setWallet({
            isConnected: true,
            address: response.publicKey.toString(),
            balance: null,
            chainId: 101, // Solana
            provider: (window as any).solana
          })
        }
      }
    } catch (error) {
      console.log('No existing wallet connection found')
    }
  }

  const connectMetaMask = async (userInitiated = true) => {
    if (!(window as any)?.ethereum?.isMetaMask) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await (window as any).ethereum.request({
        method: userInitiated ? 'eth_requestAccounts' : 'eth_accounts'
      })
      
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' })
      const balance = await (window as any).ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      })

      setWallet({
        isConnected: true,
        address: accounts[0],
        balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        chainId: parseInt(chainId, 16),
        provider: (window as any).ethereum
      })
      
      setIsModalOpen(false)
    } catch (error) {
      console.error('MetaMask connection failed:', error)
    }
    setIsConnecting(false)
  }

  const connectPhantom = async () => {
    if (!(window as any)?.solana?.isPhantom) {
      window.open('https://phantom.app/', '_blank')
      return
    }

    setIsConnecting(true)
    try {
      const response = await (window as any).solana.connect()
      setWallet({
        isConnected: true,
        address: response.publicKey.toString(),
        balance: null,
        chainId: 101, // Solana
        provider: (window as any).solana
      })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Phantom connection failed:', error)
    }
    setIsConnecting(false)
  }

  const connectWallet = async (connector: string) => {
    switch (connector) {
      case 'metamask':
        await connectMetaMask()
        break
      case 'phantom':
        await connectPhantom()
        break
      case 'walletconnect':
        // WalletConnect implementation would go here
        alert('WalletConnect integration coming soon!')
        break
      case 'coinbase':
        // Coinbase Wallet implementation would go here
        alert('Coinbase Wallet integration coming soon!')
        break
    }
  }

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      provider: null
    })
  }

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getChainName = (chainId: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      56: 'BSC',
      137: 'Polygon',
      101: 'Solana',
      43114: 'Avalanche',
      42161: 'Arbitrum',
      10: 'Optimism'
    }
    return chains[chainId] || `Chain ${chainId}`
  }

  if (!wallet.isConnected) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1652F0] to-[#3861FB] text-white rounded-lg hover:from-[#1652F0]/90 hover:to-[#3861FB]/90 transition-all duration-200 font-semibold shadow-lg"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>

        {/* Wallet Selection Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1E1932]">Connect Wallet</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#8C8C8C] hover:text-[#1E1932] text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                {SUPPORTED_WALLETS.map((walletOption) => (
                  <button
                    key={walletOption.connector}
                    onClick={() => connectWallet(walletOption.connector)}
                    disabled={!walletOption.available || isConnecting}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      walletOption.available
                        ? 'border-[#F0F0F0] hover:border-[#1652F0] hover:bg-[#F8F9FF]'
                        : 'border-[#F0F0F0] opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{walletOption.icon}</span>
                      <span className="font-semibold text-[#1E1932]">{walletOption.name}</span>
                    </div>
                    {!walletOption.available && (
                      <ExternalLink className="w-4 h-4 text-[#8C8C8C]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#F8F9FF] rounded-lg">
                <p className="text-sm text-[#8C8C8C]">
                  By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1652F0] to-[#3861FB] rounded-full flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-[#1E1932]">
              {formatAddress(wallet.address!)}
            </div>
            <div className="text-xs text-[#8C8C8C]">
              {getChainName(wallet.chainId!)}
            </div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-[#8C8C8C]" />
      </button>

      {/* Wallet Info Dropdown */}
      {isModalOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-[#F0F0F0] rounded-lg shadow-lg p-4 min-w-[280px] z-50">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Wallet Address</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono text-[#1E1932]">
                  {formatAddress(wallet.address!)}
                </span>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-[#F8F9FF] rounded"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-[#16C784]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#8C8C8C]" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Network</div>
              <div className="text-sm font-semibold text-[#1E1932]">
                {getChainName(wallet.chainId!)}
              </div>
            </div>

            {wallet.balance && (
              <div>
                <div className="text-sm text-[#8C8C8C] mb-1">Balance</div>
                <div className="text-sm font-semibold text-[#1E1932]">
                  {wallet.balance} ETH
                </div>
              </div>
            )}

            <button
              onClick={disconnectWallet}
              className="w-full px-4 py-2 bg-[#EA3943] text-white rounded-lg hover:bg-[#EA3943]/90 transition-colors font-semibold"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Hook to use wallet state in other components
export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    provider: null
  })

  return {
    wallet,
    isConnected: wallet.isConnected,
    address: wallet.address,
    chainId: wallet.chainId,
    provider: wallet.provider
  }
}