import { CheckCircle, Clock, Rocket, Star, Zap, Target } from 'lucide-react'
import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'

export default function Roadmap() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <StatsBar />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 ROADMAP TO THE MOON 🌙
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our journey from meme to mainstream! Diamond hands, buckle up - 
            we're going intergalactic! 💎🙌🚀
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">✅ 85%</div>
            <div className="text-green-100">Phase 1 Complete</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">🚧 60%</div>
            <div className="text-blue-100">Phase 2 Progress</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">🔮 0%</div>
            <div className="text-orange-100">Phase 3 Coming</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">🌙 0%</div>
            <div className="text-purple-100">Moon Mission</div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 via-orange-500 to-purple-500"></div>

          {/* Phase 1 - COMPLETED */}
          <div className="relative flex items-center mb-12">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg w-full md:w-96 md:ml-auto md:mr-8">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Rocket className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Phase 1: Liftoff 🚀</h3>
                    <p className="text-sm text-green-600 font-medium">COMPLETED ✅</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Launch meme coin</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Build community of 10K holders</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />List on DEX exchanges</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Lock liquidity for 2 years</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />First meme contest</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 2 - IN PROGRESS */}
          <div className="relative flex items-center mb-12">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                <Clock className="w-5 h-5 text-white animate-spin" />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg w-full md:w-96 md:mr-auto md:ml-8">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Phase 2: Acceleration ⚡</h3>
                    <p className="text-sm text-blue-600 font-medium">IN PROGRESS 🚧</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />CEX listings (Binance, Coinbase)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />NFT collection launch</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-blue-500 mr-2" />Mobile app development</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-blue-500 mr-2" />Partnership with influencers</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-blue-500 mr-2" />Staking rewards program</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 3 - COMING SOON */}
          <div className="relative flex items-center mb-12">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg w-full md:w-96 md:ml-auto md:mr-8">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-2 rounded-lg mr-3">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Phase 3: Expansion 🌟</h3>
                    <p className="text-sm text-orange-600 font-medium">COMING Q3 2024 🔮</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-orange-500 mr-2" />Launch DeFi ecosystem</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-orange-500 mr-2" />Cross-chain bridge</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-orange-500 mr-2" />Metaverse integration</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-orange-500 mr-2" />DAO governance launch</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-orange-500 mr-2" />Merchandise store</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 4 - MOON MISSION */}
          <div className="relative flex items-center mb-12">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg w-full md:w-96 md:mr-auto md:ml-8">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Phase 4: Moon Mission 🌙</h3>
                    <p className="text-sm text-purple-600 font-medium">DESTINATION: MARS 🚀</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-purple-500 mr-2" />Global adoption push</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-purple-500 mr-2" />Major brand partnerships</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-purple-500 mr-2" />Physical meme coin cards</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-purple-500 mr-2" />Space-themed AR game</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-purple-500 mr-2" />ULTIMATE MOON LANDING 🌙</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Community Milestones */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎯 Community Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-bold text-green-600">10K Holders</div>
              <div className="text-sm text-gray-600">Achieved!</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold text-blue-600">50K Holders</div>
              <div className="text-sm text-gray-600">85% Complete</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-2">🔮</div>
              <div className="font-bold text-orange-600">100K Holders</div>
              <div className="text-sm text-gray-600">Coming Soon</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🌙</div>
              <div className="font-bold text-purple-600">1M Holders</div>
              <div className="text-sm text-gray-600">Moon Mission</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">🚀 Join the Mission! 🌙</h2>
          <p className="text-xl mb-6">Don't miss the rocket ship! Diamond hands welcome aboard! 💎🙌</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              🚀 Buy Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
              🦍 Join Community
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}