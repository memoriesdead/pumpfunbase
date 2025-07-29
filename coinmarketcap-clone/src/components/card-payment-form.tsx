'use client'

import React, { useState, useEffect } from 'react'
import { CreditCard, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface CardPaymentFormProps {
  amount: number
  currency: string
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
  onCancel: () => void
}

interface CardDetails {
  number: string
  expiry: string
  cvc: string
  name: string
}

export function CardPaymentForm({ 
  amount, 
  currency, 
  onSuccess, 
  onError, 
  onCancel 
}: CardPaymentFormProps) {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  
  const [errors, setErrors] = useState<Partial<CardDetails>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Validate card number using Luhn algorithm
  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '')
    if (!/^\d+$/.test(cleaned) || cleaned.length < 13 || cleaned.length > 19) {
      return false
    }

    let sum = 0
    let shouldDouble = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10)
      
      if (shouldDouble) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      shouldDouble = !shouldDouble
    }
    
    return sum % 10 === 0
  }

  // Validate expiry date
  const validateExpiry = (expiry: string): boolean => {
    const cleaned = expiry.replace(/\D/g, '')
    if (cleaned.length !== 4) return false
    
    const month = parseInt(cleaned.substr(0, 2), 10)
    const year = parseInt(cleaned.substr(2, 2), 10) + 2000
    
    if (month < 1 || month > 12) return false
    
    const now = new Date()
    const expiryDate = new Date(year, month - 1)
    
    return expiryDate > now
  }

  // Validate CVC
  const validateCVC = (cvc: string): boolean => {
    return /^\d{3,4}$/.test(cvc)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '')
    const match = cleaned.match(/\d{1,4}/g)
    return match ? match.join(' ').substr(0, 19) : ''
  }

  // Format expiry date as MM/YY
  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
    }
    return cleaned
  }

  // Handle input changes
  const handleInputChange = (field: keyof CardDetails, value: string) => {
    let formattedValue = value
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value)
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4)
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  // Validate form
  useEffect(() => {
    const newErrors: Partial<CardDetails> = {}
    
    if (cardDetails.number && !validateCardNumber(cardDetails.number)) {
      newErrors.number = 'Invalid card number'
    }
    
    if (cardDetails.expiry && !validateExpiry(cardDetails.expiry)) {
      newErrors.expiry = 'Invalid expiry date'
    }
    
    if (cardDetails.cvc && !validateCVC(cardDetails.cvc)) {
      newErrors.cvc = 'Invalid CVC'
    }
    
    if (cardDetails.name && cardDetails.name.trim().length < 2) {
      newErrors.name = 'Name is required'
    }
    
    setErrors(newErrors)
    
    const isFormValid = 
      validateCardNumber(cardDetails.number) &&
      validateExpiry(cardDetails.expiry) &&
      validateCVC(cardDetails.cvc) &&
      cardDetails.name.trim().length >= 2
    
    setIsValid(isFormValid)
  }, [cardDetails])

  // Process payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid || isProcessing) return
    
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock success
      const transactionId = 'txn_' + Math.random().toString(36).substr(2, 9)
      onSuccess(transactionId)
    } catch (error) {
      onError('Payment failed. Please check your card details and try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Get card type from number
  const getCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, '')
    if (/^4/.test(cleaned)) return 'Visa'
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard'
    if (/^3[47]/.test(cleaned)) return 'American Express'
    if (/^6/.test(cleaned)) return 'Discover'
    return 'Card'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Card Payment</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Secure</span>
        </div>
      </div>

      {/* Amount Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">
            ${amount.toFixed(2)} {currency}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.number ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={19}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          {errors.number && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.number}
            </p>
          )}
          {cardDetails.number && !errors.number && (
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {getCardType(cardDetails.number)} detected
            </p>
          )}
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={cardDetails.expiry}
              onChange={(e) => handleInputChange('expiry', e.target.value)}
              placeholder="MM/YY"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.expiry ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={5}
            />
            {errors.expiry && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expiry}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <input
              type="text"
              value={cardDetails.cvc}
              onChange={(e) => handleInputChange('cvc', e.target.value)}
              placeholder="123"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cvc ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={4}
            />
            {errors.cvc && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cvc}
              </p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardDetails.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="John Doe"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={!isValid || isProcessing}
            className="py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay ${amount.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Security Notice */}
      <div className="mt-6 p-3 bg-green-50 rounded-lg text-xs text-green-700">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>
            Your payment information is encrypted and secure. We don't store your card details.
          </span>
        </div>
      </div>
    </div>
  )
}