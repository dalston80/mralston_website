export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const PRODUCT_TYPE_LABELS = {
  'shopify-theme': 'Shopify Theme',
  'wordpress-theme': 'WordPress Theme',
  'app-template': 'App Template',
  'n8n-automation': 'n8n Automation',
  'bundle': 'Bundle',
}

export const productsEnabled = process.env.NEXT_PUBLIC_PRODUCTS_ENABLED === 'true'
