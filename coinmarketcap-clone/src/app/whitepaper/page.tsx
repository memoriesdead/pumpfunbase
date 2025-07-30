import { FileText, Download, Rocket, Shield, Target, Zap, TrendingUp, Users, Globe } from 'lucide-react'
import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'

export default function Whitepaper() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <StatsBar />
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📄 MEME COIN LITEPAPER 📄
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            The ultimate guide to our moon mission! From meme to mainstream - 
            this is how we're revolutionizing crypto with diamond hands! 💎🚀
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center mx-auto">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#abstract" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">1.</span>
              <span>Abstract & Vision</span>
            </a>
            <a href="#problem" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">2.</span>
              <span>Problem Statement</span>
            </a>
            <a href="#solution" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">3.</span>
              <span>Our Solution</span>
            </a>
            <a href="#tokenomics" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">4.</span>
              <span>Tokenomics</span>
            </a>
            <a href="#technology" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">5.</span>
              <span>Technology Stack</span>
            </a>
            <a href="#roadmap" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">6.</span>
              <span>Roadmap</span>
            </a>
            <a href="#community" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">7.</span>
              <span>Community</span>
            </a>
            <a href="#conclusion" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-indigo-600 font-bold mr-3">8.</span>
              <span>Conclusion</span>
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Abstract */}
          <section id="abstract" className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Rocket className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">1. Abstract & Vision 🚀</h2>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-4">
                <strong>MEME</strong> represents the next evolution in cryptocurrency - a community-driven token that combines 
                the viral nature of memes with serious DeFi utility. Our mission is simple: 
                <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">TO THE MOON! 🌙</span>
              </p>
              <p className="mb-4">
                We believe that the future of finance is not just about complex algorithms and institutional adoption, 
                but about community, culture, and the power of collective belief. MEME coin harnesses the energy of 
                internet culture while providing real utility and value to holders.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-500">
                <p className="font-semibold text-indigo-900 mb-2">🎯 Our Vision:</p>
                <p className="text-indigo-800">
                  To create the most diamond-handed community in crypto, where apes together strong, 
                  and every holder is rewarded for their loyalty on the journey to the moon!
                </p>
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section id="problem" className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">2. Problem Statement 🎯</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">The current crypto landscape faces several critical issues:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-bold text-red-900 mb-2">🐻 Weak Hands Everywhere</h3>
                  <p className="text-red-800">
                    Too many paper hands selling at the first dip. We need more diamond hands! 💎
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-bold text-orange-900 mb-2">🏦 Centralized Control</h3>
                  <p className="text-orange-800">
                    Traditional finance controlled by institutions, not the people.
                  </p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="font-bold text-yellow-900 mb-2">😴 Boring Projects</h3>
                  <p className="text-yellow-800">
                    Crypto has become too serious. Where's the fun and community spirit?
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold text-purple-900 mb-2">🚫 No Real Utility</h3>
                  <p className="text-purple-800">
                    Many meme coins lack actual use cases beyond speculation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Solution */}
          <section id="solution" className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">3. Our Solution ⚡</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                MEME coin addresses these problems through a revolutionary approach that combines 
                meme culture with serious DeFi innovation:
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">💎 Diamond Hands Rewards</h3>
                    <p>
                      Automatic rewards for long-term holders. The longer you HODL, the more you earn. 
                      Paper hands get rekt, diamond hands get rich!
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">🦍 Community Governance</h3>
                    <p>
                      Apes vote on important decisions. True decentralization where every holder has a voice 
                      in the moon mission direction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">📈 Deflationary Mechanics</h3>
                    <p>
                      Regular token burns reduce supply over time, creating scarcity and potential for 
                      massive price appreciation to the moon!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section id="technology" className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">5. Technology Stack 🔧</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-4">⚡ Blockchain</h3>
                  <ul className="space-y-2">
                    <li>• Ethereum (ERC-20)</li>
                    <li>• Binance Smart Chain</li>
                    <li>• Polygon (Coming Soon)</li>
                    <li>• Cross-chain bridges</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-4">🔒 Security</h3>
                  <ul className="space-y-2">
                    <li>• Multi-signature wallets</li>
                    <li>• Audited smart contracts</li>
                    <li>• Liquidity locked</li>
                    <li>• Community-owned</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-purple-900 mb-4">🛠️ DeFi Features</h3>
                  <ul className="space-y-2">
                    <li>• Yield farming</li>
                    <li>• Staking rewards</li>
                    <li>• NFT marketplace</li>
                    <li>• DAO governance</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-bold text-orange-900 mb-4">📱 Ecosystem</h3>
                  <ul className="space-y-2">
                    <li>• Mobile app</li>
                    <li>• Web3 integration</li>
                    <li>• Gaming platform</li>
                    <li>• Metaverse presence</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Rocket className="w-8 h-8 text-white mr-3" />
              <h2 className="text-3xl font-bold">8. Conclusion 🚀</h2>
            </div>
            <div className="leading-relaxed">
              <p className="text-xl mb-6">
                MEME coin is more than just another cryptocurrency - it's a movement, a community, 
                and a rocket ship to the moon! 🌙
              </p>
              <p className="mb-6">
                We're building the future of decentralized finance, one meme at a time. 
                With diamond hands, ape strength, and unstoppable community spirit, 
                there's no limit to how high we can fly.
              </p>
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-2xl font-bold text-center mb-4">
                  🦍 APES TOGETHER STRONG 🦍
                </p>
                <p className="text-center text-lg">
                  Join us on this incredible journey to the moon and beyond! 
                  Diamond hands only! 💎🙌🚀
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Download CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-green-700 hover:to-blue-700 transition-colors flex items-center mx-auto">
            <Download className="w-6 h-6 mr-3" />
            Download Full Whitepaper PDF
          </button>
          <p className="text-gray-600 mt-4">Complete technical documentation and tokenomics details</p>
        </div>
      </div>
    </main>
  )
}