-- Security Fix Migration: Address critical RLS and schema issues

-- First, create missing payment-related tables referenced in Edge Functions
CREATE TABLE IF NOT EXISTS public.emd_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id UUID NOT NULL REFERENCES public.tenders(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.security_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.emd_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_deposits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for emd_payments
CREATE POLICY "Users can view EMD payments in their organization"
ON public.emd_payments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.tenders t
    WHERE t.id = emd_payments.tender_id
    AND t.organization_id = get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can create EMD payments in their organization"
ON public.emd_payments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.tenders t
    WHERE t.id = emd_payments.tender_id
    AND t.organization_id = get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can update EMD payments in their organization"
ON public.emd_payments
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.tenders t
    WHERE t.id = emd_payments.tender_id
    AND t.organization_id = get_user_organization(auth.uid())
  )
);

CREATE POLICY "Admins can delete EMD payments"
ON public.emd_payments
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create RLS policies for security_deposits
CREATE POLICY "Users can view security deposits in their organization"
ON public.security_deposits
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.contracts c
    WHERE c.id = security_deposits.contract_id
    AND c.organization_id = get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can create security deposits in their organization"
ON public.security_deposits
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.contracts c
    WHERE c.id = security_deposits.contract_id
    AND c.organization_id = get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can update security deposits in their organization"
ON public.security_deposits
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.contracts c
    WHERE c.id = security_deposits.contract_id
    AND c.organization_id = get_user_organization(auth.uid())
  )
);

CREATE POLICY "Admins can delete security deposits"
ON public.security_deposits
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Clean up conflicting RLS policies on messages table
-- Drop the conflicting general policies that conflict with organization-based ones
DROP POLICY IF EXISTS "Authenticated users can delete their own messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can update their own messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.messages;

-- Add proper DELETE policy for messages based on organization
CREATE POLICY "Users can delete messages in threads from their organization"
ON public.messages
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.threads
    WHERE threads.id = messages.thread_id
    AND threads.organization_id = get_user_organization(auth.uid())
  )
);

-- Add missing DELETE policies for all other tables
CREATE POLICY "Admins can delete bids"
ON public.bids
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contracts"
ON public.contracts
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (user_id = auth.uid());

CREATE POLICY "Admins can delete properties"
ON public.properties
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete their own settings"
ON public.settings
FOR DELETE
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own subscription preferences"
ON public.subscription_preferences
FOR DELETE
USING (user_id = auth.uid());

CREATE POLICY "Admins can delete tenders"
ON public.tenders
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete threads"
ON public.threads
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vendors"
ON public.vendors
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add triggers for automatic timestamp updates on new tables
CREATE TRIGGER update_emd_payments_updated_at
  BEFORE UPDATE ON public.emd_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_security_deposits_updated_at
  BEFORE UPDATE ON public.security_deposits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance on payment tables
CREATE INDEX idx_emd_payments_tender_id ON public.emd_payments(tender_id);
CREATE INDEX idx_emd_payments_vendor_id ON public.emd_payments(vendor_id);
CREATE INDEX idx_emd_payments_status ON public.emd_payments(status);
CREATE INDEX idx_security_deposits_contract_id ON public.security_deposits(contract_id);
CREATE INDEX idx_security_deposits_vendor_id ON public.security_deposits(vendor_id);
CREATE INDEX idx_security_deposits_status ON public.security_deposits(status);