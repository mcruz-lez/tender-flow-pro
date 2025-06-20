import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

export type Tender = Database['public']['Tables']['tenders']['Row'];
export type TenderInsert = Database['public']['Tables']['tenders']['Insert'];
export type TenderUpdate = Database['public']['Tables']['tenders']['Update'];

export const useTenders = () => {
  return useQuery<Tender[]>({
    queryKey: ['tenders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching tenders:', error);
        throw error;
      }
      return (data || []) as Tender[];
    }
  });
};

export const useCreateTender = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tender: TenderInsert) => {
      const { data, error } = await supabase
        .from('tenders')
        .insert([tender])
        .select()
        .single();
      if (error) {
        console.error('Error creating tender:', error);
        throw error;
      }
      return data as Tender;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      toast.success('Tender created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create tender:', error);
      toast.error('Failed to create tender. Please try again.');
    }
  });
};

export const useUpdateTender = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: TenderUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('tenders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        console.error('Error updating tender:', error);
        throw error;
      }
      return data as Tender;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenders'] });
      toast.success('Tender updated successfully!');
    },
    onError: (error) => {
      console.error('Failed to update tender:', error);
      toast.error('Failed to update tender. Please try again.');
    }
  });
};
