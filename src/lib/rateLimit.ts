// Unified rate limit helper with optional Upstash Redis backend and in-memory fallback
// Usage: await rateLimit({ key, tokensPerWindow: 60, windowMs: 60_000 })

export interface RateLimitOptions {
  key: string;
  tokensPerWindow: number;
  windowMs: number; // milliseconds
}

export interface RateLimitResult {
  ok: boolean;
  remaining?: number;
  reset?: number; // unix ms when bucket resets (best-effort)
}

// In-memory token bucket (fallback). Not suitable for multi-instance deployments.
const memoryBuckets = new Map<string, { tokens: number; lastRefill: number }>();

function memoryRateLimit({ key, tokensPerWindow, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucket = memoryBuckets.get(key) ?? { tokens: tokensPerWindow, lastRefill: now };

  const elapsed = now - bucket.lastRefill;
  if (elapsed > 0) {
    const refillTokens = Math.floor((elapsed / windowMs) * tokensPerWindow);
    if (refillTokens > 0) {
      bucket.tokens = Math.min(tokensPerWindow, bucket.tokens + refillTokens);
      bucket.lastRefill = now;
    }
  }

  if (bucket.tokens <= 0) {
    memoryBuckets.set(key, bucket);
    return { ok: false, remaining: 0, reset: bucket.lastRefill + windowMs };
  }

  bucket.tokens -= 1;
  memoryBuckets.set(key, bucket);
  const remaining = Math.max(0, bucket.tokens);
  return { ok: true, remaining, reset: bucket.lastRefill + windowMs };
}

export async function rateLimit(opts: RateLimitOptions): Promise<RateLimitResult> {
  // Try Upstash Redis RateLimit if env vars and dependency are available
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const ratelimitMod: any = await import('@upstash/ratelimit');
      const redisMod: any = await import('@upstash/redis');
      const redis = new redisMod.Redis({ url, token });

      // Convert windowMs to seconds for ratelimit interval string
      const seconds = Math.max(1, Math.floor(opts.windowMs / 1000));
      const limiter = new ratelimitMod.Ratelimit({
        redis,
        limiter: ratelimitMod.Ratelimit.slidingWindow(opts.tokensPerWindow, `${seconds} s`),
        ephemeralCache: new Map(),
      });

      const result = await limiter.limit(opts.key);
      return {
        ok: result.success,
        remaining: result.remaining,
        reset: typeof result.reset === 'number' ? result.reset : Date.now() + opts.windowMs,
      };
    } catch (e) {
      // Dynamic import failed or packages not installed; fall back to memory
    }
  }

  // Fallback
  return memoryRateLimit(opts);
}
