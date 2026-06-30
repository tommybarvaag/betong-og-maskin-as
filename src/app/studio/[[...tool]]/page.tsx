import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import { Studio } from "./Studio";

// Static metadata (next-sanity/studio's re-export is a runtime generateMetadata that
// Cache Components blocks at prerender). The Studio is an internal tool — don't index it.
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

// The Studio is a heavy client SPA, not an instant-navigable page — opt it out of
// Partial Prefetching's instant-navigation enforcement (allows the blocking dynamic route).
export const instant = false;

export default async function StudioPage() {
  // The Studio is a client-only SPA (no SEO, no prerender benefit). connection() opts the
  // route into dynamic rendering so Cache Components doesn't try to prerender its metadata.
  await connection();

  return <Studio />;
}
