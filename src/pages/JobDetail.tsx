import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockJobs, mockCompanies } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Building2,
  Globe,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const job = mockJobs.find(j => j.id === id);
  const company = mockCompanies.find(c => c.name === job?.company);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Button asChild>
            <Link to="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatSalary = (salary: typeof job.salary) => {
    const { min, max, currency } = salary;
    if (job.type === 'contract') {
      return `$${min}-${max}/hour`;
    }
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k per year`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApply = () => {
    if (!user) {
      toast.error('Please sign in to apply for jobs');
      navigate('/login');
      return;
    }

    if (user.role !== 'student') {
      toast.error('Only students can apply for jobs');
      return;
    }

    setHasApplied(true);
    toast.success('Application submitted successfully!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Job removed from bookmarks' : 'Job bookmarked successfully!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/jobs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                      {company?.website && (
                        <>
                          <span>•</span>
                          <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary"
                          >
                            <Globe className="h-4 w-4" />
                            Website
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    className={isBookmarked ? 'bg-primary/10' : ''}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {job.type.replace('-', ' ')}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formatSalary(job.salary)}
                </Badge>
                {job.remote && (
                  <Badge variant="secondary">Remote Friendly</Badge>
                )}
                <Badge variant="outline">{job.category}</Badge>
              </div>

              {job.featured && (
                <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-lg mt-4">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Featured Job</span>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Company Info */}
          {company && (
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{company.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Industry:</span>
                    <span className="ml-2 text-muted-foreground">{company.industry}</span>
                  </div>
                  <div>
                    <span className="font-medium">Company Size:</span>
                    <span className="ml-2 text-muted-foreground">{company.size}</span>
                  </div>
                  <div>
                    <span className="font-medium">Founded:</span>
                    <span className="ml-2 text-muted-foreground">{company.founded}</span>
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-muted-foreground">{company.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card>
            <CardContent className="p-6">
              {hasApplied ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-success mx-auto" />
                  <div>
                    <h3 className="font-semibold text-success">Application Submitted</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll notify you about the status
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/student/applications">
                      View My Applications
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleApply}
                  >
                    Apply for this job
                  </Button>
                  
                  {!user && (
                    <p className="text-xs text-muted-foreground text-center">
                      <Link to="/register" className="text-primary hover:underline">
                        Create an account
                      </Link>{' '}
                      to apply for jobs
                    </p>
                  )}
                  
                  {user && user.role !== 'student' && (
                    <div className="flex items-center gap-2 text-warning">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Only students can apply for jobs</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-medium">{formatDate(job.postedDate)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-medium">{formatDate(job.deadline)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">{job.experience}</span>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Applicants
                </span>
                <span className="font-medium">{job.applicants}</span>
              </div>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockJobs
                  .filter(j => j.id !== job.id && j.category === job.category)
                  .slice(0, 3)
                  .map(similarJob => (
                    <Link
                      key={similarJob.id}
                      to={`/jobs/${similarJob.id}`}
                      className="block p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <h4 className="font-medium text-sm line-clamp-2">{similarJob.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{similarJob.company}</p>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;