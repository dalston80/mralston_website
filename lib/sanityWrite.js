import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../sanity/env";

let writeClient;

export function getWriteClient() {
  if (!writeClient) {
    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      throw new Error("SANITY_API_WRITE_TOKEN is not set");
    }
    writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    });
  }
  return writeClient;
}
