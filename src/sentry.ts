import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c04a03492ea838bbef0c6ed8d3d2fc46@o4509551144665088.ingest.us.sentry.io/4509551235629056",
  sendDefaultPii: true,
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 1.0, // 100% for testing
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});

// ...existing code...
