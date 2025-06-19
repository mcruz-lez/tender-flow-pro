
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Tender {
  id: string;
  organization_id: string;
  property_id?: string;
  title: string;
  description?: string;
  category: string;
  tender_type: string;
  status: 'draft' | 'active' | 'closed' | 'awarded' | 'cancelled';
  budget_min?: number;
  budget_max?: number;
  submission_deadline?: string;
  evaluation_criteria?: any;
  requirements?: any;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useTenders = () => {
  return useQuery({
    queryKey: ['tenders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenders' as any)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching tenders:', error);
        throw error;
      }
      
      return data as unknown as Tender[];
    }
  });
};

export const useCreateTender = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tender: Omit<Tender, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tenders' as any)
        .insert([tender])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating tender:', error);
        throw error;
      }
      
      return data as unknown as Tender;
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
    mutationFn: async ({ id, ...updates }: Partial<Tender> & { id: string }) => {
      const { data, error } = await supabase
        .from('tenders' as any)
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating tender:', error);
        throw error;
      }
      
      return data as unknown as Tender;
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
