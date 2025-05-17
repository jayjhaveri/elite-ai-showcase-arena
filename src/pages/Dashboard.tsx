
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Star, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Bell 
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Builder Dashboard</h1>
            <p className="text-gray-600">Track your progress and manage your challenge submissions</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Link to="/challenges">Explore New Challenges</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - Active challenges and submissions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Challenges */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {[1, 2].map((index) => (
                  <div key={index} className="mb-6 last:mb-0 border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <h3 className="font-semibold mr-2">
                            {["AI Photo Editor", "Code Assistant"][index - 1]}
                          </h3>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
                            In Progress
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Sponsored by {["ImageTech AI", "CodeGenius"][index - 1]}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Due: {["May 30", "June 15"][index - 1]}</span>
                        </div>
                        <Link to={`/challenges/${index}`}>
                          <Button variant="outline" size="sm">
                            Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {/* No active challenges state */}
                {false && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any active challenges yet.</p>
                    <Button>
                      <Link to="/challenges">Browse Challenges</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6 border-b pb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <h3 className="font-semibold mr-2">ML Data Visualizer</h3>
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Submitted on April 28, 2025
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link to="/challenges/3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button variant="secondary" size="sm">
                        View Feedback
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <Button variant="ghost" size="sm" className="text-purple-800">
                    View All Submissions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="font-semibold text-lg">Alex Chen</h3>
                  <p className="text-gray-600 text-sm mb-4">AI Developer</p>
                  <Link to="/profile">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h4 className="font-medium text-sm mb-4">Your Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">3</div>
                      <div className="text-xs text-gray-600">Challenges</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">2</div>
                      <div className="text-xs text-gray-600">Badges</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">156</div>
                      <div className="text-xs text-gray-600">Career Score</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">Top 15%</div>
                      <div className="text-xs text-gray-600">Ranking</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <Trophy className="h-6 w-6 text-purple-700" />
                    </div>
                    <span className="text-xs">Top 10%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Star className="h-6 w-6 text-blue-700" />
                    </div>
                    <span className="text-xs">Sponsor Pick</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link to="/profile" className="text-xs text-purple-800 hover:underline">
                    View All Badges
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1.5 rounded-full text-blue-700">
                      <Bell className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm">Your submission for "ML Data Visualizer" has been reviewed.</p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1.5 rounded-full text-purple-700">
                      <Bell className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm">You've earned the "Top 10%" badge for your AI Photo Editor solution.</p>
                      <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4 text-purple-800">
                  View All
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
