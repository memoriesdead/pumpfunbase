'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import CryptoDetailPage from './crypto-detail-page'
import { Crypto } from '@/types/crypto'

interface Props {
  slug: string
}

export default function CryptoDetailPageWrapper({ slug }: Props) {
  const [crypto, setCrypto] = useState<Crypto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/tokens/${slug.toUpperCase()}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Token not found')
            return
          }
          throw new Error(`Failed to fetch token data: ${response.status}`)
        }
        
        const tokenData = await response.json()
        setCrypto(tokenData)
      } catch (err) {
        console.error(`Error fetching token data for ${slug}:`, err)
        setError(err instanceof Error ? err.message : 'Failed to fetch token data')
      } finally {
        setLoading(false)
      }
    }

    fetchTokenData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3861FB] mx-auto mb-4"></div>
          <p className="text-[#58667E]">Loading {slug.toUpperCase()}...</p>
        </div>
      </div>
    )
  }

  if (error || !crypto) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#1E1932] mb-2">
            Token Not Found
          </h1>
          <p className="text-[#58667E] mb-6">
            We couldn't find information for "{slug.toUpperCase()}". 
            {error && ` Error: ${error}`}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-[#3861FB] text-white px-6 py-3 rounded-lg hover:bg-[#3861FB]/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return <CryptoDetailPage crypto={crypto} />
}