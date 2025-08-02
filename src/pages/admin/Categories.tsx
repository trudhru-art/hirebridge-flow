import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminCategories: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Job Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Category management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;