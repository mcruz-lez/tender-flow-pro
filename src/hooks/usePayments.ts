import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  Payment,
  Subscription,
  Invoice,
  EMDPayment,
  SecurityDeposit,
} from "@/integrations/supabase/types";

// Fetch all payments for the current user
export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Payment[];
    },
  });
}

// Create a new payment (for Stripe checkout session)
export function useCreatePayment() {
  return useMutation({
    mutationFn: async (payment: Partial<Payment>) => {
      const { data, error } = await supabase
        .from("payments")
        .insert([payment])
        .select()
        .single();
      if (error) throw error;
      return data as Payment;
    },
  });
}

// Fetch all subscriptions for the current user
export function useSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Subscription[];
    },
  });
}

// ...add more hooks for invoices, EMD, security deposits as needed...
