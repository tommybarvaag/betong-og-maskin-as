import { NAV_LINKS } from "./site-nav";

// Single source of truth for the public route surface, derived from the nav. Both the sitemap
// and the Sanity publish webhook (api/revalidate) consume this, so a nav entry is automatically
// crawled and revalidated.
export const SITE_ROUTES: string[] = NAV_LINKS.map((link) => link.href);
