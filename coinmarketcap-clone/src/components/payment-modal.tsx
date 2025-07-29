'use client'

import { useState } from 'react'
import { Crypto } from '@/types/crypto'

export default function PaymentModal({
  crypto,
  onClose,
}: {
  crypto: Crypto
  onClose: () => void
}) {
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        {isSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p>
              You have successfully purchased {amount} {crypto.symbol}.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 mt-6 bg-[#1652F0] text-white rounded-lg hover:bg-[#1652F0]/90 font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Buy {crypto.name} ({crypto.symbol})
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
            <div className="text-lg font-semibold mb-6">
              Total: ${(parseFloat(amount) * crypto.price).toFixed(2)}
            </div>
            <button
              onClick={handlePayment}
              disabled={isProcessing || !amount}
              className="w-full py-3 bg-[#1652F0] text-white rounded-lg hover:bg-[#1652F0]/90 font-medium disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : 'Buy Now'}
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 mt-2 text-[#1E1E1E] hover:text-[#1652F0] font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
