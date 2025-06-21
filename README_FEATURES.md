# TenderFlow Feature Overview

## Backend API

- Settings: `/src/api/settings.ts`
- Audit Logs: `/src/api/auditLogs.ts`
- Messaging: `/src/api/messaging.ts`
- Documents: `/src/api/documents.ts`
- RBAC Utility: `/src/api/rbac.ts`
- Demo Data Seeder: `/src/api/demoData.ts`

## Frontend UI

- Settings: `/src/pages/settings/SettingsPage.tsx`
- Audit Logs: `/src/pages/admin/AuditLogs.tsx`
- Messaging: `/src/pages/communication/MessagingPage.tsx`
- Documents: `/src/pages/documents/DocumentManagementPage.tsx`

## Security

- RBAC enforced in UI and backend
- Ready for Supabase RLS policies

## Testing & Quality

- Tests for all major features
- ESLint and Prettier for code quality
- Lighthouse for accessibility and performance

## Next Steps

- Expand tests for edge cases and permissions
- Polish UI/UX and accessibility
- Monitor and optimize performance

---

For more details, see the respective files and documentation in `/src/api/` and `/src/pages/`.
