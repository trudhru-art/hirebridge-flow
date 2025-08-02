// Mock data for the Job Portal

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  category: string;
  postedDate: string;
  deadline: string;
  experience: string;
  remote: boolean;
  featured: boolean;
  applicants: number;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  founded: string;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  jobCount: number;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: { min: 80000, max: 120000, currency: 'USD' },
    description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.',
    requirements: [
      '3+ years experience with React',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks',
      'Knowledge of state management (Redux/Zustand)',
      'Understanding of responsive design'
    ],
    benefits: [
      'Health insurance',
      'Remote work flexibility',
      'Professional development budget',
      'Stock options',
      'Unlimited PTO'
    ],
    category: 'Technology',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    experience: '3-5 years',
    remote: true,
    featured: true,
    applicants: 24
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'full-time',
    salary: { min: 90000, max: 130000, currency: 'USD' },
    description: 'Join our product team to drive strategy and execution for our cutting-edge products.',
    requirements: [
      '5+ years product management experience',
      'Strong analytical skills',
      'Experience with Agile methodologies',
      'Excellent communication skills',
      'Technical background preferred'
    ],
    benefits: [
      'Competitive salary',
      'Equity package',
      'Health & dental insurance',
      'Flexible hours',
      'Learning stipend'
    ],
    category: 'Product',
    postedDate: '2024-01-20',
    deadline: '2024-02-20',
    experience: '5+ years',
    remote: false,
    featured: false,
    applicants: 18
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'contract',
    salary: { min: 60, max: 80, currency: 'USD' },
    description: 'Design beautiful and intuitive user interfaces for our clients.',
    requirements: [
      '2+ years UI/UX design experience',
      'Proficiency in Figma/Sketch',
      'Strong portfolio',
      'Understanding of user research',
      'Prototyping skills'
    ],
    benefits: [
      'Flexible schedule',
      'Remote work',
      'Project-based pay',
      'Portfolio building',
      'Creative freedom'
    ],
    category: 'Design',
    postedDate: '2024-01-18',
    deadline: '2024-02-10',
    experience: '2-4 years',
    remote: true,
    featured: true,
    applicants: 31
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Austin, TX',
    type: 'full-time',
    salary: { min: 85000, max: 115000, currency: 'USD' },
    description: 'Work with large datasets to derive insights and build predictive models.',
    requirements: [
      'PhD or Masters in Data Science/Statistics',
      'Python/R programming',
      'Machine learning experience',
      'SQL proficiency',
      'Experience with cloud platforms'
    ],
    benefits: [
      'Research budget',
      'Conference attendance',
      'Health insurance',
      'Retirement matching',
      'Flexible PTO'
    ],
    category: 'Data Science',
    postedDate: '2024-01-22',
    deadline: '2024-02-25',
    experience: '3-6 years',
    remote: false,
    featured: false,
    applicants: 12
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'Brand Masters',
    location: 'Los Angeles, CA',
    type: 'full-time',
    salary: { min: 55000, max: 75000, currency: 'USD' },
    description: 'Drive marketing campaigns and build brand awareness across multiple channels.',
    requirements: [
      '2+ years marketing experience',
      'Social media expertise',
      'Content creation skills',
      'Analytics experience',
      'Creative mindset'
    ],
    benefits: [
      'Health insurance',
      'Marketing conferences',
      'Creative tools budget',
      'Team lunches',
      'Growth opportunities'
    ],
    category: 'Marketing',
    postedDate: '2024-01-25',
    deadline: '2024-02-28',
    experience: '2-4 years',
    remote: false,
    featured: false,
    applicants: 27
  }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider focused on innovation and customer success.',
    industry: 'Technology',
    size: '100-500 employees',
    location: 'San Francisco, CA',
    founded: '2015'
  },
  {
    id: '2',
    name: 'Innovation Labs',
    website: 'https://innovationlabs.com',
    description: 'Research and development company creating tomorrow\'s products today.',
    industry: 'Research & Development',
    size: '50-100 employees',
    location: 'New York, NY',
    founded: '2018'
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Technology', description: 'Software development, IT, and tech roles', jobCount: 45 },
  { id: '2', name: 'Design', description: 'UI/UX, graphic design, and creative roles', jobCount: 23 },
  { id: '3', name: 'Marketing', description: 'Digital marketing, content, and brand roles', jobCount: 18 },
  { id: '4', name: 'Product', description: 'Product management and strategy roles', jobCount: 12 },
  { id: '5', name: 'Data Science', description: 'Analytics, ML, and data engineering roles', jobCount: 16 },
  { id: '6', name: 'Sales', description: 'Business development and sales roles', jobCount: 21 }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    studentId: '1',
    status: 'pending',
    appliedDate: '2024-01-20',
    coverLetter: 'I am excited to apply for this position...'
  },
  {
    id: '2',
    jobId: '2',
    studentId: '1',
    status: 'reviewed',
    appliedDate: '2024-01-18',
    coverLetter: 'With my experience in product management...'
  }
];