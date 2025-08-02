import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentJobs from "./pages/student/Jobs";
import StudentApplications from "./pages/student/Applications";

// Company Pages
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyProfile from "./pages/company/Profile";
import CompanyJobs from "./pages/company/Jobs";
import CompanyJobCreate from "./pages/company/JobCreate";
import CompanyApplications from "./pages/company/Applications";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminJobs from "./pages/admin/Jobs";
import AdminApplications from "./pages/admin/Applications";
import AdminCategories from "./pages/admin/Categories";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/profile" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentProfile />
                </ProtectedRoute>
              } />
              <Route path="/student/jobs" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentJobs />
                </ProtectedRoute>
              } />
              <Route path="/student/applications" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentApplications />
                </ProtectedRoute>
              } />

              {/* Company Routes */}
              <Route path="/company/dashboard" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/company/profile" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyProfile />
                </ProtectedRoute>
              } />
              <Route path="/company/jobs" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyJobs />
                </ProtectedRoute>
              } />
              <Route path="/company/jobs/create" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyJobCreate />
                </ProtectedRoute>
              } />
              <Route path="/company/applications" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyApplications />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/jobs" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminJobs />
                </ProtectedRoute>
              } />
              <Route path="/admin/applications" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminApplications />
                </ProtectedRoute>
              } />
              <Route path="/admin/categories" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCategories />
                </ProtectedRoute>
              } />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
