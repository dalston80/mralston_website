import { createClient } from "@sanity/client";
import Stripe from "stripe";

import { requireEnv } from "./lib/env.mjs";

const env = requireEnv([
  "STRIPE_SECRET_KEY",
  "SANITY_API_WRITE_TOKEN",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
]);

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function syncProduct(product) {
  const targetAmount = Math.round(product.price * 100);
  let stripeProductId = product.stripeProductId;
  let stripePriceId = product.stripePriceId;
  let status = "unchanged";

  if (!stripeProductId) {
    const created = await stripe.products.create({
      name: product.title,
      description: product.tagline || undefined,
      metadata: { sanityId: product._id, slug: product.slug },
    });
    stripeProductId = created.id;
    status = "created";
    console.log(`  + created Stripe product ${stripeProductId}`);
  } else {
    const existing = await stripe.products.retrieve(stripeProductId);
    const description = product.tagline || "";
    if (existing.name !== product.title || (existing.description || "") !== description) {
      await stripe.products.update(stripeProductId, {
        name: product.title,
        description: product.tagline || undefined,
      });
      status = "updated";
      console.log(`  ~ updated Stripe product ${stripeProductId}`);
    } else {
      console.log(`  = Stripe product ${stripeProductId} up to date`);
    }
  }

  // Prices are immutable: create a new one and archive the old when the amount changes.
  const prices = await stripe.prices.list({
    product: stripeProductId,
    active: true,
    limit: 1,
  });
  const currentPrice = prices.data[0];

  if (currentPrice && currentPrice.unit_amount === targetAmount) {
    stripePriceId = currentPrice.id;
    console.log(`  = price ${stripePriceId} already at $${product.price}`);
  } else {
    const newPrice = await stripe.prices.create({
      product: stripeProductId,
      currency: "usd",
      unit_amount: targetAmount,
    });
    stripePriceId = newPrice.id;
    status = status === "unchanged" ? "updated" : status;
    console.log(`  + created price ${stripePriceId} at $${product.price}`);

    if (currentPrice) {
      await stripe.prices.update(currentPrice.id, { active: false });
      console.log(`  - archived old price ${currentPrice.id}`);
    }
  }

  if (stripeProductId !== product.stripeProductId || stripePriceId !== product.stripePriceId) {
    await sanity
      .patch(product._id)
      .set({ stripeProductId, stripePriceId })
      .commit();
    console.log(`  > wrote stripeProductId/stripePriceId back to Sanity`);
  }

  return status;
}

const products = await sanity.fetch(
  `*[_type == "product" && live == true]{_id, title, "slug": slug.current, tagline, price, stripeProductId, stripePriceId}`
);

console.log(`Syncing ${products.length} live product(s) to Stripe...`);

let created = 0;
let updated = 0;
let unchanged = 0;
let failed = 0;

for (const product of products) {
  console.log(`\n${product.title} (${product.slug})`);
  try {
    const status = await syncProduct(product);
    if (status === "created") created += 1;
    else if (status === "updated") updated += 1;
    else unchanged += 1;
  } catch (error) {
    failed += 1;
    console.error(`  ! failed: ${error.message}`);
  }
}

console.log(
  `\nDone. ${created} new, ${updated} updated, ${unchanged} up to date, ${failed} failed.`
);
