import { describe, expect, it } from "vitest";
import { localBusinessJsonLd } from "./structured-data";
import type { Info } from "./company";

function makeInfo(overrides: Partial<NonNullable<Info>> = {}): Info {
  return {
    name: null,
    managingDirector: null,
    orgNumber: null,
    address1: null,
    address2: null,
    zipCode: null,
    city: null,
    country: null,
    email: null,
    phone: null,
    googleMapsLatitude: null,
    googleMapsLongitude: null,
    socialMedias: null,
    ...overrides,
  };
}

describe("localBusinessJsonLd", () => {
  it("emits a GeneralContractor with the locked postal address as fallback", () => {
    const ld = localBusinessJsonLd(null);

    expect(ld["@type"]).toBe("GeneralContractor");
    expect(ld["@id"]).toBe("https://www.betongogmaskin.no/#business");
    expect(ld.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Vågenesvegen 132",
      postalCode: "5936",
      addressLocality: "Manger",
      addressCountry: "NO",
    });
  });

  it("omits geo when the CMS has no coordinates", () => {
    expect(localBusinessJsonLd(null)).not.toHaveProperty("geo");
  });

  it("includes geo only when both coordinates are present", () => {
    const ld = localBusinessJsonLd(
      makeInfo({ googleMapsLatitude: 60.65, googleMapsLongitude: 5.04 }),
    );
    expect(ld).toHaveProperty("geo", {
      "@type": "GeoCoordinates",
      latitude: 60.65,
      longitude: 5.04,
    });
  });

  it("prefers CMS values over the locked fallbacks", () => {
    const ld = localBusinessJsonLd(
      makeInfo({ name: "Annet AS", city: "Bergen", zipCode: "5000" }),
    );
    expect(ld.name).toBe("Annet AS");
    expect(ld.address.addressLocality).toBe("Bergen");
    expect(ld.address.postalCode).toBe("5000");
  });
});
