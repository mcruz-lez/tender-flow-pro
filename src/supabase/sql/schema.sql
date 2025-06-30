-- TendProcure Supabase Schema
-- Enable pgvector for AI features (PostgreSQL only)
create extension if not exists vector;

-- Vendors
create table if not exists vendors (
  id uuid primary key default uuid_generate_v4(),
  name text,
  rating float,
  services text[],
  available boolean
);

-- Tenders
create table if not exists tenders (
  id uuid primary key default uuid_generate_v4(),
  title text,
  status text,
  published_at timestamp,
  due_date timestamp
);

-- Contracts
create table if not exists contracts (
  id uuid primary key default uuid_generate_v4(),
  tender_id uuid references tenders(id),
  vendor_id uuid references vendors(id),
  pdf_url text,
  status text
);

-- Chat Sessions (for AI assistant memory)
create table if not exists chat_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  messages jsonb,
  created_at timestamp default now()
);
