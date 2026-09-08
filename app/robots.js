import { productsEnabled } from '../components/products/utils'

export default function robots() {
  const disallow = ['/studio/']
  if (!productsEnabled) {
    disallow.push('/products/')
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow,
    },
    sitemap: 'https://mralston.me/sitemap.xml',
  }
}
