import { getAllProductSlugs } from '../sanity/lib/productQueries'
import { productsEnabled } from '../components/products/utils'

const BASE_URL = 'https://mralston.me'

export default async function sitemap() {
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  if (productsEnabled) {
    const slugs = await getAllProductSlugs()
    slugs.forEach(({ slug }) => {
      routes.push({
        url: `${BASE_URL}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  }

  return routes
}
