import { describe, expect, it } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows up to the limit then blocks", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i++) expect(rateLimit(key, 5, 60_000)).toBe(true);
    expect(rateLimit(key, 5, 60_000)).toBe(false);
  });

  it("tracks keys independently", () => {
    expect(rateLimit("a", 1)).toBe(true);
    expect(rateLimit("a", 1)).toBe(false);
    expect(rateLimit("b", 1)).toBe(true);
  });
});
