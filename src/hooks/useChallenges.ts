// src/hooks/useChallenges.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast'; // Assuming this is for shadcn/ui toast
import { Database } from '@/integrations/supabase/types';

export type Challenge = Database['public']['Tables']['challenges']['Row'];
type ChallengeInsert = Database['public']['Tables']['challenges']['Insert'];
type ChallengeUpdate = Database['public']['Tables']['challenges']['Update'];


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
    mutationFn: async (newChallenge: ChallengeInsert) => { // <--- CORRECTED TYPE HERE
      const { data, error } = await supabase
        .from('challenges')
        .insert([newChallenge]) // Supabase insert often expects an array
        .select()
        .single(); // Assuming you want the created record back

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
    onSuccess: (data) => { // data is the newly created challenge if .select().single() is used
      toast({
        title: "Challenge created",
        description: `Challenge "${data?.title || 'New Challenge'}" has been created successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
    // Optional: Add onError for more specific UI feedback if needed
    // onError: (error) => {
    //   // The toast in mutationFn already handles this, but you could add more here
    //   console.error("Mutation error in useCreateChallenge:", error);
    // }
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, challenge }: { id: string; challenge: ChallengeUpdate }) => { // <--- Consider using ChallengeUpdate for stricter typing
      const { data, error } = await supabase
        .from('challenges')
        .update(challenge)
        .eq('id', id)
        .select()
        .single(); // Assuming you want the updated record back

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
    onSuccess: (data, variables) => { // data is the updated challenge
      toast({
        title: "Challenge updated",
        description: `Challenge "${data?.title || 'The challenge'}" has been updated successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenge', variables.id] });
    },
  });
};