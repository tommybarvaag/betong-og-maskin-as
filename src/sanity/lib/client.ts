import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // freshness comes from revalidatePath (decision B), not time-based CDN
  stega: { studioUrl: "/studio" }, // v13: stega config lives on the client
});
