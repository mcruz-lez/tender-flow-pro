import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

export type Contract = Database["public"]["Tables"]["contracts"]["Row"];
export type ContractInsert =
  Database["public"]["Tables"]["contracts"]["Insert"];
export type ContractUpdate =
  Database["public"]["Tables"]["contracts"]["Update"];

export const useContracts = () => {
  return useQuery<Contract[]>({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching contracts:", error);
        throw error;
      }
      return (data || []) as Contract[];
    },
  });
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contract: ContractInsert) => {
      const { data, error } = await supabase
        .from("contracts")
        .insert([contract])
        .select()
        .single();
      if (error) {
        console.error("Error creating contract:", error);
        throw error;
      }
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("Contract created successfully!");
    },
    onError: (error) => {
      console.error("Failed to create contract:", error);
      toast.error("Failed to create contract. Please try again.");
    },
  });
};

export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: ContractUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("contracts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) {
        console.error("Error updating contract:", error);
        throw error;
      }
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      toast.success("Contract updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update contract:", error);
      toast.error("Failed to update contract. Please try again.");
    },
  });
};
