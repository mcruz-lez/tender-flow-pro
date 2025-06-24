import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/browser";
import { Replay } from "@sentry/replay";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [browserTracingIntegration(), new Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});

// ...existing code...
