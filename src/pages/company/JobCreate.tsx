import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompanyJobCreate: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Post New Job</h1>
      <Card>
        <CardHeader>
          <CardTitle>Job Creation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Job creation form coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyJobCreate;