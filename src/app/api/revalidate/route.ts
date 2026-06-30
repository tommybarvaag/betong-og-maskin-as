import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Decision B: a signed Sanity publish webhook revalidates the entire public surface.
// `revalidatePath("/", "layout")` is Next's canonical "invalidate all cached data" call — it
// covers the (website) layout (companyInfo in Header/Footer/JSON-LD), every page, and the
// sitemap route handler in one shot. This also IS the manual recovery endpoint (re-POST to
// force-refresh). Not revalidateTag(_type) — sanityFetch tags entries with opaque
// `sanity:<syncTag>`, which `_type` never matches.

export async function POST(req: NextRequest) {
  const { isValidSignature } = await parseBody(
    req,
    process.env.SANITY_REVALIDATE_SECRET,
    true,
  );

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, scope: "layout" });
}
