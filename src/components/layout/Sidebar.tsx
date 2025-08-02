import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Users,
  Building2,
  Settings,
  Plus,
  Eye,
  UserCheck,
  FolderOpen,
  BarChart3,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getNavigationItems = () => {
    switch (user.role) {
      case 'student':
        return [
          {
            title: 'Dashboard',
            href: '/student/dashboard',
            icon: LayoutDashboard,
          },
          {
            title: 'My Profile',
            href: '/student/profile',
            icon: User,
          },
          {
            title: 'Browse Jobs',
            href: '/student/jobs',
            icon: Briefcase,
          },
          {
            title: 'My Applications',
            href: '/student/applications',
            icon: FileText,
          },
        ];
      
      case 'company':
        return [
          {
            title: 'Dashboard',
            href: '/company/dashboard',
            icon: LayoutDashboard,
          },
          {
            title: 'Company Profile',
            href: '/company/profile',
            icon: Building2,
          },
          {
            title: 'My Jobs',
            href: '/company/jobs',
            icon: Briefcase,
          },
          {
            title: 'Post Job',
            href: '/company/jobs/create',
            icon: Plus,
          },
          {
            title: 'Applications',
            href: '/company/applications',
            icon: UserCheck,
          },
        ];
      
      case 'admin':
        return [
          {
            title: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
          },
          {
            title: 'All Users',
            href: '/admin/users',
            icon: Users,
          },
          {
            title: 'All Jobs',
            href: '/admin/jobs',
            icon: Briefcase,
          },
          {
            title: 'Applications',
            href: '/admin/applications',
            icon: FileText,
          },
          {
            title: 'Categories',
            href: '/admin/categories',
            icon: FolderOpen,
          },
          {
            title: 'Analytics',
            href: '/admin/analytics',
            icon: BarChart3,
          },
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {user.role === 'student' && 'Student Portal'}
            {user.role === 'company' && 'Company Portal'}
            {user.role === 'admin' && 'Admin Panel'}
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">
            Quick Actions
          </h3>
          <div className="space-y-1">
            {user.role === 'student' && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/jobs">
                    <Eye className="mr-2 h-4 w-4" />
                    Browse All Jobs
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/student/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Update Profile
                  </Link>
                </Button>
              </>
            )}
            
            {user.role === 'company' && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/company/jobs/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/company/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Update Profile
                  </Link>
                </Button>
              </>
            )}
            
            {user.role === 'admin' && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/admin/categories">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/admin/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Reports
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;