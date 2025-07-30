import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'
import CryptoTable from '@/components/crypto-table'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B0D11] via-[#0F1116] to-[#151821] text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 via-transparent to-[#7C3AED]/20"></div>
      </div>
      
      <StatsBar />
      <Header />
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <CryptoTable />
      </div>
    </main>
  )
}