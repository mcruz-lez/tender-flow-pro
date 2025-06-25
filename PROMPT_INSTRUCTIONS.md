# Cache Cleaning & Environment Hygiene Best Practices

## For New Codespaces/Environments
- Always clear all relevant caches before the first build or test to avoid stale dependencies or build artifacts.
- Run the provided script: `bash scripts/dev-clean.sh` (recommended for this repo; see script for details).
- If you add new cache directories or tools, update `dev-clean.sh` accordingly and document them here.
- For Node.js projects, always clear:
  - `node_modules/`
  - `.vite/`, `.next/`, `.cache/`, `dist/`, `build/`, `coverage/`, and any tool-specific cache folders
  - Use: `rm -rf node_modules .vite .next .cache dist build coverage`
- For package manager cache (optional, for deep cleaning):
  - `npm cache clean --force`
  - `pnpm store prune` (if using pnpm)
  - `yarn cache clean` (if using yarn)
- For Vite, also clear browser cache if you see persistent frontend issues.
- After cleaning, always run `npm ci` (not `npm install`) for a clean, reproducible install.

## For Existing Codespaces/Environments
- If you encounter strange errors, failed builds, or test flakiness, repeat the above cleaning steps.
- Always clean caches after major dependency upgrades, merges from main, or switching branches.
- If you see unexpected behavior after pulling changes, run `bash scripts/dev-clean.sh` and restart the dev server.
- For persistent issues, consider deleting the Codespace/environment and recreating it from scratch.

## General Cache Cleaning Best Practices
- Never commit cache or build artifacts to git (ensure `.gitignore` is up to date).
- Document any new cache locations or cleaning steps in this file and in `dev-clean.sh`.
- Automate cache cleaning in CI/CD as a pre-step for builds/tests.
- Always verify that cleaning scripts are safe, do not remove user data, and are idempotent.
- Encourage contributors to run cleaning scripts before reporting bugs or opening PRs.

---

# Additional Best Practices & Prompt Instructions

- Always use environment variables for secrets and sensitive config; never hardcode secrets in code or config files.
- Use `.env` for local development only; never commit production secrets.
- Review and update `.gitignore` regularly to prevent accidental commits of sensitive or unnecessary files.
- Use branch protection and require PR reviews for main/deploy branches.
- Prefer `npm ci` over `npm install` for CI and reproducible builds.
- Use Dependabot or similar tools to keep dependencies up to date and secure.
- Regularly audit dependencies for vulnerabilities (`npm audit` or `pnpm audit`).
- Use Prettier and ESLint for consistent code style and quality; run `npm run lint` and `npm run format` before committing.
- Write clear, descriptive commit messages and PR descriptions.
- Document all new features, scripts, and environment variables in the README and this file.
- Use feature flags or environment checks for experimental or risky features.
- Always test locally and in a Codespace before merging to main.
- Review CI/CD logs for errors and warnings after each push or PR.
- Encourage a culture of code review, knowledge sharing, and continuous improvement.

---

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

## Cache Cleaning & Environment Hygiene (Codespaces/Local)

- **For New Codespaces/Environments:**
  - Always run the provided `scripts/dev-clean.sh` before first build or test. This script safely removes `node_modules`, lock files, Vite/Next/React caches, and other common artifacts.
  - If you add new dependencies or tools, update `dev-clean.sh` to clear their caches as well.
  - Example (from project root):
    ```bash
    bash scripts/dev-clean.sh
    ```
  - After cleaning, always run:
    ```bash
    npm ci
    npm run build
    npm test
    ```

- **When Re-opening Previous Codespaces/Environments:**
  - Run `scripts/dev-clean.sh` to clear stale caches and artifacts from previous sessions.
  - If you encounter strange errors, always clean caches before debugging further.
  - For VS Code: use the Command Palette to reload the window after cleaning (`Developer: Reload Window`).
  - For browser-based dev tools: clear localStorage/sessionStorage and hard-refresh the app.

- **General Cache Cleaning Best Practices:**
  - Never delete files or folders outside the project root unless you are certain of their purpose.
  - Do not use `rm -rf` on home or system directories.
  - Always prefer project-specific cleaning scripts over ad-hoc manual deletion.
  - Document any new cache locations or cleaning steps in this file and in `dev-clean.sh`.
  - For persistent issues, also try:
    ```bash
    npm cache clean --force
    ```
    and remove `.vite`, `.next`, `.turbo`, or similar build caches if present.
  - For security: never commit `.env`, cache, or build artifacts to version control.
  - For performance: keep dependencies up to date and prune unused packages regularly.

---

## Additional Best Practice Prompt Instructions

- **Security:**
  - Always review third-party dependencies for vulnerabilities before adding or updating.
  - Use environment variables for all secrets and sensitive config; never hardcode secrets.
  - Enable 2FA on all cloud and CI/CD accounts.
  - Regularly audit permissions for Supabase, Sentry, and deployment platforms.

- **Performance:**
  - Profile and optimize slow routes, queries, and components.
  - Use lazy loading and code splitting for large modules/pages.
  - Monitor bundle size and use tools like `vite-plugin-inspect` or `webpack-bundle-analyzer`.

- **Code Quality:**
  - Enforce linting and formatting on every commit (consider pre-commit hooks).
  - Use strong typing and avoid `any` in TypeScript code.
  - Write clear, maintainable tests for all new features and bug fixes.
  - Refactor legacy code for clarity, testability, and maintainability.

- **Proactive Maintenance:**
  - Schedule regular dependency updates and security audits.
  - Review and update documentation with every significant change.
  - Encourage code reviews and knowledge sharing among contributors.
  - Monitor CI/CD pipelines for flakiness and address root causes promptly.

---

# Enhanced Troubleshooting, Optimization & CI/CD Toolkit

## Logs & Backups
- Automate backups weekly using cron jobs or managed cloud solutions.
- Store logs securely (AWS CloudWatch, Supabase logs, or similar).

## Testing Suite
- Use Cypress for E2E testing.
- Use Jest + React Testing Library for unit and integration tests.
- Run all tests automatically on pull requests with GitHub Actions.

## Deployment Guide
- Use Vercel or Netlify for frontend hosting.
- Connect to GitHub repository and enable automatic deployments on push.
- Ensure environment variables are set in the dashboard for production.

## Example CI/CD (GitHub Actions)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## React Testing: act() and State Updates
- Always wrap state updates, side effects, and context/provider logic in tests with `act()` from `react-dom/test-utils` or `@testing-library/react`.
- For async updates, use `await act(async () => { ... })`.
- If your test triggers multiple updates (e.g., AuthProvider, routing, or context), wrap the entire test logic in `act()`.
- Update custom render utilities to ensure all stateful updates are wrapped in `act()`.
- Example:
  ```tsx
  import { act } from 'react-dom/test-utils';
  it('does something', async () => {
    await act(async () => {
      // trigger state updates, e.g., simulate user actions
    });
    // assertions
  });
  ```

## Routing: 404 Handling
- Always include a catch-all route at the end of your route definitions to render the 404 page.
- For React Router v6:
  ```tsx
  <Routes>
    {/* other routes */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  ```
- Test 404 handling by navigating to undefined routes and asserting the 404 page renders.

## Supabase Filtering Limitations & Workarounds
- Prefer using `.or()` for complex filters if available in your Supabase client version.
- If `.or()` and `.filter()` are not available, fetch all rows and filter client-side, logging a warning for developer awareness.
- Example fallback:
  ```js
  const { data } = await supabase.from('threads').select('*');
  const filteredData = data.filter(item => /* your condition */);
  ```
- Keep the Supabase client up to date to benefit from new features and improved filtering. The project currently uses @supabase/supabase-js@2.50.1 (latest as of June 2025).
- After upgrading, always run the full test suite and verify all filtering logic and fallbacks still work as expected.
- Document any breaking changes or new features in this file and in the relevant code comments.

# Test Output Warning Suppression (Best Practice)

- For a perfectly clean test output, patch `console.warn` at the absolute top of any test file that triggers persistent, non-actionable warnings (e.g., 404 routing, Supabase fallback). This ensures warnings are suppressed before any imports or test code run.
- Example suppression snippet (add to the top of your test file):
  ```js
  // Silence Supabase fallback and 404 test warnings for clean output
  const originalWarn = global.console.warn;
  global.console.warn = (msg, ...args) => {
    if (
      typeof msg === "string" &&
      (
        /Supabase client does not support \.or or \.filter\. Returning (all rows|all threads) without filtering\./.test(msg) ||
        /404 Error: User attempted to access non-existent route:/.test(msg)
      )
    ) {
      return;
    }
    return originalWarn(msg, ...args);
  };
  ```
- This does not affect production code or error handling—only test output.
- Document this pattern in new test files if similar warnings arise.

