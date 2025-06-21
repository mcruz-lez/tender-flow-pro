// src/types.ts

export interface Property {
  id: string;
  address: string;
  ownerId: string;
  leaseStart?: Date;
  leaseEnd?: Date;
}

export interface Bid {
  id: string;
  tender_id: string;
  vendor_id: string;
  organization_id: string;
  title: string;
  description?: string;
  total_amount: number;
  submission_date?: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  documents?: unknown;
  evaluation_score?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  organization_id: string;
  tender_id?: string;
  vendor_id: string;
  property_id?: string;
  title: string;
  description?: string;
  contract_value: number;
  start_date: string;
  end_date: string;
  status: "draft" | "active" | "completed" | "terminated" | "expired";
  terms?: unknown;
  performance_metrics?: unknown;
  documents?: unknown;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactEmail: string;
  phone?: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone?: string;
}
