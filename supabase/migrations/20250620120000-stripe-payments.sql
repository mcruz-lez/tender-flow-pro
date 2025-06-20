-- Stripe Payments & Subscriptions Migration

-- Payment table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  vendor_id UUID REFERENCES public.vendors(id),
  tender_id UUID REFERENCES public.tenders(id),
  contract_id UUID REFERENCES public.contracts(id),
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded', 'cancelled')),
  type TEXT NOT NULL CHECK (type IN ('subscription', 'emd', 'security', 'tender', 'document', 'vendor', 'other')),
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subscription table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  vendor_id UUID REFERENCES public.vendors(id),
  status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Invoice table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES public.payments(id),
  user_id UUID REFERENCES auth.users(id),
  organization_id UUID REFERENCES public.organizations(id),
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible', 'refunded')),
  stripe_invoice_id TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- EMD Payments table
CREATE TABLE IF NOT EXISTS public.emd_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id UUID REFERENCES public.tenders(id) NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'refunded', 'cancelled')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Security Deposits table
CREATE TABLE IF NOT EXISTS public.security_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES public.contracts(id) NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'refunded', 'cancelled')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emd_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_deposits ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their payments" ON public.payments FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert payments" ON public.payments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their payments" ON public.payments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all payments" ON public.payments FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their subscriptions" ON public.subscriptions FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their subscriptions" ON public.subscriptions FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all subscriptions" ON public.subscriptions FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their invoices" ON public.invoices FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert invoices" ON public.invoices FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their invoices" ON public.invoices FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all invoices" ON public.invoices FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Vendors can view their EMD payments" ON public.emd_payments FOR SELECT USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Vendors can insert EMD payments" ON public.emd_payments FOR INSERT WITH CHECK (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));
CREATE POLICY "Vendors can update their EMD payments" ON public.emd_payments FOR UPDATE USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));
CREATE POLICY "Admins can manage all EMD payments" ON public.emd_payments FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Vendors can view their security deposits" ON public.security_deposits FOR SELECT USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Vendors can insert security deposits" ON public.security_deposits FOR INSERT WITH CHECK (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));
CREATE POLICY "Vendors can update their security deposits" ON public.security_deposits FOR UPDATE USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));
CREATE POLICY "Admins can manage all security deposits" ON public.security_deposits FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_vendor_id ON public.payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_payments_tender_id ON public.payments(tender_id);
CREATE INDEX IF NOT EXISTS idx_payments_contract_id ON public.payments(contract_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_emd_payments_vendor_id ON public.emd_payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_security_deposits_vendor_id ON public.security_deposits(vendor_id);
