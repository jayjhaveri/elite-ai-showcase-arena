
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Trophy,
  Star,
  ArrowRight,
  Filter
} from "lucide-react";

// Mock leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    name: "Alex Chen",
    title: "AI Developer",
    score: 342,
    badges: 4,
    challenges: 7,
    isSponsorPick: true,
    profileImage: null
  },
  {
    rank: 2,
    name: "Priya Sharma",
    title: "ML Engineer",
    score: 315,
    badges: 3,
    challenges: 5,
    isSponsorPick: false,
    profileImage: null
  },
  {
    rank: 3,
    name: "Michael Johnson",
    title: "Data Scientist",
    score: 298,
    badges: 4,
    challenges: 6,
    isSponsorPick: true,
    profileImage: null
  },
  {
    rank: 4,
    name: "Sophia Rodriguez",
    title: "NLP Specialist",
    score: 287,
    badges: 2,
    challenges: 4,
    isSponsorPick: false,
    profileImage: null
  },
  {
    rank: 5,
    name: "Wei Zhang",
    title: "Computer Vision Engineer",
    score: 264,
    badges: 3,
    challenges: 5,
    isSponsorPick: true,
    profileImage: null
  },
  {
    rank: 6,
    name: "David Kim",
    title: "AI Researcher",
    score: 251,
    badges: 2,
    challenges: 4,
    isSponsorPick: false,
    profileImage: null
  },
  {
    rank: 7,
    name: "Emma Wilson",
    title: "Full-stack AI Developer",
    score: 235,
    badges: 2,
    challenges: 3,
    isSponsorPick: false,
    profileImage: null
  },
  {
    rank: 8,
    name: "Carlos Mendez",
    title: "ML Engineer",
    score: 219,
    badges: 1,
    challenges: 4,
    isSponsorPick: true,
    profileImage: null
  },
  {
    rank: 9,
    name: "Aisha Patel",
    title: "AI Product Developer",
    score: 204,
    badges: 2,
    challenges: 4,
    isSponsorPick: false,
    profileImage: null
  },
  {
    rank: 10,
    name: "Jordan Lee",
    title: "LLM Specialist",
    score: 196,
    badges: 1,
    challenges: 3,
    isSponsorPick: false,
    profileImage: null
  }
];

// Challenge categories for filtering
const challengeCategories = [
  "All Categories",
  "Computer Vision",
  "NLP",
  "LLMs",
  "Data Science",
  "ML Ops",
  "Full-stack AI",
  "Generative AI"
];

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Filtered leaderboard based on search term
  const filteredLeaderboard = mockLeaderboard.filter(builder => 
    builder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    builder.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-600">
            Discover top AI builders ranked by their performance across all challenges
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search builders..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter (simplified for this implementation) */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {challengeCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="all-time" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="by-challenge">By Challenge</TabsTrigger>
          </TabsList>
          
          {/* All Time Tab */}
          <TabsContent value="all-time">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>All Time Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Top 3 Podium - Desktop View */}
                <div className="hidden md:flex justify-center items-end mb-12 mt-6 space-x-4">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden mb-2">
                      {/* Profile image placeholder */}
                    </div>
                    <h3 className="font-semibold text-sm">{mockLeaderboard[1].name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{mockLeaderboard[1].score} pts</p>
                    <div className="h-28 w-20 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-xl font-bold">2</span>
                    </div>
                  </div>
                  
                  {/* 1st Place */}
                  <div className="flex flex-col items-center -mt-8">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-2">
                      {/* Profile image placeholder */}
                    </div>
                    <h3 className="font-semibold text-sm">{mockLeaderboard[0].name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{mockLeaderboard[0].score} pts</p>
                    <div className="h-36 w-24 bg-purple-600 rounded-t-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                  </div>
                  
                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden mb-2">
                      {/* Profile image placeholder */}
                    </div>
                    <h3 className="font-semibold text-sm">{mockLeaderboard[2].name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{mockLeaderboard[2].score} pts</p>
                    <div className="h-24 w-20 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-xl font-bold">3</span>
                    </div>
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left text-gray-700">
                        <th className="px-4 py-3 font-medium">Rank</th>
                        <th className="px-4 py-3 font-medium">Builder</th>
                        <th className="px-4 py-3 font-medium text-right">Career Score</th>
                        <th className="px-4 py-3 font-medium text-right">Challenges</th>
                        <th className="px-4 py-3 font-medium text-right">Badges</th>
                        <th className="px-4 py-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredLeaderboard.map((builder) => (
                        <tr key={builder.rank} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              {builder.rank === 1 ? (
                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2 text-yellow-700 font-bold">
                                  1
                                </div>
                              ) : builder.rank <= 3 ? (
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 font-bold">
                                  {builder.rank}
                                </div>
                              ) : (
                                <span className="px-2">{builder.rank}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                              <div>
                                <div className="font-medium flex items-center">
                                  {builder.name}
                                  {builder.isSponsorPick && (
                                    <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-300 text-xs">
                                      <Star className="h-3 w-3 mr-1" /> Sponsor Pick
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">{builder.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right font-semibold">{builder.score}</td>
                          <td className="px-4 py-4 text-right">{builder.challenges}</td>
                          <td className="px-4 py-4 text-right">{builder.badges}</td>
                          <td className="px-4 py-4 text-right">
                            <Link to={`/profile/${builder.rank}`}>
                              <Button variant="ghost" size="sm">
                                Profile
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* View More Button */}
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    Load More Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Monthly Tab */}
          <TabsContent value="monthly">
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-600 mb-4">Monthly leaderboards will be available soon!</p>
                <Button variant="outline">Get Notified</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* By Challenge Tab */}
          <TabsContent value="by-challenge">
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-600 mb-4">Per-challenge leaderboards will be available soon!</p>
                <Button variant="outline">Get Notified</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
