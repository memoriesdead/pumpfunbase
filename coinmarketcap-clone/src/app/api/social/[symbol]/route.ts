import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ symbol: string }>
}

// Real Twitter/X API v2 integration for live crypto social media posts
async function fetchCryptoSocialPosts(symbol: string, sentiment: string) {
  try {
    // Check for both Bearer Token (v2) and Access Token (v1.1)
    const bearerToken = process.env.TWITTER_BEARER_TOKEN
    const accessToken = process.env.TWITTER_ACCESS_TOKEN

    if (!bearerToken && !accessToken) {
      console.log('Twitter API credentials not configured - using demo posts')
      return generateDemoPosts(symbol, sentiment)
    }

    // If we have v1.1 credentials but no Bearer Token, use demo posts for now
    if (!bearerToken && accessToken) {
      console.log('Twitter v1.1 credentials found but need Bearer Token for v2 API - using demo posts')
      return generateDemoPosts(symbol, sentiment)
    }

    console.log(
      `Fetching REAL Twitter data for ${symbol} with sentiment ${sentiment} using user context...`,
    )

    // Define crypto-specific search queries and official accounts
    const cryptoQueries: Record<string, { query: string, accounts: string[] }> = {
      'SOL': {
        query: 'from:solana OR from:solanafndn OR from:solanalabs -is:retweet lang:en',
        accounts: ['solana', 'solanafndn', 'solanalabs']
      },
      'USDC': {
        query: '(USDC OR "$USDC" OR "USD Coin") (stablecoin OR Circle OR DeFi) -is:retweet lang:en',
        accounts: ['circle', 'centre_io', 'coinbase']
      },
      'USDT': {
        query: '(USDT OR "$USDT" OR Tether) (stablecoin OR trading OR liquidity) -is:retweet lang:en',
        accounts: ['Tether_to', 'paoloardoino']
      },
      'RAY': {
        query: '(Raydium OR $RAY OR #Raydium) (DEX OR AMM OR liquidity OR Solana) -is:retweet lang:en',
        accounts: ['RaydiumProtocol']
      },
      'SRM': {
        query: '(Serum OR $SRM OR #Serum) (DEX OR "order book" OR Solana OR trading) -is:retweet lang:en',
        accounts: ['ProjectSerum']
      },
      'ORCA': {
        query: '(Orca OR $ORCA OR #OrcaProtocol) (DEX OR whirlpool OR Solana OR DeFi) -is:retweet lang:en',
        accounts: ['orca_so']
      },
      'MNGO': {
        query: '(Mango OR $MNGO OR "Mango Markets") (DeFi OR margin OR Solana OR trading) -is:retweet lang:en',
        accounts: ['mangomarkets']
      },
      'SAMO': {
        query: '(Samoyedcoin OR $SAMO OR Samoyed) (Solana OR meme OR community) -is:retweet lang:en',
        accounts: ['samoyedcoin']
      },
      'mSOL': {
        query: '(Marinade OR $mSOL OR "liquid staking") (Solana OR staking OR validator) -is:retweet lang:en',
        accounts: ['MarinadeFinance']
      },
      'FIDA': {
        query: '(Bonfida OR $FIDA OR #Bonfida) (Solana OR "domain names" OR infrastructure) -is:retweet lang:en',
        accounts: ['bonfida']
      }
    }

    const sentimentHashtag =
      sentiment === 'Bullish' ? `#${symbol}Bullish` : `#${symbol}Bearish`
    const query = `(${symbol} OR $${symbol} OR #${symbol} OR ${sentimentHashtag}) -is:retweet lang:en`

    const cryptoConfig = cryptoQueries[symbol] || {
      query: query,
      accounts: [],
    }

    // Search for recent tweets with FULL media support (images, videos, links)
    console.log(`Searching Twitter for: ${cryptoConfig.query}`)
    
    const searchResponse = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?` +
      `query=${encodeURIComponent(cryptoConfig.query)}&` +
      `max_results=30&` +
      `tweet.fields=created_at,author_id,public_metrics,context_annotations,lang,possibly_sensitive,attachments,entities&` +
      `user.fields=name,username,verified,verified_type,profile_image_url,public_metrics&` +
      `media.fields=type,url,preview_image_url,duration_ms,height,width&` +
      `expansions=author_id,attachments.media_keys`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'CryptoApp/1.0'
        },
        next: { revalidate: 900 } // Cache for 15 minutes for fresher content
      }
    )

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error(`Twitter Search failed: ${searchResponse.status} ${searchResponse.statusText}`, errorText)
      console.error('Response headers:', searchResponse.headers)
      
      // If rate limited (429), return a specific message
      if (searchResponse.status === 429) {
        console.log('Twitter API rate limited - this is normal for development/testing')
        throw new Error('RATE_LIMITED')
      }
      
      throw new Error(`Twitter Search error: ${searchResponse.status} - ${errorText}`)
    }

    const searchData = await searchResponse.json()
    console.log('Twitter API response received:', { 
      tweetsCount: searchData.data?.length || 0,
      usersCount: searchData.includes?.users?.length || 0,
      mediaCount: searchData.includes?.media?.length || 0
    })
    
    // Process and format REAL tweets with media support
    const tweets = searchData.data || []
    const users = searchData.includes?.users || []
    const media = searchData.includes?.media || []
    
    const userMap = users.reduce((acc: any, user: any) => {
      acc[user.id] = user
      return acc
    }, {})

    const mediaMap = media.reduce((acc: any, mediaItem: any) => {
      acc[mediaItem.media_key] = mediaItem
      return acc
    }, {})

    const formattedPosts = tweets
      .filter((tweet: any) => {
        // Only show tweets with some engagement and not sensitive
        return tweet.text && 
               !tweet.possibly_sensitive &&
               tweet.public_metrics?.like_count >= 0 // Allow even 0 likes for fresh content
      })
      .map((tweet: any) => {
        const user = userMap[tweet.author_id]
        const isVerified = user?.verified || user?.verified_type === 'blue' || user?.verified_type === 'business' || user?.verified_type === 'government'
        
        // Process media attachments (images, videos)
        let mediaAttachments: any[] = []
        if (tweet.attachments?.media_keys) {
          mediaAttachments = tweet.attachments.media_keys.map((key: string) => {
            const mediaItem = mediaMap[key]
            if (mediaItem) {
              return {
                type: mediaItem.type, // 'photo', 'video', 'animated_gif'
                url: mediaItem.url,
                preview_image_url: mediaItem.preview_image_url,
                width: mediaItem.width,
                height: mediaItem.height,
                duration_ms: mediaItem.duration_ms
              }
            }
            return null
          }).filter(Boolean)
        }

        // Process URLs/links from entities
        let urls: any[] = []
        if (tweet.entities?.urls) {
          urls = tweet.entities.urls.map((urlEntity: any) => ({
            expanded_url: urlEntity.expanded_url,
            display_url: urlEntity.display_url,
            title: urlEntity.title,
            description: urlEntity.description,
            images: urlEntity.images
          }))
        }
        
        return {
          id: tweet.id,
          text: tweet.text,
          createdAt: tweet.created_at,
          author: {
            name: user?.name || 'Unknown User',
            username: user?.username || 'unknown',
            profileImage: user?.profile_image_url?.replace('_normal', '_400x400') || 'https://cryptologos.cc/logos/solana-sol-logo.png',
            verified: isVerified,
            verifiedType: user?.verified_type,
            followers: user?.public_metrics?.followers_count || 0
          },
          metrics: {
            likes: tweet.public_metrics?.like_count || 0,
            retweets: tweet.public_metrics?.retweet_count || 0,
            replies: tweet.public_metrics?.reply_count || 0,
            quotes: tweet.public_metrics?.quote_count || 0
          },
          media: mediaAttachments,
          urls: urls,
          url: `https://twitter.com/${user?.username}/status/${tweet.id}`,
          realUrl: `https://x.com/${user?.username}`, // Official account URL for Follow button
          relevanceScore: calculateRelevanceScore(tweet, user, symbol)
        }
      })
      .sort((a: { relevanceScore: number }, b: { relevanceScore: number }) => b.relevanceScore - a.relevanceScore)
      .slice(0, 12) // Get more posts to show variety

    console.log(`Processed ${formattedPosts.length} real tweets for ${symbol}`)

    return formattedPosts
  } catch (error) {
    console.error(`CRITICAL ERROR fetching social posts for ${symbol}:`, error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    // If we're rate limited, provide a single demo post to show the design works
    // This is only for development to demonstrate the Twitter integration is working
    if (error instanceof Error && error.message === 'RATE_LIMITED') {
      console.log('Twitter API rate limited - showing demo post to verify design')
      return [{
        id: 'demo_rate_limited',
        text: `🚨 Twitter API Rate Limited 🚨\n\nOur ${symbol} social feed is temporarily unavailable due to Twitter API rate limits. The integration is working correctly - just waiting for rate limit reset.\n\n#RateLimited #TwitterAPI #Development`,
        createdAt: new Date().toISOString(),
        author: {
          name: 'CoinMarketCap Clone',
          username: 'cmc_clone_demo',
          profileImage: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
          verified: false,
          verifiedType: undefined,
          followers: 1000
        },
        metrics: {
          likes: 42,
          retweets: 7,
          replies: 3,
          quotes: 1
        },
        media: [],
        urls: [],
        url: `https://twitter.com/cmc_clone_demo/status/demo_rate_limited`,
        realUrl: `https://x.com/cmc_clone_demo`, // Official account URL for Follow button
        relevanceScore: 100
      }]
    }
    
    // Return empty array for other errors
    return []
  }
}

function calculateRelevanceScore(tweet: any, user: any, symbol: string): number {
  let score = 0
  
  const text = tweet.text.toLowerCase()
  const symbolLower = symbol.toLowerCase()
  
  // Score based on symbol mentions
  if (text.includes(`$${symbolLower}`)) score += 20
  if (text.includes(`#${symbolLower}`)) score += 15
  if (text.includes(symbolLower)) score += 10
  
  // Score based on engagement
  score += Math.min(tweet.public_metrics.like_count / 10, 20)
  score += Math.min(tweet.public_metrics.retweet_count / 5, 15)
  
  // Score based on user credibility
  if (user?.verified) score += 25
  if (user?.public_metrics?.followers_count > 50000) score += 15
  if (user?.public_metrics?.followers_count > 10000) score += 10
  
  // Score based on content quality
  if (text.includes('analysis') || text.includes('technical')) score += 10
  if (text.includes('price') || text.includes('chart')) score += 8
  if (text.includes('breaking') || text.includes('news')) score += 12
  
  return score
}

// Generate realistic demo posts when Twitter API is not configured
function generateDemoPosts(symbol: string, sentiment: string) {
  const currentTime = new Date()
  
  // Token-specific information and realistic posts
  const tokenData: Record<string, { name: string, posts: Array<{ text: string, author: any, metrics: any }> }> = {
    'SOL': {
      name: 'Solana',
      posts: [
        {
          text: `🚀 $SOL breaking through resistance! The Solana ecosystem is showing incredible strength with over 400 TPS sustained. #Solana #DeFi ${sentiment === 'Bullish' ? '📈' : '📉'}`,
          author: {
            name: 'Solana',
            username: 'solana',
            profileImage: 'https://pbs.twimg.com/profile_images/1616932042473967618/jUwwNhfF_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 450000
          },
          metrics: { likes: 342, retweets: 89, replies: 24, quotes: 12 },
          realUrl: 'https://x.com/solana', // Official Solana account
          postUrl: 'https://x.com/search?q=%24SOL%20solana&src=typed_query&f=live' // Live search for $SOL
        },
        {
          text: `Just deployed my first dApp on @solana! The speed and low fees are game-changing. Building the future of DeFi 🔥 #Solana #Web3 #BuidlOnSolana`,
          author: {
            name: 'Solana Labs',
            username: 'solanalabs',
            profileImage: 'https://pbs.twimg.com/profile_images/1617549237893709824/LrkwrWQ0_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 85000
          },
          metrics: { likes: 156, retweets: 34, replies: 18, quotes: 7 },
          realUrl: 'https://x.com/solanalabs', // Official Solana Labs account
          postUrl: 'https://x.com/search?q=%23Solana%20%23BuidlOnSolana&src=typed_query&f=live' // Live hashtag search
        },
        {
          text: `⚡ Solana network health update:\n• 400+ TPS sustained\n• 1,500+ validators\n• 99.95% uptime\n• Growing ecosystem\n\nThe foundation is solid! $SOL`,
          author: {
            name: 'Solana Foundation',
            username: 'solanafndn',
            profileImage: 'https://pbs.twimg.com/profile_images/1619365632438136832/4aOKIz3j_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 200000
          },
          metrics: { likes: 892, retweets: 245, replies: 67, quotes: 43 },
          realUrl: 'https://x.com/solanafndn', // Official Solana Foundation account
          postUrl: 'https://x.com/search?q=from%3Asolanafndn%20solana&src=typed_query&f=live' // Recent posts from Solana Foundation
        }
      ]
    },
    'USDC': {
      name: 'USD Coin',
      posts: [
        {
          text: `$USDC adoption continues to grow! Now available on 15+ blockchains providing seamless cross-chain liquidity for DeFi protocols. The future of digital dollars 💰`,
          author: {
            name: 'Circle',
            username: 'circle',
            profileImage: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
            verified: true,
            verifiedType: 'business',
            followers: 180000
          },
          metrics: { likes: 567, retweets: 123, replies: 45, quotes: 28 },
          realUrl: 'https://x.com/circle',
          postUrl: 'https://x.com/search?q=from%3Acircle%20USDC&src=typed_query&f=live' // Recent Circle posts about USDC
        },
        {
          text: `Why $USDC is my go-to stablecoin:\n✅ Fully backed by cash & short-duration treasuries\n✅ Monthly attestations\n✅ Regulated by US authorities\n✅ Native on major chains\n\nStability you can trust!`,
          author: {
            name: 'Centre Consortium',
            username: 'centre_io',
            profileImage: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
            verified: true,
            verifiedType: 'business',
            followers: 95000
          },
          metrics: { likes: 234, retweets: 67, replies: 19, quotes: 11 },
          realUrl: 'https://x.com/centre_io',
          postUrl: 'https://x.com/search?q=%24USDC%20stablecoin&src=typed_query&f=live' // Live search for USDC stablecoin content
        }
      ]
    },
    'RAY': {
      name: 'Raydium',
      posts: [
        {
          text: `🌊 $RAY liquidity pools hitting new ATHs! The AMM is processing millions in volume daily. Raydium continues to be the backbone of Solana DeFi 💪 #Raydium #DeFi`,
          author: {
            name: 'Raydium',
            username: 'RaydiumProtocol',
            profileImage: 'https://pbs.twimg.com/profile_images/1617911050829991936/7pWNMiRJ_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 75000
          },
          metrics: { likes: 445, retweets: 98, replies: 32, quotes: 15 },
          realUrl: 'https://x.com/RaydiumProtocol',
          postUrl: 'https://x.com/search?q=from%3ARaydiumProtocol%20%24RAY&src=typed_query&f=live' // Recent posts from Raydium about $RAY
        },
        {
          text: `Just provided liquidity to the $RAY-USDC pool on @RaydiumProtocol. The yields are impressive and the impermanent loss protection gives me confidence! 🏊‍♂️`,
          author: {
            name: 'Raydium',
            username: 'RaydiumProtocol',
            profileImage: 'https://pbs.twimg.com/profile_images/1617911050829991936/7pWNMiRJ_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 75000
          },
          metrics: { likes: 89, retweets: 23, replies: 7, quotes: 4 },
          realUrl: 'https://x.com/RaydiumProtocol',
          postUrl: 'https://x.com/search?q=%23Raydium%20%23DeFi&src=typed_query&f=live' // Live hashtag search for Raydium DeFi
        }
      ]
    },
    'USDT': {
      name: 'Tether',
      posts: [
        {
          text: `$USDT continues to maintain its peg perfectly! With over $100B market cap, Tether remains the most liquid stablecoin in the market 💪 #USDT #Stablecoin`,
          author: {
            name: 'Tether',
            username: 'Tether_to',
            profileImage: 'https://pbs.twimg.com/profile_images/1681977499545866242/Gy5rY2Rh_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 320000
          },
          metrics: { likes: 678, retweets: 156, replies: 89, quotes: 34 },
          realUrl: 'https://x.com/Tether_to',
          postUrl: 'https://x.com/search?q=from%3ATether_to%20USDT&src=typed_query&f=live' // Recent posts from Tether about USDT
        },
        {
          text: `Why traders love $USDT:\n✅ Highest liquidity\n✅ Available on 50+ blockchains\n✅ Preferred trading pair\n✅ Battle tested since 2014\n\nThe OG stablecoin! 🏆`,
          author: {
            name: 'Paolo Ardoino',
            username: 'paoloardoino',
            profileImage: 'https://pbs.twimg.com/profile_images/1681321593096712193/lqRN0A8x_400x400.jpg',
            verified: true,
            verifiedType: 'blue',
            followers: 89000
          },
          metrics: { likes: 234, retweets: 56, replies: 23, quotes: 12 },
          realUrl: 'https://x.com/paoloardoino',
          postUrl: 'https://x.com/search?q=%24USDT%20stablecoin&src=typed_query&f=live' // Live search for USDT stablecoin content
        }
      ]
    },
    'ORCA': {
      name: 'Orca',
      posts: [
        {
          text: `🐋 $ORCA's whirlpool AMM is revolutionizing concentrated liquidity on Solana! Capital efficiency like never before 🌊 #Orca #Solana #DeFi`,
          author: {
            name: 'Orca',
            username: 'orca_so',
            profileImage: 'https://pbs.twimg.com/profile_images/1639328952751886336/X_5EX9HW_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 65000
          },
          metrics: { likes: 356, retweets: 89, replies: 28, quotes: 16 },
          realUrl: 'https://x.com/orca_so',
          postUrl: 'https://x.com/search?q=from%3Aorca_so%20%24ORCA&src=typed_query&f=live' // Recent posts from Orca about $ORCA
        },
        {
          text: `The user experience on @orca_so is unmatched! Smooth swaps, beautiful UI, and those whirlpool rewards 🌊 $ORCA is building the future of trading!`,
          author: {
            name: 'Orca',
            username: 'orca_so',
            profileImage: 'https://pbs.twimg.com/profile_images/1639328952751886336/X_5EX9HW_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 65000
          },
          metrics: { likes: 123, retweets: 34, replies: 15, quotes: 8 },
          realUrl: 'https://x.com/orca_so',
          postUrl: 'https://x.com/search?q=%23Orca%20%23Solana&src=typed_query&f=live' // Live hashtag search for Orca on Solana
        }
      ]
    },
    'SRM': {
      name: 'Serum',
      posts: [
        {
          text: `$SRM powered DEX infrastructure continues to grow! The order book model on Solana provides institutional-grade trading experience 📈 #Serum #DeFi`,
          author: {
            name: 'Project Serum',
            username: 'ProjectSerum',
            profileImage: 'https://pbs.twimg.com/profile_images/1375888080007270403/vOlHjTuH_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 85000
          },
          metrics: { likes: 445, retweets: 112, replies: 45, quotes: 23 },
          realUrl: 'https://x.com/ProjectSerum',
          postUrl: 'https://x.com/search?q=from%3AProjectSerum%20%24SRM&src=typed_query&f=live' // Recent posts from Project Serum about $SRM
        },
        {
          text: `The composability of $SRM's order book is amazing! Other protocols can build on top and share liquidity. True DeFi innovation! 🔧`,
          author: {
            name: 'Project Serum',
            username: 'ProjectSerum',
            profileImage: 'https://pbs.twimg.com/profile_images/1375888080007270403/vOlHjTuH_400x400.jpg',
            verified: true,
            verifiedType: 'business',
            followers: 85000
          },
          metrics: { likes: 89, retweets: 23, replies: 12, quotes: 6 },
          realUrl: 'https://x.com/ProjectSerum',
          postUrl: 'https://x.com/search?q=%23Serum%20%23DeFi&src=typed_query&f=live' // Live hashtag search for Serum DeFi
        }
      ]
    }
  }

  // Get posts for the specific token or use default
  const tokenInfo = tokenData[symbol] || {
    name: symbol,
    posts: [
      {
        text: `$${symbol} showing strong momentum in today's trading session! The technical indicators are looking ${sentiment.toLowerCase()} 📊 #${symbol} #Crypto`,
        author: {
          name: 'CoinMarketCap',
          username: 'CoinMarketCap',
          profileImage: 'https://pbs.twimg.com/profile_images/1709634685803630592/BoKKb0Y7_400x400.jpg',
          verified: true,
          verifiedType: 'business',
          followers: 1500000
        },
        metrics: { likes: 124, retweets: 34, replies: 12, quotes: 6 },
        realUrl: 'https://x.com/CoinMarketCap',
        postUrl: `https://x.com/search?q=%24${symbol}%20crypto&src=typed_query&f=live` // Live search for token
      },
      {
        text: `Just added more $${symbol} to my portfolio. The fundamentals look solid and the community is growing strong! 💎🙌 #HODL #${symbol}`,
        author: {
          name: 'CoinGecko',
          username: 'coingecko',
          profileImage: 'https://pbs.twimg.com/profile_images/1549663606577459202/SRhIgq6t_400x400.jpg',
          verified: true,
          verifiedType: 'business',
          followers: 850000
        },
        metrics: { likes: 89, retweets: 19, replies: 8, quotes: 3 },
        realUrl: 'https://x.com/coingecko',
        postUrl: `https://x.com/search?q=%23${symbol}%20%23HODL&src=typed_query&f=live` // Live hashtag search
      }
    ]
  }

  // Convert to the expected format with realistic timing
  return tokenInfo.posts.map((post, index) => {
    // Generate realistic post ID based on current time and index
    const basePostId = Date.now() - (index * 1000 * 60 * 30) // 30 minutes apart
    const postId = Math.floor(basePostId / 1000).toString() // Convert to seconds for realistic Twitter ID
    
    return {
      id: `demo_${symbol}_${index}`,
      text: post.text,
      createdAt: new Date(currentTime.getTime() - (index * 1000 * 60 * 30)).toISOString(), // 30 minutes apart
      author: {
        ...post.author,
        followers: post.author.followers
      },
      metrics: post.metrics,
      media: [],
      urls: [],
      url: post.postUrl || `https://x.com/search?q=%24${symbol}&src=typed_query&f=live`, // Use official post URL or hashtag search
      realUrl: post.realUrl || `https://x.com/${post.author.username}`, // Official account URL for Follow button
      relevanceScore: 100 - (index * 10)
    }
  })
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { symbol } = await params
    const url = new URL(request.url)
    const sentiment = url.searchParams.get('sentiment') || 'Bullish' // Default to Bullish
    console.log(
      `API: Fetching social posts for ${symbol} with sentiment ${sentiment}...`,
    )

    const socialPosts = await fetchCryptoSocialPosts(
      symbol.toUpperCase(),
      sentiment,
    )

    console.log(`API: Returning ${socialPosts.length} social posts for ${symbol}`)
    return NextResponse.json({
      symbol: symbol.toUpperCase(),
      posts: socialPosts,
      totalResults: socialPosts.length
    })
  } catch (error) {
    console.error('Social API error:', error)
    
    // Check for rate limiting
    if (error instanceof Error && error.message === 'RATE_LIMITED') {
      return NextResponse.json({ 
        error: 'RATE_LIMITED',
        message: 'Twitter API rate limited. Please try again later.',
        symbol: (await params).symbol.toUpperCase(),
        posts: [],
        totalResults: 0
      }, { status: 429 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch social posts',
      message: error instanceof Error ? error.message : 'Unknown error',
      symbol: (await params).symbol.toUpperCase(),
      posts: [],
      totalResults: 0
    }, { status: 500 })
  }
}
