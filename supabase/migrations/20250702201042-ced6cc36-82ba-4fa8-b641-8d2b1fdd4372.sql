-- Enhanced user roles and profile system

-- Create enhanced RBAC functions
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1;
$$;

-- Create function to check specific permissions
CREATE OR REPLACE FUNCTION public.can_create_tender(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role IN ('admin', 'property_manager', 'procurement_manager')
  FROM public.user_roles
  WHERE user_id = _user_id;
$$;

CREATE OR REPLACE FUNCTION public.can_bid_on_tender(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role IN ('vendor', 'contractor')
  FROM public.user_roles
  WHERE user_id = _user_id;
$$;

CREATE OR REPLACE FUNCTION public.can_evaluate_bids(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role IN ('admin', 'property_manager', 'evaluator', 'procurement_manager')
  FROM public.user_roles
  WHERE user_id = _user_id;
$$;

-- Create subscription preferences table
CREATE TABLE IF NOT EXISTS public.subscription_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'basic' CHECK (plan_type IN ('basic', 'professional', 'enterprise')),
  features JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on subscription preferences
ALTER TABLE public.subscription_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for subscription preferences
CREATE POLICY "Users can view their own subscription preferences"
ON public.subscription_preferences
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own subscription preferences"
ON public.subscription_preferences
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert their own subscription preferences"
ON public.subscription_preferences
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Create payment methods table for storing user payment preferences
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT,
  card_last_four TEXT,
  card_brand TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on payment methods
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Create policies for payment methods
CREATE POLICY "Users can view their own payment methods"
ON public.payment_methods
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own payment methods"
ON public.payment_methods
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Update profiles table with enhanced fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"email": true, "sms": false, "push": true}',
ADD COLUMN IF NOT EXISTS profile_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'UTC',
ADD COLUMN IF NOT EXISTS language_preference TEXT DEFAULT 'en';

-- Create trigger for updating profile completion percentage
CREATE OR REPLACE FUNCTION public.calculate_profile_completion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.profile_completion_percentage = (
    CASE WHEN NEW.first_name IS NOT NULL THEN 15 ELSE 0 END +
    CASE WHEN NEW.last_name IS NOT NULL THEN 15 ELSE 0 END +
    CASE WHEN NEW.email IS NOT NULL THEN 20 ELSE 0 END +
    CASE WHEN NEW.phone IS NOT NULL THEN 10 ELSE 0 END +
    CASE WHEN NEW.job_title IS NOT NULL THEN 10 ELSE 0 END +
    CASE WHEN NEW.department IS NOT NULL THEN 10 ELSE 0 END +
    CASE WHEN NEW.avatar_url IS NOT NULL THEN 10 ELSE 0 END +
    CASE WHEN NEW.organization_id IS NOT NULL THEN 10 ELSE 0 END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile completion calculation
DROP TRIGGER IF EXISTS trigger_calculate_profile_completion ON public.profiles;
CREATE TRIGGER trigger_calculate_profile_completion
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_profile_completion();

-- Update updated_at triggers
CREATE TRIGGER update_subscription_preferences_updated_at
  BEFORE UPDATE ON public.subscription_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();