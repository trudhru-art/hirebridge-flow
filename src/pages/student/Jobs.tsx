import React from 'react';
import { useNavigate } from 'react-router-dom';
import Jobs from '../Jobs';

const StudentJobs: React.FC = () => {
  // This component reuses the main Jobs page but could have student-specific features
  // like saved jobs, application tracking, etc.
  
  return <Jobs />;
};

export default StudentJobs;