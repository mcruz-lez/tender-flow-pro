import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

export type Bid = Database['public']['Tables']['bids']['Row'];
export type BidInsert = Database['public']['Tables']['bids']['Insert'];
export type BidUpdate = Database['public']['Tables']['bids']['Update'];

export const useBids = () => {
  return useQuery<Bid[]>({
    queryKey: ['bids'],
    queryFn: async () => {
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
    mutationFn: async (bid: BidInsert) => {
      const { data, error } = await supabase
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
    mutationFn: async ({ id, ...updates }: BidUpdate & { id: string }) => {
      const { data, error } = await supabase
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
