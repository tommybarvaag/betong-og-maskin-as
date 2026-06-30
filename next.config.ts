import type { NextConfig } from "next";
// Verified from the installed package: next-sanity/live/cache-life exports `sanity`
// ({ revalidate: 31_536_000 }) and documents exactly `cacheLife: { default: sanity }`.
import { sanity } from "next-sanity/live/cache-life";

const nextConfig: NextConfig = {
  // Next 16.3 Instant Navigations — both ON by deliberate (bleeding-edge) choice.
  cacheComponents: true,
  partialPrefetching: true,
  // On-demand revalidation (revalidatePath via the Sanity webhook) is primary;
  // the `sanity` profile sets a 1-year (31_536_000s) fallback expiry.
  cacheLife: {
    default: sanity,
  },
  images: {
    // images.domains is deprecated in 16 — use remotePatterns.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Apex → www 301 so the canonical host (metadataBase/sitemap/robots all use www) is the only
  // indexable origin. Harmless if the host already redirects — the rule simply never matches.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "betongogmaskin.no" }],
        destination: "https://www.betongogmaskin.no/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    // Quiet bail-out logs from handlers that opt out of prerendering.
    hideLogsAfterAbort: true,
  },
};

export default nextConfig;
