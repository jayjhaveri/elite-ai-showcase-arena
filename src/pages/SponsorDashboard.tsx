
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Trophy, 
  ArrowRight, 
  Star, 
  LayoutDashboard, 
  FileText, 
  Video,
  Check,
  Search,
  Edit,
  Filter,
  Calendar,
  Code // Add the missing Code import here
} from "lucide-react";

// Mock challenge data
const activeChallenges = [
  {
    id: 1,
    title: "AI Photo Editor",
    submissionsCount: 17,
    inProgress: 42,
    daysLeft: 13,
    deadline: "May 30, 2025",
    status: "active"
  },
  {
    id: 2,
    title: "Intelligent Code Assistant",
    submissionsCount: 9,
    inProgress: 24,
    daysLeft: 29,
    deadline: "June 15, 2025",
    status: "active"
  }
];

const pastChallenges = [
  {
    id: 3,
    title: "Voice Recognition Tool",
    submissionsCount: 32,
    winnersSelected: true,
    date: "April 10, 2025",
    status: "completed"
  },
  {
    id: 4,
    title: "Healthcare ML Predictor",
    submissionsCount: 18,
    winnersSelected: true,
    date: "March 5, 2025",
    status: "completed"
  }
];

// Mock submission data
const submissions = [
  {
    id: 1,
    challengeId: 1,
    builderName: "Alex Chen",
    submissionDate: "May 15, 2025",
    score: 92,
    hasRepo: true,
    hasPresentation: true,
    hasDemo: true,
    status: "reviewed"
  },
  {
    id: 2,
    challengeId: 1,
    builderName: "Priya Sharma",
    submissionDate: "May 14, 2025",
    score: 88,
    hasRepo: true,
    hasPresentation: true,
    hasDemo: true,
    status: "reviewed"
  },
  {
    id: 3,
    challengeId: 1,
    builderName: "Michael Johnson",
    submissionDate: "May 16, 2025",
    score: 85,
    hasRepo: true,
    hasPresentation: true,
    hasDemo: false,
    status: "needs_review"
  },
  {
    id: 4,
    challengeId: 1,
    builderName: "Wei Zhang",
    submissionDate: "May 12, 2025",
    score: 95,
    hasRepo: true,
    hasPresentation: true,
    hasDemo: true,
    status: "reviewed"
  },
  {
    id: 5,
    challengeId: 2,
    builderName: "Emma Wilson",
    submissionDate: "May 16, 2025",
    score: 89,
    hasRepo: true,
    hasPresentation: true,
    hasDemo: true,
    status: "reviewed"
  }
];

const SponsorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState<number | "all">("all");
  
  // Filter submissions based on search term and selected challenge
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.builderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChallenge = selectedChallenge === "all" || submission.challengeId === selectedChallenge;
    return matchesSearch && matchesChallenge;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sponsor Dashboard</h1>
            <p className="text-gray-600">Manage your challenges and review submissions</p>
          </div>
          <Button className="mt-4 md:mt-0">
            Post New Challenge
          </Button>
        </div>

        {/* Sponsor Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">4</div>
                <p className="text-gray-600 text-sm">Total Challenges</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">76</div>
                <p className="text-gray-600 text-sm">Total Submissions</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">26</div>
                <p className="text-gray-600 text-sm">Active Builders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">12</div>
                <p className="text-gray-600 text-sm">Need Review</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="builders">Builders</TabsTrigger>
          </TabsList>
          
          {/* Challenges Tab */}
          <TabsContent value="challenges">
            <div className="space-y-8">
              {/* Active Challenges */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Active Challenges</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {activeChallenges.map((challenge) => (
                    <div key={challenge.id} className="mb-6 last:mb-0 border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Deadline: {challenge.deadline} ({challenge.daysLeft} days left)</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Badge className="bg-green-100 text-green-800">
                            {challenge.submissionsCount} Submissions
                          </Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {challenge.inProgress} In Progress
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        <Button variant="outline" size="sm">
                          <Link to={`/challenges/${challenge.id}`}>View Challenge</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          View Submissions
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Challenge
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Past Challenges */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Past Challenges</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {pastChallenges.map((challenge) => (
                    <div key={challenge.id} className="mb-6 last:mb-0 border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Completed on {challenge.date}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Badge className="bg-purple-100 text-purple-800">
                            {challenge.submissionsCount} Submissions
                          </Badge>
                          {challenge.winnersSelected && (
                            <Badge className="bg-green-100 text-green-800">
                              Winners Selected
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        <Button variant="outline" size="sm">
                          <Link to={`/challenges/${challenge.id}`}>View Challenge</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          View Submissions
                        </Button>
                        <Button variant="outline" size="sm">
                          View Winners
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader className="border-b">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle>Challenge Submissions</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search builders..."
                        className="pl-9 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="flex h-10 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedChallenge}
                      onChange={(e) => setSelectedChallenge(e.target.value === "all" ? "all" : Number(e.target.value))}
                    >
                      <option value="all">All Challenges</option>
                      {activeChallenges.map(challenge => (
                        <option key={challenge.id} value={challenge.id}>{challenge.title}</option>
                      ))}
                      {pastChallenges.map(challenge => (
                        <option key={challenge.id} value={challenge.id}>{challenge.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b text-sm">
                      <tr>
                        <th className="text-left font-medium px-4 py-3">Builder</th>
                        <th className="text-left font-medium px-4 py-3">Challenge</th>
                        <th className="text-left font-medium px-4 py-3">Submitted</th>
                        <th className="text-left font-medium px-4 py-3">Assets</th>
                        <th className="text-left font-medium px-4 py-3">Score</th>
                        <th className="text-right font-medium px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredSubmissions.map((submission) => {
                        const challenge = [...activeChallenges, ...pastChallenges].find(c => c.id === submission.challengeId);
                        
                        return (
                          <tr key={submission.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <div className="font-medium">{submission.builderName}</div>
                            </td>
                            <td className="px-4 py-4">
                              {challenge?.title}
                            </td>
                            <td className="px-4 py-4 text-gray-600">
                              {submission.submissionDate}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex space-x-2">
                                {submission.hasRepo && (
                                  <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center" title="GitHub Repository">
                                    <Code className="h-3 w-3 text-gray-600" />
                                  </div>
                                )}
                                {submission.hasPresentation && (
                                  <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center" title="Presentation">
                                    <FileText className="h-3 w-3 text-gray-600" />
                                  </div>
                                )}
                                {submission.hasDemo && (
                                  <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center" title="Demo Video">
                                    <Video className="h-3 w-3 text-gray-600" />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {submission.status === "reviewed" ? (
                                <div className="font-semibold">{submission.score}</div>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  Needs Review
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex justify-end">
                                <Button variant="ghost" size="sm" className="text-purple-800">
                                  View Details
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Builders Tab */}
          <TabsContent value="builders">
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-600 mb-4">Builder tracking and analytics will be available soon!</p>
                <Button variant="outline">Get Notified</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SponsorDashboard;
