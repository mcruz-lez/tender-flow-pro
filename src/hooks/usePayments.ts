
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// Use actual Supabase payment type
type Payment = Tables<"payments">;

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
    mutationFn: async (payment: TablesInsert<"payments">) => {
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

// Mock subscriptions function since table doesn't exist
export function useSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      console.log("Mock subscriptions - table doesn't exist");
      return [];
    },
  });
}
