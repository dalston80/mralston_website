import { defineField, defineType } from "sanity";
import { BiReceipt } from "react-icons/bi";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BiReceipt,
  fields: [
    defineField({
      name: "sessionId",
      title: "Stripe Session ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "amount",
      title: "Amount (cents)",
      type: "number",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
  ],
});
