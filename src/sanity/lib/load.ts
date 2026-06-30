import "server-only";
import { draftMode, cookies } from "next/headers";
import { resolvePerspectiveFromCookies } from "next-sanity/live";
import { sanityFetch } from "./live";
import {
  LAYOUT_QUERY,
  HOME_QUERY,
  TJENESTER_QUERY,
  OM_QUERY,
  KONTAKT_QUERY,
  SITEMAP_QUERY,
} from "./queries";

// Resolve the per-request perspective OUTSIDE any 'use cache' boundary (cookies() can't be read
// inside one). Returns null for anonymous traffic (→ the cached published path).
async function draftPerspective() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) return null;

  return resolvePerspectiveFromCookies({ cookies: await cookies() });
}

// Draft-aware loader: stega-tagged live data in draft mode, else the cached published path. The
// branded query string flows through the generic so next-sanity keeps inferring the result type.
async function loadDoc<const Q extends string>(query: Q) {
  const perspective = await draftPerspective();

  if (perspective) {
    const { data } = await sanityFetch({ query, perspective, stega: true });
    return data;
  }

  return cachedDoc(query);
}

async function cachedDoc<const Q extends string>(query: Q) {
  "use cache";
  const { data } = await sanityFetch({
    query,
    perspective: "published",
    stega: false,
  });

  return data;
}

export const loadLayout = () => loadDoc(LAYOUT_QUERY);
export const loadHome = () => loadDoc(HOME_QUERY);
export const loadTjenester = () => loadDoc(TJENESTER_QUERY);
export const loadOmOss = () => loadDoc(OM_QUERY);
export const loadKontakt = () => loadDoc(KONTAKT_QUERY);

// Sitemap reads are always from the published perspective — no draft awareness needed.
export const loadSitemapMeta = () => cachedDoc(SITEMAP_QUERY);
