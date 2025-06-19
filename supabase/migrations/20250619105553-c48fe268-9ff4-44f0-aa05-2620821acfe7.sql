
-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  property_type TEXT NOT NULL,
  size_sqft INTEGER,
  units_count INTEGER,
  year_built INTEGER,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  budget_annual DECIMAL(12,2),
  manager_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tenders table
CREATE TABLE public.tenders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  property_id UUID REFERENCES public.properties(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tender_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'awarded', 'cancelled')),
  budget_min DECIMAL(12,2),
  budget_max DECIMAL(12,2),
  submission_deadline TIMESTAMP WITH TIME ZONE,
  evaluation_criteria JSONB,
  requirements JSONB,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vendors table
CREATE TABLE public.vendors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  registration_number TEXT,
  tax_id TEXT,
  categories TEXT[],
  certifications JSONB[],
  prequalification_status TEXT NOT NULL DEFAULT 'pending' CHECK (prequalification_status IN ('pending', 'approved', 'rejected')),
  rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bids table
CREATE TABLE public.bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tender_id UUID REFERENCES public.tenders(id) NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  total_amount DECIMAL(12,2) NOT NULL,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected')),
  documents JSONB,
  evaluation_score DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tender_id, vendor_id)
);

-- Create contracts table
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  tender_id UUID REFERENCES public.tenders(id),
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  property_id UUID REFERENCES public.properties(id),
  title TEXT NOT NULL,
  description TEXT,
  contract_value DECIMAL(12,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'terminated', 'expired')),
  terms JSONB,
  performance_metrics JSONB,
  documents JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for properties
CREATE POLICY "Users can view properties in their organization" 
  ON public.properties FOR SELECT 
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create properties in their organization" 
  ON public.properties FOR INSERT 
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update properties in their organization" 
  ON public.properties FOR UPDATE 
  USING (organization_id = public.get_user_organization(auth.uid()));

-- Create RLS policies for tenders
CREATE POLICY "Users can view tenders in their organization" 
  ON public.tenders FOR SELECT 
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create tenders in their organization" 
  ON public.tenders FOR INSERT 
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update tenders in their organization" 
  ON public.tenders FOR UPDATE 
  USING (organization_id = public.get_user_organization(auth.uid()));

-- Create RLS policies for vendors
CREATE POLICY "Users can view vendors in their organization" 
  ON public.vendors FOR SELECT 
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create vendors in their organization" 
  ON public.vendors FOR INSERT 
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update vendors in their organization" 
  ON public.vendors FOR UPDATE 
  USING (organization_id = public.get_user_organization(auth.uid()));

-- Create RLS policies for bids
CREATE POLICY "Users can view bids in their organization" 
  ON public.bids FOR SELECT 
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create bids in their organization" 
  ON public.bids FOR INSERT 
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update bids in their organization" 
  ON public.bids FOR UPDATE 
  USING (organization_id = public.get_user_organization(auth.uid()));

-- Create RLS policies for contracts
CREATE POLICY "Users can view contracts in their organization" 
  ON public.contracts FOR SELECT 
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create contracts in their organization" 
  ON public.contracts FOR INSERT 
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update contracts in their organization" 
  ON public.contracts FOR UPDATE 
  USING (organization_id = public.get_user_organization(auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_properties_organization_id ON public.properties(organization_id);
CREATE INDEX idx_properties_manager_id ON public.properties(manager_id);
CREATE INDEX idx_tenders_organization_id ON public.tenders(organization_id);
CREATE INDEX idx_tenders_property_id ON public.tenders(property_id);
CREATE INDEX idx_tenders_status ON public.tenders(status);
CREATE INDEX idx_vendors_organization_id ON public.vendors(organization_id);
CREATE INDEX idx_vendors_prequalification_status ON public.vendors(prequalification_status);
CREATE INDEX idx_bids_tender_id ON public.bids(tender_id);
CREATE INDEX idx_bids_vendor_id ON public.bids(vendor_id);
CREATE INDEX idx_bids_status ON public.bids(status);
CREATE INDEX idx_contracts_organization_id ON public.contracts(organization_id);
CREATE INDEX idx_contracts_vendor_id ON public.contracts(vendor_id);
CREATE INDEX idx_contracts_status ON public.contracts(status);
