
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Code, 
  Briefcase, 
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  
  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development and will be available soon!",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">EliteBuilders</h1>
              <p className="text-xl md:text-2xl opacity-90">
                The premier platform for AI builders to showcase skills and get discovered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                  <Link to="/challenges">Explore Challenges</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                  onClick={showComingSoon}
                >
                  For Sponsors
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Current Challenge</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Photo Editor</span>
                      <span className="text-sm bg-purple-700 px-2 py-1 rounded">Featured</span>
                    </div>
                    <p className="text-sm mt-2">Create an AI-powered photo editing tool with creative filters.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Code Assistant</span>
                      <span className="text-sm bg-green-700 px-2 py-1 rounded">New</span>
                    </div>
                    <p className="text-sm mt-2">Build an intelligent coding assistant for developers.</p>
                  </div>
                  <Button size="sm" className="w-full" variant="ghost">View All Challenges</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How EliteBuilders Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-purple-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accept Challenges</h3>
              <p className="text-gray-600">Browse through sponsor challenges and choose the ones that match your skills and interests.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-purple-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Build & Submit</h3>
              <p className="text-gray-600">Create end-to-end AI products with code, presentations, and demo videos.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-purple-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Discovered</h3>
              <p className="text-gray-600">Gain visibility with hiring partners, receive feedback, and earn badges for your accomplishments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenges */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Challenges</h2>
            <Link to="/challenges" className="text-purple-800 font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">
                      {["AI Photo Editor", "Intelligent Code Assistant", "ML Data Visualizer"][index - 1]}
                    </h3>
                    <div className="bg-purple-100 text-purple-800 text-xs font-medium py-1 px-2 rounded">
                      {["Featured", "New", "Trending"][index - 1]}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {[
                      "Create an AI-powered photo editing tool with creative filters and enhancements.",
                      "Build an intelligent coding assistant that helps developers write better code.",
                      "Develop interactive visualizations for complex machine learning datasets."
                    ][index - 1]}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        Difficulty: {["Medium", "Hard", "Advanced"][index - 1]}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      Due: {["May 30", "June 15", "June 28"][index - 1]}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 py-3 px-6">
                  <Link to={`/challenges/${index}`} className="text-purple-800 font-medium text-sm hover:underline">
                    View Challenge
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Builder Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Alex Chen</h4>
                  <p className="text-sm text-gray-600">AI Engineer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-700">
                "EliteBuilders completely changed my career trajectory. After winning the NLP Challenge, 
                I received multiple job offers from top companies. The platform gave me visibility I couldn't 
                have achieved otherwise."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">ML Specialist at DataEdge</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The feedback I received through EliteBuilders was invaluable. It helped me refine my 
                AI project and ultimately led to my current position. The platform is a game-changer for 
                self-taught developers like me."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-purple-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Showcase Your AI Skills?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join EliteBuilders today and start building your portfolio through challenges that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100"
              onClick={showComingSoon}
            >
              Create Account
            </Button>
            <Link to="/challenges">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-900">
                Browse Challenges
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
