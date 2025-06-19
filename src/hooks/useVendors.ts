
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Vendor {
  id: string;
  organization_id: string;
  user_id?: string;
  company_name: string;
  contact_person?: string;
  email: string;
  phone?: string;
  address?: string;
  registration_number?: string;
  tax_id?: string;
  categories?: string[];
  certifications?: any[];
  prequalification_status: 'pending' | 'approved' | 'rejected';
  rating: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching vendors:', error);
        throw error;
      }
      
      return data as Vendor[];
    }
  });
};

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vendor: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('vendors')
        .insert([vendor])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating vendor:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast.success('Vendor registered successfully!');
    },
    onError: (error) => {
      console.error('Failed to register vendor:', error);
      toast.error('Failed to register vendor. Please try again.');
    }
  });
};
