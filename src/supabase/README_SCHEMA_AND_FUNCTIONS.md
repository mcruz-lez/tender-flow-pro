/*
  This file documents the Supabase schema and Edge Functions for TendProcure.
  - See /src/supabase/sql/schema.sql for the SQL schema.
  - See /src/supabase/edge-functions/ for Edge Functions.
*/

# Supabase Schema Overview

## Tables
- **vendors**: Vendor company profiles, onboarding status, contact info, compliance docs.
- **tenders**: Tender opportunities, requirements, deadlines, status, owner.
- **contracts**: Awarded contracts, terms, PDF links, status, parties.
- **chat_sessions**: AI assistant chat memory, user/session linkage, context.

## Extensions
- **pgvector**: For AI/semantic search and chat memory.

# Edge Functions
- **notifyVendor.ts**: Sends notifications to vendors (email, in-app, etc).
- (Add more for analytics, contract PDF generation, etc.)

# Usage
- Use the schema.sql to initialize the database.
- Deploy Edge Functions via Supabase CLI or scripts.
- See scripts/ for automation.

# Best Practices
- Keep schema and functions in sync with app features.
- Document all changes in this file and in schema.sql.

---

# SQL & RLS/Auth Policies (Recommended for Supabase SQL Editor)

## 1. Enable pgvector Extension
```sql
create extension if not exists vector;
```

## 2. Table Definitions (see schema.sql for full DDL)

## 3. Row Level Security (RLS) & Auth Policies

### Vendors
```sql
alter table vendors enable row level security;
create policy "Vendors: Only authenticated users can view" on vendors
  for select using (auth.role() = 'authenticated');
create policy "Vendors: Only admin can insert/update/delete" on vendors
  for all using (auth.role() = 'service_role');
```

### Tenders
```sql
alter table tenders enable row level security;
create policy "Tenders: Only authenticated users can view" on tenders
  for select using (auth.role() = 'authenticated');
create policy "Tenders: Only admin or owner can insert/update/delete" on tenders
  for all using (auth.role() = 'service_role' or auth.uid() = owner_id);
```

### Contracts
```sql
alter table contracts enable row level security;
create policy "Contracts: Only parties can view" on contracts
  for select using (auth.uid() = vendor_id or auth.uid() = tender_owner_id);
create policy "Contracts: Only admin can insert/update/delete" on contracts
  for all using (auth.role() = 'service_role');
```

### Chat Sessions
```sql
alter table chat_sessions enable row level security;
create policy "Chat: Only owner can view/insert/update" on chat_sessions
  for all using (auth.uid() = user_id);
```

---

# Verification Steps
1. Copy each SQL/RLS block above into the Supabase SQL Editor and run.
2. Use the Table Editor to verify structure and permissions.
3. Test with different user roles (admin, vendor, etc) to confirm access.
4. Document any changes here and in schema.sql.

# Notes
- Adjust policies as needed for your workflow.
- For more advanced rules, see Supabase docs on RLS and auth.
