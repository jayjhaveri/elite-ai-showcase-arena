
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { 
  ArrowRight, 
  Award, 
  Code, 
  FileCode, 
  FileText, 
  LightbulbIcon, 
  LineChart, 
  ShieldCheck, 
  Trophy, 
  Users 
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Build Your Future with EliteBuilders
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Tackle real-world coding challenges, showcase your skills, and get noticed by top tech companies.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                        View Dashboard
                      </Button>
                    </Link>
                    <Link to="/challenges">
                      <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                        Explore Challenges
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/challenges">
                      <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                        Explore Challenges
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Coding challenge" 
                  className="rounded-lg shadow-2xl max-w-full h-auto"
                  width="500"
                  height="400"
                />
                <div className="absolute -bottom-5 -left-5 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Trophy className="text-yellow-500 h-7 w-7" />
                    <div>
                      <div className="text-sm text-gray-500">Latest Winner</div>
                      <div className="font-medium">AI Photo Editor Challenge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Join EliteBuilders?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with top companies, showcase your skills, and accelerate your career with real coding challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-purple-800" />
                </div>
                <CardTitle>Real-World Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tackle actual business challenges provided by industry-leading companies. Build portfolio-worthy projects.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-blue-800" />
                </div>
                <CardTitle>Rewards & Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Win cash prizes, job opportunities, and recognition for your skills from top tech companies.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-800" />
                </div>
                <CardTitle>Industry Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect directly with hiring managers and tech leaders looking for exceptional talent like you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Challenges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Challenges</h2>
            <Link to="/challenges">
              <Button variant="outline" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    AI / Machine Learning
                  </div>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardTitle className="text-xl">AI Photo Editor</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-gray-600 mb-4">
                  Create an AI-powered photo editing tool with creative filters and enhancements.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>ImageTech AI</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/challenges/1" className="w-full">
                  <Button variant="outline" className="w-full">View Challenge</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Developer Tools
                  </div>
                </div>
                <CardTitle className="text-xl">Intelligent Code Assistant</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-gray-600 mb-4">
                  Build an intelligent coding assistant that helps developers write better code.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>CodeGenius</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/challenges/2" className="w-full">
                  <Button variant="outline" className="w-full">View Challenge</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Data Visualization
                  </div>
                </div>
                <CardTitle className="text-xl">ML Data Visualizer</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-gray-600 mb-4">
                  Develop interactive visualizations for complex machine learning datasets.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>DataViz Corp</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/challenges/3" className="w-full">
                  <Button variant="outline" className="w-full">View Challenge</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              EliteBuilders bridges the gap between developers and companies looking for elite talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LightbulbIcon className="h-8 w-8 text-purple-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Find a Challenge</h3>
              <p className="text-gray-600">
                Browse through challenges from top companies that match your skills and interests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCode className="h-8 w-8 text-purple-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Build Your Solution</h3>
              <p className="text-gray-600">
                Develop a creative solution that addresses all the requirements of the challenge.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Submit & Get Feedback</h3>
              <p className="text-gray-600">
                Submit your solution and receive detailed feedback from industry professionals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-purple-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Win & Get Noticed</h3>
              <p className="text-gray-600">
                Winners receive rewards and opportunities to connect with top companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="opacity-80">Developers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">80+</div>
              <div className="opacity-80">Tech Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="opacity-80">Challenges Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$250K+</div>
              <div className="opacity-80">In Rewards</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <ShieldCheck className="h-12 w-12 text-purple-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to showcase your skills?</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Join EliteBuilders today and start building your portfolio with real-world projects.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-purple-800 hover:bg-purple-900">
                    View Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="bg-purple-800 hover:bg-purple-900">
                    Sign Up Now
                  </Button>
                </Link>
              )}
              <Link to="/challenges">
                <Button size="lg" variant="outline">
                  Browse Challenges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
