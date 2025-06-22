# Post-Deployment QA Checklist for TendProcure (Vercel)

- [ ] All environment variables are set in Vercel dashboard (no secrets in code or .env in repo)
- [ ] Main routes load without error: /, /login, /register, /dashboard, /tenders, /vendors, /contracts, /properties, /analytics, /audit/logs
- [ ] Navigation links and sidebar items route to correct pages
- [ ] Protected routes require authentication
- [ ] Public pages are accessible without login
- [ ] Audit logs page loads and displays data
- [ ] No console errors or warnings in browser dev tools
- [ ] Responsive design works on desktop and mobile
- [ ] All forms (login, register, create tender, etc.) submit and validate correctly
- [ ] All API endpoints respond as expected (200 OK, correct data)
- [ ] No exposed secrets in client-side JS (check Network tab for API keys)
- [ ] Vercel build logs show no errors or warnings
- [ ] Preview deployments work for all PRs/branches
- [ ] Automated Cypress tests pass on CI/CD

---

For any failed item, investigate and resolve before considering the deployment production-ready.
