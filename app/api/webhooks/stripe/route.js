import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getPresignedDownloadUrl } from "../../../../lib/r2";
import { getWriteClient } from "../../../../lib/sanityWrite";
import { getStripe } from "../../../../lib/stripe";
import { getProductByStripePriceId } from "../../../../sanity/lib/productQueries";

function buildEmailHtml(productTitle, files) {
  const buttons = files
    .map(
      (file) => `
      <p style="margin: 16px 0;">
        <a href="${file.url}"
           style="display: inline-block; padding: 12px 24px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Download ${file.label}
        </a>
      </p>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
    <h1 style="font-size: 22px;">Thanks for your purchase!</h1>
    <p>Your copy of <strong>${productTitle}</strong> is ready. Use the link${
      files.length === 1 ? "" : "s"
    } below to download your files:</p>
    ${buttons}
    <p style="color: #6b7280; font-size: 14px;">
      These download links expire in 72 hours, so grab your files soon.
    </p>
    <p style="color: #6b7280; font-size: 14px;">
      Questions or issues? Just reply to this email and I&rsquo;ll help you out.
    </p>
    <p>&mdash; Mr. Alston</p>
  </body>
</html>`;
}

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;

  try {
    const writeClient = getWriteClient();
    const existingOrder = await writeClient.fetch(
      `*[_type == "order" && sessionId == $id][0]`,
      { id: session.id }
    );
    if (existingOrder) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const lineItems = await getStripe().checkout.sessions.listLineItems(
      session.id
    );
    const stripePriceId = lineItems.data[0]?.price?.id;
    const product = stripePriceId
      ? await getProductByStripePriceId(stripePriceId)
      : null;
    if (!product) {
      throw new Error(`No product found for Stripe price ${stripePriceId}`);
    }

    const files = await Promise.all(
      (product.files ?? []).map(async (file) => ({
        label: file.label,
        url: await getPresignedDownloadUrl(file.r2Key),
      }))
    );

    const email = session.customer_details?.email;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Mr. Alston <orders@mralston.me>",
      to: email,
      subject: `Your download: ${product.title}`,
      html: buildEmailHtml(product.title, files),
    });

    await writeClient.create({
      _type: "order",
      sessionId: session.id,
      email,
      product: { _type: "reference", _ref: product._id },
      amount: session.amount_total,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      `Webhook processing failed for session ${session?.id}:`,
      error
    );
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
