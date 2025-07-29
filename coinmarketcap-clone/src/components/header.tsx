'use client'
import { Search, Menu } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/context/auth-context'
import LoginModal from './login-modal'
import WalletConnect from './wallet/wallet-connect'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="bg-white border-b border-[#F0F0F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-[#1652F0] hover:text-[#1652F0]/80 transition-colors cursor-pointer">
            CoinMarketCap
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Cryptocurrencies</a>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Exchanges</a>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">NFT</a>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">DeFi</a>
            <Link href="/buy" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Buy Crypto</Link>
            <Link href="/trading" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Trading</Link>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Learn</a>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-5 h-5 text-[#8C8C8C]" />
            <input
              type="text"
              placeholder="Search coins, exchanges, NFT..."
              className="w-80 h-10 pl-10 pr-4 bg-[#F8F9FA] border border-[#F0F0F0] rounded-lg focus:outline-none focus:border-[#1652F0] focus:ring-2 focus:ring-[#1652F0]/20"
            />
          </div>

          {/* Mobile Search */}
          <button className="md:hidden p-2">
            <Search className="w-6 h-6 text-[#8C8C8C]" />
          </button>

          {/* Action Buttons */}
          <div className="hidden lg:block">
            <WalletConnect />
          </div>

          {/* Mobile Menu */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-[#8C8C8C]" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#F0F0F0] px-6 py-4">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Cryptocurrencies</a>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Exchanges</a>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">NFT</a>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">DeFi</a>
            <Link href="/buy" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Buy Crypto</Link>
            <Link href="/trading" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Trading</Link>
            <a href="#" className="text-[#1E1E1E] hover:text-[#1652F0] font-medium">Learn</a>
            <div className="pt-4 border-t border-[#F0F0F0] space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-[#1E1E1E] hover:text-[#1652F0] font-medium"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="block w-full text-left px-4 py-2 bg-[#1652F0] text-white rounded-lg hover:bg-[#1652F0]/90 font-medium"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </header>
  )
}
