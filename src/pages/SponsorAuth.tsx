// src/pages/SponsorAuth.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail, User as UserIcon, Loader2 } from "lucide-react"; // Renamed User to UserIcon
import { toast as sonnerToast } from "sonner";
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const SponsorAuth = () => {
    const { user, signIn, signUp, isLoading, isSponsor, isLoadingProfiles } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // For sponsor/company name during sign-up
    const [company, setCompany] = useState(""); // Optional company field for sign-up
    const [website, setWebsite] = useState(""); // Optional website field for sign-up

    useEffect(() => {
        // If user is logged in AFTER an auth operation on this page,
        // redirect them to the sponsor dashboard.
        // The SponsorDashboard will then decide if they need to fill BecomeSponsorForm.
        if (user && !isLoading && !isLoadingProfiles) { // Ensure profiles are also loaded
            sonnerToast.info("Redirecting to Sponsor Portal...");
            navigate('/sponsor', { replace: true });
        }
    }, [user, isLoading, isLoadingProfiles, isSponsor, navigate]);


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            sonnerToast.error("Missing fields", { description: "Please enter both email and password." });
            return;
        }
        await signIn(email, password);
        // onAuthStateChange in useAuth will handle further actions and state updates
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            sonnerToast.error("Missing fields", { description: "Please fill in all required fields." });
            return;
        }
        await signUp(email, password, { name, company, website }); // 'name' here can be the sponsor's contact name or company name
    };

    // If initial loading or an auth operation is in progress, show loader
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <Loader2 className="h-12 w-12 animate-spin text-purple-700" />
            </div>
        );
    }

    // If user becomes defined and initial loading is done, useEffect should redirect.
    // This is a fallback or for the brief moment before redirect.
    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p>Redirecting...</p>
                <Loader2 className="ml-2 h-5 w-5 animate-spin text-purple-700" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <Link to="/" className="inline-block mb-4">
                        <span className="text-3xl font-bold text-purple-700">EliteBuilders</span>
                    </Link>
                    <CardTitle className="text-2xl font-semibold">Sponsor Portal Access</CardTitle>
                    <CardDescription>Sign in or create an account to manage your challenges.</CardDescription>
                </CardHeader>

                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4 mx-6">
                        <TabsTrigger value="signin">Sponsor Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sponsor Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <form onSubmit={handleSignIn}>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signin-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="sponsor-signin-email" type="email" placeholder="yourcompany@example.com"
                                            className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signin-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="sponsor-signin-password" type="password" placeholder="Enter your password"
                                            className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...</>) : "Sign In"}
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignUp}>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signup-name">Contact Name / Organization Name</Label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="sponsor-signup-name"
                                            type="text"
                                            placeholder="Your Name or Company"
                                            className="pl-10"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signup-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="sponsor-signup-email"
                                            type="email"
                                            placeholder="yourcompany@example.com"
                                            className="pl-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signup-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="sponsor-signup-password"
                                            type="password"
                                            placeholder="Create a strong password"
                                            className="pl-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signup-company">Company (Optional)</Label>
                                    <Input
                                        id="sponsor-signup-company"
                                        placeholder="Acme Inc."
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sponsor-signup-website">Website (Optional)</Label>
                                    <Input
                                        id="sponsor-signup-website"
                                        placeholder="https://yourcompany.com"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-4">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing Up...
                                        </>
                                    ) : (
                                        "Create Sponsor Account"
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                </Tabs>
                <div className="px-6 pb-4 mt-4 text-center text-sm">
                    <p className="text-gray-600">Are you a developer/builder?</p>
                    <Link to="/auth" className="font-medium text-purple-600 hover:text-purple-500">
                        Sign in with GitHub
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default SponsorAuth;