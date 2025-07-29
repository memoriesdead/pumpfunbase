'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Clock, TrendingUp, Newspaper } from 'lucide-react'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
    id: string
  }
  author: string
}

interface CryptoNewsExactProps {
  symbol: string
}

export default function CryptoNewsExact({ symbol }: CryptoNewsExactProps) {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/news/${symbol}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const data = await response.json()
        setNewsArticles(data.articles || [])
      } catch (error) {
        console.error('Error fetching news:', error)
        setError('Failed to load news articles')
      } finally {
        setLoading(false)
      }
    }

    if (symbol) {
      fetchNews()
    }
  }, [symbol])

  const formatTimeAgo = (publishedAt: string) => {
    const now = new Date()
    const published = new Date(publishedAt)
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return published.toLocaleDateString()
  }

  const getTrendingTopics = (symbol: string) => {
    const commonTopics = ["DeFi", "Blockchain", "Cryptocurrency", "Trading", "Market Analysis"]
    const symbolSpecific: Record<string, string[]> = {
      'SOL': ["Solana Ecosystem", "Web3", "NFTs", "DApps", "Validator Network"],
      'USDC': ["Stablecoin", "USD Peg", "Reserve Audit", "Payment Rails", "Circle"],
      'USDT': ["Tether", "Stablecoin", "Market Cap", "Liquidity", "Reserve"],
      'RAY': ["Raydium DEX", "AMM", "Liquidity Mining", "Yield Farming", "Solana DeFi"],
      'SRM': ["Serum DEX", "Order Book", "Cross-Chain", "Trading Protocol", "Decentralized Exchange"],
      'ORCA': ["Orca DEX", "Concentrated Liquidity", "Whirlpools", "Yield Farming", "Solana DeFi"]
    }
    return [...(symbolSpecific[symbol] || [symbol]), ...commonTopics].slice(0, 8)
  }

  const trendingTopics = getTrendingTopics(symbol)

  if (loading) {
    return (
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3861FB]"></div>
          <span className="ml-3 text-[#616E85]">Loading news...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
        <div className="flex items-center justify-center py-12">
          <Newspaper className="w-8 h-8 text-[#616E85] mr-3" />
          <span className="text-[#616E85]">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#EFF2F5] cmc-border-radius-md cmc-p-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="cmc-text-lg cmc-font-semibold text-[#0D1421]">{symbol} News</h2>
          <div className="flex items-center space-x-1 cmc-text-xs text-[#16C784]">
            <TrendingUp className="w-3 h-3" />
            <span>{newsArticles.length} articles</span>
          </div>
        </div>
        <button className="cmc-text-sm text-[#3861FB] hover:underline cmc-font-medium">
          View All News
        </button>
      </div>

      {/* News Articles */}
      <div className="space-y-4 mb-6">
        {newsArticles.map((article, index) => (
          <article key={index} className="group">
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-4 p-3 cmc-border-radius-md hover:bg-[#F8FAFD] transition-colors cursor-pointer"
            >
              {/* Article Image */}
              <div className="flex-shrink-0 w-16 h-12 cmc-border-radius-sm overflow-hidden">
                {article.urlToImage ? (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#3861FB] to-[#16C784] flex items-center justify-center"><span class="text-white text-sm">📰</span></div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#3861FB] to-[#16C784] flex items-center justify-center">
                    <span className="text-white cmc-text-sm">📰</span>
                  </div>
                )}
              </div>
              
              {/* Article Content */}
              <div className="flex-1 min-w-0">
                {/* Source Badge */}
                <div className="inline-flex items-center mb-1">
                  <span className="px-2 py-0.5 bg-[#F0F9FF] text-[#3861FB] cmc-text-xs cmc-font-medium cmc-border-radius-pill">
                    {article.source.name}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="cmc-text-base cmc-font-medium text-[#0D1421] group-hover:text-[#3861FB] transition-colors leading-snug mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="cmc-text-sm text-[#616E85] mb-2 line-clamp-2">
                  {article.description}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center space-x-3 cmc-text-xs text-[#616E85]">
                  <span className="cmc-font-medium">{article.author}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
              
              {/* External Link Icon */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-[#616E85]" />
              </div>
            </a>
          </article>
        ))}
      </div>

      {/* Trending Topics */}
      <div className="border-t border-[#EFF2F5] pt-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="cmc-text-base cmc-font-medium text-[#0D1421]">Trending Topics</span>
          <button className="cmc-text-xs text-[#3861FB] hover:underline">
            See all trends
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              className="px-3 py-1.5 cmc-text-xs cmc-font-medium text-[#616E85] border border-[#EFF2F5] cmc-border-radius-pill hover:border-[#3861FB] hover:text-[#3861FB] hover:bg-[#F0F9FF] transition-colors"
            >
              #{topic.replace(' ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* News Sources */}
      <div className="border-t border-[#EFF2F5] pt-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="cmc-text-base cmc-font-medium text-[#0D1421]">Trusted Sources</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'CoinDesk', articles: '125 articles' },
            { name: 'CoinTelegraph', articles: '98 articles' },
            { name: 'The Block', articles: '87 articles' },
            { name: 'Bloomberg', articles: '45 articles' },
            { name: 'CryptoSlate', articles: '67 articles' },
            { name: 'Decrypt', articles: '54 articles' }
          ].map((source, index) => (
            <button
              key={index}
              className="text-left p-2 cmc-border-radius-sm hover:bg-[#F8FAFD] transition-colors"
            >
              <div className="cmc-text-sm cmc-font-medium text-[#0D1421]">{source.name}</div>
              <div className="cmc-text-xs text-[#616E85]">{source.articles}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-[#EFF2F5] pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="cmc-text-base cmc-font-medium text-[#0D1421] mb-1">
              Bitcoin News Alerts
            </div>
            <div className="cmc-text-xs text-[#616E85]">
              Get breaking Bitcoin news delivered instantly
            </div>
          </div>
          <button className="px-4 py-2 bg-[#3861FB] text-white cmc-text-sm cmc-font-medium cmc-border-radius-md hover:bg-[#2651EB] transition-colors">
            Enable Alerts
          </button>
        </div>
      </div>
    </div>
  )
}