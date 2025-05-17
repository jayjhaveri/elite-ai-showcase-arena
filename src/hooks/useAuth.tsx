// src/hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type SponsorProfile = Database['public']['Tables']['sponsors']['Row'] | null;
type BuilderProfile = Database['public']['Tables']['builders']['Row'] | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  sponsorProfile: SponsorProfile;
  isSponsor: boolean;
  builderProfile: BuilderProfile;
  isBuilder: boolean;
  isLoading: boolean; // Overall auth loading (session + user) AND auth operations
  isLoadingProfiles: boolean; // Specific to sponsor/builder profiles fetching
  // Email/Password auth (can be kept for sponsors or future use)
  signUp: (email: string, password: string, data?: { name?: string, company?: string, website?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  // GitHub Auth
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshSponsorProfile: () => Promise<void>;
  refreshBuilderProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [sponsorProfile, setSponsorProfile] = useState<SponsorProfile>(null);
  const [isSponsor, setIsSponsor] = useState(false);
  const [builderProfile, setBuilderProfile] = useState<BuilderProfile>(null);
  const [isBuilder, setIsBuilder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const resetAllStatesToLoggedOut = () => {
    console.log('[Auth] Resetting ALL states to logged out.');
    setSession(null);
    setUser(null);
    setSponsorProfile(null);
    setIsSponsor(false);
    setBuilderProfile(null);
    setIsBuilder(false);
    setIsLoadingProfiles(false);
    setIsLoading(false);
  };

  const fetchSponsorProfile = async (currentUserId: string) => {
    console.log('[Auth] fetchSponsorProfile for user ID:', currentUserId);
    // setIsLoadingProfiles(true); // This will be managed by loadUserProfiles
    try {
      const { data, error } = await supabase.from('sponsors').select('*').eq('user_id', currentUserId).single();
      if (error && error.code !== 'PGRST116') { // PGRST116: single row not found (expected if not a sponsor)
        console.error('[Auth] Error fetching sponsor profile:', error.message);
      }
      setSponsorProfile(data || null);
      setIsSponsor(!!data);
      console.log('[Auth] fetchSponsorProfile complete. IsSponsor:', !!data, 'Profile:', data);
    } catch (e: any) {
      console.error('[Auth] Exception in fetchSponsorProfile:', e.message);
      setSponsorProfile(null); setIsSponsor(false);
    }
  };

  const fetchOrCreateBuilderProfile = async (currentUser: User) => {
    console.log('[Auth] fetchOrCreateBuilderProfile for user:', currentUser.email);
    // setIsLoadingProfiles(true); // This will be managed by loadUserProfiles
    try {
      // Assuming builders.id is linked to auth.users.id
      const { data: existingBuilder, error: fetchError } = await supabase.from('builders').select('*').eq('id', currentUser.id).single();
      if (fetchError && fetchError.code === 'PGRST116') { // Not found, create it
        console.log('[Auth] No builder profile found, creating one...');
        const githubUsername = currentUser.user_metadata?.user_name;
        const newBuilderData = {
          id: currentUser.id,
          email: currentUser.email!,
          name: currentUser.user_metadata?.full_name || githubUsername || `Builder-${currentUser.id.substring(0, 6)}`,
          github_handle: githubUsername || null,
          github_url: githubUsername ? `https://github.com/${githubUsername}` : null,
          avatar_url: currentUser.user_metadata?.avatar_url || null,
        };
        const { data: newProfile, error: createError } = await supabase.from('builders').insert(newBuilderData).select().single();
        if (createError) {
          console.error('[Auth] Error creating builder profile:', createError.message);
          toast({ title: "Profile Creation Failed", description: createError.message, variant: "destructive" });
          setBuilderProfile(null); setIsBuilder(false);
        } else {
          setBuilderProfile(newProfile); setIsBuilder(true);
          toast({ title: "Welcome, Builder!", description: "Your EliteBuilders profile is ready." });
        }
      } else if (fetchError) {
        console.error('[Auth] Error fetching builder profile:', fetchError.message);
        setBuilderProfile(null); setIsBuilder(false);
      } else {
        setBuilderProfile(existingBuilder); setIsBuilder(true);
      }
    } catch (e: any) {
      console.error('[Auth] Exception in fetchOrCreateBuilderProfile:', e.message);
      setBuilderProfile(null); setIsBuilder(false);
    }
  };

  const loadUserProfiles = async (currentUser: User | null) => {
    if (!currentUser) {
      console.log('[Auth] loadUserProfiles: No current user. Resetting profile states.');
      setSponsorProfile(null); setIsSponsor(false);
      setBuilderProfile(null); setIsBuilder(false);
      setIsLoadingProfiles(false);
      return;
    }
    console.log('[Auth] loadUserProfiles: Loading profiles for user:', currentUser.email);
    setIsLoadingProfiles(true);
    try {
      // Determine if this user signed in via GitHub for builder profile creation logic
      const isGitHubUser = currentUser.app_metadata.provider === 'github' || !!session?.provider_token;

      const profilesToFetch = [fetchSponsorProfile(currentUser.id)];
      if (isGitHubUser) {
        profilesToFetch.push(fetchOrCreateBuilderProfile(currentUser));
      } else {
        // If not GitHub, just try to fetch existing builder profile without auto-creating
        profilesToFetch.push(
          (async () => {
            const { data } = await supabase.from('builders').select('*').eq('id', currentUser.id).single();
            setBuilderProfile(data || null); setIsBuilder(!!data);
          })()
        );
      }
      await Promise.all(profilesToFetch);
    } catch (error) {
      console.error("[Auth] Error during loadUserProfiles Promise.all:", error);
      // Individual fetch functions handle their own error states
    } finally {
      console.log('[Auth] loadUserProfiles: Finished. Setting isLoadingProfiles to false.');
      setIsLoadingProfiles(false);
    }
  };

  useEffect(() => {
    console.log('[Auth] AuthProvider useEffect mounting. Initial isLoading=true.');
    setIsLoading(true);

    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      console.log('[Auth] Initial getSession response. Session:', initialSession);
      setSession(initialSession);
      const initialUser = initialSession?.user ?? null;
      setUser(initialUser);

      if (initialUser) {
        await loadUserProfiles(initialUser);
      } else {
        setIsLoadingProfiles(false); // No user, so profiles aren't loading
      }
      setIsLoading(false); // Initial auth (session/user) check is complete
      console.log('[Auth] Initial session processing done. isLoading=false.');
    }).catch(error => {
      console.error("[Auth] Critical error in initial getSession:", error);
      resetAllStatesToLoggedOut(); // Resets all states including isLoading and isLoadingProfiles
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('[Auth] onAuthStateChange. Event:', event, 'Session:', currentSession);

      // Immediately update session and user state
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (event === 'SIGNED_IN') {
        setIsLoading(true); // Overall loading during sign-in process
        toast({ title: "Signed in successfully", description: "Welcome back!" });
        await loadUserProfiles(currentUser);
        // Determine navigation after profiles are loaded
        const from = location.state?.from?.pathname;
        // Need to get the latest isSponsor after loadUserProfiles
        const currentSponsorStatus = supabase.auth.getUser().then(async ({ data: { user: activeUser } }) => {
          if (!activeUser) return false;
          const { data: spProfile } = await supabase.from('sponsors').select('id').eq('user_id', activeUser.id).single();
          return !!spProfile;
        });

        currentSponsorStatus.then(isNowSponsor => {
          const defaultRedirect = isNowSponsor ? '/sponsor' : '/dashboard';
          navigate(from || defaultRedirect, { replace: true });
          setIsLoading(false);
        });
      } else if (event === 'SIGNED_OUT') {
        toast({ title: "Signed out successfully", description: "Come back soon!" });
        resetAllStatesToLoggedOut(); // This sets isLoading=false
        navigate('/');
      } else if (event === 'USER_UPDATED') {
        setIsLoading(true);
        if (currentUser) await loadUserProfiles(currentUser);
        setIsLoading(false);
      } else if (event === 'INITIAL_SESSION') {
        // This event might fire after getSession. We've already handled initial load.
        // If user state changed here (e.g. was null, now non-null), reload profiles.
        // This condition means getSession() finished, and onAuthStateChange is providing its initial state.
        // setIsLoading was true from mount, loadUserProfiles called in getSession().then().
        // So, effectively, just ensure isLoading becomes false if not already done by getSession().then()
        if (isLoading) setIsLoading(false);
      } else {
        // For other events like TOKEN_REFRESHED, ensure isLoading is false if no other handler set it.
        if (isLoading) setIsLoading(false);
      }
    });

    return () => {
      console.log('[Auth] AuthProvider unmounting. Unsubscribing.');
      subscription.unsubscribe();
    };
  }, [navigate, location.state]); // Added location.state for SIGNED_IN redirect logic

  const commonAuthOperationStart = () => {
    console.log('[Auth] Auth Operation START.');
    setIsLoading(true); // Indicate an auth operation (signIn, signUp, signOut) is in progress
  };

  // --- Auth action functions (signUp, signIn, signInWithGitHub, signOut) ---
  // These should set setIsLoading(true) at the start if they initiate an auth flow,
  // and handle setting it false on error if onAuthStateChange doesn't take over.
  // onAuthStateChange is the primary mechanism for setting isLoading=false after successful auth events.

  const signUp = async (email: string, password: string, data?: { name?: string, company?: string, website?: string }) => {
    commonAuthOperationStart();
    try {
      const { error, data: signUpData } = await supabase.auth.signUp({ email, password, options: { data: { name: data?.name || '' } } });

      // If auto-signed in immediately (no email verification required), insert sponsor

      await supabase.from('sponsors').insert({
        user_id: signUpData.user.id,
        email: signUpData.user.email!,
        name: data.name,
        company: data.company || null,
        website: data.website || null,
      });


      if (!signUpData.session) {
        setIsLoading(false); // Don't hang on if verification is needed
      }

      if (error) throw error;
      toast({ title: "Registration successful", description: "Please check your email for verification." });
      if (!signUpData.session) { // If email verification is required, user isn't signed in yet
        setIsLoading(false); // Stop loading, wait for user to verify
      }
      // If auto-signed in, onAuthStateChange will handle isLoading and profile loading.
    } catch (error: any) {
      toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
      setIsLoading(false); // Error during sign-up, stop loading.
    }
  };

  const signIn = async (email: string, password: string) => {
    commonAuthOperationStart();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange will handle loading states and profile fetching.
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      setIsLoading(false); // Error during sign-in, stop loading.
    }
  };

  const signInWithGitHub = async () => {
    commonAuthOperationStart();
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: `${window.location.origin}/` } });
      if (error) {
        toast({ title: "GitHub Sign-In Failed", description: error.message, variant: "destructive" });
        setIsLoading(false); // Error initiating OAuth, stop loading.
        throw error;
      }
      // Page redirects; onAuthStateChange handles state on return.
    } catch (error: any) {
      console.error('[Auth] Error initiating GitHub Sign-In:', error);
      if (isLoading) setIsLoading(false); // Ensure loading stops if error caught here
    }
  };

  const signOut = async () => {
    commonAuthOperationStart();
    console.log('[Auth] signOut: Attempting to sign out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[Auth] signOut: Supabase sign out error -', error);
        toast({ title: "Sign out failed", description: error.message, variant: "destructive" });
        setIsLoading(false);
        throw error;
      }
      console.log('[Auth] signOut: Supabase signOut successful. onAuthStateChange will handle everything else.');
      // navigate('/'); // Navigation is now handled inside onAuthStateChange SIGNED_OUT
    } catch (e: any) {
      console.error('[Auth] signOut: Catch block error -', e.message, e);
      if (isLoading) setIsLoading(false);
    }
  };

  const refreshSponsorProfile = async () => { if (user && !isLoadingProfiles) { setIsLoadingProfiles(true); await fetchSponsorProfile(user.id); setIsLoadingProfiles(false); } };
  const refreshBuilderProfile = async () => { if (user && !isLoadingProfiles) { setIsLoadingProfiles(true); await fetchOrCreateBuilderProfile(user); setIsLoadingProfiles(false); } };

  const value = {
    session, user, sponsorProfile, isSponsor, builderProfile, isBuilder,
    isLoading, isLoadingProfiles,
    signUp, signIn, signInWithGitHub, signOut,
    refreshSponsorProfile, refreshBuilderProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};