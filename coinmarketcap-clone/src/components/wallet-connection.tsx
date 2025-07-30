'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any
  }
}
import { Wallet, Copy, ExternalLink, ChevronDown, Shield, Zap, Activity } from 'lucide-react'

interface WalletContextType {
  account: string | null
  chainId: number | null
  balance: string
  isConnected: boolean
  walletType: string | null
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
  provider: ethers.BrowserProvider | null
  solanaProvider: any | null
}

const WalletContext = createContext<WalletContextType | null>(null)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [balance, setBalance] = useState('0.0')
  const [walletType, setWalletType] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [solanaProvider, setSolanaProvider] = useState<any | null>(null)
  
  const isConnected = !!account

  const connect = async (selectedWalletType: string) => {
    try {
      setWalletType(selectedWalletType)

      switch (selectedWalletType) {
        case 'metamask':
          await connectEthereum('metamask')
          break
        case 'walletconnect':
          await connectEthereum('walletconnect')
          break
        case 'coinbase':
          await connectEthereum('coinbase')
          break
        case 'phantom':
          await connectPhantom()
          break
        default:
          throw new Error('Unsupported wallet type')
      }
    } catch (error) {
      console.error('Wallet connection error:', error)
      setWalletType(null)
    }
  }

  const connectEthereum = async (type: string) => {
    let ethereum: any

    switch (type) {
      case 'metamask':
        if (typeof window !== 'undefined' && window.ethereum) {
          ethereum = window.ethereum
        } else {
          window.open('https://metamask.io/download/', '_blank')
          return
        }
        break
      case 'walletconnect':
        // WalletConnect integration would go here
        throw new Error('WalletConnect not implemented yet')
      case 'coinbase':
        // Coinbase Wallet integration would go here
        throw new Error('Coinbase Wallet not implemented yet')
    }

    const newProvider = new ethers.BrowserProvider(ethereum)
    const accounts = await newProvider.send('eth_requestAccounts', [])
    const network = await newProvider.getNetwork()
    
    setProvider(newProvider)
    setAccount(accounts[0])
    setChainId(Number(network.chainId))
    
    // Get balance
    const balanceWei = await newProvider.getBalance(accounts[0])
    setBalance(ethers.formatEther(balanceWei))

    // Listen for account changes
    ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        setAccount(accounts[0])
      }
    })

    // Listen for chain changes
    ethereum.on('chainChanged', (chainId: string) => {
      setChainId(parseInt(chainId, 16))
    })
  }

  const connectPhantom = async () => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      try {
        const phantom = window.solana
        const response = await phantom.connect()
        
        setSolanaProvider(phantom)
        setAccount(response.publicKey.toString())
        setChainId(101) // Solana mainnet-beta
        
        // Get SOL balance
        try {
          const connection = new (await import('@solana/web3.js')).Connection('https://api.mainnet-beta.solana.com')
          const publicKey = new (await import('@solana/web3.js')).PublicKey(response.publicKey.toString())
          const balanceLamports = await connection.getBalance(publicKey)
          const balanceSol = balanceLamports / 1000000000 // Convert lamports to SOL
          setBalance(balanceSol.toFixed(4))
        } catch (balanceError) {
          console.error('Error getting SOL balance:', balanceError)
          setBalance('0.0')
        }

        // Listen for account changes
        phantom.on('accountChanged', (publicKey: any) => {
          if (publicKey) {
            setAccount(publicKey.toString())
          } else {
            disconnect()
          }
        })

        // Listen for disconnect
        phantom.on('disconnect', () => {
          disconnect()
        })

      } catch (error: any) {
        if (error.code === 4001) {
          console.log('User rejected the request')
        } else {
          console.error('Phantom connection error:', error)
        }
        throw error
      }
    } else {
      window.open('https://phantom.app/', '_blank')
    }
  }

  const disconnect = () => {
    // Disconnect Phantom if connected
    if (walletType === 'phantom' && solanaProvider) {
      try {
        solanaProvider.disconnect()
      } catch (error) {
        console.error('Error disconnecting Phantom:', error)
      }
    }

    setAccount(null)
    setChainId(null)
    setBalance('0.0')
    setWalletType(null)
    setProvider(null)
    setSolanaProvider(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    // Solana doesn't support network switching in the same way as Ethereum
    if (walletType === 'phantom') {
      console.log('Solana network switching not supported')
      return
    }

    if (!provider) return

    try {
      await provider.send('wallet_switchEthereumNetwork', [
        { chainId: `0x${targetChainId.toString(16)}` }
      ])
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added to wallet, add it
        const networkData = getNetworkData(targetChainId)
        if (networkData) {
          await provider.send('wallet_addEthereumNetwork', [networkData])
        }
      }
      throw error
    }
  }

  const getNetworkData = (chainId: number) => {
    const networks: Record<number, any> = {
      1: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_KEY'],
        blockExplorerUrls: ['https://etherscan.io']
      },
      137: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com']
      },
      42161: {
        chainId: '0xa4b1',
        chainName: 'Arbitrum One',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io']
      }
    }
    return networks[chainId]
  }

  const value: WalletContextType = {
    account,
    chainId,
    balance,
    isConnected,
    walletType,
    connect,
    disconnect,
    switchNetwork,
    provider,
    solanaProvider
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

interface WalletConnectionProps {
  compact?: boolean
}

export default function WalletConnection({ compact = false }: WalletConnectionProps) {
  const { account, chainId, balance, isConnected, connect, disconnect, switchNetwork } = useWallet()
  const [showWallets, setShowWallets] = useState(false)
  const [showAccount, setShowAccount] = useState(false)

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect using browser wallet',
      networks: 'Ethereum & EVMs'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: '👻',
      description: 'Connect using Phantom wallet',
      networks: 'Solana & Ethereum'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '📱',
      description: 'Scan with mobile wallet',
      networks: 'Multi-chain'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect to Coinbase Wallet',
      networks: 'Ethereum & L2s'
    }
  ]

  const supportedNetworks = [
    { id: 1, name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
    { id: 101, name: 'Solana', symbol: 'SOL', color: '#9945FF' },
    { id: 137, name: 'Polygon', symbol: 'MATIC', color: '#8247E5' },
    { id: 42161, name: 'Arbitrum', symbol: 'ETH', color: '#2D374B' },
    { id: 8453, name: 'Base', symbol: 'ETH', color: '#0052FF' },
    { id: 10, name: 'Optimism', symbol: 'ETH', color: '#FF0420' }
  ]

  const currentNetwork = supportedNetworks.find(n => n.id === chainId)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account)
    }
  }

  if (compact && isConnected) {
    return (
      <button
        onClick={() => setShowAccount(!showAccount)}
        className="relative flex items-center space-x-2 px-3 py-2 bg-[#F0F9FF] border border-[#3861FB] text-[#3861FB] cmc-border-radius-md hover:bg-[#E0F2FE] transition-colors"
      >
        <div className="w-2 h-2 bg-[#16C784] cmc-border-radius-full" />
        <span className="cmc-text-sm cmc-font-medium">
          {formatAddress(account!)}
        </span>
        <ChevronDown className="w-4 h-4" />
        
        {showAccount && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-[#EFF2F5] cmc-border-radius-lg shadow-lg z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="cmc-text-sm text-[#616E85]">Connected Account</span>
                <button
                  onClick={disconnect}
                  className="cmc-text-xs text-[#EA3943] hover:underline"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#3861FB] to-[#16C784] cmc-border-radius-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="cmc-font-medium text-[#0D1421]">
                    {formatAddress(account!)}
                  </div>
                  <div className="cmc-text-sm text-[#616E85]">
                    {balance.slice(0, 8)} ETH
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={copyAddress}
                  className="flex-1 flex items-center justify-center space-x-1 py-2 bg-[#F8FAFD] hover:bg-[#EFF2F5] cmc-border-radius-md transition-colors"
                >
                  <Copy className="w-4 h-4 text-[#616E85]" />
                  <span className="cmc-text-sm text-[#616E85]">Copy</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-[#F8FAFD] hover:bg-[#EFF2F5] cmc-border-radius-md transition-colors">
                  <ExternalLink className="w-4 h-4 text-[#616E85]" />
                  <span className="cmc-text-sm text-[#616E85]">Explorer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </button>
    )
  }

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowWallets(!showWallets)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#3861FB] hover:bg-[#2952CC] text-white cmc-font-medium cmc-border-radius-md transition-colors"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </button>

        {showWallets && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-[#EFF2F5] cmc-border-radius-lg shadow-lg z-50">
            <div className="p-6">
              <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421] mb-4">
                Connect Your Wallet
              </h3>
              
              <div className="space-y-3">
                {walletOptions.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => {
                      connect(wallet.id)
                      setShowWallets(false)
                    }}
                    className="w-full flex items-center space-x-3 p-3 border border-[#EFF2F5] hover:border-[#3861FB] hover:bg-[#F0F9FF] cmc-border-radius-md transition-colors"
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="cmc-font-medium text-[#0D1421]">
                        {wallet.name}
                      </div>
                      <div className="cmc-text-sm text-[#616E85]">
                        {wallet.description}
                      </div>
                      <div className="cmc-text-xs text-[#9CA3AF] mt-1">
                        {wallet.networks}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-[#F8FAFD] cmc-border-radius-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-[#16C784]" />
                  <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                    Secure & Private
                  </span>
                </div>
                <p className="cmc-text-xs text-[#616E85]">
                  We never store your private keys. Your wallet remains fully under your control.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
      {/* Connected Wallet Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#3861FB] to-[#16C784] cmc-border-radius-full flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              Wallet Connected
            </h3>
            <p className="cmc-text-sm text-[#616E85]">
              {formatAddress(account!)}
            </p>
          </div>
        </div>
        
        <button
          onClick={disconnect}
          className="px-3 py-2 text-[#EA3943] hover:bg-[#FEF2F2] cmc-border-radius-md transition-colors"
        >
          Disconnect
        </button>
      </div>

      {/* Network Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">Network</span>
          <div className="flex items-center space-x-1">
            <Activity className="w-4 h-4 text-[#16C784]" />
            <span className="cmc-text-xs text-[#16C784]">Connected</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {supportedNetworks.map((network) => (
            <button
              key={network.id}
              onClick={() => switchNetwork(network.id)}
              className={`p-3 border cmc-border-radius-md transition-colors ${
                chainId === network.id
                  ? 'border-[#3861FB] bg-[#F0F9FF] text-[#3861FB]'
                  : 'border-[#EFF2F5] hover:border-[#3861FB] hover:bg-[#F8FAFD]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 cmc-border-radius-full"
                  style={{ backgroundColor: network.color }}
                />
                <span className="cmc-text-sm cmc-font-medium">
                  {network.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Balance Display */}
      <div className="bg-[#F8FAFD] cmc-border-radius-md p-4">
        <div className="flex items-center justify-between">
          <span className="cmc-text-sm text-[#616E85]">Balance</span>
          <div className="text-right">
            <div className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              {balance.slice(0, 8)} {currentNetwork?.symbol || 'ETH'}
            </div>
            <div className="cmc-text-sm text-[#616E85]">
              ~$2,456.78
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="flex items-center justify-center space-x-2 py-3 bg-[#3861FB] hover:bg-[#2952CC] text-white cmc-border-radius-md transition-colors">
          <Zap className="w-4 h-4" />
          <span className="cmc-text-sm cmc-font-medium">Quick Swap</span>
        </button>
        
        <button
          onClick={copyAddress}
          className="flex items-center justify-center space-x-2 py-3 border border-[#EFF2F5] hover:bg-[#F8FAFD] text-[#616E85] hover:text-[#3861FB] cmc-border-radius-md transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span className="cmc-text-sm cmc-font-medium">Copy Address</span>
        </button>
      </div>
    </div>
  )
}
