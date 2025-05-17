
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Trophy,
  Star,
  FileText,
  User,
  Code,
  Video
} from "lucide-react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Alex Chen",
    title: "AI Developer",
    location: "San Francisco, CA",
    bio: "Machine learning engineer with 3 years of experience building NLP and computer vision solutions. Passionate about creating AI tools that solve real-world problems.",
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "React", "FastAPI"],
    links: [
      { name: "GitHub", url: "https://github.com/alexchen" },
      { name: "LinkedIn", url: "https://linkedin.com/in/alexchen" },
      { name: "Portfolio", url: "https://alexchen.dev" }
    ],
    badges: [
      { name: "Top 10%", icon: Trophy, color: "purple" },
      { name: "Sponsor Pick", icon: Star, color: "blue" },
      { name: "Perfect Score", icon: FileText, color: "green" }
    ],
    stats: {
      challenges: 5,
      completed: 3,
      careerScore: 156,
      ranking: "Top 15%"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <Card className="border-none shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-800 to-purple-600"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-12">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                {/* Profile image placeholder */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left -mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.title} • {user.location}</p>
                  </div>
                  <Button className="mt-4 md:mt-0" variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{user.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.links.map(link => (
                    <a 
                      key={link.name} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-800 hover:underline"
                    >
                      <span className="mr-1">{link.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-14 h-14 bg-${badge.color}-100 rounded-full flex items-center justify-center mb-2`}>
                        <badge.icon className={`h-6 w-6 text-${badge.color}-700`} />
                      </div>
                      <span className="text-xs text-center">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-semibold">{user.stats.challenges}</div>
                    <div className="text-sm text-gray-600">Total Challenges</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-semibold">{user.stats.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-semibold">{user.stats.careerScore}</div>
                    <div className="text-sm text-gray-600">Career Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-semibold">{user.stats.ranking}</div>
                    <div className="text-sm text-gray-600">Ranking</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Projects/Submissions */}
            <Tabs defaultValue="submissions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="submissions">Challenge Submissions</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>
              
              {/* Submissions Tab */}
              <TabsContent value="submissions">
                <Card>
                  <CardContent className="pt-6">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="mb-6 last:mb-0 border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-semibold">
                              {["AI Photo Editor", "ML Data Visualizer", "Code Assistant"][index - 1]}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {["Completed on April 10, 2025", "Completed on April 28, 2025", "In Progress"][index - 1]}
                            </p>
                          </div>
                          <div>
                            <Badge className={`${index === 3 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                              {index === 3 ? "In Progress" : "Completed"}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <Code className="h-4 w-4 mr-2 text-gray-600" />
                              <span>GitHub Repo</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-600" />
                              <span>Presentation</span>
                            </div>
                            <div className="flex items-center">
                              <Video className="h-4 w-4 mr-2 text-gray-600" />
                              <span>Demo Video</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Portfolio Tab */}
              <TabsContent value="portfolio">
                <Card>
                  <CardContent className="pt-6 text-center py-12">
                    <p className="text-gray-600 mb-4">No portfolio projects added yet.</p>
                    <Button variant="outline">Add Project</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
