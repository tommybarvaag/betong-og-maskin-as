import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SITE_ROUTES } from "@/lib/site-routes";

// Decision B: a signed Sanity publish webhook revalidates the entire public surface (3 routes).
// This also IS the manual recovery endpoint (re-POST to force-refresh). Not revalidateTag(_type)
// — sanityFetch tags entries with opaque `sanity:<syncTag>`, which `_type` never matches.

export async function POST(req: NextRequest) {
  const { isValidSignature } = await parseBody(
    req,
    process.env.SANITY_REVALIDATE_SECRET,
    true,
  );

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  for (const path of SITE_ROUTES) revalidatePath(path);

  return NextResponse.json({ revalidated: SITE_ROUTES });
}
