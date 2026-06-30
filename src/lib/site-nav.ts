// Primary navigation — the single source for the header, the footer "Sider" column, and (via
// site-routes) the sitemap + publish-revalidate webhook. A route added here is automatically
// linked, crawled and revalidated.
export const NAV_LINKS = [
  { href: "/", label: "Forside" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
