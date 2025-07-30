'use client'

import { useState } from 'react'
import { Crypto } from '@/types/crypto'
import { 
  HelpCircle, 
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Globe,
  FileText,
  Wallet,
  Search,
  ChevronRight,
  Info,
  AlertCircle,
  Star
} from 'lucide-react'
import WalletConnect, { useWallet } from './wallet/wallet-connect'
import TradingPanel from './trading/trading-panel'
import PortfolioTracker from './portfolio/portfolio-tracker'

interface CryptoDetailLeftSidebarExactProps {
  crypto: Crypto
}

// Exact Social Media Icons from CoinMarketCap
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const RedditIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L21.635 4.55c.309-1.239-.473-1.8-1.263-1.463z"/>
  </svg>
)

const DiscordIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
  </svg>
)

export default function CryptoDetailLeftSidebarExact({ crypto }: CryptoDetailLeftSidebarExactProps) {
  const [convertAmount, setConvertAmount] = useState('1')
  const [convertFrom, setConvertFrom] = useState('BTC')
  const [convertTo, setConvertTo] = useState('USD')
  const [activeTab, setActiveTab] = useState<'trade' | 'portfolio'>('trade')
  const wallet = useWallet()

  const convertedValue = convertFrom === 'BTC' 
    ? (parseFloat(convertAmount || '0') * crypto.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : (parseFloat(convertAmount || '0') / crypto.price).toFixed(8)

  return (
    <div className="w-[330px] space-y-4 sticky top-6">
      
      {/* Wallet Connection */}
      <div className="bg-white border border-[#EFF2F5] rounded-lg p-4">
        <div className="flex justify-center">
          <WalletConnect />
        </div>
      </div>

      {/* Trading & Portfolio Tabs */}
      {wallet.isConnected && (
        <div className="bg-white border border-[#EFF2F5] rounded-lg">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#EFF2F5]">
            <button
              onClick={() => setActiveTab('trade')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'trade'
                  ? 'text-[#3861FB] border-b-2 border-[#3861FB]'
                  : 'text-[#8C8C8C] hover:text-[#1E1932]'
              }`}
            >
              Trade
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'portfolio'
                  ? 'text-[#3861FB] border-b-2 border-[#3861FB]'
                  : 'text-[#8C8C8C] hover:text-[#1E1932]'
              }`}
            >
              Portfolio
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'trade' ? (
              <TradingPanel 
                crypto={{
                  symbol: crypto.symbol,
                  name: crypto.name,
                  price: crypto.price,
                  logo: crypto.logo,
                  chainId: 1,
                  chainName: 'Ethereum'
                }} 
                wallet={wallet}
              />
            ) : (
              <PortfolioTracker wallet={wallet} />
            )}
          </div>
        </div>
      )}
      
      {/* Why is BTC's price up today? */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md hover:border-[#3861FB] transition-colors cursor-pointer">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#3861FB] flex-shrink-0" />
          <span className="cmc-text-base cmc-font-medium text-[#0D1421]">Why is {crypto.symbol}'s price up today?</span>
        </div>
      </div>

      {/* Market Statistics */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Market cap</span>
            <div className="text-right">
              <div className="cmc-text-base cmc-font-medium text-[#0D1421]">$2.35T</div>
              <div className="cmc-text-xs text-[#16C784] flex items-center justify-end">
                <TrendingUp className="w-3 h-3 mr-1" />
                0.71%
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Volume (24h)</span>
            <div className="text-right">
              <div className="cmc-text-base cmc-font-medium text-[#0D1421]">$47.71B</div>
              <div className="cmc-text-xs text-[#16C784] flex items-center justify-end">
                <TrendingUp className="w-3 h-3 mr-1" />
                40.82%
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">FDV</span>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">$2.48T</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Vol/Mkt Cap (24h)</span>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">2.02%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Total supply</span>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">19.89M BTC</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Max. supply</span>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">21M BTC</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Circulating supply</span>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">19.89M BTC</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Profile score</span>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">100%</span>
          </div>
        </div>
      </div>

      {/* Website, Whitepaper, Socials */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Website</span>
            <a 
              href="https://bitcoin.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cmc-text-base text-[#3861FB] hover:underline flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </a>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Whitepaper</span>
            <a 
              href="https://bitcoin.org/bitcoin.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cmc-text-base text-[#3861FB] hover:underline flex items-center space-x-1"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="cmc-text-base text-[#616E85]">Socials</span>
            <div className="flex space-x-2">
              <a 
                href="https://twitter.com/bitcoin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3861FB] hover:text-[#1DA1F2] transition-colors"
              >
                <TwitterIcon />
              </a>
              <a 
                href="https://reddit.com/r/bitcoin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3861FB] hover:text-[#FF4500] transition-colors"
              >
                <RedditIcon />
              </a>
              <a 
                href="https://t.me/BitcoinCore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3861FB] hover:text-[#0088CC] transition-colors"
              >
                <TelegramIcon />
              </a>
              <a 
                href="https://discord.gg/bitcoin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3861FB] hover:text-[#5865F2] transition-colors"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex justify-between items-center">
          <span className="cmc-text-base text-[#616E85]">Rating</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              <Star className="w-4 h-4 text-[#CFD6E4] fill-[#CFD6E4]" />
            </div>
            <span className="cmc-text-base cmc-font-medium text-[#0D1421]">4.4</span>
          </div>
        </div>
      </div>

      {/* Explorers */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex justify-between items-center">
          <span className="cmc-text-base text-[#616E85]">Explorers</span>
          <a 
            href="https://blockchain.info" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cmc-text-base text-[#3861FB] hover:underline flex items-center space-x-1"
          >
            <Search className="w-4 h-4" />
            <span>blockchain.info</span>
          </a>
        </div>
      </div>

      {/* Wallets */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex justify-between items-center">
          <span className="cmc-text-base text-[#616E85]">Wallets</span>
          <div className="flex space-x-2">
            <Wallet className="w-4 h-4 text-[#3861FB] cursor-pointer hover:text-[#0D1421] transition-colors" />
            <Wallet className="w-4 h-4 text-[#3861FB] cursor-pointer hover:text-[#0D1421] transition-colors" />
            <Wallet className="w-4 h-4 text-[#3861FB] cursor-pointer hover:text-[#0D1421] transition-colors" />
          </div>
        </div>
      </div>

      {/* UCID */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex justify-between items-center">
          <span className="cmc-text-base text-[#616E85]">UCID</span>
          <span className="cmc-text-base cmc-font-medium text-[#0D1421]">1</span>
        </div>
      </div>

      {/* BTC to USD Converter */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <h3 className="cmc-text-base cmc-font-medium text-[#0D1421] mb-3">BTC to USD converter</h3>
        
        <div className="space-y-3">
          <div className="flex">
            <select 
              value={convertFrom}
              onChange={(e) => setConvertFrom(e.target.value)}
              className="px-3 py-2 border border-[#EFF2F5] rounded-l-lg bg-[#F8FAFD] cmc-text-base focus:outline-none focus:border-[#3861FB] transition-colors"
            >
              <option value="BTC">BTC</option>
              <option value="USD">USD</option>
            </select>
            <input
              type="number"
              value={convertAmount}
              onChange={(e) => setConvertAmount(e.target.value)}
              className="flex-1 px-3 py-2 border border-l-0 border-[#EFF2F5] rounded-r-lg cmc-text-base focus:outline-none focus:border-[#3861FB] transition-colors"
              placeholder="1"
            />
          </div>
          
          <div className="flex items-center justify-center">
            <ArrowUpDown className="w-4 h-4 text-[#616E85]" />
          </div>
          
          <div className="flex">
            <select 
              value={convertTo}
              onChange={(e) => setConvertTo(e.target.value)}
              className="px-3 py-2 border border-[#EFF2F5] rounded-l-lg bg-[#F8FAFD] cmc-text-base focus:outline-none focus:border-[#3861FB] transition-colors"
            >
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
            </select>
            <input
              type="text"
              value={convertedValue}
              readOnly
              className="flex-1 px-3 py-2 border border-l-0 border-[#EFF2F5] rounded-r-lg bg-[#F8FAFD] text-[#0D1421] cmc-text-base cmc-font-medium"
            />
          </div>
        </div>
      </div>

      {/* Price Performance */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <h3 className="cmc-text-base cmc-font-medium text-[#0D1421] mb-3">Price performance</h3>
        
        <div className="space-y-4">
          {/* 24h Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="cmc-text-xs text-[#616E85]">24h</span>
              <div className="flex space-x-6">
                <span className="cmc-text-xs text-[#616E85]">Low</span>
                <span className="cmc-text-xs text-[#616E85]">High</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="cmc-text-base cmc-font-medium text-[#0D1421]">$117,350.28</span>
              <span className="cmc-text-base cmc-font-medium text-[#0D1421]">$118,385.89</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#EFF2F5] rounded-full h-1">
              <div className="bg-[#3861FB] h-1 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          {/* All-time High */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="cmc-text-base text-[#616E85]">All-time high</span>
              <div className="text-right">
                <div className="cmc-text-base cmc-font-medium text-[#0D1421]">$123,091.61</div>
                <div className="cmc-text-xs text-[#EA3943] flex items-center justify-end">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -3.91%
                </div>
              </div>
            </div>
            <div className="cmc-text-xs text-[#616E85] text-right">
              Jul 14, 2025 (14 days ago)
            </div>
          </div>
          
          {/* All-time Low */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="cmc-text-base text-[#616E85]">All-time low</span>
              <div className="text-right">
                <div className="cmc-text-base cmc-font-medium text-[#0D1421]">$0.04865</div>
                <div className="cmc-text-xs text-[#16C784] flex items-center justify-end">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +243129823.71%
                </div>
              </div>
            </div>
            <div className="cmc-text-xs text-[#616E85] text-right">
              Jul 14, 2010 (15 years ago)
            </div>
          </div>
          
          <a href="#" className="cmc-text-base text-[#3861FB] hover:underline flex items-center">
            See historical data
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <h3 className="cmc-text-base cmc-font-medium text-[#0D1421] mb-3">Tags</h3>
        
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#F8FAFD] cmc-text-xs text-[#0D1421] cmc-border-radius-pill border border-[#EFF2F5] hover:border-[#3861FB] transition-colors cursor-pointer">
            YZi Labs Portfolio
          </span>
          <span className="px-3 py-1 bg-[#F8FAFD] cmc-text-xs text-[#0D1421] cmc-border-radius-pill border border-[#EFF2F5] hover:border-[#3861FB] transition-colors cursor-pointer">
            Bitcoin Ecosystem
          </span>
          <span className="px-3 py-1 bg-[#F8FAFD] cmc-text-xs text-[#0D1421] cmc-border-radius-pill border border-[#EFF2F5] hover:border-[#3861FB] transition-colors cursor-pointer">
            Layer 1
          </span>
          <button className="cmc-text-xs text-[#3861FB] hover:underline flex items-center">
            Show all
            <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Do you own this project? */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <h3 className="cmc-text-base cmc-font-medium text-[#0D1421] mb-3">Do you own this project?</h3>
        
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 bg-[#F8FAFD] cmc-border-radius-md cmc-text-base text-[#0D1421] hover:bg-[#EFF2F5] transition-colors flex items-center space-x-2 border border-transparent hover:border-[#EFF2F5]">
            <Info className="w-4 h-4 text-[#3861FB]" />
            <span>Update Token Info</span>
          </button>
          <button className="w-full text-left px-3 py-2 bg-[#F8FAFD] cmc-border-radius-md cmc-text-base text-[#0D1421] hover:bg-[#EFF2F5] transition-colors flex items-center space-x-2 border border-transparent hover:border-[#EFF2F5]">
            <AlertCircle className="w-4 h-4 text-[#3861FB]" />
            <span>Submit Token Unlocks</span>
          </button>
        </div>
      </div>

      {/* CoinBites */}
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md hover:border-[#3861FB] transition-colors cursor-pointer">
        <div className="flex items-start space-x-3">
          <span className="bg-orange-500 text-white cmc-text-xs px-2 py-1 cmc-border-radius-sm cmc-font-medium">New</span>
          <div className="flex-1">
            <h3 className="cmc-text-base cmc-font-medium text-[#0D1421] mb-1 leading-tight">
              CoinBites: Bitcoin - The OG Crypto That Started It All
            </h3>
            <p className="cmc-text-xs text-[#616E85]">
              CoinBites by CMC: Your 3-Minu...
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#616E85] flex-shrink-0 mt-1" />
        </div>
      </div>

    </div>
  )
}
