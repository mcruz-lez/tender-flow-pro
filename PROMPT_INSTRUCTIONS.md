# Prompt Instructions for All Contributors

- Always proceed professionally, without hallucinating, skipping, or introducing errors or problems.
- If you are unsure of any tool, use your own tools and be accurate. Verify each tool before use.
- Do not stop until the result is well perfected.
- Ensure not to have duplicate or conflicting files or issues.
- Make sure to follow all prompt instructions always, for all time, for this project and repository.
- Update this file with any new prompt instructions for future contributors.

## Additional Notes
- Use only recommended and safe cache cleaning in scripts (see `scripts/dev-clean.sh`).
- Ensure all Supabase, Sentry, Vercel, and CI/CD integrations are robust and error-free.
- All code and configuration must be professional, secure, and production-ready.
- If you add new scripts, tests, or integrations, document them here and in the main README.

# Prompt Instructions for tender-flow-pro

## Sentry Integration (React/Vite)
- Use `browserTracingIntegration` from `@sentry/browser` for tracing.
- Use `Replay` from `@sentry/replay` for session replay.
- Do NOT use `BrowserTracing` from `@sentry/tracing` (deprecated and causes type errors with recent SDKs).
- Example:

```typescript
import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/browser";
import { Replay } from "@sentry/replay";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [browserTracingIntegration(), new Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});
```

## Supabase Integration (Legacy/Test Fallback)
- If neither `.or` nor `.filter` is available on a Supabase query, fallback to returning all rows and log a warning. This ensures legacy/test environments do not break, but developers are notified.
- Example:

```typescript
if (typeof query.or === 'function') {
  query = query.or(...);
} else if (typeof query.filter === 'function') {
  query = query.filter(...);
} else {
  if (typeof console !== 'undefined') {
    console.warn('Supabase client does not support .or or .filter. Returning all rows without filtering.');
  }
  // No filtering applied
}
```

## Vitest Setup
- Do NOT use the `--setupFiles` CLI flag. Instead, configure setup files in `vitest.config.ts`:
  - `setupFiles: ["./jest.setup.js"]` under the `test` property.
- The `test` script in `package.json` should be simply `"vitest"`.

## General
- Always verify SDK and integration versions for breaking changes.
- Do not create duplicate or conflicting files.
- Follow all prompt instructions for every change.
