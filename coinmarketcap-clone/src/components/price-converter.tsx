'use client'
import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

interface PriceConverterProps {
  cryptoSymbol: string
  cryptoPrice: number
}

export default function PriceConverter({ cryptoSymbol, cryptoPrice }: PriceConverterProps) {
  const [fromAmount, setFromAmount] = useState('1')
  const [toAmount, setToAmount] = useState(cryptoPrice.toFixed(2))
  const [fromCurrency, setFromCurrency] = useState(cryptoSymbol)
  const [toCurrency, setToCurrency] = useState('USD')

  const currencies = [
    { symbol: cryptoSymbol, name: cryptoSymbol, rate: 1 },
    { symbol: 'USD', name: 'US Dollar', rate: cryptoPrice },
    { symbol: 'EUR', name: 'Euro', rate: cryptoPrice * 0.85 },
    { symbol: 'GBP', name: 'British Pound', rate: cryptoPrice * 0.75 },
    { symbol: 'JPY', name: 'Japanese Yen', rate: cryptoPrice * 110 },
  ]

  const convert = (amount: string, from: string, to: string) => {
    const fromRate = currencies.find(c => c.symbol === from)?.rate || 1
    const toRate = currencies.find(c => c.symbol === to)?.rate || 1
    
    const amountNum = parseFloat(amount) || 0
    if (from === cryptoSymbol && to === 'USD') {
      return (amountNum * cryptoPrice).toFixed(2)
    } else if (from === 'USD' && to === cryptoSymbol) {
      return (amountNum / cryptoPrice).toFixed(8)
    }
    // Simplified conversion for other currencies
    return ((amountNum * fromRate) / toRate).toFixed(2)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(convert(value, fromCurrency, toCurrency))
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h3 className="text-lg font-bold text-[#1E1E1E] mb-6">{cryptoSymbol} Converter</h3>
      
      <div className="space-y-4">
        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm text-[#8C8C8C]">From</label>
          <div className="flex space-x-2">
            <select 
              value={fromCurrency}
              onChange={(e) => {
                setFromCurrency(e.target.value)
                setToAmount(convert(fromAmount, e.target.value, toCurrency))
              }}
              className="w-24 px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm focus:outline-none focus:border-[#1652F0]"
            >
              {currencies.map(currency => (
                <option key={currency.symbol} value={currency.symbol}>{currency.symbol}</option>
              ))}
            </select>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm focus:outline-none focus:border-[#1652F0]"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 border border-[#F0F0F0] rounded-lg hover:border-[#1652F0] transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 text-[#8C8C8C]" />
          </button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm text-[#8C8C8C]">To</label>
          <div className="flex space-x-2">
            <select 
              value={toCurrency}
              onChange={(e) => {
                setToCurrency(e.target.value)
                setToAmount(convert(fromAmount, fromCurrency, e.target.value))
              }}
              className="w-24 px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm focus:outline-none focus:border-[#1652F0]"
            >
              {currencies.map(currency => (
                <option key={currency.symbol} value={currency.symbol}>{currency.symbol}</option>
              ))}
            </select>
            <input
              type="text"
              value={toAmount}
              readOnly
              className="flex-1 px-3 py-2 border border-[#F0F0F0] rounded-lg text-sm bg-[#FAFBFC]"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="text-xs text-[#8C8C8C] text-center pt-2 border-t border-[#F0F0F0]">
          1 {fromCurrency} = {convert('1', fromCurrency, toCurrency)} {toCurrency}
        </div>
      </div>
    </div>
  )
}