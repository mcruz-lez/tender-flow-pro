# TenderFlow Feature Guide

## Settings

- Manage user and organization preferences (theme, notifications, language)
- Accessible via the Settings page
- RBAC enforced: Only authorized users can view/edit

## Audit Logs

- View all sensitive actions (create, update, delete)
- Filter by user, action, or date
- Admin-only access (RBAC enforced)

## Messaging

- Real-time threads and messages between users
- Unread counts and read receipts
- RBAC: All roles can read/write, but only in their threads

## Document Management

- Upload, version, and manage documents
- Access logs and secure sharing
- RBAC: Property managers and admins can upload; vendors can view

## Security

- Role-based access control (RBAC) utility in UI and backend
- Ready for Supabase RLS (row-level security) policies

## Demo Data

- Seeder utility for onboarding and testing

## Testing & Quality

- Unit and integration tests for all features
- Linting, formatting, and Lighthouse audits

---

For more details, see `/src/api/`, `/src/pages/`, and `/README_FEATURES.md`.
