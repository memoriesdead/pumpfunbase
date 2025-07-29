import { Crypto } from '@/types/crypto'

interface CryptoNewsProps {
  crypto: Crypto
}

export default function CryptoNews({ crypto }: CryptoNewsProps) {
  const newsItems = [
    {
      title: 'Bitcoin Holds Key Support - Analysts Predict New All-Time Highs Ahead',
      source: 'CryptoNews',
      time: '1 day ago',
      image: '/news1.png',
    },
    {
      title: 'Unisat Wallet Releases BRC-20 Transfer Feature Update',
      source: 'CryptoNews',
      time: '1 day ago',
      image: '/news2.png',
    },
    {
      title: 'CoinFlip stakes a claim in Brazil banking sector ahead of crypto reform',
      source: 'CryptoNews',
      time: '1 day ago',
      image: '/news3.png',
    },
    {
      title: 'Big Change in UK Crypto Regulation - Retail Access to Bitcoin Products Coming Soon?',
      source: 'CryptoNews',
      time: '1 day ago',
      image: '/news4.png',
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#F0F0F0]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1E1E1E]">{crypto.name} News</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-md">Top</button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md">Latest</button>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              CMC Daily Analysis
            </a>
          </div>
        </div>
      </div>

      {/* News Items */}
      <div className="divide-y divide-[#F0F0F0]">
        {newsItems.map((item, index) => (
          <article key={index} className="p-6 hover:bg-[#FAFBFC] transition-colors cursor-pointer">
            <div className="flex space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-[#1E1E1E] font-semibold leading-tight mb-2 hover:text-[#1652F0] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-[#8C8C8C]">
                  <span className="font-medium">{item.source}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
