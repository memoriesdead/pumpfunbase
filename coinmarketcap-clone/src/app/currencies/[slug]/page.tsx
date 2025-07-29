import CryptoDetailPageWrapper from '@/components/crypto-detail-page-wrapper'

interface Props {
  params: Promise<{ slug: string }>
}

// Top 50 cryptocurrency symbols for static generation
const TOP_50_CRYPTO_SYMBOLS = [
  'btc', 'eth', 'xrp', 'usdt', 'sol', 'bnb', 'usdc', 'doge', 'ada', 'avax',
  'link', 'xlm', 'dot', 'uni', 'ltc', 'matic', 'icp', 'aave', 'etc', 'fil',
  'vet', 'xmr', 'atom', 'mkr', 'msol', 'mana', 'snx', 'sand', 'ray', 'comp',
  'crv', 'cake', 'zrx', 'bat', 'orca', 'enj', 'yfi', 'lrc', 'bal', 'audio',
  'sushi', 'srm', 'knc', 'mngo', 'bnt', 'alpha', 'fida', 'samo', 'atlas', 'step'
]

export default async function CryptocurrencyPage({ params }: Props) {
  const { slug } = await params
  
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
