
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useUserSubmissions } from '@/hooks/useSubmissions';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Award, 
  ChevronRight, 
  ClipboardList, 
  Clock, 
  Code, 
  FileCode, 
  Rocket,
  Star,
  ThumbsUp, 
  Trophy,
  X
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: submissions, isLoading } = useUserSubmissions();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-8">Please sign in to view your dashboard.</p>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Developer Dashboard</h1>
          <p className="text-gray-600">Track your challenges, submissions, and achievements</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/challenges">
            <Button className="flex items-center">
              <Rocket className="mr-2 h-4 w-4" />
              Explore Challenges
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto p-1">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="submissions" className="py-2">Submissions</TabsTrigger>
          <TabsTrigger value="achievements" className="py-2">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Welcome Card */}
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Welcome, {user.user_metadata?.name || user.email}</h2>
                <p className="text-gray-600 max-w-2xl">
                  Your hub for all EliteBuilders activities. Explore new challenges, track your submissions, and grow your skills.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 py-1.5 px-3 text-sm">
                  Builder
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Submissions</p>
                    <h3 className="text-3xl font-bold">{isLoading ? '-' : submissions?.length || 0}</h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Completed Challenges</p>
                    <h3 className="text-3xl font-bold">0</h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Earned</p>
                    <h3 className="text-3xl font-bold">$0</h3>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Achievements</p>
                    <h3 className="text-3xl font-bold">0</h3>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Submissions</h2>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("submissions")} className="text-gray-500 hover:text-gray-700">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-60" />
                        </div>
                        <div className="mt-3 md:mt-0 flex gap-3">
                          <Skeleton className="h-9 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.slice(0, 3).map((submission) => (
                  <Card key={submission.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-medium">
                            {submission.challenges?.title || 'Unknown Challenge'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Submitted on {new Date(submission.submission_time || submission.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-3 md:mt-0 flex gap-3">
                          <Link to={`/challenges/${submission.challenge_id}`}>
                            <Button variant="outline" size="sm">View Challenge</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-3">
                    <FileCode className="h-10 w-10 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No submissions yet</h3>
                  <p className="text-gray-500 mb-4">
                    You haven't submitted any challenges yet. Start exploring challenges to participate.
                  </p>
                  <Link to="/challenges">
                    <Button>Explore Challenges</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommended Challenges */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended for You</h2>
              <Link to="/challenges">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge>New</Badge>
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h3 className="font-medium mb-1">Explore Challenges</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Check out the latest challenges from top companies.
                  </p>
                  <Link to="/challenges">
                    <Button size="sm" variant="outline" className="w-full">Browse Now</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">Recommended</Badge>
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-medium mb-1">Complete Your Profile</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Add more details to your profile to get personalized recommendations.
                  </p>
                  <Link to="/profile">
                    <Button size="sm" variant="outline" className="w-full">Go to Profile</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">Popular</Badge>
                    <Clock className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="font-medium mb-1">Check Leaderboard</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    See how you rank against other developers on the platform.
                  </p>
                  <Link to="/leaderboard">
                    <Button size="sm" variant="outline" className="w-full">View Leaderboard</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Your Submissions</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-60" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                      <div className="mt-3 md:mt-0 flex gap-3">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : submissions && submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg mb-1">
                          {submission.challenges?.title || 'Unknown Challenge'}
                        </h3>
                        <div className="text-sm text-gray-500 mb-2">
                          Submitted on {new Date(submission.submission_time || submission.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {submission.test_passed === null ? 'Pending Review' : 
                             submission.test_passed ? 'Tests Passed' : 'Tests Failed'}
                          </Badge>
                          {submission.provisional_score !== null && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                              Score: {submission.provisional_score}/100
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                        {submission.github_repo_link && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => window.open(submission.github_repo_link, '_blank')}
                          >
                            View Code
                          </Button>
                        )}
                        <Link to={`/challenges/${submission.challenge_id}`}>
                          <Button size="sm">View Challenge</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-10 text-center">
                <div className="mb-3">
                  <X className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No submissions found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  You haven't submitted any challenges yet. Browse available challenges and start submitting your work.
                </p>
                <Link to="/challenges">
                  <Button>Browse Challenges</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
          
          <Card>
            <CardContent className="p-10 text-center">
              <div className="mb-3">
                <Award className="h-12 w-12 text-purple-500 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No achievements yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Complete challenges and participate in competitions to earn achievements and badges.
              </p>
              <Link to="/challenges">
                <Button>Browse Challenges</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
