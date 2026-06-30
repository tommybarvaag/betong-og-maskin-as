import type { NextConfig } from "next";
// Verified from the installed package: next-sanity/live/cache-life exports `sanity`
// ({ revalidate: 31_536_000 }) and documents exactly `cacheLife: { default: sanity }`.
import { sanity } from "next-sanity/live/cache-life";

// Report-Only first: nothing is blocked. Validate against /, /kontakt (Turnstile) and
// /studio (Sanity SPA), record console violations, then switch to enforcing in a follow-up.
// 'unsafe-inline' covers the JSON-LD inline script + styled-components <style> (Studio);
// 'unsafe-eval' covers the Studio runtime. challenges.cloudflare.com = Turnstile widget+iframe.
// *.sanity.io / cdn.sanity.io = content API, images, draft-mode EventSource. next/font self-hosts.
const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.api.sanity.io https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
].join("; ");

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
        ],
      },
    ];
  },
  experimental: {
    // Quiet bail-out logs from handlers that opt out of prerendering.
    hideLogsAfterAbort: true,
  },
};

export default nextConfig;
