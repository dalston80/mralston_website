import { beforeEach, describe, expect, it, vi } from "vitest";

const sessionsCreate = vi.fn();

vi.mock("../../../lib/stripe", () => ({
  getStripe: () => ({
    checkout: { sessions: { create: sessionsCreate } },
  }),
}));

const getProductBySlug = vi.fn();

vi.mock("../../../sanity/lib/productQueries", () => ({
  getProductBySlug,
}));

const { POST } = await import("./route");

function makeRequest(body) {
  return new Request("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = "sk_test";
    sessionsCreate.mockResolvedValue({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });
  });

  it("returns 400 on invalid JSON", async () => {
    const res = await POST(makeRequest("not-json{{{"));

    expect(res.status).toBe(400);
    expect(sessionsCreate).not.toHaveBeenCalled();
  });

  it("returns 404 when product is not found", async () => {
    getProductBySlug.mockResolvedValue(null);

    const res = await POST(makeRequest(JSON.stringify({ slug: "nope" })));

    expect(res.status).toBe(404);
    expect(sessionsCreate).not.toHaveBeenCalled();
  });

  it("returns 404 when product is not live", async () => {
    getProductBySlug.mockResolvedValue({
      slug: "draft",
      live: false,
      stripePriceId: "price_123",
    });

    const res = await POST(makeRequest(JSON.stringify({ slug: "draft" })));

    expect(res.status).toBe(404);
    expect(sessionsCreate).not.toHaveBeenCalled();
  });

  it("returns 409 when product has no stripePriceId", async () => {
    getProductBySlug.mockResolvedValue({ slug: "unsynced", live: true });

    const res = await POST(makeRequest(JSON.stringify({ slug: "unsynced" })));

    expect(res.status).toBe(409);
    expect(sessionsCreate).not.toHaveBeenCalled();
  });

  it("returns the checkout session url on success", async () => {
    getProductBySlug.mockResolvedValue({
      slug: "cool-theme",
      live: true,
      stripePriceId: "price_123",
    });

    const res = await POST(makeRequest(JSON.stringify({ slug: "cool-theme" })));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });

    expect(sessionsCreate).toHaveBeenCalledWith({
      mode: "payment",
      line_items: [{ price: "price_123", quantity: 1 }],
      success_url:
        "http://localhost:3000/products/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/products/cool-theme",
      metadata: { sanitySlug: "cool-theme" },
    });
  });
});
