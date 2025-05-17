// src/components/BecomeSponsorForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from "sonner";
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '@/integrations/supabase/types';

type SponsorInsert = Database['public']['Tables']['sponsors']['Insert'];

const becomeSponsorSchema = z.object({
    name: z.string().min(2, { message: "Sponsor/Organization name is required." }).max(100),
    company: z.string().min(2, { message: "Company name is required." }).max(100).optional().or(z.literal('')),
    website: z.string().url({ message: "Please enter a valid website URL." }).optional().or(z.literal('')),
    // email will be pre-filled from auth user
});

type BecomeSponsorFormValues = z.infer<typeof becomeSponsorSchema>;

// Hook to create a sponsor profile
export const useCreateSponsorProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (sponsorData: SponsorInsert) => {
            const { data, error } = await supabase
                .from('sponsors')
                .insert(sponsorData)
                .select()
                .single();

            if (error) {
                // Check for unique constraint violation on email or user_id
                if (error.code === '23505') { // PostgreSQL unique violation
                    if (error.message.includes('sponsors_email_key')) {
                        throw new Error("This email is already registered as a sponsor.");
                    }
                    if (error.message.includes('sponsors_user_id_key')) { // Assuming you named the unique constraint this
                        throw new Error("This user account is already linked to a sponsor profile.");
                    }
                }
                throw error;
            }
            return data;
        },
        onSuccess: (data) => {
            sonnerToast.success("Sponsor Profile Created!", { description: `Welcome, ${data?.name}! You can now create challenges.` });
            queryClient.invalidateQueries({ queryKey: ['sponsorProfile', data?.user_id] }); // Invalidate to refetch if needed
        },
        onError: (error: Error) => {
            sonnerToast.error("Sponsorship Registration Failed", { description: error.message });
        }
    });
};


export const BecomeSponsorForm = ({ onSuccess }: { onSuccess?: (sponsorId: string) => void }) => {
    const { user } = useAuth();
    const createSponsorMutation = useCreateSponsorProfile();

    const form = useForm<BecomeSponsorFormValues>({
        resolver: zodResolver(becomeSponsorSchema),
        defaultValues: {
            name: user?.user_metadata?.name || '',
            company: '',
            website: '',
        },
    });

    React.useEffect(() => {
        // Pre-fill name if available from user metadata
        if (user?.user_metadata?.name) {
            form.setValue('name', user.user_metadata.name);
        }
    }, [user, form]);


    if (!user) {
        sonnerToast.info("Please Log In", { description: "You need to be logged in to become a sponsor." });
        // Optionally redirect or show login prompt
        return <p>Please log in to register as a sponsor.</p>;
    }

    const onSubmit = async (values: BecomeSponsorFormValues) => {
        if (!user || !user.email) {
            sonnerToast.error("Authentication Error", { description: "User email is not available." });
            return;
        }

        const sponsorData: SponsorInsert = {
            user_id: user.id, // Link to the authenticated user
            email: user.email, // Use the authenticated user's email
            name: values.name,
            company: values.company || null, // Ensure empty strings become null if column expects null
            website: values.website || null,
            // Default notification settings are handled by the DB schema
        };

        try {
            const newSponsor = await createSponsorMutation.mutateAsync(sponsorData);
            if (newSponsor && onSuccess) {
                onSuccess(newSponsor.id); // Pass the new sponsor ID (from sponsors table)
            }
        } catch (error) {
            // Error is handled by the mutation's onError
            console.error("Failed to create sponsor profile:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sponsor/Organization Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Name or Organization's Name" {...field} />
                            </FormControl>
                            <FormDescription>This name will be displayed publicly.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Official Company Name (if different)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Website (Optional)</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="https://yourcompany.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormLabel>Email</FormLabel>
                    <Input value={user.email} disabled className="mt-2 bg-muted/50" />
                    <FormDescription className="mt-2">This email is linked to your account and will be used for sponsor communications.</FormDescription>
                </div>

                <Button type="submit" disabled={createSponsorMutation.isPending} className="w-full">
                    {createSponsorMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        'Become a Sponsor'
                    )}
                </Button>
            </form>
        </Form>
    );
};