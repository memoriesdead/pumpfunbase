'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check for existing wallet connection on load
  useEffect(() => {
    checkWalletConnection()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      console.log('Wallet modal is now open') // Debug log
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

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
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] text-white rounded-xl hover:shadow-2xl hover:shadow-[#00D4AA]/30 transition-all duration-300 hover:scale-105 transform font-bold shadow-xl"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>

        {/* Wallet Selection Modal */}
        {isModalOpen && typeof window !== 'undefined' && createPortal(
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            style={{ 
              position: 'fixed', 
              zIndex: 99999,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821] border border-white/20 rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
              style={{ 
                maxHeight: 'calc(100vh - 2rem)',
                overflowY: 'auto',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] bg-clip-text text-transparent">Connect Wallet</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/60 hover:text-white text-2xl p-2 hover:bg-white/10 rounded-xl transition-all"
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
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      walletOption.available
                        ? 'border-white/20 hover:border-[#00D4AA]/50 hover:bg-gradient-to-r hover:from-[#00D4AA]/10 hover:to-[#7C3AED]/10 backdrop-blur-xl'
                        : 'border-white/10 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{walletOption.icon}</span>
                      <div className="text-left">
                        <span className="font-bold text-white text-base">{walletOption.name}</span>
                        {!walletOption.available && (
                          <div className="text-xs text-white/50">Click to install</div>
                        )}
                      </div>
                    </div>
                    {!walletOption.available && (
                      <ExternalLink className="w-4 h-4 text-white/40" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#00D4AA]/10 via-[#7C3AED]/5 to-[#FF6B6B]/10 rounded-xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">🛡️</span>
                  <span className="text-sm font-bold text-white">Secure & Private</span>
                </div>
                <p className="text-xs text-white/70">
                  By connecting a wallet, you agree to our Terms of Service and Privacy Policy. We never store your private keys.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:border-[#00D4AA]/50 hover:bg-white/15 transition-all duration-200 group"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00D4AA] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white group-hover:text-[#00D4AA] transition-colors">
              {formatAddress(wallet.address!)}
            </div>
            <div className="text-xs text-white/70">
              {getChainName(wallet.chainId!)}
            </div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
      </button>

      {/* Wallet Info Dropdown */}
      {isModalOpen && (
        <div className="absolute top-full mt-2 right-0 bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821] border border-white/20 rounded-xl shadow-2xl p-4 min-w-[280px] z-[9999] backdrop-blur-2xl">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-white/60 mb-1 font-medium">Wallet Address</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono text-white font-bold">
                  {formatAddress(wallet.address!)}
                </span>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-[#00D4AA]" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60 hover:text-white" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm text-white/60 mb-1 font-medium">Network</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00D4AA] rounded-full animate-pulse"></div>
                <div className="text-sm font-bold text-white">
                  {getChainName(wallet.chainId!)}
                </div>
              </div>
            </div>

            {wallet.balance && (
              <div>
                <div className="text-sm text-white/60 mb-1 font-medium">Balance</div>
                <div className="text-sm font-bold text-[#00D4AA]">
                  {wallet.balance} {wallet.chainId === 101 ? 'SOL' : 'ETH'}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={disconnectWallet}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#DC2626] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF6B6B]/30 transition-all duration-200 font-bold"
              >
                Disconnect Wallet
              </button>
            </div>
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