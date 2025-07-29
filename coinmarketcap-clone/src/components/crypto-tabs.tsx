'use client'
import { useState } from 'react'

interface CryptoTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function CryptoTabs({ activeTab, onTabChange }: CryptoTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'markets', label: 'Markets', count: '500+' },
    { id: 'historical', label: 'Historical Data', count: null },
    { id: 'news', label: 'News', count: '24' },
    { id: 'about', label: 'About', count: null },
  ]

  return (
    <div className="bg-white border-b border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#1652F0] text-[#1652F0]'
                  : 'border-transparent text-[#8C8C8C] hover:text-[#1E1E1E]'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              {tab.count && (
                <span className="text-xs bg-[#F0F0F0] text-[#8C8C8C] px-2 py-1 rounded">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}