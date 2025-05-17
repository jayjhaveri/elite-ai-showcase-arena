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

// Mock data for challenges
const mockChallenges = [
  {
    id: "1",
    title: "AI Photo Editor",
    description: "Create an AI-powered photo editing tool with creative filters and enhancements.",
    sponsor: "ImageTech AI",
    sponsorLogo: "https://placehold.co/200x80",
    difficulty: "Medium",
    deadline: "May 30, 2025",
    daysLeft: 13,
    categories: ["Computer Vision", "UX", "Creative"],
    isFeatured: true,
    isNew: false,
    prizeAmount: "$2,500",
    prizeBreakdown: [
      { place: "1st Place", amount: "$1,500" },
      { place: "2nd Place", amount: "$750" },
      { place: "3rd Place", amount: "$250" },
    ],
    requirements: [
      "Create an intuitive UI for photo editing",
      "Implement at least 5 AI-powered filters or effects",
      "Include features for automatic enhancement and object removal",
      "Support common image formats (JPG, PNG, etc.)",
      "Provide documentation on the AI models used",
    ],
    submissionRequirements: [
      "GitHub repository with complete source code",
      "3-5 slide presentation explaining your approach",
      "2-minute demo video showcasing the functionality",
      "README with setup instructions",
    ],
    timeline: [
      { date: "April 15, 2025", event: "Challenge Launch" },
      { date: "May 1, 2025", event: "Q&A Session with Sponsor" },
      { date: "May 30, 2025", event: "Submission Deadline" },
      { date: "June 10, 2025", event: "Winners Announced" },
    ],
    fullDescription: `
      This challenge invites you to build a sophisticated AI-powered photo editing tool that combines ease of use with cutting-edge AI capabilities. Your solution should enable users to enhance their photos with intelligent filters, automated adjustments, and creative effects.

      The ideal application will feature an intuitive user interface that allows for both one-click enhancements and more detailed manual adjustments. Your AI components should be able to recognize image elements, suggest improvements, and apply context-aware modifications.

      ImageTech AI is looking for solutions that demonstrate technical proficiency in computer vision and machine learning, while also showing strong product design sensibilities. The winning entries will balance impressive AI capabilities with excellent user experience.

      Participants are encouraged to leverage existing AI models and APIs where appropriate, but must clearly document which components are built from scratch and which utilize third-party services. Code quality, documentation, and the overall user experience will be key factors in the judging process.
    `,
  },
  // Other challenge details would go here...
];

const ChallengeDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Find the challenge with the matching ID
  const challenge = mockChallenges.find((c) => c.id === id);
  
  // Handle case where challenge is not found
  if (!challenge) {
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

  const handleApply = () => {
    toast({
      title: "Application Started",
      description: "You've started the application process for this challenge.",
    });
  };

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
                  <span>Sponsored by {challenge.sponsor}</span>
                </div>
                <div className="flex gap-2">
                  {challenge.categories.map((category) => (
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
                <p className="whitespace-pre-line text-gray-700 mb-6">{challenge.fullDescription}</p>
                
                <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {challenge.requirements.map((req, index) => (
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
                  {challenge.timeline.map((item, index) => (
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
                      src={challenge.sponsorLogo} 
                      alt={`${challenge.sponsor} logo`}
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{challenge.sponsor}</h3>
                    <p className="text-gray-700 mb-4">
                      {challenge.sponsor} is a leading company in the AI imaging space, developing cutting-edge 
                      technologies for photo and video enhancement. They are looking for innovative solutions 
                      that can be integrated into their product ecosystem.
                    </p>
                    <Button variant="outline" onClick={() => window.open('#', '_blank')}>
                      Visit Company Website
                    </Button>
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
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Deadline</div>
                      <div className="font-medium">{challenge.deadline}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Time Remaining</div>
                      <div className="font-medium">{challenge.daysLeft} days</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                      <div className="font-medium">{challenge.difficulty}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Trophy className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Total Prize</div>
                      <div className="font-medium">{challenge.prizeAmount}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-3">Prize Breakdown</h4>
                  <div className="space-y-2">
                    {challenge.prizeBreakdown.map((prize, index) => (
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
                    <Link to="/challenges/2" className="block group-hover:text-purple-800 font-medium">
                      Intelligent Code Assistant
                    </Link>
                    <p className="text-sm text-gray-600">Build an AI coding assistant for developers.</p>
                  </div>
                  <div className="group">
                    <Link to="/challenges/3" className="block group-hover:text-purple-800 font-medium">
                      ML Data Visualizer
                    </Link>
                    <p className="text-sm text-gray-600">Create interactive visualizations for ML datasets.</p>
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

export default ChallengeDetails;
