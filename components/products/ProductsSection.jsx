import { getLiveProducts } from '../../sanity/lib/productQueries'
import ProductCard from './ProductCard'

export default async function ProductsSection() {
  const products = await getLiveProducts()

  if (!products?.length) return null

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl mb-4">
        Digital Products
      </h2>
      <p className="text-base leading-relaxed text-blue-800 mb-10 max-w-prose">
        Themes, templates, and automations I&apos;ve built and battle-tested. Instant download after purchase.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}
