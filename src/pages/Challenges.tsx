
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Award,
  Briefcase,
  Calendar,
  FileCode,
  Search,
  Star,
  X,
} from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import { Database } from '@/integrations/supabase/types';
import { Skeleton } from '@/components/ui/skeleton';

type SkillLevel = Database['public']['Enums']['skill_level_enum'];

const ChallengeCard = ({ challenge }: { challenge: any }) => {
  // Calculate days left if deadline exists
  const daysLeft = challenge.deadline
    ? Math.max(0, Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
    : null;

  // Format skill level for display
  const formatSkillLevel = (level: SkillLevel | null) => {
    if (!level) return null;
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <Card className="overflow-hidden transition-all hover:border-purple-300">
      <CardHeader className="p-4 pb-0 flex justify-between items-start">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200">
              {challenge.industry || 'Tech'}
            </Badge>
            {challenge.skill_level && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                {formatSkillLevel(challenge.skill_level)}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl mb-1">
            <Link to={`/challenges/${challenge.id}`} className="hover:text-purple-700 transition-colors">
              {challenge.title}
            </Link>
          </CardTitle>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{challenge.sponsors?.company || challenge.sponsors?.name || 'Unknown Sponsor'}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="text-gray-700 line-clamp-2 mb-4">
          {challenge.description || 'No description provided.'}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {daysLeft !== null && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span>{daysLeft} days left</span>
            </div>
          )}
          <div className="flex items-center">
            <Award className="h-4 w-4 text-gray-500 mr-2" />
            <span>{challenge.reward_structure || 'Rewards available'}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <FileCode className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">Code Challenge</span>
        </div>
        <Link to={`/challenges/${challenge.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card>
    <CardHeader className="p-4 pb-0">
      <div className="flex gap-2 mb-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-8 w-full mb-2" />
      <Skeleton className="h-5 w-40 mb-2" />
    </CardHeader>
    <CardContent className="p-4 pt-2">
      <Skeleton className="h-16 w-full mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0 flex justify-between">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-9 w-28" />
    </CardFooter>
  </Card>
);

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string | undefined>(undefined);
  const [skillLevelFilter, setSkillLevelFilter] = useState<SkillLevel | undefined>(undefined);

  const { data: challenges, isLoading, error } = useChallenges({
    industry: industryFilter,
    skill_level: skillLevelFilter,
  });

  const filteredChallenges = challenges?.filter((challenge) => {
    return challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (challenge.description && challenge.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }) || [];

  // Extract unique industries for filter
  const uniqueIndustries = Array.from(
    new Set(challenges?.map(c => c.industry).filter(Boolean) as string[])
  );

  const clearFilters = () => {
    setSearchQuery("");
    setIndustryFilter(undefined);
    setSkillLevelFilter(undefined);
  };

  const hasActiveFilters = searchQuery || industryFilter || skillLevelFilter;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Developer Challenges</h1>
        <p className="text-gray-600 max-w-2xl">
          Browse our collection of coding challenges from top tech companies. Solve real-world
          problems, showcase your skills, and win rewards!
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search challenges..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Select value={industryFilter ?? "all"} onValueChange={(val) => setIndustryFilter(val === "all" ? undefined : val)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {uniqueIndustries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={skillLevelFilter ?? "any"}
              onValueChange={(val) =>
                setSkillLevelFilter(val === "any" ? undefined : (val as SkillLevel))
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Skill Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Level</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="icon" onClick={clearFilters} className="px-2">
                <X className="h-4 w-4" />
                <span className="sr-only">Clear filters</span>
              </Button>
            )}
          </div>
        </div>

        {filteredChallenges.length > 0 && (
          <div className="text-sm text-gray-500">
            Showing {filteredChallenges.length} {filteredChallenges.length === 1 ? 'challenge' : 'challenges'}
            {hasActiveFilters ? ' with the current filters' : ''}
          </div>
        )}
      </div>

      {/* Challenge Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-2">Error loading challenges</div>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Star className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <h2 className="text-2xl font-semibold">No challenges found</h2>
          </div>
          {hasActiveFilters ? (
            <>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </>
          ) : (
            <p className="text-gray-600">
              There are no challenges available at the moment. Please check back later.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Challenges;
