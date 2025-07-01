-- Create user profiles with proper organization relationship
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  job_title TEXT,
  department TEXT,
  organization_id UUID REFERENCES public.organizations(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Create sample organizations
INSERT INTO public.organizations (name, type, email, description) VALUES
('TendProcure Demo Corp', 'property_management', 'admin@tendprocure.com', 'Demo property management organization'),
('Elite Contractors Ltd', 'contractor', 'info@elitecontractors.com', 'Professional construction and maintenance services'),
('ProVendor Solutions', 'vendor', 'contact@provendor.com', 'Comprehensive vendor and supply services'),
('SecureGuard Services', 'service_provider', 'admin@secureguard.com', 'Professional security and maintenance provider')
ON CONFLICT (name) DO NOTHING;

-- Create demo tenders
INSERT INTO public.tenders (title, description, category, tender_type, status, organization_id, created_by, budget_min, budget_max, submission_deadline) VALUES
('HVAC Maintenance Services - Building Complex A', 'Comprehensive HVAC maintenance and repair services for a large commercial building complex', 'Maintenance', 'service', 'active', (SELECT id FROM organizations LIMIT 1), (SELECT id FROM profiles LIMIT 1), 35000, 50000, now() + interval '30 days'),
('Security Services - Residential Portfolio', 'Professional security services for multiple residential properties', 'Security', 'service', 'active', (SELECT id FROM organizations LIMIT 1), (SELECT id FROM profiles LIMIT 1), 80000, 120000, now() + interval '25 days'),
('Landscaping Services - Commercial Properties', 'Complete landscaping and ground maintenance services', 'Landscaping', 'service', 'draft', (SELECT id FROM organizations LIMIT 1), (SELECT id FROM profiles LIMIT 1), 20000, 35000, now() + interval '45 days'),
('Cleaning Services - Office Buildings', 'Daily cleaning and maintenance services for office complexes', 'Cleaning', 'service', 'active', (SELECT id FROM organizations LIMIT 1), (SELECT id FROM profiles LIMIT 1), 60000, 85000, now() + interval '20 days')
ON CONFLICT DO NOTHING;

-- Create demo vendors
INSERT INTO public.vendors (company_name, email, categories, contact_person, phone, prequalification_status, rating, organization_id, verified) VALUES
('Elite Construction Co.', 'contact@eliteconstruction.com', ARRAY['Construction', 'Maintenance'], 'John Smith', '+1-555-0101', 'approved', 4.8, (SELECT id FROM organizations LIMIT 1), true),
('ProClean Services', 'info@proclean.com', ARRAY['Cleaning', 'Maintenance'], 'Sarah Johnson', '+1-555-0102', 'approved', 4.6, (SELECT id FROM organizations LIMIT 1), true),
('SecureGuard Solutions', 'admin@secureguard.com', ARRAY['Security', 'Monitoring'], 'Michael Brown', '+1-555-0103', 'approved', 4.9, (SELECT id FROM organizations LIMIT 1), true),
('GreenSpace Landscaping', 'hello@greenspace.com', ARRAY['Landscaping', 'Maintenance'], 'Emma Davis', '+1-555-0104', 'pending', 4.5, (SELECT id FROM organizations LIMIT 1), false)
ON CONFLICT (email) DO NOTHING;

-- Create demo properties
INSERT INTO public.properties (name, address, property_type, description, organization_id, status, size_sqft, units_count, budget_annual) VALUES
('Maple Ridge Apartments', '123 Maple Street, Downtown', 'Residential', 'Large residential complex with 150 units', (SELECT id FROM organizations LIMIT 1), 'active', 125000, 150, 500000),
('Corporate Tower One', '456 Business Ave, Financial District', 'Commercial', 'Modern office building with premium amenities', (SELECT id FROM organizations LIMIT 1), 'active', 85000, 25, 750000),
('Riverside Shopping Center', '789 Commerce Blvd, Riverside', 'Retail', 'Multi-tenant retail and shopping complex', (SELECT id FROM organizations LIMIT 1), 'active', 200000, 45, 900000),
('Tech Hub Innovation Center', '321 Innovation Way, Tech Park', 'Mixed', 'Mixed-use development for tech companies', (SELECT id FROM organizations LIMIT 1), 'active', 150000, 30, 1200000)
ON CONFLICT (name) DO NOTHING;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for profile timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();