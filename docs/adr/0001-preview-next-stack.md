# ADR 0001: Next.js preview stack with Cache Components on a 3-page marketing site

## Status

Accepted

## Context

This is a greenfield rebuild of an old Next.js 9 + Sanity v1 site. The owner
deliberately chose a bleeding-edge stack and tests it extensively rather than
waiting for a GA release.

The goals are:

- **Instant navigation** across the small set of marketing pages, via Next's
  Partial Prefetching.
- **ISR-with-Sanity freshness**: pages render from cache but reflect Sanity
  edits, achieved with Cache Components (`'use cache'`) plus on-demand
  revalidation through `next-sanity`.
- **Embedded Sanity Studio** served from the same app at `/studio`.

## Decision

- Pin `next@16.3.0-preview.5` (see `package.json`).
- Enable Cache Components and Partial Prefetching in `next.config.ts`
  (`cacheComponents: true`, `partialPrefetching: true`), with
  `cacheLife.default` set to `next-sanity`'s `sanity` profile so cached data
  does not time-expire and instead relies on `sanityFetch` on-demand
  revalidation.
- Accept the adaptations these preview features require (listed below).

## Consequences

These are the **intentional workarounds** the preview stack demands. They are
deliberate, not accidental — future maintainers should not "clean them up"
without understanding why they exist.

- **Client-only Studio.** `src/app/studio/[[...tool]]/Studio.tsx` loads the
  Studio via `dynamic(() => import("./StudioInner"), { ssr: false })`, the
  route handler in `src/app/studio/[[...tool]]/page.tsx` calls `connection()`
  to force dynamic rendering, and exports `instant = false` to opt the heavy
  client SPA out of Partial Prefetching's instant-navigation enforcement.
  Metadata is declared statically because `next-sanity/studio`'s runtime
  `generateMetadata` is blocked at prerender under Cache Components.

- **Draft/cache choreography in `src/sanity/lib/load.ts`.** `cookies()` cannot
  be read inside a `'use cache'` boundary, so the per-request perspective is
  resolved outside it via `resolvePerspectiveFromCookies`. Authenticated draft
  traffic takes an uncached `sanityFetch` path; anonymous traffic falls through
  to a `'use cache'` published path (`cachedLayout` / `cachedPage`).

- **`'use cache'` boundary in `Footer`.** `src/components/Footer.tsx` isolates
  `new Date().getFullYear()` inside a `CopyrightYear` component marked
  `'use cache'`, because a bare `new Date()` is an "unstable value" that aborts
  the prerender under Cache Components.

- **State resets** tied to the form and menu components are coupled to the new
  caching model and must be preserved when those components change.

## Revisit

When Cache Components and Partial Prefetching reach a Next.js GA release,
re-evaluate:

- removing the `next@16.3.0-preview.5` pin, and
- whether any of the adaptations above are still necessary or can be simplified.
