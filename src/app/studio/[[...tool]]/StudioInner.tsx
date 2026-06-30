"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Loaded ONLY on the client (via next/dynamic ssr:false in Studio.tsx). Importing the Sanity
// config here is safe because this module never evaluates on the server — sanity calls
// React.createContext at import time, which crashes under server-side config collection.
export default function StudioInner() {
  return <NextStudio config={config} />;
}
