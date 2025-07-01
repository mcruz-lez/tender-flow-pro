
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Vendor = Tables<"vendors">;
type VendorInsert = TablesInsert<"vendors">;

export const useVendors = () => {
  return useQuery<Vendor[]>({
    queryKey: ["vendors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching vendors:", error);
        throw error;
      }
      return (data || []) as Vendor[];
    },
  });
};

export const useCreateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vendor: VendorInsert) => {
      const { data, error } = await supabase
        .from("vendors")
        .insert([vendor])
        .select()
        .single();

      if (error) {
        console.error("Error creating vendor:", error);
        throw error;
      }

      return data as Vendor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor registered successfully!");
    },
    onError: (error) => {
      console.error("Failed to register vendor:", error);
      toast.error("Failed to register vendor. Please try again.");
    },
  });
};
