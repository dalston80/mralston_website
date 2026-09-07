# Digital Products Storefront + Design Refresh — Design Spec

**Date:** 2026-09-07
**Status:** Approved (all sections reviewed in conversation)

## Goal

Grow mralston.me from a pure portfolio into a portfolio + digital storefront selling Shopify themes, WordPress themes, mobile app templates, n8n AI automations, and bundles — paid via Stripe Checkout, delivered via expiring Cloudflare R2 download links emailed with Resend. Simultaneously refresh the visual design (typography, spacing) while keeping the existing color scheme and layout.

## Architecture

```
Sanity Studio (source of truth for products)
    │ publish/edit                    ▲ sync script writes back stripeProductId/PriceId
    ▼                                 │
scripts/sync-products.mjs ──────────▶ Stripe API (catalog)
                                          │
Next.js site                              │
  /                    → Products section (featured products from Sanity)
  /products/[slug]     → detail page, Buy button
  POST /api/checkout   → creates Stripe Checkout Session ──▶ Stripe Checkout
  POST /api/webhooks/stripe ◀── checkout.session.completed
       → presigned R2 URLs (72h) → Resend email
  /products/success    → post-purchase landing (reads session server-side)
```

Buyer flow: homepage Products section → `/products/[slug]` → Buy → Stripe Checkout → success page → email with expiring download links.
Owner flow: author product in Studio → upload file(s) to R2 via script → `npm run sync:products` → live.

n8n automations are sold as downloadable workflow JSON + README/PDF through the same delivery path. Bundles are products with multiple files.

## Sanity Schema

New `product` document type (`sanity/schemaTypes/product.js`):

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `slug` | slug | drives `/products/[slug]` |
| `productType` | string (list) | `shopify-theme`, `wordpress-theme`, `app-template`, `n8n-automation`, `bundle` |
| `tagline` | string | short card blurb |
| `description` | blockContent | reuses existing blockContent type |
| `price` | number | USD; sync script converts to cents |
| `compareAtPrice` | number? | optional, for bundle savings display |
| `images` | image[] | with alt |
| `features` | string[] | bullets on detail page |
| `files` | object[] | `{label, r2Key}` per downloadable |
| `stripeProductId`, `stripePriceId` | string | written by sync script, read-only in Studio |
| `featured` | boolean | homepage ordering |
| `live` | boolean | gates site display and sync |

New `order` document type (`sessionId` unique, `email`, `product` ref, `amount`, `createdAt`) — webhook idempotency record + lightweight sales log.

Queries in `sanity/lib/productQueries.js`: `getFeaturedProducts`, `getProductBySlug`, `getAllProductSlugs`. Existing `profile` schema untouched.

## Launch Gating

No Stripe account exists yet and product offerings are still being finalized. The storefront ships **hidden**:

- A single env flag `NEXT_PUBLIC_PRODUCTS_ENABLED` (default unset/false) gates the homepage Products section and its nav item — the section renders nothing when off, so production is unchanged.
- `/products/[slug]` and `/products/success` are direct-link accessible in dev/staging regardless (for testing) but excluded from nav/sitemap while the flag is off.
- Local development uses Stripe **test mode** keys + Stripe CLI for webhooks; no live account required for any implementation task.
- Launch = create Stripe account, flip live keys, set `NEXT_PUBLIC_PRODUCTS_ENABLED=true`, run `npm run sync:products`, verify one real purchase.

## Pages & UX (App Router)

- `/` — new **Products section** between Experience and Projects (gated by `NEXT_PUBLIC_PRODUCTS_ENABLED`): responsive card grid (image, type badge, title, tagline, price, View link), featured first. New "Products" nav item (`#products`) in desktop + mobile menus, shown only when the flag is on.
- `/products/[slug]` — image gallery, title, type badge, price (+ compare-at strikethrough), feature bullets, blockContent description, sticky Buy button. Per-product metadata/OG. `generateStaticParams` + on-demand revalidation.
- `/products/success?session_id=...` — payment confirmation; reads the Stripe session server-side, shows purchased items, "check your email" guidance.
- `POST /api/checkout` — body `{slug}`; validates `live` product server-side; creates Checkout Session from `stripePriceId`; returns `{url}` for redirect. Never trusts client prices.
- `POST /api/webhooks/stripe` — raw body; signature verified.

Excluded (YAGNI): cart, accounts, search/filtering. Stripe Promotion Codes can add discounts later without code changes.

## Fulfillment Pipeline

Webhook on `checkout.session.completed`:
1. Verify `stripe-signature` (400 on failure).
2. Resolve Sanity product from session price metadata.
3. Generate presigned R2 GET URLs (AWS SDK v3 S3 client, R2 endpoint), 72-hour expiry.
4. Send Resend email (React Email template): product name, per-file download buttons, expiry notice, support contact.
5. Idempotency via `order` document write (skip if `sessionId` exists). Any failure → 500 so Stripe retries (~3 days).

Scripts (`scripts/`):
- `sync-products.mjs` — creates/updates Stripe Product + Price; new Price on price change (prices immutable); writes IDs back to Sanity.
- `upload-product-file.mjs <slug> <file> [label]` — uploads to `products/<slug>/<filename>` in R2, records key in Sanity doc.

Env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `RESEND_API_KEY`, `SANITY_API_WRITE_TOKEN`, `NEXT_PUBLIC_PRODUCTS_ENABLED`. All Stripe values use **test mode** until launch.

## Design Refresh

Keep: blue-950/yellow-500/grays palette, fixed left sidebar desktop layout, mobile header + drawer, single-page structure.

- **Typography:** `next/font/google` pairing — display serif or geometric sans for headings (Fraunces or Space Grotesk) + Inter body, registered as Tailwind `@theme` CSS vars. Fluid `clamp()` hero scale, `text-lg leading-relaxed` body, consistent h1–h3 hierarchy.
- **Spacing:** consistent `py-24 lg:py-32` section rhythm; `max-w-prose` body copy; airier sidebar and card gaps.
- **Components:** unified card treatment for Projects + Products (rounded-2xl, subtle border, soft hover shadow); shared button styles; subtler top-corner gradient replacing full-viewport `.body-background`.
- Vanilla CSS/Tailwind tokens only — no new UI dependencies. Fonts swappable in one file.

## Testing

- Unit tests for webhook handler (mocked signature/payload) — repo gains a minimal test runner (Vitest) for this.
- Stripe CLI (`stripe listen`, `stripe trigger checkout.session.completed`) for local end-to-end.
- One real test-mode purchase before launch.
- Existing verification bar: `npm run lint` + `npm run build` + manual smoke of `/`, `/studio`.

## Phase Split

- **Phase 1 (storefront, hidden behind flag):** schema → scripts → checkout/webhook → pages/emails → local e2e via Stripe CLI (test purchase with real keys deferred to launch — see Launch Gating).
- **Phase 2 (design refresh):** fonts/tokens → spacing rhythm → component polish.
Independent; Phase 2 can start anytime after Phase 1's homepage section exists (or in parallel on another branch).
