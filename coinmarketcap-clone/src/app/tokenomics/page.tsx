import { Coins, PieChart, TrendingUp, Flame, Lock, Gift } from 'lucide-react'
import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'

export default function Tokenomics() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <StatsBar />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center">
              <PieChart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 MEME TOKENOMICS 🚀
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diamond hands only! Here's how our meme coin distribution works. 
            No rugs, only moon missions! 💎🙌
          </p>
        </div>

        {/* Token Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-2 text-orange-500" />
              Token Distribution
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">🦍 Community (50%)</span>
                </div>
                <span className="font-bold text-green-600">500,000,000,000</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <span className="font-medium">🔒 Liquidity Pool (30%)</span>
                </div>
                <span className="font-bold text-blue-600">300,000,000,000</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                  <span className="font-medium">💰 Marketing (10%)</span>
                </div>
                <span className="font-bold text-purple-600">100,000,000,000</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium">🔥 Burn Wallet (10%)</span>
                </div>
                <span className="font-bold text-red-600">100,000,000,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Coins className="w-6 h-6 mr-2 text-pink-500" />
              Token Details
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Total Supply</h3>
                <p className="text-2xl font-bold text-orange-500">1,000,000,000,000 MEME</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">Network</h3>
                <p className="text-lg text-green-600">Ethereum (ERC-20)</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">Tax Structure</h3>
                <p className="text-lg text-blue-600">2% Buy / 2% Sell</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900">Contract</h3>
                <p className="text-sm text-purple-600 font-mono break-all">0x1234...5678</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl p-6">
            <Flame className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">🔥 Deflationary</h3>
            <p className="text-red-100">Regular burns reduce supply, increasing scarcity and potential value for diamond hands!</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6">
            <Lock className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">🔒 Liquidity Locked</h3>
            <p className="text-blue-100">Liquidity permanently locked for 2 years. No rug pulls, only moon missions!</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl p-6">
            <Gift className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">🎁 Rewards Program</h3>
            <p className="text-green-100">Hold and earn! Automatic rewards for diamond hand holders every transaction.</p>
          </div>
        </div>

        {/* Burn Schedule */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Flame className="w-6 h-6 mr-2 text-red-500" />
            🔥 Burn Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">Q1 2024</div>
              <div className="text-sm text-gray-600">10B Tokens Burned</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">Q2 2024</div>
              <div className="text-sm text-gray-600">15B Tokens Burned</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">Q3 2024</div>
              <div className="text-sm text-gray-600">20B Tokens Burned</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">Q4 2024</div>
              <div className="text-sm text-gray-600">25B Tokens Burned</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">🚀 Ready for the Moon Mission? 🌙</h2>
          <p className="text-xl mb-6">Join thousands of diamond hands HODLing for the ultimate pump!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              💎 Buy Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition-colors">
              📊 View Chart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}