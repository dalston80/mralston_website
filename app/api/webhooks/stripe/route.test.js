import { beforeEach, describe, expect, it, vi } from "vitest";

const constructEvent = vi.fn();
const listLineItems = vi.fn();

vi.mock("../../../../lib/stripe", () => ({
  getStripe: () => ({
    webhooks: { constructEvent },
    checkout: { sessions: { listLineItems } },
  }),
}));

const writeFetch = vi.fn();
const writeCreate = vi.fn();

vi.mock("../../../../lib/sanityWrite", () => ({
  getWriteClient: () => ({ fetch: writeFetch, create: writeCreate }),
}));

const getPresignedDownloadUrl = vi.fn();

vi.mock("../../../../lib/r2", () => ({
  getPresignedDownloadUrl,
}));

const getProductByStripePriceId = vi.fn();

vi.mock("../../../../sanity/lib/productQueries", () => ({
  getProductByStripePriceId,
}));

const emailsSend = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    constructor() {
      this.emails = { send: emailsSend };
    }
  },
}));

const { POST } = await import("./route");

function makeRequest(body = "raw-body") {
  return new Request("http://localhost/api/webhooks/stripe", {
    method: "POST",
    headers: { "stripe-signature": "sig" },
    body,
  });
}

const session = {
  id: "cs_test_123",
  amount_total: 4999,
  customer_details: { email: "buyer@example.com" },
};

const product = {
  _id: "product-1",
  title: "Cool Theme",
  files: [
    { label: "Theme ZIP", r2Key: "products/cool-theme/theme.zip" },
    { label: "Docs", r2Key: "products/cool-theme/docs.pdf" },
  ],
};

describe("POST /api/webhooks/stripe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    process.env.RESEND_API_KEY = "re_test";
    listLineItems.mockResolvedValue({
      data: [{ price: { id: "price_123" } }],
    });
    getProductByStripePriceId.mockResolvedValue(product);
    getPresignedDownloadUrl.mockImplementation(
      async (key) => `https://r2.example.com/signed/${key}`
    );
    writeFetch.mockResolvedValue(null);
    writeCreate.mockResolvedValue({ _id: "order-1" });
    emailsSend.mockResolvedValue({ id: "email-1" });
  });

  it("returns 400 on bad signature", async () => {
    constructEvent.mockImplementation(() => {
      throw new Error("bad sig");
    });

    const res = await POST(makeRequest());

    expect(res.status).toBe(400);
    expect(emailsSend).not.toHaveBeenCalled();
    expect(writeCreate).not.toHaveBeenCalled();
  });

  it("returns 200 and ignores non-checkout events", async () => {
    constructEvent.mockReturnValue({
      type: "payment_intent.succeeded",
      data: { object: {} },
    });

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    expect(emailsSend).not.toHaveBeenCalled();
    expect(writeCreate).not.toHaveBeenCalled();
  });

  it("happy path: sends email with file links, creates order, returns 200", async () => {
    constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: session },
    });

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });

    expect(listLineItems).toHaveBeenCalledWith("cs_test_123");
    expect(getProductByStripePriceId).toHaveBeenCalledWith("price_123");
    expect(getPresignedDownloadUrl).toHaveBeenCalledWith(
      "products/cool-theme/theme.zip"
    );
    expect(getPresignedDownloadUrl).toHaveBeenCalledWith(
      "products/cool-theme/docs.pdf"
    );

    expect(emailsSend).toHaveBeenCalledTimes(1);
    const email = emailsSend.mock.calls[0][0];
    expect(email.from).toBe("Mr. Alston <orders@mralston.me>");
    expect(email.to).toBe("buyer@example.com");
    expect(email.html).toContain(
      "https://r2.example.com/signed/products/cool-theme/theme.zip"
    );
    expect(email.html).toContain(
      "https://r2.example.com/signed/products/cool-theme/docs.pdf"
    );
    expect(email.html).toContain("Cool Theme");
    expect(email.html).toContain("72 hours");

    expect(writeCreate).toHaveBeenCalledTimes(1);
    const order = writeCreate.mock.calls[0][0];
    expect(order._type).toBe("order");
    expect(order.sessionId).toBe("cs_test_123");
    expect(order.email).toBe("buyer@example.com");
    expect(order.product).toEqual({
      _type: "reference",
      _ref: "product-1",
    });
    expect(order.amount).toBe(4999);
    expect(typeof order.createdAt).toBe("string");
  });

  it("returns 200 without resending when order already exists", async () => {
    constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: session },
    });
    writeFetch.mockResolvedValue({ _id: "existing-order" });

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true, duplicate: true });
    expect(emailsSend).not.toHaveBeenCalled();
    expect(writeCreate).not.toHaveBeenCalled();
  });
});
