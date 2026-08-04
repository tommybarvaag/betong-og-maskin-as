# betong-og-maskin-as

Marketing site for a Norwegian concrete/machine contractor. Next.js 16.3 (App Router) + Sanity CMS, with the Studio embedded in the app.

## Prerequisites

- Node `>=24.0.0` (see `engines` in `package.json`; `.nvmrc` and CI use 24)
- pnpm `11.0.8` (see `packageManager` in `package.json`)

## Setup

```sh
pnpm install
cp .env.example .env.local
```

Fill `.env.local` using `.env.example` as the reference for the full variable list. `NEXT_PUBLIC_*` vars are browser-exposed (public); all other vars are server-only. The Sanity `projectId` is hardcoded (public) and not an env var.

## Develop

```sh
pnpm dev
```

## Verify (mirrors CI)

Run in this order — same as `.github/workflows/ci.yml`:

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm typegen   # regenerates schema.json + src/sanity/sanity.types.ts; commit any diff (CI fails on drift)
pnpm test
pnpm knip
pnpm build
```

## Studio

The Sanity Studio is embedded and served at `/studio`.

## Why this stack is unusual

This project deliberately runs a preview Next.js stack (Cache Components, Partial Prefetching). See [docs/adr/0001-preview-next-stack.md](docs/adr/0001-preview-next-stack.md) for the rationale and the documented workarounds — do not "clean up" those.
