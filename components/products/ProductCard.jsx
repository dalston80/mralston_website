import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, PRODUCT_TYPE_LABELS } from './utils'

export default function ProductCard({ product }) {
  const image = product.images?.[0]

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {image?.url && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-blue-50">
          <Image
            src={image.url}
            alt={image.alt || product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-yellow-600">
          {PRODUCT_TYPE_LABELS[product.productType] || product.productType}
        </span>
        <h3 className="text-xl font-bold text-blue-950">{product.title}</h3>
        {product.tagline && (
          <p className="text-sm leading-relaxed text-blue-800">{product.tagline}</p>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-lg font-bold text-blue-950">{formatPrice(product.price)}</span>
          {product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
