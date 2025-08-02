import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import JobCard from '@/components/jobs/JobCard';
import { mockJobs, mockCategories } from '@/data/mockData';
import { Search, Filter, MapPin, Briefcase, DollarSign } from 'lucide-react';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const jobTypes = ['full-time', 'part-time', 'contract', 'remote'];
  const experienceLevels = ['Entry Level', '1-2 years', '2-4 years', '3-5 years', '5+ years'];
  const salaryRanges = ['0-50k', '50k-75k', '75k-100k', '100k+'];

  const filteredJobs = useMemo(() => {
    let filtered = mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || 
                             job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesCategory = !categoryFilter || job.category === categoryFilter;
      
      const matchesJobType = jobTypeFilter.length === 0 || jobTypeFilter.includes(job.type);
      
      const matchesExperience = !experienceFilter || job.experience.includes(experienceFilter);
      
      const matchesRemote = !remoteOnly || job.remote;
      
      const matchesSalary = !salaryFilter || (() => {
        const maxSalary = job.salary.max;
        switch (salaryFilter) {
          case '0-50k': return maxSalary <= 50000;
          case '50k-75k': return maxSalary >= 50000 && maxSalary <= 75000;
          case '75k-100k': return maxSalary >= 75000 && maxSalary <= 100000;
          case '100k+': return maxSalary >= 100000;
          default: return true;
        }
      })();

      return matchesSearch && matchesLocation && matchesCategory && 
             matchesJobType && matchesExperience && matchesRemote && matchesSalary;
    });

    // Sort jobs
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'salary-high':
        filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'salary-low':
        filtered.sort((a, b) => a.salary.max - b.salary.max);
        break;
      case 'applicants':
        filtered.sort((a, b) => a.applicants - b.applicants);
        break;
    }

    return filtered;
  }, [searchTerm, locationFilter, categoryFilter, jobTypeFilter, experienceFilter, salaryFilter, remoteOnly, sortBy]);

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setJobTypeFilter([...jobTypeFilter, jobType]);
    } else {
      setJobTypeFilter(jobTypeFilter.filter(type => type !== jobType));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
        <p className="text-muted-foreground">
          Discover {mockJobs.length} job opportunities from top companies
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Enter location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {mockCategories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Job Type</label>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={jobTypeFilter.includes(type)}
                        onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                      />
                      <label htmlFor={type} className="text-sm capitalize">
                        {type.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-sm font-medium mb-2 block">Experience</label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    {experienceLevels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Salary Range</label>
                <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Ranges</SelectItem>
                    {salaryRanges.map(range => (
                      <SelectItem key={range} value={range}>
                        ${range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Remote Work */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={remoteOnly}
                  onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
                />
                <label htmlFor="remote" className="text-sm">
                  Remote work only
                </label>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setCategoryFilter('');
                  setJobTypeFilter([]);
                  setExperienceFilter('');
                  setSalaryFilter('');
                  setRemoteOnly(false);
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          {/* Search Bar and Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs, companies, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">
                Showing {filteredJobs.length} of {mockJobs.length} jobs
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="salary-low">Lowest Salary</SelectItem>
                  <SelectItem value="applicants">Fewest Applicants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <div className="text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;