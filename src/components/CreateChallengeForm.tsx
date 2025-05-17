// src/components/CreateChallengeForm.tsx
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
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useCreateChallenge } from '@/hooks/useChallenges';
import { useAuth } from '@/hooks/useAuth';
import { toast as sonnerToast } from "sonner";
import { Constants } from '@/integrations/supabase/types';

const challengeFormSchema = z.object({
    title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }).max(100),
    description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }).max(5000),
    deadline: z.date({ required_error: 'Deadline is required.' }),
    reward_structure: z.string().min(3, { message: 'Reward structure must be specified.' }).max(200),
    industry: z.string().min(2, { message: 'Industry must be specified.' }).max(50),
    skill_level: z.enum(Constants.public.Enums.skill_level_enum, {
        required_error: 'Skill level is required.',
    }),
    data_pack_url: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
    logo_url: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
    rubric: z.string().min(10, { message: 'Rubric must be at least 10 characters long.' }).max(5000),
});

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

export const CreateChallengeForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { user, sponsorProfile, isSponsor } = useAuth();
    const createChallengeMutation = useCreateChallenge();

    const form = useForm<ChallengeFormValues>({
        resolver: zodResolver(challengeFormSchema),
        defaultValues: {
            title: '',
            description: '',
            reward_structure: '',
            industry: '',
            skill_level: undefined,
            data_pack_url: '',
            logo_url: '',
            rubric: '',
        },
    });

    const onSubmit = async (values: ChallengeFormValues) => {
        if (!user) {
            sonnerToast.error("Authentication Error", { description: "You must be logged in to create a challenge." });
            return;
        }

        // Ensure user has a sponsor_id or use user.id as a proxy
        // In a real scenario, you might fetch sponsor details or ensure the user *is* a sponsor
        const sponsorId = sponsorProfile.id; // Assuming the logged-in user's ID is the sponsor_id

        if (!isSponsor || !sponsorProfile) { // Check if the user is a registered sponsor
            sonnerToast.error("Access Denied", { description: "You must be a registered sponsor to create challenges." });
            return;
        }

        const challengeData = {
            ...values,
            title: values.title, // Ensure title is always present and not optional
            deadline: values.deadline.toISOString(),
            sponsor_id: sponsorId,
        };

        try {
            await createChallengeMutation.mutateAsync(challengeData);
            sonnerToast.success("Challenge Created!", { description: `${values.title} has been successfully created.` });
            form.reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            // Error toast is handled by the hook
            console.error("Failed to create challenge:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Challenge Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., AI-Powered Customer Support Bot" {...field} />
                            </FormControl>
                            <FormDescription>A clear and concise title for your challenge.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide a detailed description of the challenge, objectives, and context."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Markdown is supported for formatting.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Submission Deadline</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>When is the final submission date for this challenge?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reward_structure"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reward Structure</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., $1000 cash, Internship opportunity" {...field} />
                                </FormControl>
                                <FormDescription>Describe the prizes or rewards for winners.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Industry / Domain</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Healthcare, Fintech, Gaming" {...field} />
                                </FormControl>
                                <FormDescription>The primary industry or domain this challenge relates to.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="skill_level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Skill Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a skill level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Constants.public.Enums.skill_level_enum.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>What skill level is this challenge aimed at?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="rubric"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Evaluation Rubric</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Detail how submissions will be judged. e.g., Innovation (40%), Technical Execution (30%), Presentation (30%)."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Provide clear criteria for evaluation. Markdown is supported.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="data_pack_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Pack URL (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="url" placeholder="https://link.to/your/data.zip" {...field} />
                                </FormControl>
                                <FormDescription>Link to any datasets or starter code for participants.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="logo_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Challenge Logo URL (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="url" placeholder="https://link.to/your/logo.png" {...field} />
                                </FormControl>
                                <FormDescription>URL for the challenge logo (e.g., company or event logo).</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={createChallengeMutation.isPending}>
                        {createChallengeMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Challenge'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};