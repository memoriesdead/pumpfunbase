'use client'

import { useAuth } from '@/app/context/auth-context'

export default function LoginModal({
  onClose,
}: {
  onClose: () => void
}) {
  const { login } = useAuth()

  const handleLogin = () => {
    login()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        <p className="mb-6">
          Connect your wallet to buy and sell cryptocurrency.
        </p>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#1652F0] text-white rounded-lg hover:bg-[#1652F0]/90 font-medium"
        >
          Connect
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 mt-2 text-[#1E1E1E] hover:text-[#1652F0] font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
