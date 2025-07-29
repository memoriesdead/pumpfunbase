import { EnhancedCryptoTrading } from '@/components/trading/enhanced-crypto-trading'
import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StatsBar />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buy Cryptocurrency
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Purchase any cryptocurrency instantly with our secure, professional-grade trading platform 
            powered by 0x Protocol across 17+ blockchains.
          </p>
        </div>

        <EnhancedCryptoTrading />

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-gray-600">
                Your funds and data are protected with enterprise-level security measures and encryption.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Transactions</h3>
              <p className="text-gray-600">
                Buy cryptocurrency instantly with credit card or crypto wallet using 0x Protocol.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get the best prices through smart order routing across 100+ decentralized exchanges.
              </p>
            </div>
          </div>
        </div>

        {/* Supported Networks */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Supported Networks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Ethereum', logo: '🔷' },
              { name: 'Solana', logo: '🟣' },
              { name: 'Polygon', logo: '🟪' },
              { name: 'BSC', logo: '🟡' },
              { name: 'Arbitrum', logo: '🔵' },
              { name: 'Optimism', logo: '🔴' },
              { name: 'Avalanche', logo: '⚪' },
              { name: 'Base', logo: '🔷' },
            ].map((network, index) => (
              <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{network.logo}</div>
                <span className="text-sm font-medium text-gray-700">{network.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does it take to buy cryptocurrency?
              </h3>
              <p className="text-gray-600">
                Credit card purchases are instant. Crypto wallet transactions typically take 1-5 minutes 
                depending on network congestion.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are the fees?
              </h3>
              <p className="text-gray-600">
                We charge a transparent 0.5% platform fee. No hidden costs. Gas fees for blockchain 
                transactions are additional and vary by network.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is it safe to buy cryptocurrency here?
              </h3>
              <p className="text-gray-600">
                Yes! We use 0x Protocol, a battle-tested infrastructure that powers billions in trading volume. 
                All transactions are secured by blockchain technology.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which cryptocurrencies can I buy?
              </h3>
              <p className="text-gray-600">
                You can buy any ERC-20 token on Ethereum, SPL tokens on Solana, and tokens on 15+ other 
                supported blockchains. Popular options include Bitcoin, Ethereum, Solana, and thousands more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}