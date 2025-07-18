// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lztlpenmmfsqyrwrjvnp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dGxwZW5tbWZzcXlyd3Jqdm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDcwODYsImV4cCI6MjA2NjIyMzA4Nn0.L9Ngxp69fDkNTXxFVLTpM-bnZ1HT-nB2IuKoEK6sAwo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});