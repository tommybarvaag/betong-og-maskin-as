import {
  addressLine1,
  city,
  companyName,
  emailAddress,
  phoneDisplay,
  postalCode,
  socialLinks,
  type Info,
} from "./company";
import { SITE_URL } from "./site";

const BASE = SITE_URL;

// JSON-LD for the company. `GeneralContractor` (a LocalBusiness subtype) is the right entity for
// a betong/maskin/graving contractor — it lets Google reconcile the site with the Google Business
// Profile via address + geo. geo is only emitted when the CMS actually holds coordinates, so we
// never publish a fake (0,0) point.
export function localBusinessJsonLd(info: Info) {
  const lat = info?.googleMapsLatitude;
  const lng = info?.googleMapsLongitude;
  const hasGeo = typeof lat === "number" && typeof lng === "number";

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${BASE}/#business`,
    name: companyName(info),
    url: BASE,
    logo: `${BASE}/logo.png`,
    image: `${BASE}/logo.png`,
    email: emailAddress(info),
    telephone: phoneDisplay(info),
    address: {
      "@type": "PostalAddress",
      streetAddress: addressLine1(info),
      postalCode: postalCode(info),
      addressLocality: city(info),
      addressCountry: "NO",
    },
    areaServed: ["Radøy", "Alver", "Nordhordland"],
    sameAs: socialLinks(info).map((s) => s.url),
    ...(hasGeo
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
  };
}

// Safe for embedding in a <script type="application/ld+json"> — JSON.stringify alone leaves
// </script> and U+2028/U+2029 able to break out of the tag. The \u escapes stay valid JSON, so
// parsers read the value identically.
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
