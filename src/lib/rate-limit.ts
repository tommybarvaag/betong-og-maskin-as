import { RateLimiter } from "@tanstack/pacer/rate-limiter";

// Per-IP rate limiting via TanStack Pacer's RateLimiter (sliding window). Pacer limits per
// instance, so we keep one limiter per key. Still in-memory/per-instance on serverless —
// swap the Map for Vercel KV / Upstash if true cross-instance durability is needed; Turnstile
// + Zod remain the primary gate. (The Map is unbounded but trivial for this low-traffic form.)
const limiters = new Map<string, RateLimiter<() => void>>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  let limiter = limiters.get(key);

  if (!limiter) {
    limiter = new RateLimiter(() => {}, {
      limit,
      window: windowMs,
      windowType: "sliding",
    });
    limiters.set(key, limiter);
  }

  return limiter.maybeExecute();
}
