import type { ReactNode } from "react";

// Passthrough — keeps the Studio out of the (website) chrome + SanityLive tree.
export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
