import { describe, expect, it } from "vitest";
import { contactClientSchema } from "./contact-schema";

const validInput = {
  name: "Ola Nordmann",
  email: "ola@example.no",
  text: "Hei, jeg ønsker et tilbud på betongarbeid.",
};

describe("contactClientSchema", () => {
  it("accepts valid input and trims the name", () => {
    const result = contactClientSchema.safeParse({
      ...validInput,
      name: "  Ola  ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe("Ola");
    }
  });

  it("rejects a name shorter than 2 chars", () => {
    const result = contactClientSchema.safeParse({ ...validInput, name: "O" });

    expect(result.success).toBe(false);
  });

  it("rejects a whitespace-only name (trims to empty, fails min)", () => {
    const result = contactClientSchema.safeParse({
      ...validInput,
      name: "   ",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a name over 120 chars", () => {
    const result = contactClientSchema.safeParse({
      ...validInput,
      name: "a".repeat(121),
    });

    expect(result.success).toBe(false);
  });

  it("rejects text shorter than 10 chars", () => {
    const result = contactClientSchema.safeParse({
      ...validInput,
      text: "kort",
    });

    expect(result.success).toBe(false);
  });

  it("rejects text over 5000 chars", () => {
    const result = contactClientSchema.safeParse({
      ...validInput,
      text: "a".repeat(5001),
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactClientSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a valid email", () => {
    const result = contactClientSchema.safeParse(validInput);

    expect(result.success).toBe(true);
  });

  it("rejects an email over 254 chars", () => {
    const longEmail = `${"a".repeat(250)}@b.no`;
    const result = contactClientSchema.safeParse({
      ...validInput,
      email: longEmail,
    });

    expect(result.success).toBe(false);
  });
});
