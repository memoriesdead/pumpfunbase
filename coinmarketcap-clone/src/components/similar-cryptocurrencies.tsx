import Link from 'next/link'
import { mockCryptos } from '@/data/mock-data'
import { formatPrice } from '@/lib/utils'
import { Crypto } from '@/types/crypto'

interface SimilarCryptocurrenciesProps {
  currentCrypto: Crypto
}

export default function SimilarCryptocurrencies({ currentCrypto }: SimilarCryptocurrenciesProps) {
  // Use specific cryptocurrencies with exact data for "People Also Watch"
  const watchedCryptos = [
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: '$3,234.78', 
      change: '-1.56%',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      isNegative: true,
      slug: 'eth'
    },
    { 
      name: 'Tether USDt', 
      symbol: 'USDT', 
      price: '$1.00', 
      change: '+0.01%',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      isNegative: false,
      slug: 'usdt'
    },
    { 
      name: 'BNB', 
      symbol: 'BNB', 
      price: '$589.23', 
      change: '+1.87%',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      isNegative: false,
      slug: 'bnb'
    },
    { 
      name: 'Solana', 
      symbol: 'SOL', 
      price: '$189.45', 
      change: '+4.56%',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
      isNegative: false,
      slug: 'sol'
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h3 className="text-lg font-bold text-[#1E1E1E] mb-6">People Also Watch</h3>
      
      <div className="space-y-4">
        {watchedCryptos.map((crypto, index) => (
          <Link key={index} href={`/currencies/${crypto.slug}`}>
            <div className="flex items-center justify-between hover:bg-[#FAFBFC] p-2 rounded-lg transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <img src={crypto.logo} alt={crypto.name} className="w-8 h-8" />
                <div>
                  <div className="font-semibold text-[#1E1E1E] text-sm">{crypto.name}</div>
                  <div className="text-xs text-[#8C8C8C]">{crypto.symbol}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-semibold text-[#1E1E1E]">{crypto.price}</div>
                <div className={`text-xs font-semibold ${
                  crypto.isNegative ? 'text-[#FF5722]' : 'text-[#00D4AA]'
                }`}>
                  {crypto.change}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <button className="w-full mt-4 text-[#1652F0] hover:underline text-sm font-medium">
        View All Cryptocurrencies →
      </button>
    </div>
  )
}