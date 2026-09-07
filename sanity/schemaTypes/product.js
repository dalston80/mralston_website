import { defineField, defineType } from "sanity";
import { BiPurchaseTag } from "react-icons/bi";

const PRODUCT_TYPES = [
  { title: "Shopify Theme", value: "shopify-theme" },
  { title: "WordPress Theme", value: "wordpress-theme" },
  { title: "App Template", value: "app-template" },
  { title: "n8n Automation", value: "n8n-automation" },
  { title: "Bundle", value: "bundle" },
];

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: BiPurchaseTag,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: { list: PRODUCT_TYPES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short blurb shown on product cards.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "In dollars, e.g. 49.99. Synced to Stripe as cents.",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare-at Price (USD)",
      type: "number",
      description: "Optional. Shown struck-through, e.g. for bundle savings.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      description: "Bullet list shown on the detail page.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "files",
      title: "Downloadable Files",
      type: "array",
      description: "Keys of files in R2 (products/<slug>/<filename>). Bundles have several.",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "r2Key", title: "R2 Key", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "stripeProductId",
      title: "Stripe Product ID",
      type: "string",
      readOnly: true,
      description: "Written by npm run sync:products.",
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      readOnly: true,
      description: "Written by npm run sync:products.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Featured products sort first in the homepage section.",
    }),
    defineField({
      name: "live",
      title: "Live",
      type: "boolean",
      initialValue: false,
      description: "Only live products appear on the site and sync to Stripe.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "productType", media: "images.0" },
  },
});
