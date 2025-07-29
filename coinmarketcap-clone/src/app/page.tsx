import Header from '@/components/header'
import StatsBar from '@/components/stats-bar'
import CryptoTable from '@/components/crypto-table'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <StatsBar />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CryptoTable />
      </div>
    </main>
  )
}