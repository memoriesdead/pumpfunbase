'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import Header from './header';
import StatsBar from './stats-bar';
import CryptoSocialSidebar from './crypto-social-sidebar';
import PaymentModal from './payment-modal';
import { EnhancedCryptoTrading } from './trading/enhanced-crypto-trading';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, ExternalLink, Heart, Share2, TrendingUp, Users, Shield, AlertTriangle, BarChart3, History, Newspaper, HelpCircle, ArrowUpDown, Globe, FileText, Wallet, Search, ChevronRight, Info, Star, Clock, Maximize2, Settings, Download } from 'lucide-react';
import MobulaChart from './mobula-chart';
import { Crypto } from '@/types/crypto';

interface MemeCoinData {
  id: string;
  name: string;
  ticker: string;
  slug: string;
  price: string;
  change24h: string;
  change7d: string;
  marketCap: string;
  volume: string;
  holders: number;
  trustScore: number;
  category: string;
  creator: string;
  graduationProgress: number;
  isVerified: boolean;
  isAudited: boolean;
  isViral: boolean;
  isHiddenGem: boolean;
  hasWhaleActivity: boolean;
  viralFactor: string | null;
  socialBuzz: number;
  whaleInterest: string;
  momentumScore: number;
  riskLevel: string;
  image: string;
  createdAt: Date;
  description: string;
  contractAddress: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  totalSupply: string;
  circulatingSupply: string;
  maxSupply?: string;
  allTimeHigh: string;
  allTimeLow: string;
  liquidityUSD: string;
  burnedTokens?: string;
}

interface MemeCoinDetailPageProps {
  slug: string;
}

// Mock data generator for detail page
const generateMemeCoinData = (slug: string): MemeCoinData => {
  const random = Math.random();
  const trustScore = Math.floor(Math.random() * 100);
  const change24h = (Math.random() * 300 - 150).toFixed(2);
  
  return {
    id: slug,
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    ticker: '$' + slug.slice(0, 4).toUpperCase(),
    slug,
    price: (Math.random() * 10).toFixed(6),
    change24h,
    change7d: (Math.random() * 200 - 100).toFixed(2),
    marketCap: (Math.random() * 50000000).toFixed(0),
    volume: (Math.random() * 5000000).toFixed(0),
    holders: Math.floor(Math.random() * 25000),
    trustScore,
    category: ['Meme', 'Gaming', 'DeFi', 'Utility'][Math.floor(Math.random() * 4)],
    creator: ['CryptoWhale', 'MemeKing', 'DiamondDev', 'TokenMaster'][Math.floor(Math.random() * 4)],
    graduationProgress: Math.floor(Math.random() * 100),
    isVerified: Math.random() > 0.7,
    isAudited: Math.random() > 0.8,
    isViral: Math.random() > 0.8,
    isHiddenGem: Math.random() > 0.85,
    hasWhaleActivity: Math.random() > 0.9,
    viralFactor: Math.random() > 0.8 ? '🔥 Viral' : null,
    socialBuzz: Math.floor(Math.random() * 1000),
    whaleInterest: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MED' : 'LOW',
    momentumScore: Math.floor(Math.random() * 100),
    riskLevel: trustScore > 80 ? 'Low' : trustScore > 60 ? 'Medium' : 'High',
    image: `https://picsum.photos/400/400?random=${slug}`,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    description: `${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} is a revolutionary meme token built on Solana blockchain with advanced tokenomics and community-driven governance.`,
    contractAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    website: `https://${slug}.com`,
    twitter: `https://twitter.com/${slug}`,
    telegram: `https://t.me/${slug}`,
    totalSupply: (Math.random() * 1000000000).toFixed(0),
    circulatingSupply: (Math.random() * 800000000).toFixed(0),
    maxSupply: Math.random() > 0.5 ? (Math.random() * 1000000000).toFixed(0) : undefined,
    allTimeHigh: (parseFloat((Math.random() * 10).toFixed(6)) * 2).toFixed(6),
    allTimeLow: (parseFloat((Math.random() * 10).toFixed(6)) * 0.1).toFixed(6),
    liquidityUSD: (Math.random() * 2000000).toFixed(0),
    burnedTokens: Math.random() > 0.5 ? (Math.random() * 100000000).toFixed(0) : undefined
  };
};

export default function MemeCoinDetailPage({ slug }: MemeCoinDetailPageProps) {
  const [memeCoin, setMemeCoin] = useState<MemeCoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showTrading, setShowTrading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [theme, setTheme] = useState<'home' | 'discover'>('discover'); // Default to discover theme
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Detect theme based on URL parameters
    const fromParam = searchParams.get('from');
    if (fromParam === 'home') {
      setTheme('home');
    } else if (fromParam === 'discover') {
      setTheme('discover');
    }
  }, [searchParams]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = generateMemeCoinData(slug);
      setMemeCoin(data);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleShare = () => {
    if (navigator.share && memeCoin) {
      navigator.share({
        title: `${memeCoin.name} (${memeCoin.ticker})`,
        text: `Check out ${memeCoin.name} on Pump.fun - Trust Score: ${memeCoin.trustScore}, Price: ${memeCoin.price} SOL`,
        url: window.location.href
      });
    }
  };

  const getTrustGradient = () => {
    if (!memeCoin) return 'from-gray-400 to-gray-600';
    if (memeCoin.trustScore >= 90) return 'from-[#00D4AA] via-[#00FF88] to-[#7C3AED]';
    if (memeCoin.trustScore >= 80) return 'from-[#00D4AA] to-[#7C3AED]';
    if (memeCoin.trustScore >= 70) return 'from-[#4ADE80] to-[#00D4AA]';
    if (memeCoin.trustScore >= 60) return 'from-[#FFB800] to-[#F97316]';
    if (memeCoin.trustScore >= 40) return 'from-[#FF6B6B] to-[#FFB800]';
    return 'from-[#FF6B6B] to-[#DC2626]';
  };

  const getPerformanceColor = (change: string) => {
    const changeFloat = parseFloat(change);
    if (changeFloat > 100) return 'text-[#00FF88]';
    if (changeFloat > 50) return 'text-[#4ADE80]';
    if (changeFloat > 10) return 'text-[#10B981]';
    if (changeFloat > 0) return 'text-[#22C55E]';
    if (changeFloat > -10) return 'text-[#F97316]';
    if (changeFloat > -25) return 'text-[#EF4444]';
    return 'text-[#DC2626]';
  };

  const getRiskBadgeColor = () => {
    if (!memeCoin) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    switch (memeCoin.riskLevel) {
      case 'Low': return 'bg-[#00D4AA]/20 text-[#00D4AA] border-[#00D4AA]/30';
      case 'Medium': return 'bg-[#FFB800]/20 text-[#FFB800] border-[#FFB800]/30';
      case 'High': return 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  // Theme-specific styling functions
  const getThemeStyles = () => {
    if (theme === 'home') {
      // Home page theme - simple dark gradient
      return {
        background: 'bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821]',
        cardBackground: 'bg-gradient-to-b from-[#151821]/95 to-[#0F1116]/95',
        accentColor: 'text-[#00D4AA]',
        buttonGradient: 'bg-gradient-to-r from-[#00D4AA] to-[#7C3AED]',
        borderColor: 'border-white/10'
      };
    } else {
      // Discover page theme - premium dark gradient with enhanced visuals
      return {
        background: 'bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821]',
        cardBackground: 'bg-gradient-to-b from-[#151821]/95 to-[#0F1116]/95',
        accentColor: 'text-[#00D4AA]',
        buttonGradient: 'bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B]',
        borderColor: 'border-white/10'
      };
    }
  };

  const themeStyles = getThemeStyles();

  if (isLoading) {
    return (
      <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D4AA] mx-auto mb-4"></div>
          <p className="text-white/70">Loading {slug.toUpperCase()}...</p>
        </div>
      </div>
    );
  }

  if (!memeCoin) {
    return (
      <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-2">Token Not Found</h1>
          <p className="text-white/70 mb-6">
            We couldn't find information for "{slug.toUpperCase()}".
          </p>
          <button
            onClick={() => router.push(theme === 'home' ? '/' : '/discover')}
            className={`${themeStyles.buttonGradient} text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all hover:scale-105`}
          >
            Back to {theme === 'home' ? 'Home' : 'Discover'}
          </button>
        </div>
      </div>
    );
  }

  // Convert meme coin data to crypto format for compatibility
  const cryptoData = {
    name: memeCoin.name,
    symbol: memeCoin.ticker,
    logo: memeCoin.image,
    price: parseFloat(memeCoin.price),
    rank: Math.floor(Math.random() * 100) + 1,
    tags: [memeCoin.category, memeCoin.riskLevel + ' Risk', 'Meme'],
    priceChange24h: parseFloat(memeCoin.change24h),
    marketCap: parseFloat(memeCoin.marketCap),
    volume24h: parseFloat(memeCoin.volume),
    circulatingSupply: parseFloat(memeCoin.circulatingSupply),
    totalSupply: parseFloat(memeCoin.totalSupply),
    maxSupply: memeCoin.maxSupply ? parseFloat(memeCoin.maxSupply) : null
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} text-white`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 via-transparent to-[#7C3AED]/20"></div>
      </div>
      
      <StatsBar />
      <Header />
      
      {/* Enhanced Meme Coin Hero Section */}
      <div className={`${themeStyles.cardBackground} backdrop-blur-xl ${themeStyles.borderColor} border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Enhanced Breadcrumb with Stats */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <span 
                className={`hover:${themeStyles.accentColor} cursor-pointer transition-colors`}
                onClick={() => router.push(theme === 'home' ? '/' : '/discover')}
              >
                {theme === 'home' ? 'Home' : 'Discover'}
              </span>
              <span>›</span>
              <span className={`hover:${themeStyles.accentColor} cursor-pointer transition-colors`}>
                {theme === 'home' ? 'Cryptocurrencies' : 'Meme Coins'}
              </span>
              <span>›</span>
              <span className="text-white font-medium">{memeCoin.name}</span>
            </div>
            
            {/* Live Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse"></div>
                <span className="text-white/70">Live</span>
              </div>
              <div className="text-white/60">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Main Header Layout */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            
            {/* Left Section: Token Identity */}
            <div className="flex items-start space-x-6">
              
              {/* Token Image with Status Indicators */}
              <div className="relative">
                <div className={`w-20 h-20 rounded-2xl overflow-hidden border-4 shadow-xl ${
                  memeCoin.trustScore >= 80 ? 'border-[#00D4AA]/50' : 
                  memeCoin.trustScore >= 60 ? 'border-[#FFB800]/50' : 'border-[#FF6B6B]/50'
                }`}>
                  <img 
                    src={memeCoin.image} 
                    alt={memeCoin.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Status Badges */}
                {memeCoin.viralFactor && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#00FF88] rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
                    🔥
                  </div>
                )}
                
                {memeCoin.hasWhaleActivity && (
                  <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-[#7C3AED] rounded-full text-xs font-bold text-white shadow-lg">
                    🐋
                  </div>
                )}
              </div>
              
              {/* Token Info */}
              <div className="flex-1">
                {/* Name and Symbol */}
                <div className="flex items-center space-x-4 mb-3">
                  <h1 className="text-4xl font-black text-white">{memeCoin.name}</h1>
                  <span className="text-2xl text-white/70 font-mono">{memeCoin.ticker}</span>
                  
                  {/* Verification Badges */}
                  <div className="flex items-center space-x-2">
                    {memeCoin.isVerified && (
                      <div className="flex items-center bg-[#00D4AA] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </div>
                    )}
                    {memeCoin.isAudited && (
                      <div className="flex items-center bg-[#3861FB] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        <span className="mr-1">🛡️</span>
                        Audited
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Enhanced Tag Row */}
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                    Rank #{Math.floor(Math.random() * 1000) + 1}
                  </span>
                  <span className={`text-white text-xs px-3 py-1.5 rounded-full font-semibold ${
                    memeCoin.trustScore >= 80 ? 'bg-[#00D4AA]' :
                    memeCoin.trustScore >= 60 ? 'bg-[#FFB800]' : 'bg-[#FF6B6B]'
                  }`}>
                    Trust Score {memeCoin.trustScore}
                  </span>
                  <span className={`text-white text-xs px-3 py-1.5 rounded-full font-semibold ${
                    memeCoin.riskLevel === 'Low' ? 'bg-[#00D4AA]' :
                    memeCoin.riskLevel === 'Medium' ? 'bg-[#FFB800]' : 'bg-[#FF6B6B]'
                  }`}>
                    {memeCoin.riskLevel} Risk
                  </span>
                  <span className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-full font-semibold border border-white/20">
                    {memeCoin.category}
                  </span>
                  {memeCoin.viralFactor && (
                    <span className="bg-gradient-to-r from-[#FF6B6B] to-[#00FF88] text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                      {memeCoin.viralFactor}
                    </span>
                  )}
                  <span className="bg-[#7C3AED]/20 text-[#7C3AED] text-xs px-3 py-1.5 rounded-full font-semibold border border-[#7C3AED]/30">
                    Solana SPL
                  </span>
                </div>
                
                {/* Creator and Time Info */}
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <div className="flex items-center space-x-2">
                    <span>Created by</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-5 h-5 bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {memeCoin.creator.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{memeCoin.creator}</span>
                    </div>
                  </div>
                  <span>•</span>
                  <span>{Math.round((Date.now() - memeCoin.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days ago</span>
                  <span>•</span>
                  <span>{memeCoin.holders.toLocaleString()} holders</span>
                </div>
              </div>
            </div>
            
            {/* Right Section: Price and Metrics */}
            <div className="lg:text-right">
              {/* Price Display */}
              <div className="mb-4">
                <div className="text-4xl font-black text-white mb-1">
                  {memeCoin.price} SOL
                </div>
                <div className="text-lg text-white/70 mb-2 font-medium">
                  ≈ ${(parseFloat(memeCoin.price) * 180).toFixed(2)} USD
                </div>
                <div className={`flex items-center justify-end text-lg font-bold ${
                  parseFloat(memeCoin.change24h) >= 0 ? 'text-[#00FF88]' : 'text-[#FF6B6B]'
                }`}>
                  <span className="mr-2">
                    {parseFloat(memeCoin.change24h) >= 0 ? '▲' : '▼'}
                  </span>
                  {parseFloat(memeCoin.change24h) >= 0 ? '+' : ''}{memeCoin.change24h}% (24h)
                </div>
              </div>
              
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Market Cap</div>
                  <div className="text-lg font-bold text-white">
                    ${(parseFloat(memeCoin.marketCap) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center border border-white/10">
                  <div className="text-xs text-white/60 mb-1">24h Volume</div>
                  <div className="text-lg font-bold text-white">
                    ${(parseFloat(memeCoin.volume) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Liquidity</div>
                  <div className="text-lg font-bold text-white">
                    ${(parseFloat(memeCoin.liquidityUSD) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Progress</div>
                  <div className="text-lg font-bold text-[#00D4AA]">
                    {memeCoin.graduationProgress}%
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                    isSaved 
                      ? 'bg-[#FF6B6B] border-[#FF6B6B] text-white shadow-lg' 
                      : 'bg-white/10 border-white/20 text-white hover:border-[#00D4AA] hover:text-[#00D4AA] backdrop-blur-xl'
                  }`}
                  title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/10 border-2 border-white/20 text-white rounded-xl hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all hover:scale-105 backdrop-blur-xl"
                  title="Share Token"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button className={`px-6 py-3 ${themeStyles.buttonGradient} text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                  Quick Trade
                </button>
              </div>
            </div>
          </div>
          
          {/* Performance Indicators Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">Momentum</div>
                <div className={`text-sm font-bold ${
                  memeCoin.momentumScore >= 70 ? 'text-[#00D4AA]' : 
                  memeCoin.momentumScore >= 40 ? 'text-[#FFB800]' : 'text-[#FF6B6B]'
                }`}>
                  {memeCoin.momentumScore}/100
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">Social Buzz</div>
                <div className="text-sm font-bold text-[#7C3AED]">{memeCoin.socialBuzz}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">Whale Interest</div>
                <div className={`text-sm font-bold ${
                  memeCoin.whaleInterest === 'HIGH' ? 'text-[#00FF88]' : 
                  memeCoin.whaleInterest === 'MED' ? 'text-[#FFB800]' : 'text-white/60'
                }`}>
                  {memeCoin.whaleInterest}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">7d Change</div>
                <div className={`text-sm font-bold ${
                  parseFloat(memeCoin.change7d) >= 0 ? 'text-[#00FF88]' : 'text-[#FF6B6B]'
                }`}>
                  {parseFloat(memeCoin.change7d) >= 0 ? '+' : ''}{memeCoin.change7d}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">ATH</div>
                <div className="text-sm font-bold text-white">{memeCoin.allTimeHigh} SOL</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">ATL</div>
                <div className="text-sm font-bold text-white">{memeCoin.allTimeLow} SOL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading and Buy Buttons */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex justify-end mb-4 gap-3">
          <button
            onClick={() => setShowTrading(!showTrading)}
            className={`px-6 py-3 ${themeStyles.buttonGradient} text-white rounded-xl hover:shadow-xl font-bold transition-all duration-300 hover:scale-105`}
          >
            {showTrading ? 'Hide' : 'Trade'} {memeCoin.ticker}
          </button>
          {isLoggedIn && (
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className={`px-6 py-3 ${theme === 'home' ? 'bg-gradient-to-r from-[#7C3AED] to-[#FF6B6B]' : themeStyles.buttonGradient} text-white rounded-xl hover:shadow-xl font-bold transition-all duration-300 hover:scale-105`}
            >
              Buy {memeCoin.ticker}
            </button>
          )}
        </div>

        {/* Enhanced Trading Interface */}
        {showTrading && (
          <div className="mb-8">
            <EnhancedCryptoTrading 
              preselectedToken={{
                symbol: memeCoin.ticker,
                name: memeCoin.name,
                logo: memeCoin.image
              }}
            />
          </div>
        )}

        {/* Three Column Layout */}
        <div className="flex gap-6">
          {/* Left Sidebar - Meme Coin Stats */}
          <div className="hidden lg:block flex-shrink-0 w-[330px]">
            <MemeCoinLeftSidebar memeCoin={memeCoin} theme={theme} />
          </div>
          
          {/* Center Content - Charts and Analysis */}
          <div className="flex-1 min-w-0">
            <MemeCoinCenterContent memeCoin={memeCoin} activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
          </div>
          
          {/* Right Sidebar - Social */}
          <div className="hidden lg:block flex-shrink-0 w-[330px]">
            <CryptoSocialSidebar symbol={memeCoin.ticker} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          crypto={{...cryptoData, id: 1, change24h: 0, change7d: 0, supply: 0, sparkline: []}}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  );
}

// Left Sidebar Component for Meme Coin Stats
const MemeCoinLeftSidebar = ({ memeCoin, theme }: { memeCoin: MemeCoinData; theme: 'home' | 'discover' }) => {
  const [convertAmount, setConvertAmount] = useState('1');
  const [convertFrom, setConvertFrom] = useState(memeCoin.ticker);
  const [convertTo, setConvertTo] = useState('USD');
  const [activeTab, setActiveTab] = useState<'stats' | 'convert' | 'watchlist'>('stats');

  const convertedValue = convertFrom === memeCoin.ticker 
    ? (parseFloat(convertAmount || '0') * parseFloat(memeCoin.price) * 180).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : (parseFloat(convertAmount || '0') / (parseFloat(memeCoin.price) * 180)).toFixed(8);

  // Theme-specific styles for sidebar
  const getSidebarStyles = () => {
    if (theme === 'home') {
      // Home theme - simple dark sidebar
      return {
        cardBackground: 'bg-white/10',
        textPrimary: 'text-white',
        textSecondary: 'text-white/70',
        accentColor: 'text-[#00D4AA]',
        buttonPrimary: 'bg-gradient-to-r from-[#00D4AA] to-[#7C3AED]',
        borderColor: 'border-white/10'
      };
    } else {
      // Discover theme - premium dark sidebar
      return {
        cardBackground: 'bg-white/10',
        textPrimary: 'text-white',
        textSecondary: 'text-white/70',
        accentColor: 'text-[#00D4AA]',
        buttonPrimary: 'bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#FF6B6B]',
        borderColor: 'border-white/10'
      };
    }
  };

  const sidebarStyles = getSidebarStyles();

  return (
    <div className="w-[330px] space-y-4 sticky top-6">
      
      {/* Price Converter */}
      <div className={`${sidebarStyles.cardBackground} backdrop-blur-xl border ${sidebarStyles.borderColor} rounded-xl`}>
        <div className={`p-4 border-b ${sidebarStyles.borderColor}`}>
          <h3 className={`text-lg font-semibold ${sidebarStyles.textPrimary} flex items-center`}>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {memeCoin.name} Converter
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${sidebarStyles.textSecondary}`}>{convertFrom}</span>
              <button className={`text-xs ${sidebarStyles.accentColor} hover:underline`}>
                Max
              </button>
            </div>
            <input
              type="number"
              value={convertAmount}
              onChange={(e) => setConvertAmount(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                const temp = convertFrom;
                setConvertFrom(convertTo);
                setConvertTo(temp);
              }}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowUpDown className={`w-4 h-4 ${sidebarStyles.textSecondary}`} />
            </button>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${sidebarStyles.textSecondary}`}>{convertTo}</span>
            </div>
            <div className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white font-medium">
              {convertedValue}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      <div className={`${sidebarStyles.cardBackground} backdrop-blur-xl border ${sidebarStyles.borderColor} rounded-xl`}>
        <div className={`p-4 border-b ${sidebarStyles.borderColor}`}>
          <h3 className={`text-lg font-semibold ${sidebarStyles.textPrimary} flex items-center`}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {memeCoin.name} Statistics
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={sidebarStyles.textSecondary}>Market Cap</span>
              <HelpCircle className={`w-3 h-3 ${theme === 'home' ? 'text-white/50' : 'text-[#616E85]'} ml-1`} />
            </div>
            <span className={`font-medium ${sidebarStyles.textPrimary}`}>
              ${(parseFloat(memeCoin.marketCap) / 1000000).toFixed(1)}M
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={sidebarStyles.textSecondary}>24h Volume</span>
              <HelpCircle className={`w-3 h-3 ${sidebarStyles.textSecondary} ml-1`} />
            </div>
            <span className={`font-medium ${sidebarStyles.textPrimary}`}>
              ${(parseFloat(memeCoin.volume) / 1000000).toFixed(1)}M
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={sidebarStyles.textSecondary}>Volume/Market Cap</span>
              <HelpCircle className={`w-3 h-3 ${sidebarStyles.textSecondary} ml-1`} />
            </div>
            <span className={`font-medium ${sidebarStyles.textPrimary}`}>
              {((parseFloat(memeCoin.volume) / parseFloat(memeCoin.marketCap)) * 100).toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={sidebarStyles.textSecondary}>Holders</span>
              <HelpCircle className={`w-3 h-3 ${sidebarStyles.textSecondary} ml-1`} />
            </div>
            <span className={`font-medium ${sidebarStyles.textPrimary}`}>
              {memeCoin.holders.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={sidebarStyles.textSecondary}>Total Supply</span>
              <HelpCircle className={`w-3 h-3 ${sidebarStyles.textSecondary} ml-1`} />
            </div>
            <span className={`font-medium ${sidebarStyles.textPrimary}`}>
              {parseFloat(memeCoin.totalSupply).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={sidebarStyles.textSecondary}>Circulating Supply</span>
              <HelpCircle className={`w-3 h-3 ${sidebarStyles.textSecondary} ml-1`} />
            </div>
            <span className={`font-medium ${sidebarStyles.textPrimary}`}>
              {parseFloat(memeCoin.circulatingSupply).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-[#616E85]">Trust Score</span>
              <HelpCircle className="w-3 h-3 text-[#616E85] ml-1" />
            </div>
            <span className={`font-bold ${
              memeCoin.trustScore >= 80 ? 'text-[#16C784]' :
              memeCoin.trustScore >= 60 ? 'text-[#FFB800]' : 'text-[#EA3943]'
            }`}>
              {memeCoin.trustScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className={`${sidebarStyles.cardBackground} border ${sidebarStyles.borderColor} rounded-lg`}>
        <div className={`p-4 border-b ${sidebarStyles.borderColor}`}>
          <h3 className={`text-lg font-semibold ${sidebarStyles.textPrimary} flex items-center`}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Advanced Metrics
          </h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className={`${sidebarStyles.textSecondary} text-sm`}>Momentum Score</span>
            <span className="text-[#00D4AA] font-bold text-sm">{memeCoin.momentumScore}/100</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`${sidebarStyles.textSecondary} text-sm`}>Social Buzz</span>
            <span className="text-[#7C3AED] font-bold text-sm">{memeCoin.socialBuzz}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`${sidebarStyles.textSecondary} text-sm`}>Whale Interest</span>
            <span className={`font-bold text-sm ${
              memeCoin.whaleInterest === 'HIGH' ? 'text-[#00FF88]' : 
              memeCoin.whaleInterest === 'MED' ? 'text-[#FFB800]' : sidebarStyles.textSecondary
            }`}>
              {memeCoin.whaleInterest}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`${sidebarStyles.textSecondary} text-sm`}>Liquidity</span>
            <span className={`${sidebarStyles.textPrimary} font-bold text-sm`}>
              ${(parseFloat(memeCoin.liquidityUSD) / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      {/* Contract Information */}
      <div className={`${sidebarStyles.cardBackground} border ${sidebarStyles.borderColor} rounded-lg`}>
        <div className={`p-4 border-b ${sidebarStyles.borderColor}`}>
          <h3 className={`text-lg font-semibold ${sidebarStyles.textPrimary} flex items-center`}>
            <FileText className="w-4 h-4 mr-2" />
            Contract
          </h3>
        </div>
        <div className="p-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className={`text-xs ${sidebarStyles.textSecondary} mb-1`}>Contract Address</div>
            <div className={`font-mono text-sm ${sidebarStyles.textPrimary} break-all mb-2`}>
              {memeCoin.contractAddress}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => navigator.clipboard.writeText(memeCoin.contractAddress)}
                className={`px-3 py-1 ${sidebarStyles.buttonPrimary} text-white text-xs rounded hover:opacity-90 transition-colors`}
              >
                Copy
              </button>
              <a 
                href={`https://solscan.io/address/${memeCoin.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-colors flex items-center"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      {(memeCoin.website || memeCoin.twitter || memeCoin.telegram) && (
        <div className={`${sidebarStyles.cardBackground} border ${sidebarStyles.borderColor} rounded-lg`}>
          <div className={`p-4 border-b ${sidebarStyles.borderColor}`}>
            <h3 className={`text-lg font-semibold ${sidebarStyles.textPrimary} flex items-center`}>
              <Globe className="w-4 h-4 mr-2" />
              Official Links
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {memeCoin.website && (
                <a
                  href={memeCoin.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center">
                    <Globe className={`w-4 h-4 ${sidebarStyles.textSecondary} mr-2`} />
                    <span className={`text-sm ${sidebarStyles.textPrimary}`}>Website</span>
                  </div>
                  <ExternalLink className={`w-3 h-3 ${sidebarStyles.textSecondary} group-hover:${sidebarStyles.textPrimary.replace('text-', '')}`} />
                </a>
              )}
              {memeCoin.twitter && (
                <a
                  href={memeCoin.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${sidebarStyles.textSecondary} mr-2`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span className={`text-sm ${sidebarStyles.textPrimary}`}>Twitter</span>
                  </div>
                  <ExternalLink className={`w-3 h-3 ${sidebarStyles.textSecondary} group-hover:${sidebarStyles.textPrimary.replace('text-', '')}`} />
                </a>
              )}
              {memeCoin.telegram && (
                <a
                  href={memeCoin.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${sidebarStyles.textSecondary} mr-2`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L21.635 4.55c.309-1.239-.473-1.8-1.263-1.463z"/>
                      </svg>
                    </div>
                    <span className={`text-sm ${sidebarStyles.textPrimary}`}>Telegram</span>
                  </div>
                  <ExternalLink className={`w-3 h-3 ${sidebarStyles.textSecondary} group-hover:${sidebarStyles.textPrimary.replace('text-', '')}`} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Watchlist */}
      <div className={`${sidebarStyles.cardBackground} border ${sidebarStyles.borderColor} rounded-lg`}>
        <div className="p-4">
          <button className="w-full flex items-center justify-center py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Star className={`w-4 h-4 mr-2 ${sidebarStyles.textSecondary}`} />
            <span className={`text-sm font-medium ${sidebarStyles.textPrimary}`}>Add to Watchlist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Center Content Component for Meme Coin Analysis
const MemeCoinCenterContent = ({ 
  memeCoin, 
  activeTab, 
  setActiveTab,
  theme 
}: { 
  memeCoin: MemeCoinData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'home' | 'discover';
}) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('line');
  const [newsLoading, setNewsLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'historical', label: 'Historical Data', icon: History },
    { id: 'news', label: 'News', icon: Newspaper }
  ];

  // Convert meme coin data to crypto format for MobulaChart
  const cryptoData: Crypto = {
    id: parseInt(memeCoin.id) || 1,
    name: memeCoin.name,
    symbol: memeCoin.ticker,
    logo: memeCoin.image,
    price: parseFloat(memeCoin.price) * 180, // Convert SOL to USD
    rank: Math.floor(Math.random() * 100) + 1,
    change24h: parseFloat(memeCoin.change24h),
    change7d: parseFloat(memeCoin.change7d),
    marketCap: parseFloat(memeCoin.marketCap),
    volume24h: parseFloat(memeCoin.volume),
    supply: parseFloat(memeCoin.circulatingSupply),
    sparkline: Array.from({ length: 24 }, (_, i) => {
      const basePrice = parseFloat(memeCoin.price) * 180;
      const volatility = basePrice * 0.05; // 5% volatility
      return basePrice + (Math.random() - 0.5) * volatility;
    }),
    description: memeCoin.description,
    website: memeCoin.website,
    twitter: memeCoin.twitter,
    allTimeHigh: parseFloat(memeCoin.allTimeHigh) * 180,
    allTimeLow: parseFloat(memeCoin.allTimeLow) * 180,
    totalSupply: parseFloat(memeCoin.totalSupply),
    maxSupply: memeCoin.maxSupply ? parseFloat(memeCoin.maxSupply) : undefined
  };

  // Mock news articles for meme coins
  const generateNewsArticles = () => [
    {
      title: `${memeCoin.name} Shows Strong Momentum with ${memeCoin.change24h}% 24h Gain`,
      description: `${memeCoin.name} (${memeCoin.ticker}) has demonstrated remarkable growth potential with increased social engagement and trading volume.`,
      url: `https://news.example.com/${memeCoin.slug}`,
      urlToImage: memeCoin.image,
      publishedAt: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString(),
      source: { name: 'CryptoNews', id: 'crypto-news' },
      author: 'CryptoAnalyst'
    },
    {
      title: `Technical Analysis: ${memeCoin.name} Reaches New Support Level`,
      description: `Market analysis reveals key technical indicators for ${memeCoin.name} showing potential for continued growth momentum.`,
      url: `https://analysis.example.com/${memeCoin.slug}`,
      urlToImage: memeCoin.image,
      publishedAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString(),
      source: { name: 'TradingView', id: 'trading-view' },
      author: 'TechnicalExpert'
    },
    {
      title: `Community Update: ${memeCoin.name} Roadmap Progress`,
      description: `Latest developments in the ${memeCoin.name} ecosystem show promising updates and community engagement.`,
      url: `https://community.example.com/${memeCoin.slug}`,
      urlToImage: memeCoin.image,
      publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: 'CoinTelegraph', id: 'coin-telegraph' },
      author: 'CommunityReporter'
    }
  ];

  const formatTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return published.toLocaleDateString();
  };

  // Mock market data
  const generateMarketData = () => [
    { 
      exchange: 'Raydium', 
      pair: `${memeCoin.ticker}/SOL`, 
      price: parseFloat(memeCoin.price), 
      volume: (parseFloat(memeCoin.volume) * 0.4).toFixed(0), 
      volumePercent: '40.2%',
      trust: 'High'
    },
    { 
      exchange: 'Orca', 
      pair: `${memeCoin.ticker}/USDC`, 
      price: parseFloat(memeCoin.price) * 0.998, 
      volume: (parseFloat(memeCoin.volume) * 0.25).toFixed(0), 
      volumePercent: '25.1%',
      trust: 'High'
    },
    { 
      exchange: 'Jupiter', 
      pair: `${memeCoin.ticker}/SOL`, 
      price: parseFloat(memeCoin.price) * 1.001, 
      volume: (parseFloat(memeCoin.volume) * 0.2).toFixed(0), 
      volumePercent: '20.3%',
      trust: 'Medium'
    },
    { 
      exchange: 'Serum', 
      pair: `${memeCoin.ticker}/USDT`, 
      price: parseFloat(memeCoin.price) * 0.999, 
      volume: (parseFloat(memeCoin.volume) * 0.15).toFixed(0), 
      volumePercent: '14.4%',
      trust: 'Medium'
    }
  ];

  const marketData = generateMarketData();
  const newsArticles = generateNewsArticles();

  // Theme-specific styles for center content
  const getCenterStyles = () => {
    if (theme === 'home') {
      // Home theme - simple dark content
      return {
        cardBackground: 'bg-white/10',
        textPrimary: 'text-white',
        textSecondary: 'text-white/70',
        borderColor: 'border-white/10'
      };
    } else {
      // Discover theme - premium dark content
      return {
        cardBackground: 'bg-white/10',
        textPrimary: 'text-white',
        textSecondary: 'text-white/70',
        borderColor: 'border-white/10'
      };
    }
  };

  const centerStyles = getCenterStyles();

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className={`${centerStyles.cardBackground} border ${centerStyles.borderColor} rounded-lg overflow-hidden`}>
        <div className={`flex border-b ${centerStyles.borderColor}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                activeTab === tab.id
                  ? `bg-white/5 ${theme === 'home' ? 'text-[#00D4AA] border-b-2 border-[#00D4AA]' : 'text-[#00D4AA] border-b-2 border-[#00D4AA]'}`
                  : `${centerStyles.textSecondary} hover:text-white`
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Interactive Price Chart */}
              <div className={`${centerStyles.cardBackground} border ${centerStyles.borderColor} rounded-lg shadow-sm`}>
                <div className={`flex items-center justify-between p-4 border-b ${centerStyles.borderColor} ${theme === 'home' ? 'bg-white/5' : 'bg-[#F8F9FA]'}`}>
                  <div className="flex items-center space-x-4">
                    <h3 className={`text-lg font-semibold ${centerStyles.textPrimary} flex items-center`}>
                      <BarChart3 className={`w-5 h-5 mr-2 ${theme === 'home' ? 'text-[#00D4AA]' : 'text-[#3861FB]'}`} />
                      {memeCoin.name} Price Chart
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1.5 text-sm font-semibold text-white bg-[#00D4AA] rounded-md">
                        Price
                      </button>
                      <button className={`px-3 py-1.5 text-sm font-semibold ${centerStyles.textSecondary} hover:bg-white/5 rounded-md`}>
                        Market cap
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {['1D', '7D', '1M', '1Y', 'All'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                          timeframe === tf
                            ? 'bg-[#00D4AA] text-white shadow-sm'
                            : `${centerStyles.textSecondary} hover:bg-white/5`
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`relative h-[450px] ${theme === 'home' ? 'bg-white/5' : 'bg-white'}`}>
                  <MobulaChart
                    crypto={cryptoData}
                    timeframe={timeframe}
                    height={450}
                    width="100%"
                  />
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className={`${centerStyles.textSecondary} text-sm mb-1`}>All Time High</div>
                  <div className={`text-lg font-bold ${centerStyles.textPrimary}`}>{memeCoin.allTimeHigh} SOL</div>
                  <div className={`text-xs ${centerStyles.textSecondary}`}>≈ ${(parseFloat(memeCoin.allTimeHigh) * 180).toFixed(2)}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className={`${centerStyles.textSecondary} text-sm mb-1`}>All Time Low</div>
                  <div className={`text-lg font-bold ${centerStyles.textPrimary}`}>{memeCoin.allTimeLow} SOL</div>
                  <div className={`text-xs ${centerStyles.textSecondary}`}>≈ ${(parseFloat(memeCoin.allTimeLow) * 180).toFixed(2)}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className={`${centerStyles.textSecondary} text-sm mb-1`}>Liquidity</div>
                  <div className={`text-lg font-bold ${centerStyles.textPrimary}`}>
                    ${(parseFloat(memeCoin.liquidityUSD) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className={`${centerStyles.textSecondary} text-sm mb-1`}>FDV</div>
                  <div className={`text-lg font-bold ${centerStyles.textPrimary}`}>
                    ${((parseFloat(memeCoin.totalSupply) * parseFloat(memeCoin.price) * 180) / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className={`${centerStyles.cardBackground} border ${centerStyles.borderColor} rounded-lg p-6`}>
                <h3 className={`text-lg font-semibold ${centerStyles.textPrimary} mb-4`}>About {memeCoin.name}</h3>
                <p className={`${centerStyles.textSecondary} leading-relaxed mb-4`}>{memeCoin.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className={`font-semibold ${centerStyles.textPrimary} mb-2`}>Key Features</h4>
                    <ul className={`text-sm ${centerStyles.textSecondary} space-y-1`}>
                      <li>• Built on Solana blockchain</li>
                      <li>• Community-driven governance</li>
                      <li>• Deflationary tokenomics</li>
                      <li>• Active development team</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${centerStyles.textPrimary} mb-2`}>Use Cases</h4>
                    <ul className={`text-sm ${centerStyles.textSecondary} space-y-1`}>
                      <li>• Trading and speculation</li>
                      <li>• Community participation</li>
                      <li>• Yield farming opportunities</li>
                      <li>• NFT ecosystem integration</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {memeCoin.website && (
                    <a
                      href={memeCoin.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {memeCoin.twitter && (
                    <a
                      href={memeCoin.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 bg-[#F8F9FA] rounded-lg hover:bg-[#E9ECEF] transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>Twitter</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {memeCoin.telegram && (
                    <a
                      href={memeCoin.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 bg-[#F8F9FA] rounded-lg hover:bg-[#E9ECEF] transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L21.635 4.55c.309-1.239-.473-1.8-1.263-1.463z"/>
                      </svg>
                      <span>Telegram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Markets Tab */}
          {activeTab === 'markets' && (
            <div className="space-y-6">
              <h3 className={`text-lg font-semibold ${centerStyles.textPrimary}`}>{memeCoin.name} Markets</h3>
              
              <div className={`${centerStyles.cardBackground} border ${centerStyles.borderColor} rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-white/70">#</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-white/70">Exchange</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-white/70">Pair</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-white/70">Price</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-white/70">24h Volume</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-white/70">Volume %</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-white/70">Trust</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((market, index) => (
                        <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-sm text-white">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-[#3861FB] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                                {market.exchange.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-white">{market.exchange}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-white font-mono">{market.pair}</td>
                          <td className="py-3 px-4 text-sm text-white text-right font-mono">{market.price.toFixed(6)}</td>
                          <td className="py-3 px-4 text-sm text-white text-right">${(parseFloat(market.volume) / 1000000).toFixed(2)}M</td>
                          <td className="py-3 px-4 text-sm text-white text-right">{market.volumePercent}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              market.trust === 'High' ? 'bg-[#16C784]/20 text-[#16C784]' : 'bg-[#FFB800]/20 text-[#FFB800]'
                            }`}>
                              {market.trust}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Historical Data Tab */}
          {activeTab === 'historical' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#0D1421]">{memeCoin.name} Historical Data</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-[#F8F9FA] text-[#616E85] rounded text-sm hover:bg-[#E9ECEF] transition-colors">
                    <Download className="w-4 h-4 inline mr-1" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="bg-white border border-[#EFF2F5] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8F9FA]">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#616E85]">Date</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#616E85]">Open</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#616E85]">High</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#616E85]">Low</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#616E85]">Close</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#616E85]">Volume</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#616E85]">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 7 }, (_, i) => {
                        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
                        const basePrice = parseFloat(memeCoin.price);
                        const variance = (Math.random() - 0.5) * 0.1;
                        const open = basePrice * (1 + variance);
                        const close = basePrice * (1 + variance * 0.8);
                        const high = Math.max(open, close) * (1 + Math.random() * 0.05);
                        const low = Math.min(open, close) * (1 - Math.random() * 0.05);
                        const volume = parseFloat(memeCoin.volume) * (0.8 + Math.random() * 0.4);
                        const marketCap = parseFloat(memeCoin.marketCap) * (1 + variance);
                        
                        return (
                          <tr key={i} className="border-t border-[#EFF2F5] hover:bg-[#F8F9FA] transition-colors">
                            <td className="py-3 px-4 text-sm text-[#0D1421]">
                              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#0D1421] text-right font-mono">{open.toFixed(6)}</td>
                            <td className="py-3 px-4 text-sm text-[#16C784] text-right font-mono">{high.toFixed(6)}</td>
                            <td className="py-3 px-4 text-sm text-[#EA3943] text-right font-mono">{low.toFixed(6)}</td>
                            <td className="py-3 px-4 text-sm text-[#0D1421] text-right font-mono">{close.toFixed(6)}</td>
                            <td className="py-3 px-4 text-sm text-[#0D1421] text-right">${(volume / 1000000).toFixed(2)}M</td>
                            <td className="py-3 px-4 text-sm text-[#0D1421] text-right">${(marketCap / 1000000).toFixed(2)}M</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#0D1421]">{memeCoin.name} News & Updates</h3>
                <div className="text-sm text-[#616E85]">Latest news and analysis</div>
              </div>
              
              <div className="space-y-4">
                {newsArticles.map((article, index) => (
                  <div key={index} className="bg-white border border-[#EFF2F5] rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium text-[#3861FB] bg-[#3861FB]/10 px-2 py-1 rounded">
                            {article.source.name}
                          </span>
                          <div className="flex items-center text-xs text-[#616E85]">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeAgo(article.publishedAt)}
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-[#0D1421] mb-2 hover:text-[#3861FB] transition-colors">
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </h4>
                        <p className="text-[#616E85] text-sm mb-3 leading-relaxed">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#616E85]">By {article.author}</span>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-[#3861FB] hover:underline"
                          >
                            Read more
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trending Topics */}
              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h4 className="text-md font-semibold text-[#0D1421] mb-4">Trending Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {['Solana DeFi', 'Meme Coins', 'DEX Trading', 'Community Growth', 'Technical Analysis', 'Market Sentiment'].map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-white border border-[#EFF2F5] rounded-full text-sm text-[#616E85] hover:text-[#0D1421] hover:border-[#D0D5DD] transition-colors cursor-pointer"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
