import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const parseBody = vi.fn();
const revalidatePath = vi.fn();

vi.mock("next-sanity/webhook", () => ({
  parseBody: (...args: unknown[]) => parseBody(...args),
}));

vi.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => revalidatePath(...args),
}));

import { POST } from "./route";

function makeReq() {
  return new NextRequest("http://localhost/api/revalidate", {
    method: "POST",
    body: "{}",
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/revalidate", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("invalid signature false → 401, revalidatePath not called", async () => {
    parseBody.mockResolvedValueOnce({ isValidSignature: false });

    const res = await POST(makeReq());

    expect(res.status).toBe(401);
    expect(await res.text()).toContain("Invalid signature");
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("null signature → 401, revalidatePath not called", async () => {
    parseBody.mockResolvedValueOnce({ isValidSignature: null });

    const res = await POST(makeReq());

    expect(res.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("valid signature → 200, revalidates layout once", async () => {
    parseBody.mockResolvedValueOnce({ isValidSignature: true });

    const res = await POST(makeReq());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      revalidated: true,
      scope: "layout",
    });
    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
  });

  it("passes SANITY_REVALIDATE_SECRET and true to parseBody", async () => {
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "test-secret");
    parseBody.mockResolvedValueOnce({ isValidSignature: true });

    const req = makeReq();
    await POST(req);

    expect(parseBody).toHaveBeenCalledWith(req, "test-secret", true);
  });
});
