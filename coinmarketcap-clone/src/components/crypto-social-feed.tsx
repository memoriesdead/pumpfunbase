'use client'

import { useState } from 'react'
import { 
  Heart, 
  MessageCircle, 
  Share, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Verified,
  Eye,
  Clock,
  Filter,
  Search
} from 'lucide-react'

interface SocialPost {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified: boolean
    badge?: 'project' | 'kol' | 'organization'
  }
  content: string
  timestamp: string
  sentiment?: 'bullish' | 'bearish' | 'neutral'
  engagement: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  liked: boolean
  tags?: string[]
  image?: string
}

const mockPosts: SocialPost[] = [
  {
    id: '1',
    user: {
      name: 'Michael Saylor',
      username: 'saylor',
      avatar: '/api/placeholder/32/32',
      verified: true,
      badge: 'kol'
    },
    content: 'Bitcoin is digital property. The best performing asset of the last decade, and the most probable store of value for the next decade. #Bitcoin #DigitalGold',
    timestamp: '2h',
    sentiment: 'bullish',
    engagement: {
      likes: 2847,
      comments: 156,
      shares: 89,
      views: 15420
    },
    liked: false,
    tags: ['Bitcoin', 'DigitalGold']
  },
  {
    id: '2',
    user: {
      name: 'Bitcoin Core',
      username: 'bitcoincore',
      avatar: '/api/placeholder/32/32',
      verified: true,
      badge: 'project'
    },
    content: 'Bitcoin Core 27.0 has been released! This release includes new features, various bug fixes and performance improvements. Download and verify the release at bitcoin.org',
    timestamp: '4h',
    sentiment: 'neutral',
    engagement: {
      likes: 1203,
      comments: 78,
      shares: 234,
      views: 8956
    },
    liked: true,
    tags: ['Release', 'Update']
  },
  {
    id: '3',
    user: {
      name: 'CryptoAnalyst',
      username: 'cryptoanalyst',
      avatar: '/api/placeholder/32/32',
      verified: false
    },
    content: 'Technical analysis shows BTC breaking key resistance at $118k. Next target could be $125k if volume sustains. RSI showing healthy levels.',
    timestamp: '6h',
    sentiment: 'bullish',
    engagement: {
      likes: 456,
      comments: 67,
      shares: 23,
      views: 3245
    },
    liked: false,
    tags: ['TA', 'Analysis']
  },
  {
    id: '4',
    user: {
      name: 'BlockchainNews',
      username: 'blockchainnews',
      avatar: '/api/placeholder/32/32',
      verified: true,
      badge: 'organization'
    },
    content: 'BREAKING: Another institutional investor adds $500M worth of Bitcoin to their treasury. Institutional adoption continues to accelerate in 2025.',
    timestamp: '8h',
    sentiment: 'bullish',
    engagement: {
      likes: 892,
      comments: 43,
      shares: 156,
      views: 6789
    },
    liked: false,
    tags: ['Institutional', 'News']
  }
]

export default function CryptoSocialFeed() {
  const [posts] = useState<SocialPost[]>(mockPosts)
  const [filter, setFilter] = useState<'all' | 'bullish' | 'bearish' | 'neutral'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-[#16C784]'
      case 'bearish': return 'text-[#EA3943]'
      default: return 'text-[#616E85]'
    }
  }

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="w-3 h-3" />
      case 'bearish': return <TrendingDown className="w-3 h-3" />
      default: return null
    }
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'project': return 'bg-[#3861FB] text-white'
      case 'kol': return 'bg-[#16C784] text-white'
      case 'organization': return 'bg-[#EA3943] text-white'
      default: return ''
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.sentiment === filter
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="w-[330px] bg-white border border-[#EFF2F5] cmc-border-radius-md sticky top-6">
      {/* Header */}
      <div className="border-b border-[#EFF2F5] cmc-p-md">
        <div className="flex items-center justify-between mb-3">
          <h2 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">Community</h2>
          <button className="cmc-text-sm text-[#3861FB] hover:underline cmc-font-medium">
            View All
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#616E85]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-[#EFF2F5] cmc-border-radius-md cmc-text-sm placeholder-[#616E85] focus:outline-none focus:border-[#3861FB] transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {['all', 'bullish', 'bearish', 'neutral'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-3 py-1.5 cmc-text-xs cmc-font-medium cmc-border-radius-pill transition-colors capitalize ${
                filter === filterType
                  ? 'bg-[#3861FB] text-white'
                  : 'bg-[#F8FAFD] text-[#616E85] hover:bg-[#EFF2F5]'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-h-[600px] overflow-y-auto">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border-b border-[#EFF2F5] cmc-p-md hover:bg-[#F8FAFD] transition-colors">
            {/* Post Header */}
            <div className="flex items-start space-x-3 mb-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3861FB] to-[#16C784] cmc-border-radius-md flex items-center justify-center">
                  <span className="text-white cmc-text-sm cmc-font-medium">
                    {post.user.name[0].toUpperCase()}
                  </span>
                </div>
                {post.user.verified && (
                  <Verified className="absolute -bottom-1 -right-1 w-3 h-3 text-[#3861FB] bg-white rounded-full" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="cmc-text-sm cmc-font-medium text-[#0D1421] truncate">
                    {post.user.name}
                  </span>
                  {post.user.badge && (
                    <span className={`px-1.5 py-0.5 cmc-text-xs cmc-font-medium cmc-border-radius-sm ${getBadgeColor(post.user.badge)}`}>
                      {post.user.badge.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 cmc-text-xs text-[#616E85]">
                  <span>@{post.user.username}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* More Options */}
              <button className="text-[#616E85] hover:text-[#0D1421] transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <p className="cmc-text-sm text-[#0D1421] leading-relaxed mb-2">
                {post.content}
              </p>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-[#F0F9FF] text-[#3861FB] cmc-text-xs cmc-font-medium cmc-border-radius-pill hover:bg-[#E6F3FF] cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Sentiment */}
              {post.sentiment && post.sentiment !== 'neutral' && (
                <div className={`flex items-center space-x-1 cmc-text-xs cmc-font-medium ${getSentimentColor(post.sentiment)}`}>
                  {getSentimentIcon(post.sentiment)}
                  <span className="capitalize">{post.sentiment}</span>
                </div>
              )}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between text-[#616E85] cmc-text-xs mb-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{formatNumber(post.engagement.views)}</span>
                </div>
                <span>{formatNumber(post.engagement.likes)} likes</span>
                <span>{formatNumber(post.engagement.comments)} comments</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className={`flex items-center space-x-1 cmc-text-xs transition-colors ${
                  post.liked ? 'text-[#EA3943]' : 'text-[#616E85] hover:text-[#EA3943]'
                }`}>
                  <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                  <span>{formatNumber(post.engagement.likes)}</span>
                </button>
                
                <button className="flex items-center space-x-1 cmc-text-xs text-[#616E85] hover:text-[#3861FB] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{formatNumber(post.engagement.comments)}</span>
                </button>
                
                <button className="flex items-center space-x-1 cmc-text-xs text-[#616E85] hover:text-[#16C784] transition-colors">
                  <Share className="w-4 h-4" />
                  <span>{formatNumber(post.engagement.shares)}</span>
                </button>
              </div>

              {/* Sentiment Reactions */}
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 cmc-text-xs text-[#16C784] hover:bg-[#F0F9FF] cmc-border-radius-sm transition-colors">
                  🚀 Bullish
                </button>
                <button className="px-2 py-1 cmc-text-xs text-[#EA3943] hover:bg-[#FEF2F2] cmc-border-radius-sm transition-colors">
                  🐻 Bearish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-[#EFF2F5] cmc-p-md text-center">
        <button className="w-full py-2 bg-[#3861FB] text-white cmc-text-sm cmc-font-medium cmc-border-radius-md hover:bg-[#2651EB] transition-colors">
          Join Community
        </button>
        <p className="cmc-text-xs text-[#616E85] mt-2">
          Share your thoughts with the crypto community
        </p>
      </div>
    </div>
  )
}