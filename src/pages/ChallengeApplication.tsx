
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Code, Video, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useChallengeById } from "@/hooks/useChallenges";
import { useCreateSubmission } from "@/hooks/useSubmissions";
import { Skeleton } from "@/components/ui/skeleton";

const ChallengeApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Fetch challenge details
  const { data: challenge, isLoading: challengeLoading } = useChallengeById(id);
  const createSubmission = useCreateSubmission();
  
  // Form state
  const [formState, setFormState] = useState({
    githubRepo: "",
    description: "",
    approach: "",
    technologies: "",
    fileUploads: {
      presentation: false,
      demoVideo: false
    }
  });

  // Check if user is authenticated
  useEffect(() => {
    if (!user && !challengeLoading) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit an application",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, challengeLoading, toast, navigate]);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Mock file upload
  const handleFileUpload = (type: 'presentation' | 'demoVideo') => {
    setFormState(prev => ({
      ...prev,
      fileUploads: {
        ...prev.fileUploads,
        [type]: true
      }
    }));

    toast({
      title: "File Uploaded",
      description: `Your ${type === 'presentation' ? 'presentation' : 'demo video'} has been successfully uploaded.`,
    });
  };

  // Submit application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit an application",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    if (!id) {
      toast({
        title: "Error",
        description: "Challenge ID is missing",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await createSubmission.mutateAsync({
        challenge_id: id,
        github_repo_link: formState.githubRepo,
        pitch_deck_link: formState.fileUploads.presentation ? "https://example.com/pitch-deck" : null,
        demo_video_link: formState.fileUploads.demoVideo ? "https://example.com/demo-video" : null,
        ai_feedback: formState.description, // Using description as ai_feedback for now
      });
      
      // Redirect to dashboard after submission
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error("Error submitting application:", error);
      // Error toast is handled in the useMutation hook
    }
  };
  
  // Handle case where challenge is not found
  if (challengeLoading) {
    return <LoadingSkeleton />;
  }
  
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link to={`/challenges/${id}`} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenge Details
          </Link>
          <h1 className="text-3xl font-bold mb-2">Apply to Challenge</h1>
          <p className="text-gray-600">Complete the form below to submit your entry for {challenge.title}</p>
        </div>

        {/* Challenge Summary Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">{challenge.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  Sponsored by {challenge.sponsors?.company || challenge.sponsors?.name || 'Unknown Sponsor'}
                </p>
              </div>
              <div>
                {challenge.deadline && (
                  <Badge className="bg-purple-100 text-purple-800">
                    Deadline: {new Date(challenge.deadline).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p>{challenge.description || 'No description available.'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="githubRepo">GitHub Repository URL</Label>
                <Input 
                  id="githubRepo" 
                  name="githubRepo" 
                  placeholder="https://github.com/yourusername/your-repo" 
                  required
                  value={formState.githubRepo}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500">Link to your project's GitHub repository</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Brief description of your project and what problem it solves..." 
                  className="min-h-24"
                  required
                  value={formState.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="approach">Technical Approach</Label>
                <Textarea 
                  id="approach" 
                  name="approach" 
                  placeholder="Explain your technical approach, algorithms used, and key implementation details..." 
                  className="min-h-24"
                  required
                  value={formState.approach}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input 
                  id="technologies" 
                  name="technologies" 
                  placeholder="Python, TensorFlow, React, etc." 
                  required
                  value={formState.technologies}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Required Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Presentation Upload */}
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-purple-800" />
                  </div>
                  <h3 className="font-semibold mb-1">Presentation</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload a 3-5 slide presentation explaining your approach</p>
                  
                  {formState.fileUploads.presentation ? (
                    <div className="flex items-center text-green-600 space-x-2">
                      <Check className="h-5 w-5" />
                      <span>Uploaded successfully</span>
                    </div>
                  ) : (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => handleFileUpload('presentation')}
                    >
                      Upload Presentation
                    </Button>
                  )}
                </div>

                {/* Demo Video Upload */}
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-purple-800" />
                  </div>
                  <h3 className="font-semibold mb-1">Demo Video</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload a 2-minute video showcasing your project</p>
                  
                  {formState.fileUploads.demoVideo ? (
                    <div className="flex items-center text-green-600 space-x-2">
                      <Check className="h-5 w-5" />
                      <span>Uploaded successfully</span>
                    </div>
                  ) : (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => handleFileUpload('demoVideo')}
                    >
                      Upload Demo Video
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Terms & Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-sm text-gray-700">
                <p>By submitting this application, you confirm that:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>All code and assets are your original work or properly attributed</li>
                  <li>You grant EliteBuilders permission to share your submission with the sponsor</li>
                  <li>You will be available for any follow-up questions if your submission is selected</li>
                  <li>You have read and agree to the challenge rules and requirements</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button type="button" variant="outline" onClick={() => navigate(`/challenges/${id}`)}>
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  className="sm:w-auto w-full" 
                  disabled={createSubmission.isPending}
                >
                  {createSubmission.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-10 w-72 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <Skeleton className="h-7 w-64 mb-1" />
              <Skeleton className="h-5 w-40 mb-2" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ChallengeApplication;
