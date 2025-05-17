
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

export type Challenge = Database['public']['Tables']['challenges']['Row'];

export const useChallenges = (filters?: { 
  industry?: string; 
  skill_level?: Database['public']['Enums']['skill_level_enum']; 
}) => {
  return useQuery({
    queryKey: ['challenges', filters],
    queryFn: async () => {
      let query = supabase
        .from('challenges')
        .select(`
          *,
          sponsors:sponsor_id (
            name,
            company,
            website
          )
        `);
      
      if (filters?.industry) {
        query = query.eq('industry', filters.industry);
      }
      
      if (filters?.skill_level) {
        query = query.eq('skill_level', filters.skill_level);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching challenges:', error);
        toast({
          title: "Error loading challenges",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useChallengeById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['challenge', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('challenges')
        .select(`
          *,
          sponsors:sponsor_id (
            name,
            company,
            website
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching challenge:', error);
        toast({
          title: "Error loading challenge",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newChallenge: Omit<Challenge, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('challenges')
        .insert([newChallenge])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating challenge:', error);
        toast({
          title: "Error creating challenge",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Challenge created",
        description: "Your challenge has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, challenge }: { id: string; challenge: Partial<Challenge> }) => {
      const { data, error } = await supabase
        .from('challenges')
        .update(challenge)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating challenge:', error);
        toast({
          title: "Error updating challenge",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Challenge updated",
        description: "Your challenge has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenge', variables.id] });
    },
  });
};
