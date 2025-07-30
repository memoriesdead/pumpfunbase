import CryptoDetailPageWrapper from '@/components/crypto-detail-page-wrapper'
import MemeCoinDetailPage from '@/components/meme-coin-detail-page'

interface Props {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Top 50 cryptocurrency symbols for static generation
const TOP_50_CRYPTO_SYMBOLS = [
  'btc', 'eth', 'xrp', 'usdt', 'sol', 'bnb', 'usdc', 'doge', 'ada', 'avax',
  'link', 'xlm', 'dot', 'uni', 'ltc', 'matic', 'icp', 'aave', 'etc', 'fil',
  'vet', 'xmr', 'atom', 'mkr', 'msol', 'mana', 'snx', 'sand', 'ray', 'comp',
  'crv', 'cake', 'zrx', 'bat', 'orca', 'enj', 'yfi', 'lrc', 'bal', 'audio',
  'sushi', 'srm', 'knc', 'mngo', 'bnt', 'alpha', 'fida', 'samo', 'atlas', 'step'
]

// Meme coin patterns that should use the enhanced detail page
const MEME_COIN_PATTERNS = [
  'pepecoin', 'dogeking', 'moonrocket', 'diamondhands', 'shibainu', 'catcoin',
  'rocketfuel', 'gemhunter', 'bullrun', 'tothemoon', 'alphacoin', 'gigachad',
  'degenape', 'lunarbeast', 'cosmicgem', 'turbomoon', 'hyperpepe', 'eliteshib',
  'megapump', 'ultragains'
]

function isMemeToken(slug: string): boolean {
  const lowerSlug = slug.toLowerCase();
  
  // Check if it matches any meme coin patterns
  if (MEME_COIN_PATTERNS.some(pattern => lowerSlug.includes(pattern))) {
    return true;
  }
  
  // Check if it has numbered variations (e.g., pepecoin-1, pepecoin-2)
  if (MEME_COIN_PATTERNS.some(pattern => lowerSlug.includes(pattern) || lowerSlug.startsWith(pattern))) {
    return true;
  }
  
  // Check if it's not in the traditional crypto list
  if (!TOP_50_CRYPTO_SYMBOLS.includes(lowerSlug)) {
    return true;
  }
  
  return false;
}

export default async function CryptocurrencyPage({ params, searchParams }: Props) {
  const { slug } = await params
  const search = searchParams ? await searchParams : {}
  
  // Use meme coin detail page for all meme tokens (including from discover page)
  if (isMemeToken(slug)) {
    return <MemeCoinDetailPage slug={slug} />
  }
  
  // Use traditional crypto detail page for established cryptocurrencies only
  return <CryptoDetailPageWrapper slug={slug} />
}

// Generate static params for all 50 cryptocurrencies
export function generateStaticParams() {
  return TOP_50_CRYPTO_SYMBOLS.map((symbol) => ({
    slug: symbol.toLowerCase(),
  }))
}

// SEO Optimization
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  
  // Generate basic metadata without fetching (to avoid build-time issues)
  const symbolUpper = slug.toUpperCase()
  
  return {
    title: `${symbolUpper} Price, Chart & Market Cap | CoinMarketCap`,
    description: `Get the latest ${symbolUpper} price, market cap, trading volume, and more cryptocurrency information.`,
    keywords: `${symbolUpper}, cryptocurrency, price, chart, market cap, trading`,
    openGraph: {
      title: `${symbolUpper} Cryptocurrency Price & Market Data`,
      description: `Current ${symbolUpper} price and market information`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${symbolUpper} Cryptocurrency Price`,
      description: `Current ${symbolUpper} price and market information`,
    }
  }
}
