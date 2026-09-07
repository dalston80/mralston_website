'use client'

import { useState } from 'react'

export default function BuyButton({ slug, label = 'Buy now' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleBuy() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-blue-950 font-bold text-lg rounded-lg px-8 py-4 transition-all"
      >
        {loading ? 'Redirecting to checkout…' : label}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">Secure checkout via Stripe. Download links emailed instantly.</p>
    </div>
  )
}
