
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Property {
  id: string;
  organization_id: string;
  name: string;
  address: string;
  property_type: string;
  size_sqft?: number;
  units_count?: number;
  year_built?: number;
  description?: string;
  status: 'active' | 'inactive' | 'maintenance';
  budget_annual?: number;
  manager_id?: string;
  created_at: string;
  updated_at: string;
}

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties' as any)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }
      
      return data as unknown as Property[];
    }
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('properties' as any)
        .insert([property])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating property:', error);
        throw error;
      }
      
      return data as unknown as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create property:', error);
      toast.error('Failed to create property. Please try again.');
    }
  });
};
