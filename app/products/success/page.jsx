import Link from 'next/link'
import { getStripe } from '../../../lib/stripe'

export const metadata = {
  title: 'Purchase complete | Mr. Alston',
  robots: { index: false },
}

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams

  let session = null
  if (session_id) {
    try {
      session = await getStripe().checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      })
    } catch {
      session = null
    }
  }

  const items = session?.line_items?.data || []
  const paid = session?.payment_status === 'paid'

  return (
    <div className="max-w-3xl mx-auto lg:px-16 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-blue-950 mb-6">
        {paid ? 'Thank you for your purchase!' : 'Order received'}
      </h1>

      {items.length > 0 && (
        <ul className="inline-flex flex-col gap-1 mb-8 text-lg text-blue-800">
          {items.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      )}

      <p className="text-base leading-relaxed text-blue-800 mb-3">
        Your download links are on their way to{' '}
        <strong>{session?.customer_details?.email || 'your inbox'}</strong>.
        Links expire after 72 hours.
      </p>
      <p className="text-sm text-gray-500 mb-10">
        Don&apos;t see the email? Check spam, or reply to your receipt and I&apos;ll get you sorted.
      </p>

      <Link
        href="/"
        className="text-gray-100 font-bold bg-blue-950 hover:bg-blue-800 transition-all rounded-lg px-6 py-3"
      >
        Back to mralston.me
      </Link>
    </div>
  )
}
