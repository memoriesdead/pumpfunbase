import Link from 'next/link'
import { Twitter, MessageCircle, Github, Send, Zap, TrendingUp, Rocket } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                MEMECOIN TRACKER
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              🚀 TO THE MOON! 🌙 Track your favorite meme coins, diamond hands only! 
              HODL strong, apes together! 💎🙌
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="bg-[#1DA1F2] p-3 rounded-full hover:bg-[#1a8cd8] transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-[#7289DA] p-3 rounded-full hover:bg-[#5b6eae] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-[#24292e] p-3 rounded-full hover:bg-[#1f2428] transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-[#0088cc] p-3 rounded-full hover:bg-[#006ba6] transition-colors">
                <Send className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Meme Coin Essentials */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Meme Essentials
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🐕 Dogecoin</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🐸 Pepe</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🐕 Shiba Inu</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🌙 SafeMoon</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🚀 ElonMars</Link></li>
            </ul>
          </div>

          {/* Diamond Hands Hub */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Diamond Hands Hub
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/discover" className="hover:text-orange-400 transition-colors">🔍 Discover</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">💎 HODL Guide</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🦍 Ape Academy</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">📈 Moon Mission</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">🔥 Burn Tracker</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">⚡ Pump Alerts</Link></li>
            </ul>
          </div>
        </div>

        {/* Meme Stats Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">🚀 42,069</div>
              <div className="text-sm text-gray-300">Rockets Launched</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">💎 13,337</div>
              <div className="text-sm text-gray-300">Diamond Hands</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">🌙 69,420</div>
              <div className="text-sm text-gray-300">Moon Missions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">🦍 88,888</div>
              <div className="text-sm text-gray-300">Apes Strong</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 MEMECOIN TRACKER. Not financial advice. DYOR! 🎯
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-orange-400 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">🔥 Burn Address</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">📊 Tokenomics</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}