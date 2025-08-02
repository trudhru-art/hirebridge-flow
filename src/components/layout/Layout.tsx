import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Determine if we should show sidebar
  const isPublicRoute = ['/', '/jobs', '/login', '/register', '/about', '/contact'].includes(location.pathname) || 
                       location.pathname.startsWith('/jobs/');
  const showSidebar = user && !isPublicRoute;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {showSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar */}
            <aside 
              className={cn(
                "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-card border-r transition-transform lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]",
                sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
              )}
            >
              <Sidebar />
            </aside>
          </>
        )}
        
        {/* Main content */}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-4rem)]",
          showSidebar ? "lg:pl-0" : ""
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;