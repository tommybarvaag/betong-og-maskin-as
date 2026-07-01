import "server-only";
import { draftMode, cookies } from "next/headers";
import {
  resolvePerspectiveFromCookies,
  type LivePerspective,
} from "next-sanity/live";
import { sanityFetch } from "./live";
import {
  LAYOUT_QUERY,
  HOME_QUERY,
  TJENESTER_QUERY,
  OM_QUERY,
  KONTAKT_QUERY,
  SITEMAP_QUERY,
} from "./queries";

// Resolve the per-request perspective OUTSIDE any 'use cache' boundary — cookies()/draftMode()
// can't be read inside one. Anonymous traffic → "published" (the prerenderable path).
async function requestPerspective(): Promise<LivePerspective> {
  const { isEnabled } = await draftMode();

  if (!isEnabled) return "published";

  return resolvePerspectiveFromCookies({ cookies: await cookies() });
}

// Draft-aware loader. Perspective is resolved OUTSIDE the cache boundary (draftMode()/cookies()
// are illegal inside 'use cache') then passed in as a cache-key arg. Published path is cached;
// draft mode bypasses 'use cache' (re-runs every request, stores nothing), so there the arg only
// keeps sanityFetch's cacheTag()/cacheLife() inside a valid scope (they throw outside one under
// cacheComponents). <SanityLive> revalidates published cache tags and refreshes draft on edits.
async function loadDoc<const Q extends string>(query: Q) {
  const perspective = await requestPerspective();

  return cachedDoc(query, perspective, perspective !== "published");
}

async function cachedDoc<const Q extends string>(
  query: Q,
  perspective: LivePerspective = "published",
  stega = false,
) {
  "use cache";
  const { data } = await sanityFetch({ query, perspective, stega });

  return data;
}

export const loadLayout = () => loadDoc(LAYOUT_QUERY);
export const loadHome = () => loadDoc(HOME_QUERY);
export const loadTjenester = () => loadDoc(TJENESTER_QUERY);
export const loadOmOss = () => loadDoc(OM_QUERY);
export const loadKontakt = () => loadDoc(KONTAKT_QUERY);

// Sitemap reads are always from the published perspective — no draft awareness needed.
export const loadSitemapMeta = () => cachedDoc(SITEMAP_QUERY);
