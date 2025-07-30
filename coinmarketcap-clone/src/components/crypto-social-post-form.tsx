'use client'

import { useState } from 'react'
import { Crypto } from '@/types/crypto'
import { 
  MessageSquare,
  Camera,
  Video,
  Smile,
  Hash,
  AtSign,
  Globe,
  Users,
  Lock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Send,
  Image as ImageIcon,
  Link,
  BarChart3,
  Target,
  Zap,
  Activity
} from 'lucide-react'

interface CryptoSocialPostFormProps {
  crypto: Crypto
}

// Social Media Platform Icons
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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

export default function CryptoSocialPostForm({ crypto }: CryptoSocialPostFormProps) {
  const [postText, setPostText] = useState('')
  const [sentiment, setSentiment] = useState<'bullish' | 'bearish' | 'neutral'>('bullish')
  const [platform, setPlatform] = useState<'twitter' | 'telegram' | 'discord'>('twitter')
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public')
  const [includeChart, setIncludeChart] = useState(false)
  const [includePrice, setIncludePrice] = useState(true)
  const [includeHashtags, setIncludeHashtags] = useState(true)

  const maxCharacters = platform === 'twitter' ? 280 : 4000
  const remainingChars = maxCharacters - postText.length

  const generateSuggestedPost = () => {
    const priceChange = crypto.priceChange1h || 0
    const isPositive = priceChange >= 0
    const emoji = isPositive ? '🚀' : '📉'
    const direction = isPositive ? 'up' : 'down'
    const hashtags = includeHashtags ? `#${crypto.symbol} #Crypto ${isPositive ? '#Bullish' : '#Bearish'} #DeFi` : ''
    
    const suggestions = [
      `${emoji} $${crypto.symbol} is ${direction} ${Math.abs(priceChange).toFixed(2)}% in the last 24h! Currently trading at $${crypto.price.toLocaleString()}. ${hashtags}`,
      `Just checked $${crypto.symbol} - ${isPositive ? 'looking strong' : 'finding support'} at $${crypto.price.toLocaleString()}! ${hashtags}`,
      `${crypto.name} ($${crypto.symbol}) market update: ${isPositive ? 'Green candles everywhere!' : 'Consolidation phase'} ${hashtags}`
    ]
    
    return suggestions[Math.floor(Math.random() * suggestions.length)]
  }

  const handleSuggestedPost = () => {
    setPostText(generateSuggestedPost())
  }

  const handleSubmit = () => {
    if (!postText.trim()) return
    
    // Here you would integrate with actual social media APIs
    console.log('Posting to', platform, ':', postText)
    
    // Reset form
    setPostText('')
    alert(`Post shared to ${platform}! 🚀`)
  }

  const quickInserts = [
    { text: `$${crypto.symbol}`, icon: DollarSign, label: 'Ticker' },
    { text: crypto.name, icon: Target, label: 'Name' },
    { text: `$${crypto.price.toLocaleString()}`, icon: BarChart3, label: 'Price' },
    { text: `${crypto.priceChange1h?.toFixed(2)}%`, icon: crypto.priceChange1h && crypto.priceChange1h >= 0 ? TrendingUp : TrendingDown, label: '24h Change' }
  ]

  return (
    <div className="w-[330px] space-y-4 sticky top-6">
      
      {/* Create Post Header */}
      <div className="bg-white border border-[#EFF2F5] rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#3861FB]" />
          <h2 className="text-lg font-semibold text-[#0D1421]">Share Your Thoughts</h2>
        </div>
        
        {/* Platform Selection */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setPlatform('twitter')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              platform === 'twitter' 
                ? 'bg-[#1DA1F2] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TwitterIcon />
            <span>X</span>
          </button>
          <button
            onClick={() => setPlatform('telegram')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              platform === 'telegram' 
                ? 'bg-[#0088CC] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TelegramIcon />
            <span>TG</span>
          </button>
          <button
            onClick={() => setPlatform('discord')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              platform === 'discord' 
                ? 'bg-[#5865F2] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <DiscordIcon />
            <span>DC</span>
          </button>
        </div>

        {/* Text Area */}
        <div className="relative mb-4">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`What's your take on ${crypto.name}?`}
            className="w-full p-3 border border-[#EFF2F5] rounded-lg resize-none focus:outline-none focus:border-[#3861FB] transition-colors"
            rows={4}
            maxLength={maxCharacters}
          />
          <div className={`absolute bottom-2 right-2 text-xs ${
            remainingChars < 20 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {remainingChars}
          </div>
        </div>

        {/* Quick Insert Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickInserts.map((insert, index) => {
            const IconComponent = insert.icon
            return (
              <button
                key={index}
                onClick={() => setPostText(prev => prev + ' ' + insert.text)}
                className="flex items-center space-x-2 p-2 border border-[#EFF2F5] rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <IconComponent className="w-4 h-4 text-[#3861FB]" />
                <span className="text-[#0D1421]">{insert.label}</span>
              </button>
            )
          })}
        </div>

        {/* Post Options */}
        <div className="space-y-3 mb-4">
          {/* Sentiment */}
          <div>
            <label className="text-sm font-medium text-[#616E85] mb-2 block">Sentiment</label>
            <div className="flex space-x-2">
              {[
                { value: 'bullish', label: '🚀 Bullish', color: 'text-green-600' },
                { value: 'neutral', label: '➖ Neutral', color: 'text-gray-600' },
                { value: 'bearish', label: '📉 Bearish', color: 'text-red-600' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSentiment(option.value as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    sentiment === option.value 
                      ? 'bg-[#3861FB] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div>
            <label className="text-sm font-medium text-[#616E85] mb-2 block">Privacy</label>
            <div className="flex space-x-2">
              {[
                { value: 'public', icon: Globe, label: 'Public' },
                { value: 'friends', icon: Users, label: 'Friends' },
                { value: 'private', icon: Lock, label: 'Private' }
              ].map((option) => {
                const IconComponent = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setPrivacy(option.value as any)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      privacy === option.value 
                        ? 'bg-[#3861FB] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Include Options */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includePrice}
                onChange={(e) => setIncludePrice(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-[#616E85]">Include current price</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeChart}
                onChange={(e) => setIncludeChart(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-[#616E85]">Attach price chart</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-[#616E85]">Auto-add hashtags</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleSuggestedPost}
            className="flex-1 px-4 py-2 border border-[#3861FB] text-[#3861FB] rounded-lg hover:bg-[#3861FB] hover:text-white transition-colors text-sm font-medium"
          >
            <Zap className="w-4 h-4 inline mr-1" />
            Suggest
          </button>
          <button
            onClick={handleSubmit}
            disabled={!postText.trim()}
            className="flex-1 px-4 py-2 bg-[#3861FB] text-white rounded-lg hover:bg-[#3861FB]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <Send className="w-4 h-4 inline mr-1" />
            Share
          </button>
        </div>
      </div>

      {/* Current Token Info */}
      <div className="bg-white border border-[#EFF2F5] rounded-lg p-4">
        <h3 className="text-base font-semibold text-[#0D1421] mb-3">{crypto.name} Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Price</span>
            <span className="text-sm font-medium text-[#0D1421]">${crypto.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">24h Change</span>
            <span className={`text-sm font-medium ${
              (crypto.priceChange1h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(crypto.priceChange1h || 0) >= 0 ? '+' : ''}{crypto.priceChange1h?.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Rank</span>
            <span className="text-sm font-medium text-[#0D1421]">#{crypto.rank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Market Cap</span>
            <span className="text-sm font-medium text-[#0D1421]">${crypto.marketCap?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="bg-white border border-[#EFF2F5] rounded-lg p-4">
        <h3 className="text-base font-semibold text-[#0D1421] mb-3">Trending in Crypto</h3>
        <div className="space-y-2">
          {[
            `#${crypto.symbol}`,
            '#Crypto',
            '#DeFi',
            '#Bullish',
            '#HODL',
            '#ToTheMoon'
          ].map((hashtag, index) => (
            <button
              key={index}
              onClick={() => setPostText(prev => prev + ' ' + hashtag)}
              className="block text-left text-sm text-[#3861FB] hover:underline"
            >
              {hashtag}
            </button>
          ))}
        </div>
      </div>

      {/* Post Analytics */}
      <div className="bg-white border border-[#EFF2F5] rounded-lg p-4">
        <h3 className="text-base font-semibold text-[#0D1421] mb-3">Your Activity</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Posts Today</span>
            <span className="text-sm font-medium text-[#0D1421]">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Total Likes</span>
            <span className="text-sm font-medium text-[#0D1421]">1.2K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Followers</span>
            <span className="text-sm font-medium text-[#0D1421]">456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#616E85]">Accuracy</span>
            <span className="text-sm font-medium text-green-600">78%</span>
          </div>
        </div>
      </div>

    </div>
  )
}
