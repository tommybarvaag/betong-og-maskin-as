import {
  addressLine1,
  city,
  companyName,
  emailAddress,
  facebookUrl,
  phoneDisplay,
  postalCode,
  type Info,
} from "./company";

const BASE = "https://www.betongogmaskin.no";

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
    sameAs: [facebookUrl(info)],
    ...(hasGeo
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
  };
}
