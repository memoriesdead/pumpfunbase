'use client'

import { useState } from 'react'
import { ChevronDown, Check, Zap, Shield } from 'lucide-react'
import { SUPPORTED_CHAINS, ChainConfig } from '@/lib/zerox-config'
import { useWallet } from './wallet-connection'

interface ChainSelectorProps {
  selectedChainId: number
  onChainSelect: (chainId: number) => void
  compact?: boolean
}

export default function ChainSelector({ 
  selectedChainId, 
  onChainSelect, 
  compact = false 
}: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { switchNetwork, chainId: walletChainId } = useWallet()

  const selectedChain = SUPPORTED_CHAINS[selectedChainId]
  const chains = Object.values(SUPPORTED_CHAINS)

  // Group chains by features
  const chainsWithGasless = chains.filter(chain => 
    chain.supportedFeatures.includes('gasless')
  )
  const swapOnlyChains = chains.filter(chain => 
    !chain.supportedFeatures.includes('gasless')
  )

  const handleChainSelect = async (chainId: number) => {
    try {
      // If wallet is connected and chain is different, try to switch network
      if (walletChainId && walletChainId !== chainId) {
        await switchNetwork(chainId)
      }
      
      onChainSelect(chainId)
      setIsOpen(false)
    } catch (error) {
      console.error('Error switching chain:', error)
      // Still update the interface even if wallet switch fails
      onChainSelect(chainId)
      setIsOpen(false)
    }
  }

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-[#EFF2F5] hover:border-[#3861FB] cmc-border-radius-md transition-colors"
        >
          <div
            className="w-4 h-4 cmc-border-radius-full"
            style={{ backgroundColor: selectedChain?.color }}
          />
          <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
            {selectedChain?.name}
          </span>
          <ChevronDown className="w-4 h-4 text-[#616E85]" />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-[#EFF2F5] cmc-border-radius-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="cmc-text-sm cmc-font-semibold text-[#0D1421] mb-3">
                Select Network
              </h3>
              
              {/* Gasless Chains */}
              <div className="mb-4">
                <div className="flex items-center space-x-1 mb-2">
                  <Zap className="w-3 h-3 text-[#16C784]" />
                  <span className="cmc-text-xs cmc-font-medium text-[#16C784]">
                    Gasless Trading Available
                  </span>
                </div>
                <div className="space-y-1">
                  {chainsWithGasless.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => handleChainSelect(chain.id)}
                      className={`w-full flex items-center justify-between p-2 cmc-border-radius-md transition-colors ${
                        selectedChainId === chain.id
                          ? 'bg-[#F0F9FF] border border-[#3861FB]'
                          : 'hover:bg-[#F8FAFD]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 cmc-border-radius-full"
                          style={{ backgroundColor: chain.color }}
                        />
                        <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                          {chain.name}
                        </span>
                        <span className="cmc-text-xs text-[#616E85]">
                          {chain.symbol}
                        </span>
                      </div>
                      {selectedChainId === chain.id && (
                        <Check className="w-4 h-4 text-[#3861FB]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swap Only Chains */}
              <div>
                <div className="flex items-center space-x-1 mb-2">
                  <Shield className="w-3 h-3 text-[#616E85]" />
                  <span className="cmc-text-xs cmc-font-medium text-[#616E85]">
                    Swap Only
                  </span>
                </div>
                <div className="space-y-1">
                  {swapOnlyChains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => handleChainSelect(chain.id)}
                      className={`w-full flex items-center justify-between p-2 cmc-border-radius-md transition-colors ${
                        selectedChainId === chain.id
                          ? 'bg-[#F0F9FF] border border-[#3861FB]'
                          : 'hover:bg-[#F8FAFD]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 cmc-border-radius-full"
                          style={{ backgroundColor: chain.color }}
                        />
                        <span className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                          {chain.name}
                        </span>
                        <span className="cmc-text-xs text-[#616E85]">
                          {chain.symbol}
                        </span>
                      </div>
                      {selectedChainId === chain.id && (
                        <Check className="w-4 h-4 text-[#3861FB]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">
          Select Network
        </h3>
        <div className="flex items-center space-x-1 cmc-text-xs text-[#616E85]">
          <span>{chains.length} networks</span>
        </div>
      </div>

      {/* Selected Chain Display */}
      <div className="mb-6 p-4 bg-[#F0F9FF] border border-[#3861FB] cmc-border-radius-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 cmc-border-radius-full"
              style={{ backgroundColor: selectedChain?.color }}
            />
            <div>
              <div className="cmc-text-base cmc-font-semibold text-[#0D1421]">
                {selectedChain?.name}
              </div>
              <div className="cmc-text-sm text-[#616E85]">
                {selectedChain?.symbol} • Chain ID: {selectedChain?.id}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedChain?.supportedFeatures.includes('gasless') && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-[#16C784] text-white cmc-text-xs cmc-border-radius-sm">
                <Zap className="w-3 h-3" />
                <span>Gasless</span>
              </div>
            )}
            <div className="flex items-center space-x-1 px-2 py-1 bg-[#3861FB] text-white cmc-text-xs cmc-border-radius-sm">
              <Shield className="w-3 h-3" />
              <span>Swap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gasless Trading Networks */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-4 h-4 text-[#16C784]" />
          <h4 className="cmc-text-base cmc-font-semibold text-[#0D1421]">
            Gasless Trading Networks
          </h4>
          <span className="px-2 py-1 bg-[#F0FDF4] text-[#16C784] cmc-text-xs cmc-border-radius-sm">
            {chainsWithGasless.length}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {chainsWithGasless.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain.id)}
              className={`p-4 border cmc-border-radius-md transition-colors ${
                selectedChainId === chain.id
                  ? 'border-[#3861FB] bg-[#F0F9FF]'
                  : 'border-[#EFF2F5] hover:border-[#3861FB] hover:bg-[#F8FAFD]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 cmc-border-radius-full"
                  style={{ backgroundColor: chain.color }}
                />
                <div className="text-left">
                  <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                    {chain.name}
                  </div>
                  <div className="cmc-text-xs text-[#616E85]">
                    {chain.symbol}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Swap Only Networks */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="w-4 h-4 text-[#616E85]" />
          <h4 className="cmc-text-base cmc-font-semibold text-[#0D1421]">
            Swap Only Networks
          </h4>
          <span className="px-2 py-1 bg-[#F8FAFD] text-[#616E85] cmc-text-xs cmc-border-radius-sm">
            {swapOnlyChains.length}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {swapOnlyChains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain.id)}
              className={`p-4 border cmc-border-radius-md transition-colors ${
                selectedChainId === chain.id
                  ? 'border-[#3861FB] bg-[#F0F9FF]'
                  : 'border-[#EFF2F5] hover:border-[#3861FB] hover:bg-[#F8FAFD]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 cmc-border-radius-full"
                  style={{ backgroundColor: chain.color }}
                />
                <div className="text-left">
                  <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">
                    {chain.name}
                  </div>
                  <div className="cmc-text-xs text-[#616E85]">
                    {chain.symbol}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Network Stats */}
      <div className="mt-6 pt-4 border-t border-[#EFF2F5]">
        <div className="grid grid-cols-3 gap-4 cmc-text-center">
          <div>
            <div className="cmc-text-lg cmc-font-bold text-[#16C784]">
              {chains.length}
            </div>
            <div className="cmc-text-xs text-[#616E85]">Total Networks</div>
          </div>
          <div>
            <div className="cmc-text-lg cmc-font-bold text-[#16C784]">
              {chainsWithGasless.length}
            </div>
            <div className="cmc-text-xs text-[#616E85]">Gasless Trading</div>
          </div>
          <div>
            <div className="cmc-text-lg cmc-font-bold text-[#16C784]">
              100+
            </div>
            <div className="cmc-text-xs text-[#616E85]">DEX Sources</div>
          </div>
        </div>
      </div>
    </div>
  )
}