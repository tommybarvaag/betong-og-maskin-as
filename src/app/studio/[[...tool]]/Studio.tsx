"use client";
import dynamic from "next/dynamic";

// ssr:false keeps the Studio (and its server-incompatible sanity.config import) entirely
// client-side — required under cacheComponents, where `export const dynamic='force-static'`
// throws and a plain server import of the config crashes config collection.
export const Studio = dynamic(() => import("./StudioInner"), { ssr: false });
