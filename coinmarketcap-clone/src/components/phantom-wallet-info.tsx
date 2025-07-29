'use client'

import { useState, useEffect } from 'react'
import { useWallet } from './wallet-connection'
import { ExternalLink, Copy, RefreshCw, Info } from 'lucide-react'
import { getPopularTokens } from '@/lib/zerox-config'

export default function PhantomWalletInfo() {
  const { account, balance, walletType, solanaProvider } = useWallet()
  const [solanaBalance, setSolanaBalance] = useState<string>('0.0')
  const [loading, setLoading] = useState(false)
  const [tokenAccounts, setTokenAccounts] = useState<any[]>([])

  const isPhantom = walletType === 'phantom'

  const refreshBalance = async () => {
    if (!account || !isPhantom) return
    
    setLoading(true)
    try {
      const { Connection, PublicKey } = await import('@solana/web3.js')
      const connection = new Connection('https://api.mainnet-beta.solana.com')
      const publicKey = new PublicKey(account)
      
      // Get SOL balance
      const balanceLamports = await connection.getBalance(publicKey)
      const balanceSol = (balanceLamports / 1000000000).toFixed(4)
      setSolanaBalance(balanceSol)
      
      // Get token accounts (simplified)
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
        })
        
        const tokens = tokenAccounts.value
          .filter(account => account.account.data.parsed.info.tokenAmount.uiAmount > 0)
          .slice(0, 5) // Show top 5 tokens
          .map(account => ({
            mint: account.account.data.parsed.info.mint,
            amount: account.account.data.parsed.info.tokenAmount.uiAmount,
            decimals: account.account.data.parsed.info.tokenAmount.decimals
          }))
        
        setTokenAccounts(tokens)
      } catch (tokenError) {
        console.error('Error fetching token accounts:', tokenError)
      }
      
    } catch (error) {
      console.error('Error refreshing Solana balance:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isPhantom && account) {
      refreshBalance()
    }
  }, [isPhantom, account])

  const copyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account)
    }
  }

  const openInExplorer = () => {
    if (account) {
      window.open(`https://solscan.io/account/${account}`, '_blank')
    }
  }

  if (!isPhantom) {
    return null
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
      {/* Phantom Wallet Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF] to-[#14F195] cmc-border-radius-full flex items-center justify-center">
            <span className="text-2xl">👻</span>
          </div>
          <div>
            <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
              Phantom Wallet
            </h3>
            <p className="cmc-text-sm text-[#616E85]">
              Solana Network • {account?.slice(0, 4)}...{account?.slice(-4)}
            </p>
          </div>
        </div>
        
        <button
          onClick={refreshBalance}
          disabled={loading}
          className="flex items-center space-x-2 px-3 py-2 bg-[#9945FF] hover:bg-[#8839E0] disabled:bg-[#EFF2F5] disabled:text-[#616E85] text-white cmc-text-sm cmc-border-radius-md transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Balance Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 cmc-border-radius-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="cmc-text-sm text-[#616E85] mb-1">SOL Balance</div>
            <div className="cmc-text-2xl cmc-font-bold text-[#0D1421]">
              {solanaBalance} SOL
            </div>
            <div className="cmc-text-sm text-[#616E85]">
              ~${(parseFloat(solanaBalance) * 180).toFixed(2)} USD
            </div>
          </div>
          
          <div className="text-right">
            <div className="cmc-text-sm text-[#616E85] mb-1">Network</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#9945FF] cmc-border-radius-full" />
              <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                Solana Mainnet
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Token Holdings */}
      {tokenAccounts.length > 0 && (
        <div className="mb-6">
          <h4 className="cmc-text-base cmc-font-semibold text-[#0D1421] mb-3">
            Token Holdings
          </h4>
          
          <div className="space-y-2">
            {tokenAccounts.map((token, index) => {
              // Try to find matching token from our popular tokens list
              const solanaTokens = getPopularTokens(101)
              const knownToken = solanaTokens.find(t => t.address === token.mint)
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFD] cmc-border-radius-md">
                  <div className="flex items-center space-x-3">
                    {knownToken?.logoURI ? (
                      <img
                        src={knownToken.logoURI}
                        alt={knownToken.symbol}
                        className="w-8 h-8 cmc-border-radius-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className={`w-8 h-8 bg-[#9945FF] cmc-border-radius-full flex items-center justify-center ${knownToken?.logoURI ? 'hidden' : ''}`}>
                      <span className="text-white cmc-text-xs cmc-font-bold">
                        {knownToken?.symbol?.slice(0, 2) || token.mint.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                        {knownToken?.symbol || `Token #${index + 1}`}
                      </div>
                      <div className="cmc-text-xs text-[#616E85]">
                        {knownToken?.name || `${token.mint.slice(0, 8)}...`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                      {token.amount.toFixed(4)}
                    </div>
                    <div className="cmc-text-xs text-[#616E85]">
                      {knownToken?.symbol || `${token.decimals} decimals`}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Account Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={copyAddress}
          className="flex items-center justify-center space-x-2 py-3 border border-[#EFF2F5] hover:bg-[#F8FAFD] text-[#616E85] hover:text-[#9945FF] cmc-border-radius-md transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span className="cmc-text-sm cmc-font-medium">Copy Address</span>
        </button>
        
        <button
          onClick={openInExplorer}
          className="flex items-center justify-center space-x-2 py-3 border border-[#EFF2F5] hover:bg-[#F8FAFD] text-[#616E85] hover:text-[#9945FF] cmc-border-radius-md transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="cmc-text-sm cmc-font-medium">View on Solscan</span>
        </button>
      </div>

      {/* Phantom Features */}
      <div className="p-4 bg-[#F0F9FF] cmc-border-radius-md">
        <div className="flex items-center space-x-2 mb-3">
          <Info className="w-4 h-4 text-[#3861FB]" />
          <span className="cmc-text-sm cmc-font-semibold text-[#3861FB]">
            Phantom Features
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 cmc-text-sm">
          <div>
            <div className="cmc-font-medium text-[#0D1421]">Solana Native</div>
            <div className="text-[#616E85]">Fast & cheap transactions</div>
          </div>
          <div>
            <div className="cmc-font-medium text-[#0D1421]">NFT Support</div>
            <div className="text-[#616E85]">View & manage NFTs</div>
          </div>
          <div>
            <div className="cmc-font-medium text-[#0D1421]">DeFi Ready</div>
            <div className="text-[#616E85]">Connect to Solana DeFi</div>
          </div>
          <div>
            <div className="cmc-font-medium text-[#0D1421]">Multi-Chain</div>
            <div className="text-[#616E85]">Ethereum support</div>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-4 pt-4 border-t border-[#EFF2F5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#14F195] cmc-border-radius-full animate-pulse" />
            <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
              Connected to Phantom
            </span>
          </div>
          
          <div className="cmc-text-xs text-[#616E85]">
            Solana Mainnet-Beta
          </div>
        </div>
      </div>
    </div>
  )
}