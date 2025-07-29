import { NextResponse } from 'next/server'

// General crypto news API endpoint
async function fetchGeneralCryptoNews() {
  try {
    const apiKey = process.env.NEWSAPI_KEY || '4f14b0c0158f46438e08697a4ae9cd98'
    
    // General crypto news query
    const query = '(cryptocurrency OR bitcoin OR ethereum OR crypto) AND (price OR market OR trading)'
    
    const response = await fetch(
      `https://newsapi.org/v2/everything?` + 
      `q=${encodeURIComponent(query)}&` +
      `language=en&` +
      `sortBy=publishedAt&` +
      `pageSize=50&` +
      `apiKey=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 1800 } // Cache for 30 minutes
      }
    )

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`)
    }

    const data = await response.json()
    
    // Filter and format articles
    const articles = data.articles
      ?.filter((article: any) => 
        article.title && 
        article.description && 
        article.urlToImage &&
        !article.title.includes('[Removed]')
      )
      ?.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: {
          name: article.source.name,
          id: article.source.id
        },
        author: article.author || article.source.name
      }))
      ?.slice(0, 20) // Limit to 20 articles

    return articles || []
  } catch (error) {
    console.error('Error fetching general crypto news:', error)
    
    // Return fallback mock news data
    return [
      {
        title: 'Cryptocurrency Market Shows Strong Recovery Signals',
        description: 'Major cryptocurrencies are showing signs of recovery as institutional interest continues to grow across the market.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/400x200?text=Crypto+Market',
        publishedAt: new Date().toISOString(),
        source: { name: 'Crypto Today', id: 'crypto-today' },
        author: 'Market Reporter'
      },
      {
        title: 'Solana Ecosystem Expands with New DeFi Protocols',
        description: 'The Solana blockchain continues to attract new decentralized finance projects, boosting ecosystem growth.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/400x200?text=Solana+DeFi',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: { name: 'DeFi Pulse', id: 'defi-pulse' },
        author: 'DeFi Analyst'
      },
      {
        title: 'Regulatory Clarity Emerges for Digital Assets',
        description: 'New regulatory frameworks are providing clearer guidelines for cryptocurrency operations and compliance.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/400x200?text=Regulation',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: { name: 'Regulatory News', id: 'reg-news' },
        author: 'Policy Expert'
      },
      {
        title: 'Web3 Gaming Drives NFT Adoption on Solana',
        description: 'Gaming applications built on Solana are driving significant NFT adoption and transaction volume.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/400x200?text=Web3+Gaming',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        source: { name: 'Gaming Crypto', id: 'gaming-crypto' },
        author: 'Gaming Reporter'
      },
      {
        title: 'Institutional Investment in Crypto Reaches New Heights',
        description: 'Major financial institutions continue to allocate significant resources to cryptocurrency investments.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/400x200?text=Institutional',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        source: { name: 'Finance Weekly', id: 'finance-weekly' },
        author: 'Investment Analyst'
      }
    ]
  }
}

export async function GET() {
  try {
    console.log('API: Fetching general crypto news...')
    
    const newsArticles = await fetchGeneralCryptoNews()
    
    console.log(`API: Returning ${newsArticles.length} general news articles`)
    return NextResponse.json({
      articles: newsArticles,
      totalResults: newsArticles.length
    })
  } catch (error) {
    console.error('General news API error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}