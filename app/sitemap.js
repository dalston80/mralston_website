import { getAllProductSlugs } from '../sanity/lib/productQueries'
import { getProfile } from '../sanity/lib/query'
import { productsEnabled } from '../components/products/utils'

const BASE_URL = 'https://mralston.me'

export default async function sitemap() {
  const profile = await getProfile()
  const homeLastModified = profile?.[0]?._updatedAt ? new Date(profile[0]._updatedAt) : new Date()

  const routes = [
    {
      url: BASE_URL,
      lastModified: homeLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  if (productsEnabled) {
    const slugs = await getAllProductSlugs()
    slugs.forEach(({ slug, _updatedAt }) => {
      routes.push({
        url: `${BASE_URL}/products/${slug}`,
        lastModified: _updatedAt ? new Date(_updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  }

  return routes
}
