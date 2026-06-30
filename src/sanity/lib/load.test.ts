import { beforeEach, describe, expect, it, vi } from "vitest";

// `server-only` throws outside an RSC bundle; stub it for the node test env.
// (vitest hoists vi.mock above imports.)
vi.mock("server-only", () => ({}));

const SENTINEL = { sentinel: true };
const RESOLVED_PERSPECTIVE = "drafts";

const sanityFetch = vi.fn(async () => ({ data: SENTINEL }));
let draftEnabled = false;

vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: draftEnabled }),
  cookies: async () => ({ get: () => undefined, getAll: () => [] }),
}));
vi.mock("next-sanity/live", () => ({
  resolvePerspectiveFromCookies: () => RESOLVED_PERSPECTIVE,
}));
vi.mock("./live", () => ({ sanityFetch }));

describe("loadDoc branch decision", () => {
  beforeEach(() => {
    sanityFetch.mockClear();
  });

  it("anonymous traffic takes the cached published path", async () => {
    draftEnabled = false;
    const { loadHome } = await import("./load");
    const data = await loadHome();

    expect(data).toBe(SENTINEL);
    expect(sanityFetch).toHaveBeenCalledTimes(1);
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({ perspective: "published", stega: false }),
    );
  });

  it("draft mode takes the live path with the resolved perspective", async () => {
    draftEnabled = true;
    const { loadHome } = await import("./load");
    const data = await loadHome();

    expect(data).toBe(SENTINEL);
    expect(sanityFetch).toHaveBeenCalledTimes(1);
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        perspective: RESOLVED_PERSPECTIVE,
        stega: true,
      }),
    );
  });
});
