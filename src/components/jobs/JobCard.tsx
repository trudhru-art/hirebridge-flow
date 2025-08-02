import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/data/mockData';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Users,
  Star,
  Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'compact';
  showApplyButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  variant = 'default',
  showApplyButton = true 
}) => {
  const formatSalary = (salary: Job['salary']) => {
    const { min, max, currency } = salary;
    if (job.type === 'contract') {
      return `$${min}-${max}/hour`;
    }
    return `$${(min / 1000).toFixed(0)}k-${(max / 1000).toFixed(0)}k/year`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className={cn(
      "hover:shadow-custom-md transition-all duration-200 hover:-translate-y-1",
      job.featured && "ring-2 ring-primary/20 bg-gradient-card",
      variant === 'compact' && "p-3"
    )}>
      <CardHeader className={cn(
        "pb-3",
        variant === 'compact' && "p-0 pb-2"
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg leading-tight truncate">
                  {job.title}
                </h3>
                {job.featured && (
                  <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                )}
              </div>
              <p className="text-muted-foreground font-medium">{job.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className={cn(
        "space-y-3",
        variant === 'compact' && "p-0 space-y-2"
      )}>
        <div className="flex flex-wrap gap-2">
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
            <Badge variant="secondary">Remote</Badge>
          )}
        </div>

        {variant === 'default' && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {job.applicants} applicants
            </span>
            <span>{formatDate(job.postedDate)}</span>
          </div>
          <Badge variant="outline">{job.category}</Badge>
        </div>
      </CardContent>

      {showApplyButton && (
        <CardFooter className={cn(
          "pt-3",
          variant === 'compact' && "p-0 pt-2"
        )}>
          <div className="flex gap-2 w-full">
            <Button asChild className="flex-1">
              <Link to={`/jobs/${job.id}`}>
                View Details
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/jobs/${job.id}/apply`}>
                Apply Now
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default JobCard;