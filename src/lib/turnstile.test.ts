import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

// `server-only` throws outside an RSC bundle; stub it for the node test env.
// (vitest hoists vi.mock above the import above.)
vi.mock("server-only", () => ({}));

describe("verifyTurnstile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns false when the secret is not configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("returns true when Cloudflare reports success", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ success: true }))),
    );
    expect(await verifyTurnstile("token")).toBe(true);
  });

  it("returns false when Cloudflare reports failure", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ success: false }))),
    );
    expect(await verifyTurnstile("token")).toBe(false);
  });
});
