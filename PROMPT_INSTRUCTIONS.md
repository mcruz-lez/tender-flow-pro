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

# Prompt Instructions for tender-flow-pro (TendProcure Web App)

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

## Vitest & Jest Setup
- Do NOT use the `--setupFiles` CLI flag. Instead, configure setup files in `vitest.config.ts`:
  - `setupFiles: ["./jest.setup.js"]` under the `test` property.
- The `test` script in `package.json` should be simply `"vitest"`.
- Always wrap React stateful component renders and async updates in `act(...)` in tests to avoid warnings and ensure correct behavior.
- Use robust matchers (e.g., `getAllByRole`, `getByRole`, `queryByText`) and avoid assumptions about single elements if the UI may render multiples.
- Only test routes that are actually defined and accessible for the current user role/context.

## General Best Practices
- Always verify SDK and integration versions for breaking changes.
- Do not create duplicate or conflicting files.
- Follow all prompt instructions for every change.
- Use dependency injection for testability in all new feature modules (see `MessagingPage` for example).
- Ensure all RBAC (role-based access control) logic is enforced in both UI and API layers.
- Document any new scripts, tests, or integrations in this file and the main README.
- Prioritize security, scalability, and user experience in all code and configuration.
- Use smart, strategic thinking: analyze root causes, avoid superficial fixes, and always verify with tests and CI.
- If you encounter React act warnings in tests, always wrap renders and async updates in `act(...)`.
- If you add new routes, update all relevant tests and manual QA checklists.
- If you add new environment variables, document them in the README and ensure `.env` is up to date.
- If you add new scripts, ensure they are safe, idempotent, and documented.

## Error, Warning, and Conflict Handling
- Detect the root cause: analyze logs, error messages, code context, and system states to identify underlying issues.
- Diagnose thoroughly: consider all possible factors — code logic, configuration, environment, dependencies, tools, concurrency.
- Propose a prioritized list of solutions:
  - Validate code, configuration, and data dependencies.
  - Verify tool choices, code correctness, and security implications.
  - Suggest optimal fix—immediately implement the best solution for a perfect outcome.
- Implement the recommended fix flawlessly: ensure completing change, testing thoroughly, and confirming resolution.
- Verify the fix: run automated checks, unit tests, integration tests, or relevant validation steps.
- Document the issue and fix clearly for accountability and future reference.

## Persistent and Complete Resolution
- Stay persistent: continue troubleshooting and refining until the problem, warning, or conflict is fully resolved.
- Do not accept partial fixes or patches that leave residual issues.
- Prioritize completeness and perfection in every solution: test thoroughly, review, and iterate if necessary, ensuring zero regressions.

## Strategic and Smart Thinking for Top Results
- Analyze deeply before acting: understand full context, dependencies, and impact.
- Leverage knowledge: apply best patterns, domain-specific best practices, and optimization techniques.
- Avoid trial-and-error loops: instead, formulate hypotheses, test confidently, and verify outcomes.
- Use latest safety, security, performance standards to guide fixes.
- Think ahead: anticipate future issues, scalability, and maintainability in every solution.

## Additional Best Practice Prompts
- Before making suggestions, verify assumptions and cross-check with standard best practices.
- Always prioritize security, scalability, and user experience in your recommendations.
- Provide detailed explanations: why a solution works, potential risks, and benefits.
- Recommend minimal, clean, idiomatic code snippets for fixes.
- Summarize findings, actions taken, and next steps for transparency and clarity.
- Encourage proactive improvements: refactoring, code quality, architecture, and process enhancements.

---

# TendProcure Web App: Contributor Quick Reference

- All code must be robust, secure, and production-ready.
- Always use dependency injection for testable modules.
- All tests must pass with zero warnings or errors in CI.
- All new features must be covered by both unit and integration tests.
- All RBAC and environment variable usage must be correct and documented.
- All scripts must be safe, idempotent, and documented.
- All documentation must be clear, up to date, and actionable.
- Never introduce duplicate, conflicting, or legacy files.
- Always update this file and the README with any new instructions, scripts, or integrations.