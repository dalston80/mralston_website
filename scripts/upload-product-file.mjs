import { readFile } from "node:fs/promises";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createClient } from "@sanity/client";

import { requireEnv } from "./lib/env.mjs";

const [productSlug, filePath, label] = process.argv.slice(2);

if (!productSlug || !filePath) {
  console.error("Usage: node scripts/upload-product-file.mjs <productSlug> <filePath> [label]");
  process.exit(1);
}

const env = requireEnv([
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "SANITY_API_WRITE_TOKEN",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
]);

const basename = path.basename(filePath);
const r2Key = `products/${productSlug}/${basename}`;
const fileLabel = label || basename;

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const product = await sanity.fetch(
  `*[_type == "product" && slug.current == $slug][0]{_id, title}`,
  { slug: productSlug }
);

if (!product) {
  console.error(`No product found with slug "${productSlug}".`);
  process.exit(1);
}

console.log(`Uploading ${basename} -> ${env.R2_BUCKET_NAME}/${r2Key}`);

await s3.send(
  new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: r2Key,
    Body: await readFile(filePath),
  })
);

await sanity
  .patch(product._id)
  .setIfMissing({ files: [] })
  .insert("after", "files[-1]", [{ label: fileLabel, r2Key }])
  .commit();

console.log(`Added { label: "${fileLabel}", r2Key: "${r2Key}" } to ${product.title}`);
