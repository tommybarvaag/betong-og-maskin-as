import { describe, expect, it } from "vitest";
import {
  formatAddress,
  phoneHref,
  phoneDisplay,
  phoneDisplayShort,
  mailtoHref,
  emailAddress,
  socialLinks,
  orgNumber,
  managingDirector,
  companyName,
  type Info,
} from "./company";

// Build an Info with all fields null, overriding only what a case needs.
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

describe("formatAddress", () => {
  it("joins CMS address1 with the zip/city line", () => {
    const info = makeInfo({
      address1: "Storgata 1",
      zipCode: "5000",
      city: "Bergen",
    });
    expect(formatAddress(info)).toBe("Storgata 1, 5000 Bergen");
  });

  it("falls back to the locked design address when info is null", () => {
    expect(formatAddress(null)).toBe("Vågenesvegen 132, 5936 Manger");
  });
});

describe("phone helpers", () => {
  it("strips spaces from the CMS phone for the tel: href", () => {
    expect(phoneHref(makeInfo({ phone: "+47 928 29 343" }))).toBe(
      "tel:+4792829343",
    );
  });

  it("falls back to the locked number for display and href", () => {
    expect(phoneDisplay(null)).toBe("+47 928 29 343");
    expect(phoneHref(null)).toBe("tel:+4792829343");
  });

  it("drops the country code for the compact header display", () => {
    expect(phoneDisplayShort(null)).toBe("928 29 343");
  });
});

describe("mailtoHref", () => {
  it("uses the CMS email and url-encodes the default subject", () => {
    expect(mailtoHref(makeInfo({ email: "a@b.no" }))).toBe(
      "mailto:a@b.no?subject=Foresp%C3%B8rsel%20fra%20nettsiden",
    );
  });

  it("encodes a custom subject", () => {
    expect(mailtoHref(null, "Tilbud på gulv")).toBe(
      "mailto:joar@betongogmaskin.no?subject=Tilbud%20p%C3%A5%20gulv",
    );
  });
});

describe("socialLinks", () => {
  it("returns every CMS channel that has a url, in editor order", () => {
    const info = makeInfo({
      socialMedias: [
        { type: "Facebook", url: "https://facebook.com/x" },
        { type: "LinkedIn", url: "https://linkedin.com/x" },
      ],
    });
    expect(socialLinks(info)).toEqual([
      { type: "Facebook", url: "https://facebook.com/x" },
      { type: "LinkedIn", url: "https://linkedin.com/x" },
    ]);
  });

  it("surfaces a non-Facebook channel instead of forcing the Facebook fallback", () => {
    const info = makeInfo({
      socialMedias: [{ type: "LinkedIn", url: "https://linkedin.com/x" }],
    });
    expect(socialLinks(info)).toEqual([
      { type: "LinkedIn", url: "https://linkedin.com/x" },
    ]);
  });

  it("drops entries missing a url", () => {
    const info = makeInfo({
      socialMedias: [
        { type: "Facebook", url: "https://facebook.com/x" },
        { type: "Twitter", url: null },
      ],
    });
    expect(socialLinks(info)).toEqual([
      { type: "Facebook", url: "https://facebook.com/x" },
    ]);
  });

  it("falls back to the locked Facebook link when socialMedias is null or empty", () => {
    expect(socialLinks(null)).toEqual([
      { type: "Facebook", url: "https://www.facebook.com/betongogmaskin/" },
    ]);
    expect(socialLinks(makeInfo({ socialMedias: [] }))).toEqual([
      { type: "Facebook", url: "https://www.facebook.com/betongogmaskin/" },
    ]);
  });
});

describe("simple field accessors fall back to locked values", () => {
  it("companyName / orgNumber / managingDirector / emailAddress", () => {
    expect(companyName(null)).toBe("Betong & Maskin AS");
    expect(orgNumber(null)).toBe("916 947 577");
    expect(managingDirector(null)).toBe("Joar Morken");
    expect(emailAddress(null)).toBe("joar@betongogmaskin.no");
  });

  it("prefer CMS values when present", () => {
    expect(orgNumber(makeInfo({ orgNumber: "999 888 777" }))).toBe(
      "999 888 777",
    );
    expect(
      managingDirector(makeInfo({ managingDirector: "Kari Nordmann" })),
    ).toBe("Kari Nordmann");
  });
});
