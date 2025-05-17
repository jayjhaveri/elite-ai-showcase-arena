
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Github, 
  Globe, 
  Linkedin,
  Mail,
  Save,
  Settings,
  User,
} from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    websiteUrl: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.name || '',
        email: user.email || '',
        bio: '',
        githubUrl: '',
        linkedinUrl: '',
        websiteUrl: '',
      });
    }
  }, [user]);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock saving profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    setIsLoading(false);
  };
  
  if (!user) {
    return <ProfileSkeleton />;
  }
  
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Your Profile</h1>
          <p className="text-gray-600">Manage your personal information and settings</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" alt={profileData.name} />
                <AvatarFallback className="text-2xl font-medium bg-purple-100 text-purple-800">
                  {profileData.name.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{profileData.name || 'User'}</h2>
              <p className="text-gray-500 text-sm mb-2">{user.email}</p>
              <div className="text-sm text-gray-500 mb-4">Member since {new Date(user.created_at).toLocaleDateString()}</div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => signOut()}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
          
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/challenges')}>
                  Challenges
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/leaderboard')}>
                  Leaderboard
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div>
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <form onSubmit={handleSaveProfile}>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="name" 
                            name="name"
                            placeholder="Your full name" 
                            className="pl-10"
                            value={profileData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            className="pl-10" 
                            disabled 
                            value={profileData.email}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        placeholder="Tell something about yourself..." 
                        className="min-h-32"
                        value={profileData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Social Profiles</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub</Label>
                        <div className="relative">
                          <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="githubUrl" 
                            name="githubUrl"
                            placeholder="https://github.com/username" 
                            className="pl-10"
                            value={profileData.githubUrl}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn</Label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="linkedinUrl" 
                            name="linkedinUrl"
                            placeholder="https://linkedin.com/in/username" 
                            className="pl-10"
                            value={profileData.linkedinUrl}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="websiteUrl" 
                            name="websiteUrl"
                            placeholder="https://yourwebsite.com" 
                            className="pl-10"
                            value={profileData.websiteUrl}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        'Saving...'
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Privacy and security settings will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control what notifications you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Notification preferences will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="container mx-auto max-w-5xl px-4 py-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <Skeleton className="h-9 w-40 mb-1" />
        <Skeleton className="h-5 w-64" />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      {/* Profile Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-40 mb-4" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div>
        <Skeleton className="h-10 w-72 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default Profile;
