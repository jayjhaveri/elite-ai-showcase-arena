
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy,
  Star,
  Calendar,
  Clock,
  Briefcase,
  FileText,
  Code,
  Video,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChallengeById } from "@/hooks/useChallenges";
import { Skeleton } from "@/components/ui/skeleton";

const ChallengeDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Fetch challenge details
  const { data: challenge, isLoading, error } = useChallengeById(id);

  // Calculate days left if deadline exists
  const daysLeft = challenge?.deadline
    ? Math.max(0, Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
    : null;
  
  const handleApply = () => {
    toast({
      title: "Application Started",
      description: "You've started the application process for this challenge.",
    });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (error || !challenge) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
        <p className="mb-8">The challenge you're looking for doesn't exist or has been removed.</p>
        <Link to="/challenges">
          <Button>Back to Challenges</Button>
        </Link>
      </div>
    );
  }

  // Format skill level for display
  const formatSkillLevel = (level: string | null) => {
    if (!level) return "Any Level";
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Fake categories based on industry (since we don't have categories in the DB)
  const getCategories = (industry: string | null) => {
    if (!industry) return ["Tech"];
    
    // Map industries to categories
    const categoryMap: Record<string, string[]> = {
      "AI": ["Machine Learning", "Computer Vision", "NLP"],
      "Data Science": ["Analytics", "Big Data", "Visualization"],
      "Web Development": ["Frontend", "Backend", "Full Stack"],
      "Mobile": ["iOS", "Android", "Cross-Platform"],
      "Gaming": ["Game Design", "Unity", "3D"],
    };
    
    return categoryMap[industry] || [industry];
  };

  // Generate reward breakdown (based on reward_structure string)
  const generateRewardBreakdown = (rewardStructure: string | null) => {
    if (!rewardStructure) return [
      { place: "1st Place", amount: "$1,000" },
      { place: "2nd Place", amount: "$500" },
      { place: "3rd Place", amount: "$250" },
    ];
    
    // Try to parse the reward structure
    if (rewardStructure.includes("$")) {
      const totalAmount = rewardStructure.replace(/[^0-9]/g, '');
      const total = parseInt(totalAmount) || 2000;
      
      return [
        { place: "1st Place", amount: `$${Math.round(total * 0.6)}` },
        { place: "2nd Place", amount: `$${Math.round(total * 0.3)}` },
        { place: "3rd Place", amount: `$${Math.round(total * 0.1)}` },
      ];
    }
    
    return [
      { place: "1st Place", amount: rewardStructure },
      { place: "2nd Place", amount: "Recognition" },
      { place: "3rd Place", amount: "Recognition" },
    ];
  };

  // Generate timeline (based on deadline)
  const generateTimeline = (deadline: string | null) => {
    const now = new Date();
    let deadlineDate = deadline ? new Date(deadline) : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const launchDate = new Date(deadlineDate.getTime() - 45 * 24 * 60 * 60 * 1000);
    const qaDate = new Date(deadlineDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const announcementDate = new Date(deadlineDate.getTime() + 10 * 24 * 60 * 60 * 1000);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };
    
    return [
      { date: formatDate(launchDate), event: "Challenge Launch" },
      { date: formatDate(qaDate), event: "Q&A Session with Sponsor" },
      { date: formatDate(deadlineDate), event: "Submission Deadline" },
      { date: formatDate(announcementDate), event: "Winners Announced" },
    ];
  };

  // Generate requirements based on description
  const generateRequirements = (description: string | null) => {
    if (!description || description.length < 20) {
      return [
        "Create an intuitive UI for the application",
        "Implement required features as described",
        "Include documentation on your approach",
        "Support common formats and standards",
        "Provide test cases for your solution",
      ];
    }
    
    // Try to extract requirements from description
    const sentences = description.split(/[.!?]\s+/);
    if (sentences.length >= 5) {
      return sentences.slice(0, 5).map(s => s.trim() + ".");
    }
    
    // Fallback
    return [
      "Implement all features described in overview",
      "Create clean, maintainable code with documentation",
      "Include tests for critical functionality",
      "Follow industry best practices",
      "Submit complete solution before deadline",
    ];
  };
  
  const categories = getCategories(challenge.industry);
  const prizeBreakdown = generateRewardBreakdown(challenge.reward_structure);
  const timeline = generateTimeline(challenge.deadline);
  const requirements = generateRequirements(challenge.description);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <Link to="/challenges" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Challenges
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{challenge.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>
                    Sponsored by {challenge.sponsors?.company || challenge.sponsors?.name || 'Unknown Sponsor'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Badge key={category} variant="secondary" className="bg-white/20 hover:bg-white/30">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to={`/challenges/${challenge.id}/apply`}>
                <Button onClick={handleApply} size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                  Enter Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Challenge Overview</h2>
                <p className="whitespace-pre-line text-gray-700 mb-6">
                  {challenge.description || `
                    This challenge invites you to build a sophisticated application as described. Your solution should enable users to solve real-world problems with elegant technology solutions.

                    The ideal application will feature an intuitive user interface that allows for both simple and advanced usage. Your components should be able to handle various scenarios and apply context-aware modifications.

                    ${challenge.sponsors?.name || 'The sponsor'} is looking for solutions that demonstrate technical proficiency and strong design sensibilities. The winning entries will balance impressive capabilities with excellent user experience.

                    Participants are encouraged to leverage existing tools and APIs where appropriate, but must clearly document which components are built from scratch and which utilize third-party services. Code quality, documentation, and the overall user experience will be key factors in the judging process.
                  `}
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Submission Materials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Code className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub Repository</h4>
                      <p className="text-sm text-gray-600">Complete source code with documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h4 className="font-medium">Presentation</h4>
                      <p className="text-sm text-gray-600">3-5 slides explaining your approach</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Video className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h4 className="font-medium">Demo Video</h4>
                      <p className="text-sm text-gray-600">2-minute demonstration of functionality</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Timeline</h3>
                <div className="space-y-3">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-800 mr-3"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center w-full sm:justify-between">
                        <span className="font-medium">{item.event}</span>
                        <span className="text-gray-600">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About the Sponsor</h2>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={challenge.logo_url || "https://placehold.co/200x80"} 
                      alt={`${challenge.sponsors?.company || challenge.sponsors?.name || 'Sponsor'} logo`}
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {challenge.sponsors?.company || challenge.sponsors?.name || 'Sponsor Company'}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {challenge.sponsors?.company || challenge.sponsors?.name || 'The sponsor'} is a leading company in the {challenge.industry || 'technology'} space, 
                      developing cutting-edge technologies. They are looking for innovative solutions 
                      that can be integrated into their product ecosystem.
                    </p>
                    {challenge.sponsors?.website && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(challenge.sponsors.website, '_blank')}
                      >
                        Visit Company Website
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            {/* Challenge Info Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Challenge Details</h3>
                <div className="space-y-4">
                  {challenge.deadline && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">Deadline</div>
                        <div className="font-medium">
                          {new Date(challenge.deadline).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {daysLeft !== null && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">Time Remaining</div>
                        <div className="font-medium">{daysLeft} days</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Star className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                      <div className="font-medium">{formatSkillLevel(challenge.skill_level)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Trophy className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Total Prize</div>
                      <div className="font-medium">{challenge.reward_structure || 'Rewards Available'}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-3">Prize Breakdown</h4>
                  <div className="space-y-2">
                    {prizeBreakdown.map((prize, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-700">{prize.place}</span>
                        <span className="font-medium">{prize.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link to={`/challenges/${challenge.id}/apply`}>
                    <Button className="w-full" onClick={handleApply}>Enter Challenge</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Related Challenges Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Similar Challenges</h3>
                <div className="space-y-4">
                  <div className="group">
                    <Link to="/challenges" className="block group-hover:text-purple-800 font-medium">
                      Browse More Challenges
                    </Link>
                    <p className="text-sm text-gray-600">Check out other challenges in our platform.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-purple-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center text-white/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-32 bg-white/20" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-between items-start">
          <div>
            <Skeleton className="h-10 w-72 bg-white/20 mb-3" />
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Skeleton className="h-6 w-48 bg-white/20" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 bg-white/20" />
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              <Skeleton className="h-8 w-36 mb-3" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="mt-6">
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default ChallengeDetails;
