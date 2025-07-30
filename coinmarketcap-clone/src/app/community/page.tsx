import { Users, MessageCircle, Trophy, Heart, Zap, Crown, Twitter, Send } from 'lucide-react'
import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'
import Link from 'next/link'

export default function Community() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <StatsBar />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🦍 APES TOGETHER STRONG 🦍
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the most diamond-handed community in crypto! 
            We HODL together, we moon together! 💎🙌🚀
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-2">69,420</div>
            <div className="text-blue-100">Diamond Hands</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-2">420K</div>
            <div className="text-purple-100">Messages Daily</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-2">13,337</div>
            <div className="text-green-100">Meme Champions</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 text-center">
            <Heart className="w-8 h-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-2">42,069</div>
            <div className="text-orange-100">Moon Missions</div>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            🌐 Join Our Communities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="#" className="bg-[#1DA1F2] text-white rounded-2xl p-6 text-center hover:bg-[#1a8cd8] transition-colors group">
              <Twitter className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Twitter</h3>
              <p className="text-blue-100">Follow for moon updates!</p>
              <div className="mt-4 text-2xl font-bold">150K+</div>
            </Link>
            
            <Link href="#" className="bg-[#7289DA] text-white rounded-2xl p-6 text-center hover:bg-[#5b6eae] transition-colors group">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Discord</h3>
              <p className="text-purple-100">24/7 ape hangout spot!</p>
              <div className="mt-4 text-2xl font-bold">50K+</div>
            </Link>
            
            <Link href="#" className="bg-[#0088cc] text-white rounded-2xl p-6 text-center hover:bg-[#006ba6] transition-colors group">
              <Send className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Telegram</h3>
              <p className="text-cyan-100">Instant moon alerts!</p>
              <div className="mt-4 text-2xl font-bold">75K+</div>
            </Link>
            
            <Link href="#" className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl p-6 text-center hover:from-pink-400 hover:to-purple-500 transition-colors group">
              <Crown className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">VIP Club</h3>
              <p className="text-pink-100">Elite diamond hands!</p>
              <div className="mt-4 text-2xl font-bold">1337+</div>
            </Link>
          </div>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
              🏆 Meme Contests
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-gray-900">Weekly Meme Monday</h4>
                <p className="text-gray-600">Best meme wins 1M tokens! 🎨</p>
                <div className="text-sm text-yellow-600 font-medium mt-2">Prize: 1,000,000 MEME</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-gray-900">Diamond Hands Challenge</h4>
                <p className="text-gray-600">HODL longest, win biggest! 💎</p>
                <div className="text-sm text-blue-600 font-medium mt-2">Prize: 5,000,000 MEME</div>
              </div>
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-gray-900">Rocket Ship Art Contest</h4>
                <p className="text-gray-600">Draw your moon mission! 🚀</p>
                <div className="text-sm text-green-600 font-medium mt-2">Prize: NFT + 2,000,000 MEME</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-purple-500" />
              ⚡ Community Perks
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">VIP Access</h4>
                  <p className="text-gray-600">Exclusive alpha calls & early announcements</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">HODL Rewards</h4>
                  <p className="text-gray-600">Automatic token rewards for diamond hands</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Leaderboards</h4>
                  <p className="text-gray-600">Compete for top ape status & bragging rights</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Leaders */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            👑 Community Leaders & Moderators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">DiamondHands_Dave</h4>
              <p className="text-gray-600 text-sm mb-2">Lead Moderator</p>
              <div className="text-orange-600 font-medium">👑 Top Ape</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">MoonQueen_Sarah</h4>
              <p className="text-gray-600 text-sm mb-2">Community Manager</p>
              <div className="text-purple-600 font-medium">🚀 Rocket Commander</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">HODL_Master_Mike</h4>
              <p className="text-gray-600 text-sm mb-2">Technical Analyst</p>
              <div className="text-green-600 font-medium">📈 Chart Wizard</div>
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">🦍 Ready to Join the Ape Army? 🦍</h2>
          <p className="text-xl mb-6">
            Become part of the strongest community in crypto! Diamond hands welcome! 💎🙌
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              🚀 Join Discord
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors">
              💎 Follow Twitter
            </button>
          </div>
          <div className="mt-6 text-lg opacity-90">
            🌙 Together we go to the moon! 🌙
          </div>
        </div>
      </div>
    </main>
  )
}