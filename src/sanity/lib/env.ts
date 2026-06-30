// Single source of truth for Sanity connection constants, importable from both the
// frontend client and sanity.config.ts / sanity.cli.ts.
export const projectId = "t6pwhwps"; // public, never changes
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-02-01"; // date-pinned; required by the Live Content API
