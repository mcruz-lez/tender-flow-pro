# RBAC & Security in TenderFlow

## Role-Based Access Control (RBAC)

- All sensitive features (settings, audit logs, messaging, documents) are protected by RBAC in both UI and backend.
- Roles: `admin`, `property_manager`, `vendor`, `user`
- Access matrix is defined in `/src/api/rbac.ts` and enforced in all relevant pages/components.

## Supabase Row-Level Security (RLS)

- RLS policies should be enabled for all sensitive tables in Supabase Studio.
- Example: Only allow users to read/write their own settings, messages, and documents.

## UI Security

- Protected routes and conditional rendering based on user role.
- Access denied messages for unauthorized actions.

## Best Practices

- Always validate user roles on both client and server.
- Regularly review and update RBAC matrix and RLS policies.

---

For more, see `/src/api/rbac.ts` and Supabase documentation.
