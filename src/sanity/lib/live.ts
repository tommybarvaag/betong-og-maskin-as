import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Viewer-role read token (server-only; also used as browserToken in draft mode). Enables
// draft/release READS only. `strict: true` (Cache Components): perspective/stega are required
// on every sanityFetch call, and includeDrafts is required on <SanityLive>.
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});
