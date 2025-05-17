// src/pages/SponsorDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth'; // This should now have isSponsor, sponsorProfile, etc.
import { CreateChallengeForm } from '@/components/CreateChallengeForm';
import { BecomeSponsorForm } from '@/components/BecomeSponsorForm'; // Import this
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { toast as sonnerToast } from "sonner"; // For notifications
import {
  BarChart3,
  Check,
  ChevronRight,
  Clock,
  Code,
  FileCode,
  FileText,
  PlusCircle,
  Users
} from 'lucide-react';

// Mock data (can be removed later when fetching real data)
const mockActiveChallenges = [
  {
    id: "s1",
    title: "AI Photo Editor",
    applicants: 18,
    submissions: 12,
    deadline: "2025-05-30",
    daysLeft: 13
  },
  {
    id: "s2",
    title: "Intelligent Code Assistant",
    applicants: 24,
    submissions: 9,
    deadline: "2025-06-15",
    daysLeft: 29
  }
];

const mockSubmissions = [
  {
    id: "sub1",
    challengeId: "s1",
    developerName: "Alex Johnson",
    submissionDate: "2025-05-10",
    status: "Under Review",
    score: null
  },
  {
    id: "sub2",
    challengeId: "s1",
    developerName: "Taylor Smith",
    submissionDate: "2025-05-11",
    status: "Reviewed",
    score: 85
  },
  // ... other mock submissions
];

const mockStats = {
  totalChallenges: 6,
  activeChallenges: 2,
  completedChallenges: 4,
  totalApplicants: 64,
  totalSubmissions: 43
};

const SponsorDashboard = () => {
  const {
    user,
    isSponsor,
    sponsorProfile,
    isLoading: isLoadingAuth, // Renamed to avoid conflict
    refreshSponsorProfile
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const filteredSubmissions = selectedChallenge
    ? mockSubmissions.filter(sub => sub.challengeId === selectedChallenge)
    : mockSubmissions;

  useEffect(() => {
    // Redirect to auth if not loading and no user
    if (!isLoadingAuth && !user) {
      // If not logged in and trying to access /sponsor, redirect to /sponsor-auth
      // Pass the original intended path (/sponsor) in state so after login, they can be sent back
      console.log('[SponsorDashboard] Not logged in, redirecting to /sponsor-auth');
      navigate('/sponsor-auth', { state: { from: location }, replace: true });
    }
  }, [user, isLoadingAuth, navigate, location]);


  if (isLoadingAuth) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="h-12 w-1/2 mb-8" />
        <Skeleton className="h-10 w-full md:w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
        </div>
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  // If user is logged in but not yet registered as a sponsor
  if (user && !isSponsor) {
    return (
      <div className="container mx-auto max-w-2xl py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Become a Sponsor</CardTitle>
            <CardDescription>
              Register your organization to start creating challenges and finding top AI talent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BecomeSponsorForm onSuccess={async (newSponsorId) => {
              sonnerToast.info("Sponsor Profile Created!", {
                description: "Refreshing your dashboard..."
              });
              await refreshSponsorProfile();
              // The useAuth hook will update isSponsor and sponsorProfile,
              // re-rendering this component to show the dashboard.
            }} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is not logged in (should have been caught by useEffect)
  // OR if they are logged in but somehow sponsorProfile is still null (after loading)
  // This means they are not a recognized sponsor.
  if (!user || !sponsorProfile) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-8">You need to be a registered sponsor to access this dashboard.</p>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  // If we reach here, user is logged in AND isSponsor is true AND sponsorProfile is available
  const handleChallengeCreated = () => {
    setActiveTab("challenges");
    // TODO: Invalidate challenges query when using real data (e.g., queryClient.invalidateQueries(['sponsorChallenges', sponsorProfile.id]))
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          {/* Use sponsorProfile data for the title */}
          <h1 className="text-3xl font-bold mb-1">{sponsorProfile.company || sponsorProfile.name}'s Dashboard</h1>
          <p className="text-gray-600">Manage your challenges and view submissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center" onClick={() => setActiveTab("createChallenge")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Challenge
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-4 h-auto p-1">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="challenges" className="py-2">My Challenges</TabsTrigger>
          <TabsTrigger value="createChallenge" className="py-2">Create Challenge</TabsTrigger>
          <TabsTrigger value="submissions" className="py-2">Submissions</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Challenges</p>
                    <h3 className="text-3xl font-bold">{mockStats.totalChallenges}</h3> {/* Replace with dynamic data */}
                  </div>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <FileCode className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Other stat cards */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Challenges</p>
                    <h3 className="text-3xl font-bold">{mockStats.activeChallenges}</h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Applicants</p>
                    <h3 className="text-3xl font-bold">{mockStats.totalApplicants}</h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Submissions</p>
                    <h3 className="text-3xl font-bold">{mockStats.totalSubmissions}</h3>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Active Challenges</h2>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("challenges")} className="text-gray-500 hover:text-gray-700">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {mockActiveChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockActiveChallenges.map((challenge) => (
                  <Card key={challenge.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          Active
                        </Badge>
                      </div>
                      <CardDescription>
                        Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                        {challenge.daysLeft > 0 && ` (${challenge.daysLeft} days remaining)`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Submissions</span>
                            <span className="font-medium">{challenge.submissions}/{challenge.applicants}</span>
                          </div>
                          <Progress value={(challenge.submissions / challenge.applicants) * 100} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Applicants</p>
                            <p className="font-medium">{challenge.applicants}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Submissions</p>
                            <p className="font-medium">{challenge.submissions}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full" onClick={() => {
                        setSelectedChallenge(challenge.id);
                        setActiveTab("submissions");
                      }}>
                        View Submissions
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No active challenges.
                </CardContent>
              </Card>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock recent activity items */}
                <div className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">New submission received</p>
                    <p className="text-sm text-gray-500">Morgan Lee submitted a solution for AI Photo Editor</p>
                    <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Challenges Tab Content */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Challenges</h2>
            <Button onClick={() => setActiveTab("createChallenge")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Challenge
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Challenges</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {mockActiveChallenges.length > 0 ? (
                mockActiveChallenges.map(challenge => (
                  <Card key={challenge.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium">{challenge.title}</h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">Active</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                              {challenge.daysLeft > 0 && ` (${challenge.daysLeft} days left)`}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{challenge.applicants} Applicants</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{challenge.submissions} Submissions</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-3 justify-end">
                          <Button variant="outline" disabled>Edit (Soon)</Button>
                          <Button onClick={() => {
                            setSelectedChallenge(challenge.id);
                            setActiveTab("submissions");
                          }}>
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    You have no active challenges.
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="completed">
              <Card>
                <CardContent className="p-10 text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No completed challenges</h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    When your challenges are completed, you'll see them here with performance analytics.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft">
              <Card>
                <CardContent className="p-10 text-center">
                  <FileCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No drafts found</h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    You haven't saved any draft challenges yet. Create a new challenge to get started.
                  </p>
                  <Button onClick={() => setActiveTab("createChallenge")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Challenge
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="createChallenge">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create New Challenge</CardTitle>
              <CardDescription>Fill in the details below to launch a new challenge.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateChallengeForm onSuccess={handleChallengeCreated} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Challenge Submissions</h2>
              <p className="text-gray-500">Review and evaluate submitted solutions</p>
            </div>
            <div className="w-full sm:w-auto">
              <select
                className="w-full p-2 border rounded-md bg-background text-foreground"
                value={selectedChallenge || ''}
                onChange={(e) => setSelectedChallenge(e.target.value || null)}
              >
                <option value="">All Challenges</option>
                {mockActiveChallenges.map(challenge => ( // Should be dynamically populated later
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredSubmissions.length > 0 ? (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => {
                const challenge = mockActiveChallenges.find(c => c.id === submission.challengeId);

                return (
                  <Card key={submission.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {challenge?.title || 'Unknown Challenge'}
                          </div>
                          <h3 className="font-medium text-lg mb-1">{submission.developerName}</h3>
                          <div className="text-sm text-gray-500 mb-2">
                            Submitted on {new Date(submission.submissionDate).toLocaleDateString()}
                          </div>
                          <Badge
                            variant="outline"
                            className={submission.status === 'Reviewed'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-amber-50 text-amber-700'
                            }
                          >
                            {submission.status}
                          </Badge>
                          {submission.score !== null && (
                            <span className="ml-3">
                              Score: <span className="font-medium">{submission.score}/100</span>
                            </span>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 flex gap-3">
                          <Button variant="outline" disabled>View (Soon)</Button>
                          {submission.status !== 'Reviewed' && (
                            <Button disabled>Review (Soon)</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-10 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No submissions found</h3>
                <p className="text-gray-500 mb-4 max-w-md mx-auto">
                  {selectedChallenge
                    ? "There are no submissions for the selected challenge yet."
                    : "You haven't received any submissions yet."}
                </p>
                <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                  View All Challenges
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default SponsorDashboard;