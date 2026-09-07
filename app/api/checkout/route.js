import { NextResponse } from "next/server";

import { getStripe } from "../../../lib/stripe";
import { getProductBySlug } from "../../../sanity/lib/productQueries";

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const slug = body?.slug;
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const product = await getProductBySlug(slug);
    if (!product || product.live !== true) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (!product.stripePriceId) {
      return NextResponse.json(
        { error: "Product is not synced to Stripe yet" },
        { status: 409 }
      );
    }

    const origin = new URL(req.url).origin;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      success_url: `${origin}/products/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${slug}`,
      metadata: { sanitySlug: slug },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
