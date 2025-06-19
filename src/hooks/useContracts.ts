
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Contract {
  id: string;
  organization_id: string;
  tender_id?: string;
  vendor_id: string;
  property_id?: string;
  title: string;
  description?: string;
  contract_value: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed' | 'terminated' | 'expired';
  terms?: any;
  performance_metrics?: any;
  documents?: any;
  created_at: string;
  updated_at: string;
}

export const useContracts = () => {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contracts:', error);
        throw error;
      }
      
      return (data || []) as Contract[];
    }
  });
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contract: Omit<Contract, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await (supabase as any)
        .from('contracts')
        .insert([contract])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating contract:', error);
        throw error;
      }
      
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contract created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create contract:', error);
      toast.error('Failed to create contract. Please try again.');
    }
  });
};

export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Contract> & { id: string }) => {
      const { data, error } = await (supabase as any)
        .from('contracts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating contract:', error);
        throw error;
      }
      
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast.success('Contract updated successfully!');
    },
    onError: (error) => {
      console.error('Failed to update contract:', error);
      toast.error('Failed to update contract. Please try again.');
    }
  });
};
