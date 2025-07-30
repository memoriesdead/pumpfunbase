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
    <header className="bg-gradient-to-b from-[#0B0D11] via-[#0F1116] to-[#151821] border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B] bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer">
            Pump.fun
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white/80 hover:text-[#00D4AA] font-medium transition-colors">Home</Link>
            <Link href="/discover" className="text-white/80 hover:text-[#00D4AA] font-medium transition-colors">Discover</Link>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search coins, exchanges, NFT..."
              className="w-80 h-10 pl-10 pr-4 bg-white/8 backdrop-blur-2xl border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00D4AA]/60 focus:ring-2 focus:ring-[#00D4AA]/20"
            />
          </div>

          {/* Mobile Search */}
          <button className="md:hidden p-2">
            <Search className="w-6 h-6 text-white/60" />
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
            <Menu className="w-6 h-6 text-white/60" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#151821]/95 backdrop-blur-xl border-t border-white/10 px-6 py-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-white/80 hover:text-[#00D4AA] font-medium transition-colors">Home</Link>
            <Link href="/discover" className="text-white/80 hover:text-[#00D4AA] font-medium transition-colors">Discover</Link>
            <div className="pt-4 border-t border-white/10 space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-white/80 hover:text-[#00D4AA] font-medium transition-colors"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="block w-full text-left px-4 py-2 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] text-white rounded-lg hover:opacity-90 font-medium transition-opacity"
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
