
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Bid {
  id: string;
  tender_id: string;
  vendor_id: string;
  organization_id: string;
  title: string;
  description?: string;
  total_amount: number;
  submission_date?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  documents?: any;
  evaluation_score?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useBids = () => {
  return useQuery({
    queryKey: ['bids'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('bids')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching bids:', error);
        throw error;
      }
      
      return (data || []) as Bid[];
    }
  });
};

export const useBidsByTender = (tenderId: string) => {
  return useQuery({
    queryKey: ['bids', tenderId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('bids')
        .select('*')
        .eq('tender_id', tenderId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching bids by tender:', error);
        throw error;
      }
      
      return (data || []) as Bid[];
    },
    enabled: !!tenderId
  });
};

export const useCreateBid = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bid: Omit<Bid, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await (supabase as any)
        .from('bids')
        .insert([bid])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating bid:', error);
        throw error;
      }
      
      return data as Bid;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast.success('Bid submitted successfully!');
    },
    onError: (error) => {
      console.error('Failed to create bid:', error);
      toast.error('Failed to submit bid. Please try again.');
    }
  });
};

export const useUpdateBid = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Bid> & { id: string }) => {
      const { data, error } = await (supabase as any)
        .from('bids')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating bid:', error);
        throw error;
      }
      
      return data as Bid;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast.success('Bid updated successfully!');
    },
    onError: (error) => {
      console.error('Failed to update bid:', error);
      toast.error('Failed to update bid. Please try again.');
    }
  });
};
