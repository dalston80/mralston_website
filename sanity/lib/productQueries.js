import { groq } from "next-sanity";
import { client } from "./client";

const productFields = groq`
  _id,
  title,
  "slug": slug.current,
  productType,
  tagline,
  description,
  price,
  compareAtPrice,
  "images": images[]{alt, "url": asset->url},
  features,
  files,
  stripePriceId,
  featured,
  live
`;

export async function getLiveProducts() {
  return client.fetch(
    groq`*[_type == "product" && live == true] | order(featured desc, _createdAt desc){${productFields}}`
  );
}

export async function getProductBySlug(slug) {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{${productFields}}`,
    { slug }
  );
}

export async function getAllProductSlugs() {
  return client.fetch(
    groq`*[_type == "product" && live == true && defined(slug.current)]{"slug": slug.current, _updatedAt}`
  );
}

export async function getProductByStripePriceId(stripePriceId) {
  return client.fetch(
    groq`*[_type == "product" && stripePriceId == $stripePriceId][0]{${productFields}}`,
    { stripePriceId }
  );
}
