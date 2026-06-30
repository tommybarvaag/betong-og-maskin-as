import type { MetadataRoute } from "next";
import { SITE_ROUTES } from "@/lib/site-routes";
import { loadSitemapMeta } from "@/sanity/lib/load";

const BASE = "https://www.betongogmaskin.no";

// Latest of a set of ISO-8601 timestamps (lexicographic compare is valid for ISO-8601).
function latest(...dates: (string | null)[]): string | undefined {
  const valid = dates.filter((d): d is string => Boolean(d)).sort();

  return valid.length ? valid[valid.length - 1] : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const meta = await loadSitemapMeta();

  // Home + tjenester also reflect the latest serviceCategory edit (services render on both).
  const lastModified: Record<string, string | undefined> = {
    "/": latest(meta.home, meta.servicesUpdatedAt),
    "/tjenester": latest(meta.tjenester, meta.servicesUpdatedAt),
    "/om-oss": latest(meta.omOss),
    "/kontakt": latest(meta.kontakt),
  };

  return SITE_ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: lastModified[route],
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
