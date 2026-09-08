import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { getProductBySlug, getAllProductSlugs } from '../../../sanity/lib/productQueries'
import ImageGallery from '../../../components/products/ImageGallery'
import BuyButton from '../../../components/products/BuyButton'
import { formatPrice, PRODUCT_TYPE_LABELS } from '../../../components/products/utils'

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const title = `${product.title} | Mr. Alston`
  const description = product.tagline || `Buy ${product.title} — instant download.`

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://mralston.me/products/${slug}`,
      type: 'website',
      images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product || !product.live) notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.tagline,
    image: product.images?.map((img) => img.url),
    offers: {
      '@type': 'Offer',
      url: `https://mralston.me/products/${slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Link href="/#products" className="text-sm text-blue-800 hover:text-yellow-600 transition-colors">
        &larr; All products
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ImageGallery images={product.images || []} title={product.title} />

        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-yellow-600">
            {PRODUCT_TYPE_LABELS[product.productType] || product.productType}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-blue-950">{product.title}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-blue-950">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.features?.length > 0 && (
            <ul className="flex flex-col gap-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex gap-2 text-base leading-relaxed text-blue-800">
                  <span className="text-yellow-500 font-bold">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <BuyButton slug={product.slug} />
        </div>
      </div>

      {product.description?.length > 0 && (
        <div className="prose prose-blue mt-16 max-w-prose text-blue-800 leading-relaxed">
          <PortableText value={product.description} />
        </div>
      )}
    </div>
  )
}
