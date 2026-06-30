import type { LAYOUT_QUERY_RESULT } from "@/sanity/sanity.types";

export type Info = LAYOUT_QUERY_RESULT["info"];

// Design-locked contact values (HANDOFF "Key contact data — real, keep wired"). Used as
// fallbacks when the `companyInfo` singleton is empty so the public site always matches the
// signed-off prototype; real CMS values take precedence when present.
const FALLBACK = {
  name: "Betong & Maskin AS",
  managingDirector: "Joar Morken",
  orgNumber: "916 947 577", // registered org.nr (Brønnøysund Enhetsregisteret)
  phoneDisplay: "+47 928 29 343",
  phoneDigits: "+4792829343",
  email: "joar@betongogmaskin.no",
  address1: "Vågenesvegen 132",
  zipCode: "5936",
  city: "Manger",
  facebook: "https://www.facebook.com/betongogmaskin/",
  region: "Radøy, Alver kommune",
} as const;

const DEFAULT_MAIL_SUBJECT = "Forespørsel fra nettsiden";

export function companyName(info: Info): string {
  return info?.name ?? FALLBACK.name;
}

export function managingDirector(info: Info): string {
  return info?.managingDirector ?? FALLBACK.managingDirector;
}

export function orgNumber(info: Info): string {
  return info?.orgNumber ?? FALLBACK.orgNumber;
}

export function region(): string {
  return FALLBACK.region;
}

export function phoneDisplay(info: Info): string {
  return info?.phone ?? FALLBACK.phoneDisplay;
}

// Phone without the country code, for the compact header button ("928 29 343").
export function phoneDisplayShort(info: Info): string {
  return phoneDisplay(info).replace(/^\+47\s*/, "");
}

export function phoneHref(info: Info): string {
  const raw = info?.phone ?? FALLBACK.phoneDigits;

  return `tel:${raw.replace(/\s+/g, "")}`;
}

export function emailAddress(info: Info): string {
  return info?.email ?? FALLBACK.email;
}

export function mailtoHref(
  info: Info,
  subject: string = DEFAULT_MAIL_SUBJECT,
): string {
  return `mailto:${emailAddress(info)}?subject=${encodeURIComponent(subject)}`;
}

export function addressLine1(info: Info): string {
  return info?.address1 ?? FALLBACK.address1;
}

export function postalCode(info: Info): string {
  return info?.zipCode ?? FALLBACK.zipCode;
}

export function city(info: Info): string {
  return info?.city ?? FALLBACK.city;
}

export function addressLine2(info: Info): string {
  return [postalCode(info), city(info)].filter(Boolean).join(" ");
}

// Single-line postal address (Footer + Kontakt share it).
export function formatAddress(info: Info): string {
  return [addressLine1(info), addressLine2(info)].filter(Boolean).join(", ");
}

// Keyless Google Maps deep link, built from the postal address (no API key / embed).
export function mapsUrl(info: Info): string {
  const query = [addressLine1(info), addressLine2(info)]
    .filter(Boolean)
    .join(" ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// Channel kind comes straight from the generated schema enum so it can't drift from typegen.
export type SocialChannel = NonNullable<
  NonNullable<NonNullable<Info>["socialMedias"]>[number]["type"]
>;

export type SocialLink = { type: SocialChannel; url: string };

// All CMS social channels with a url, in editor order. Falls back to the locked Facebook link
// when the singleton has no usable entry, so the footer + JSON-LD always show at least Facebook.
export function socialLinks(info: Info): SocialLink[] {
  const fromCms = (info?.socialMedias ?? []).filter((s): s is SocialLink =>
    Boolean(s.type && s.url),
  );

  if (fromCms.length > 0) {
    return fromCms;
  }

  return [{ type: "Facebook", url: FALLBACK.facebook }];
}
