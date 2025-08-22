// Ambient module declarations for optional Upstash packages used by the runtime rate limiter.
// These allow the codebase to type-check without installing the packages.

declare module '@upstash/ratelimit' {
  const mod: any;
  export = mod;
}

declare module '@upstash/redis' {
  const mod: any;
  export = mod;
}
