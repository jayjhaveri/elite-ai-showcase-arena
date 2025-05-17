
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Database } from '@/integrations/supabase/types';

export type Submission = Database['public']['Tables']['submissions']['Row'];

export const useSubmissions = (challengeId?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['submissions', challengeId],
    queryFn: async () => {
      let query = supabase
        .from('submissions')
        .select(`
          *,
          builders:builder_id (*),
          challenges:challenge_id (*)
        `);
      
      if (challengeId) {
        query = query.eq('challenge_id', challengeId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Error loading submissions",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });
};

export const useUserSubmissions = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-submissions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          challenges:challenge_id (*)
        `)
        .eq('builder_id', user.id);
      
      if (error) {
        console.error('Error fetching user submissions:', error);
        toast({
          title: "Error loading your submissions",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (newSubmission: Omit<Submission, 'id' | 'created_at' | 'submission_time' | 'builder_id'>) => {
      if (!user) {
        throw new Error('You must be logged in to submit an application');
      }
      
      const submissionWithUser = {
        ...newSubmission,
        builder_id: user.id,
      };
      
      const { data, error } = await supabase
        .from('submissions')
        .insert([submissionWithUser])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating submission:', error);
        toast({
          title: "Error submitting application",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['user-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['submissions', variables.challenge_id] });
    },
  });
};
