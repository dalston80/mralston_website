import { getProfile } from '../../sanity/lib/query'
import { getLiveProducts } from '../../sanity/lib/productQueries'
import { productsEnabled } from '../../components/products/utils'
import { PRODUCT_TYPE_LABELS, formatPrice } from '../../components/products/utils'

const BASE_URL = 'https://mralston.me'

export async function GET() {
  const profile = await getProfile()
  const person = profile?.[0]

  const lines = []
  lines.push(`# ${person?.fullName || 'Mr. Alston'}`)
  lines.push('')
  lines.push(`> ${person?.shortBio || 'Personal site and portfolio.'}`)
  lines.push('')
  lines.push('## About')
  lines.push('')
  lines.push(`- Name: ${person?.fullName}`)
  if (person?.location) lines.push(`- Location: ${person.location}`)
  if (person?.skills?.length) lines.push(`- Skills: ${person.skills.join(', ')}`)
  if (person?.email) lines.push(`- Contact: ${person.email}`)
  lines.push('')
  lines.push('## Pages')
  lines.push('')
  lines.push(`- [Home](${BASE_URL}/): Bio, work experience, current projects, FAQ, and contact info.`)

  if (productsEnabled) {
    const products = await getLiveProducts()
    if (products?.length > 0) {
      lines.push('')
      lines.push('## Digital Products')
      lines.push('')
      products.forEach((product) => {
        const type = PRODUCT_TYPE_LABELS[product.productType] || product.productType
        lines.push(`- [${product.title}](${BASE_URL}/products/${product.slug}): ${type}, ${formatPrice(product.price)}${product.tagline ? ` — ${product.tagline}` : ''}`)
      })
    }
  }

  if (person?.socialLinks) {
    const links = Object.entries(person.socialLinks).filter(([, url]) => url)
    if (links.length > 0) {
      lines.push('')
      lines.push('## Social')
      lines.push('')
      links.forEach(([name, url]) => lines.push(`- ${name}: ${url}`))
    }
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
