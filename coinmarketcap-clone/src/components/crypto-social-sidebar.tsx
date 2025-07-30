'use client'

import { useState, useEffect } from 'react'
import {
  CheckCircle,
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  MoreHorizontal,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
} from 'lucide-react'

interface SocialPost {
  id: string
  text: string
  createdAt: string
  author: {
    name: string
    username: string
    profileImage: string
    verified: boolean
  }
  metrics: {
    likes: number
    retweets: number
    replies: number
    quotes: number
  }
  media?: Array<{
    type: string
    url?: string
    preview_image_url?: string
  }>
  url: string
  realUrl?: string // Official account URL for Follow button
}


const StatIcon = ({
  icon: Icon,
  count,
}: {
  icon: React.ElementType
  count: string
}) => (
  <div className="flex items-center space-x-1.5 text-gray-500">
    <Icon className="w-4 h-4" />
    <span className="text-xs font-medium">{count}</span>
  </div>
)

const SocialPostCard = ({ post }: { post: SocialPost }) => {
  const formatTimeAgo = (createdAt: string) => {
    const now = new Date()
    const created = new Date(createdAt)
    const diffInMinutes = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60),
    )

    if (diffInMinutes < 1) return 'now'
    if (diffInMinutes < 60) return `${diffInMinutes}m`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d`

    return created.toLocaleDateString()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group" 
         onClick={() => window.open(post.url, '_blank')}>
      <div className="flex items-start space-x-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <img
            src={post.author.profileImage}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              // First try a direct profile image from cryptologos.cc for known tokens
              if (post.author.username === 'solana' || post.author.username === 'solanafndn' || post.author.username === 'solanalabs') {
                target.src = 'https://pbs.twimg.com/profile_images/1616932042473967618/jUwwNhfF_400x400.jpg'
              } else {
                // Fallback to placeholder with first letter
                target.src = `https://via.placeholder.com/40x40/6366F1/ffffff?text=${post.author.name.charAt(0)}`
              }
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm">{post.author.name}</span>
              {post.author.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
              <span className="text-gray-500 text-sm">
                · {formatTimeAgo(post.createdAt)}
              </span>
            </div>
            <a
              href={post.realUrl || `https://x.com/${post.author.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Plus className="w-3 h-3" />
              <span>Follow</span>
            </a>
          </div>
          <p className="text-sm mt-1 mb-3 whitespace-pre-wrap">{post.text}</p>
          {post.media && post.media.length > 0 && (
            <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
              {post.media.map((mediaItem, index) => (
                <div key={index}>
                  {mediaItem.type === 'photo' && mediaItem.url && (
                    <img
                      src={mediaItem.url}
                      alt="Tweet media"
                      className="w-full h-auto"
                    />
                  )}
                  {mediaItem.type === 'video' && mediaItem.preview_image_url && (
                    <img
                      src={mediaItem.preview_image_url}
                      alt="Tweet media"
                      className="w-full h-auto"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-4 text-gray-500">
            <div className="flex items-center space-x-4">
              <StatIcon
                icon={MessageCircle}
                count={formatNumber(post.metrics.replies)}
              />
              <StatIcon
                icon={Repeat2}
                count={formatNumber(post.metrics.retweets)}
              />
              <StatIcon
                icon={Heart}
                count={formatNumber(post.metrics.likes)}
              />
              <StatIcon
                icon={BarChart2}
                count={formatNumber(post.metrics.quotes)}
              />
            </div>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const CommunitySentiment = ({
  sentiment,
  setSentiment,
}: {
  sentiment: string
  setSentiment: (sentiment: string) => void
}) => (
  <div className="p-4">
    <div className="flex justify-between items-center mb-1">
      <h3 className="font-semibold text-base">Community sentiment</h3>
      <span className="text-sm text-gray-500">4.4M votes</span>
    </div>
    <div className="flex items-center space-x-2 mb-3">
      <TrendingUp className="w-5 h-5 text-green-500" />
      <span className="text-green-500 font-bold text-lg">82%</span>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: '82%' }}
        ></div>
      </div>
      <span className="text-red-500 font-bold text-lg">18%</span>
      <TrendingDown className="w-5 h-5 text-red-500" />
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => setSentiment('Bullish')}
        className={`flex-1 flex items-center justify-center space-x-2 py-2 border rounded-lg transition-colors ${
          sentiment === 'Bullish'
            ? 'border-green-500 text-green-500 bg-green-50'
            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <TrendingUp className="w-4 h-4" />
        <span className="font-semibold text-sm">Bullish</span>
      </button>
      <button
        onClick={() => setSentiment('Bearish')}
        className={`flex-1 flex items-center justify-center space-x-2 py-2 border rounded-lg transition-colors ${
          sentiment === 'Bearish'
            ? 'border-red-500 text-red-500 bg-red-50'
            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <TrendingDown className="w-4 h-4" />
        <span className="font-semibold text-sm">Bearish</span>
      </button>
    </div>
  </div>
)

interface CryptoSocialSidebarProps {
  symbol: string
}

export default function CryptoSocialSidebar({
  symbol,
}: CryptoSocialSidebarProps) {
  const [activeTab, setActiveTab] = useState('Top')
  const [sentiment, setSentiment] = useState('Bullish') // Default to Bullish
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        console.log(`Fetching X posts for ${symbol} with sentiment ${sentiment}`)
        // Pass sentiment to the API
        const response = await fetch(
          `/api/social/${symbol}?sentiment=${sentiment}`,
        )
        
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`)
        }
        
        const data = await response.json()
        console.log(`Received ${data.posts?.length || 0} posts for ${symbol}`)
        setPosts(data.posts || [])
      } catch (error) {
        console.error('Failed to fetch X posts:', error)
        setPosts([]) // Clear posts on error
      } finally {
        setLoading(false)
      }
    }

    if (symbol) {
      fetchPosts()
    }
  }, [symbol, sentiment, activeTab]) // Refetch when symbol, sentiment, or tab changes

  return (
    <div className="bg-white rounded-lg border border-gray-200 w-[380px]">
      <CommunitySentiment sentiment={sentiment} setSentiment={setSentiment} />
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
          <h3 className="font-semibold text-sm text-gray-700">Posts about ${symbol}</h3>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">𝕏</span>
            </div>
          </div>
        </div>
        <div className="flex px-4">
          {['Top', 'Latest'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading posts...</div>
      ) : (
        <div>
          {posts && posts.length > 0 ? (
            posts.map((post) => <SocialPostCard key={post.id} post={post} />)
          ) : (
            <div className="p-4 text-center text-gray-500">No posts found.</div>
          )}
        </div>
      )}
      <div className="p-4 text-center">
        <button className="text-sm font-semibold text-gray-700 hover:text-black">
          View all posts on X
        </button>
      </div>
    </div>
  )
}
