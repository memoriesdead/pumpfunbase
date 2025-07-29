'use client'
import { useState } from 'react'
import { Crypto } from '@/types/crypto'

interface CryptoAboutProps {
  crypto: Crypto
}

export default function CryptoAbout({ crypto }: CryptoAboutProps) {
  const [showMore, setShowMore] = useState(false)
  
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h2 className="text-xl font-bold text-[#1E1E1E] mb-6">About {crypto.name}</h2>

      <div className="prose max-w-none">
        <p className="text-[#1E1E1E] leading-relaxed mb-4">
          {crypto.name} is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, 
          or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.
        </p>
        
        {showMore && (
          <p className="text-[#1E1E1E] leading-relaxed mb-4">
            On October 31, 2008, Nakamoto published {crypto.name}'s whitepaper, which described in detail how a 
            peer-to-peer, online currency could be implemented. They proposed to use a decentralized ledger 
            of transactions packaged in batches (called "blocks") and secured by cryptographic algorithms — 
            the whole system would later be dubbed "blockchain."
          </p>
        )}
        
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[#1652F0] font-medium hover:underline flex items-center space-x-1"
        >
          <span>{showMore ? 'Read less' : 'Read more'}</span>
          <svg className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>

      {/* Tags Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
        <h3 className="text-sm font-semibold text-[#8C8C8C] mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {(crypto.tags || ['POW', 'SHA-256', 'Store of Value', 'Layer 1']).map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-[#F0F0F0] text-[#8C8C8C] text-sm rounded-full hover:bg-[#1652F0] hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Links Section */}
      <div className="mt-6 pt-6 border-t border-[#F0F0F0]">
        <h3 className="text-sm font-semibold text-[#8C8C8C] mb-3">Links</h3>
        <div className="grid grid-cols-2 gap-3">
          <a href="#" className="flex items-center space-x-2 p-3 border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors">
            <span className="w-5 h-5 bg-[#1652F0] rounded text-white text-xs flex items-center justify-center">🌐</span>
            <span className="text-sm font-medium text-[#1E1E1E]">Website</span>
            <svg className="w-3 h-3 text-[#8C8C8C] ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
          </a>
          
          <a href="#" className="flex items-center space-x-2 p-3 border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors">
            <span className="w-5 h-5 bg-[#8C8C8C] rounded text-white text-xs flex items-center justify-center">📄</span>
            <span className="text-sm font-medium text-[#1E1E1E]">Whitepaper</span>
            <svg className="w-3 h-3 text-[#8C8C8C] ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
          </a>
          
          <a href="#" className="flex items-center space-x-2 p-3 border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors">
            <span className="w-5 h-5 bg-[#333] rounded text-white text-xs flex items-center justify-center">💻</span>
            <span className="text-sm font-medium text-[#1E1E1E]">GitHub</span>
            <svg className="w-3 h-3 text-[#8C8C8C] ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
          </a>
          
          <a href="#" className="flex items-center space-x-2 p-3 border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors">
            <span className="w-5 h-5 bg-[#1DA1F2] rounded text-white text-xs flex items-center justify-center">🐦</span>
            <span className="text-sm font-medium text-[#1E1E1E]">Twitter</span>
            <svg className="w-3 h-3 text-[#8C8C8C] ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
          </a>
          
          <a href="#" className="flex items-center space-x-2 p-3 border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors">
            <span className="w-5 h-5 bg-[#FF4500] rounded text-white text-xs flex items-center justify-center">🤖</span>
            <span className="text-sm font-medium text-[#1E1E1E]">Reddit</span>
            <svg className="w-3 h-3 text-[#8C8C8C] ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}