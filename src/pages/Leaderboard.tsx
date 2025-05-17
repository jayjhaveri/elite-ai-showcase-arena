
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  ChevronDown,
  ChevronUp,
  Search,
  Trophy,
  Users,
} from 'lucide-react';

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: '1',
    name: 'Alex Johnson',
    challengesWon: 12,
    totalPoints: 9850,
    achievements: 15,
    rank: 1,
    avatarUrl: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: '2',
    name: 'Taylor Smith',
    challengesWon: 10,
    totalPoints: 8720,
    achievements: 13,
    rank: 2,
    avatarUrl: 'https://i.pravatar.cc/150?u=taylor'
  },
  {
    id: '3',
    name: 'Jamie Wilson',
    challengesWon: 9,
    totalPoints: 8100,
    achievements: 11,
    rank: 3,
    avatarUrl: 'https://i.pravatar.cc/150?u=jamie'
  },
  {
    id: '4',
    name: 'Morgan Lee',
    challengesWon: 8,
    totalPoints: 7600,
    achievements: 10,
    rank: 4,
    avatarUrl: 'https://i.pravatar.cc/150?u=morgan'
  },
  {
    id: '5',
    name: 'Casey Garcia',
    challengesWon: 7,
    totalPoints: 6900,
    achievements: 9,
    rank: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=casey'
  },
  {
    id: '6',
    name: 'Jordan Rivera',
    challengesWon: 6,
    totalPoints: 6200,
    achievements: 8,
    rank: 6,
    avatarUrl: 'https://i.pravatar.cc/150?u=jordan'
  },
  {
    id: '7',
    name: 'Riley Cooper',
    challengesWon: 5,
    totalPoints: 5900,
    achievements: 7,
    rank: 7,
    avatarUrl: 'https://i.pravatar.cc/150?u=riley'
  },
  {
    id: '8',
    name: 'Avery Martinez',
    challengesWon: 5,
    totalPoints: 5500,
    achievements: 7,
    rank: 8,
    avatarUrl: 'https://i.pravatar.cc/150?u=avery'
  },
  {
    id: '9',
    name: 'Charlie Thompson',
    challengesWon: 4,
    totalPoints: 5100,
    achievements: 6,
    rank: 9,
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie'
  },
  {
    id: '10',
    name: 'Quinn Adams',
    challengesWon: 4,
    totalPoints: 4800,
    achievements: 6,
    rank: 10,
    avatarUrl: 'https://i.pravatar.cc/150?u=quinn'
  }
];

type SortKey = 'rank' | 'totalPoints' | 'challengesWon' | 'achievements';

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState('allTime');
  
  // Handle sorting
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  
  // Filter and sort leaderboard data
  const filteredData = mockLeaderboardData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'rank') {
      comparison = a.rank - b.rank;
    } else if (sortBy === 'totalPoints') {
      comparison = a.totalPoints - b.totalPoints;
    } else if (sortBy === 'challengesWon') {
      comparison = a.challengesWon - b.challengesWon;
    } else if (sortBy === 'achievements') {
      comparison = a.achievements - b.achievements;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Leaderboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See who's leading in challenges and achievements. Compete with other developers to reach the top.
        </p>
      </div>
      
      {/* Top 3 Developers */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Top Developers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 2nd Place */}
          <div className="relative flex flex-col items-center order-1 md:order-1">
            <div className="absolute -top-5">
              <Badge className="bg-gray-200 text-gray-800 px-3 py-1 text-sm">
                <Trophy className="h-4 w-4 mr-1" />
                2nd Place
              </Badge>
            </div>
            <Avatar className="h-28 w-28 border-4 border-gray-300 mb-4">
              <AvatarImage src={mockLeaderboardData[1].avatarUrl} />
              <AvatarFallback>{mockLeaderboardData[1].name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-medium mb-1">{mockLeaderboardData[1].name}</h3>
            <p className="text-gray-500 font-medium">{mockLeaderboardData[1].totalPoints.toLocaleString()} Points</p>
          </div>
          
          {/* 1st Place */}
          <div className="relative flex flex-col items-center order-0 md:order-0">
            <div className="absolute -top-6">
              <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1 text-sm">
                <Trophy className="h-4 w-4 mr-1 text-yellow-600" />
                1st Place
              </Badge>
            </div>
            <Avatar className="h-36 w-36 border-4 border-yellow-400 mb-4">
              <AvatarImage src={mockLeaderboardData[0].avatarUrl} />
              <AvatarFallback>{mockLeaderboardData[0].name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">{mockLeaderboardData[0].name}</h3>
            <p className="text-gray-700 font-medium">{mockLeaderboardData[0].totalPoints.toLocaleString()} Points</p>
          </div>
          
          {/* 3rd Place */}
          <div className="relative flex flex-col items-center order-2 md:order-2">
            <div className="absolute -top-5">
              <Badge className="bg-amber-100 text-amber-800 px-3 py-1 text-sm">
                <Trophy className="h-4 w-4 mr-1 text-amber-600" />
                3rd Place
              </Badge>
            </div>
            <Avatar className="h-24 w-24 border-4 border-amber-300 mb-4">
              <AvatarImage src={mockLeaderboardData[2].avatarUrl} />
              <AvatarFallback>{mockLeaderboardData[2].name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-medium mb-1">{mockLeaderboardData[2].name}</h3>
            <p className="text-gray-500 font-medium">{mockLeaderboardData[2].totalPoints.toLocaleString()} Points</p>
          </div>
        </div>
      </div>
      
      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Full Leaderboard</CardTitle>
              <CardDescription>Rankings across all challenges and competitions</CardDescription>
            </div>
            <div className="w-full sm:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="allTime">All Time</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="allTime" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium text-gray-500 text-sm w-16">Rank</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 text-sm">Developer</th>
                      <th 
                        className="px-4 py-3 text-left font-medium text-gray-500 text-sm cursor-pointer"
                        onClick={() => handleSort('totalPoints')}
                      >
                        <div className="flex items-center">
                          <span>Points</span>
                          {sortBy === 'totalPoints' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left font-medium text-gray-500 text-sm cursor-pointer"
                        onClick={() => handleSort('challengesWon')}
                      >
                        <div className="flex items-center">
                          <span>Challenges Won</span>
                          {sortBy === 'challengesWon' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left font-medium text-gray-500 text-sm cursor-pointer hidden sm:table-cell"
                        onClick={() => handleSort('achievements')}
                      >
                        <div className="flex items-center">
                          <span>Achievements</span>
                          {sortBy === 'achievements' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-4 text-left">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                            {user.rank}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={user.avatarUrl} />
                              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left font-medium">
                          {user.totalPoints.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-left">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                            <span>{user.challengesWon}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left hidden sm:table-cell">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-purple-500 mr-2" />
                            <span>{user.achievements}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {sortedData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center">
                          <Users className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-500 font-medium">No developers found</p>
                          <p className="text-gray-400 text-sm">Try adjusting your search</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="py-10 text-center">
                <Award className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-xl font-medium mb-2">Monthly Rankings Coming Soon</h3>
                <p className="text-gray-500 mb-4">
                  We're currently calculating the monthly rankings for this period.
                </p>
                <Button variant="outline" onClick={() => setActiveTab('allTime')}>
                  View All-Time Rankings
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="py-10 text-center">
                <Award className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-xl font-medium mb-2">Weekly Rankings Coming Soon</h3>
                <p className="text-gray-500 mb-4">
                  We're currently calculating the weekly rankings for this period.
                </p>
                <Button variant="outline" onClick={() => setActiveTab('allTime')}>
                  View All-Time Rankings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
