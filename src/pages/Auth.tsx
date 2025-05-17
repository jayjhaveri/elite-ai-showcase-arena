// src/pages/Auth.tsx
import React, { useEffect } from "react"; // Removed useState as it's not used for form fields anymore
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { toast as sonnerToast } from "sonner";

const Auth = () => {
  // For GitHub-only builders, we primarily need signInWithGitHub and loading/user state.
  // Email/password signIn/signUp are kept in useAuth for potential future sponsor-specific flows.
  const { signInWithGitHub, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !isLoading) { // Ensure not to redirect while still loading initial auth state
      const from = location.state?.from?.pathname || '/dashboard'; // Default redirect for builders
      sonnerToast.info("Already Logged In", { description: `Redirecting you...` });
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state]);

  const handleGitHubAuth = async () => {
    try {
      await signInWithGitHub();
      // Navigation to GitHub and back is handled by Supabase OAuth flow.
      // onAuthStateChange in useAuth will then manage user state and profile creation.
    } catch (error) {
      // signInWithGitHub in useAuth already handles toasting errors
      console.error("GitHub auth initiation error in Auth.tsx:", error);
    }
  };

  // If user is somehow null but isLoading is false (meaning auth check completed),
  // then render the login options. If still loading, this component won't render this part yet.
  if (isLoading) {
    // Optional: Show a page-level loader if preferred over AuthProvider's handling
    // For now, AuthProvider handles the initial loading state before this component fully renders.
    // Or, if the user becomes non-null during this component's lifecycle, the useEffect above will redirect.
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 className="h-12 w-12 animate-spin text-purple-700" />
      </div>
    );
  }

  // If user is defined after loading, the useEffect above should have redirected.
  // This part is for when user is null (not logged in) after initial load.
  if (user) {
    return null; // Or a loading spinner, as useEffect should redirect.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm shadow-xl">
        {/* ... CardHeader ... */}
        <CardHeader className="text-center">
          <Link to="/" className="inline-block mb-4">
            <span className="text-3xl font-bold text-purple-700">EliteBuilders</span>
          </Link>
          <CardTitle className="text-2xl font-semibold">Join the Arena</CardTitle>
          <CardDescription>
            Sign in or create your builder account with GitHub to start tackling challenges.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-2 pb-4">
          {/* ... GitHub Button ... */}
          <Button
            type="button"
            className="w-full h-12 text-md bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center"
            onClick={handleGitHubAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Github className="mr-2 h-5 w-5" />
            )}
            Continue with GitHub
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">Are you a company looking to sponsor a challenge?</p>
            {/* UPDATED LINK HERE */}
            <Link to="/sponsor-auth" className="font-medium text-purple-600 hover:text-purple-500">
              Sponsor Sign In / Register
            </Link>
          </div>
        </CardContent>
        {/* ... CardFooter ... */}
      </Card>
    </div>
  );
};

export default Auth;