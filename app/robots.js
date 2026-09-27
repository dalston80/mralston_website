import { productsEnabled } from '../components/products/utils'

// Explicitly named so AI/answer-engine crawlers are intentionally welcomed,
// not just allowed by accident via the wildcard rule below. Add or remove
// user agents here as your preferences change.
const AI_CRAWLER_USER_AGENTS = [
  'GPTBot',           // OpenAI (ChatGPT browsing/search)
  'ChatGPT-User',     // OpenAI (user-invoked browsing)
  'OAI-SearchBot',    // OpenAI (ChatGPT search index)
  'PerplexityBot',    // Perplexity
  'Perplexity-User',  // Perplexity (user-invoked browsing)
  'ClaudeBot',        // Anthropic (Claude)
  'Claude-User',      // Anthropic (user-invoked browsing)
  'anthropic-ai',     // Anthropic
  'Google-Extended',  // Google (Gemini / AI Overviews training)
  'Applebot-Extended', // Apple Intelligence
  'Bingbot',          // Microsoft Bing / Copilot
  'CCBot',            // Common Crawl (used by many LLM training sets)
]

export default function robots() {
  const disallow = ['/studio/']
  if (!productsEnabled) {
    disallow.push('/products/')
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: 'https://mralston.me/sitemap.xml',
  }
}
