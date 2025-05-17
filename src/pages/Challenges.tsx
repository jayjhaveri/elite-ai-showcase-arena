
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, Calendar, Clock, Star, Trophy } from "lucide-react";

// Mock data for challenges
const mockChallenges = [
  {
    id: 1,
    title: "AI Photo Editor",
    description: "Create an AI-powered photo editing tool with creative filters and enhancements.",
    sponsor: "ImageTech AI",
    difficulty: "Medium",
    deadline: "May 30, 2025",
    daysLeft: 13,
    categories: ["Computer Vision", "UX", "Creative"],
    isFeatured: true,
    isNew: false,
    prizeAmount: "$2,500",
  },
  {
    id: 2,
    title: "Intelligent Code Assistant",
    description: "Build an intelligent coding assistant that helps developers write better code.",
    sponsor: "CodeGenius",
    difficulty: "Hard",
    deadline: "June 15, 2025",
    daysLeft: 29,
    categories: ["NLP", "Developer Tools"],
    isFeatured: false,
    isNew: true,
    prizeAmount: "$3,500",
  },
  {
    id: 3,
    title: "ML Data Visualizer",
    description: "Develop interactive visualizations for complex machine learning datasets.",
    sponsor: "DataViz Corp",
    difficulty: "Advanced",
    deadline: "June 28, 2025",
    daysLeft: 42,
    categories: ["Data Science", "Visualization"],
    isFeatured: false,
    isNew: false,
    prizeAmount: "$2,000",
  },
  {
    id: 4,
    title: "Sentiment Analysis Tool",
    description: "Create a sentiment analysis tool for social media content.",
    sponsor: "SocialAI",
    difficulty: "Medium",
    deadline: "July 10, 2025",
    daysLeft: 54,
    categories: ["NLP", "Social Media", "Analytics"],
    isFeatured: false,
    isNew: true,
    prizeAmount: "$3,000",
  },
  {
    id: 5,
    title: "AI Music Composer",
    description: "Build an AI that composes original music based on user preferences.",
    sponsor: "HarmonyTech",
    difficulty: "Hard",
    deadline: "July 22, 2025",
    daysLeft: 66,
    categories: ["Audio", "Creative", "ML"],
    isFeatured: true,
    isNew: false,
    prizeAmount: "$4,000",
  },
  {
    id: 6,
    title: "Recommendation Engine",
    description: "Develop a sophisticated recommendation engine for e-commerce products.",
    sponsor: "ShopSmart",
    difficulty: "Medium",
    deadline: "August 5, 2025",
    daysLeft: 80,
    categories: ["E-commerce", "ML", "Analytics"],
    isFeatured: false,
    isNew: false,
    prizeAmount: "$3,000",
  },
];

// Filter categories
const allCategories = Array.from(new Set(mockChallenges.flatMap(challenge => challenge.categories)));

const difficultyLevels = ["Easy", "Medium", "Hard", "Advanced"];

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);

  // Filter challenges
  const filteredChallenges = mockChallenges.filter(challenge => {
    // Search term filter
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.sponsor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
                           challenge.categories.some(cat => selectedCategories.includes(cat));
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulties.length === 0 || 
                             selectedDifficulties.includes(challenge.difficulty);
    
    // Featured filter
    const matchesFeatured = !showFeaturedOnly || challenge.isFeatured;
    
    // New filter
    const matchesNew = !showNewOnly || challenge.isNew;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFeatured && matchesNew;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Challenges</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Browse and participate in cutting-edge AI challenges from top companies. 
            Showcase your skills and get discovered by potential employers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedDifficulties([]);
                    setShowFeaturedOnly(false);
                    setShowNewOnly(false);
                  }}
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="text-sm font-medium block mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search challenges..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Featured & New */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Challenge Status</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={showFeaturedOnly}
                      onCheckedChange={() => setShowFeaturedOnly(!showFeaturedOnly)} 
                    />
                    <label htmlFor="featured" className="text-sm">
                      Featured Challenges
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="new" 
                      checked={showNewOnly}
                      onCheckedChange={() => setShowNewOnly(!showNewOnly)} 
                    />
                    <label htmlFor="new" className="text-sm">
                      New Challenges
                    </label>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Categories</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {allCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Difficulty Level</h4>
                  <div className="space-y-2">
                    {difficultyLevels.map(difficulty => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`difficulty-${difficulty}`} 
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() => toggleDifficulty(difficulty)}
                        />
                        <label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                          {difficulty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Challenge Listing */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {filteredChallenges.length} {filteredChallenges.length === 1 ? 'Challenge' : 'Challenges'}
              </h2>
              <div className="text-sm text-gray-600">
                Showing {filteredChallenges.length} of {mockChallenges.length} challenges
              </div>
            </div>

            <div className="space-y-6">
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map(challenge => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="mb-1">{challenge.title}</CardTitle>
                          <div className="text-sm text-gray-600 mb-2">
                            Sponsored by {challenge.sponsor}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {challenge.isFeatured && (
                            <Badge className="bg-purple-700">Featured</Badge>
                          )}
                          {challenge.isNew && (
                            <Badge className="bg-green-700">New</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {challenge.categories.map((category) => (
                          <Badge key={category} variant="outline">{category}</Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-gray-700">{challenge.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1 flex items-center">
                            <Trophy className="h-3 w-3 mr-1" /> Prize
                          </span>
                          <span className="font-medium">{challenge.prizeAmount}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1 flex items-center">
                            <Star className="h-3 w-3 mr-1" /> Difficulty
                          </span>
                          <span className="font-medium">{challenge.difficulty}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> Deadline
                          </span>
                          <span className="font-medium">{challenge.deadline}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> Time Left
                          </span>
                          <span className="font-medium">{challenge.daysLeft} days</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between">
                      <div className="flex gap-4">
                        <Link to={`/challenges/${challenge.id}`}>
                          <Button variant="default">View Details</Button>
                        </Link>
                        <Link to={`/challenges/${challenge.id}/apply`}>
                          <Button variant="outline">Enter Challenge</Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to find more challenges.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
