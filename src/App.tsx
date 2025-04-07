
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardProvider } from "@/contexts/DashboardContext";
import React from "react";

// Landing Page Routes
import Index from "./pages/Index";
import About from "./pages/About";
import SchoolActivities from "./pages/SchoolActivities";
import SchoolAchievements from "./pages/SchoolAchievements";
import Extracurricular from "./pages/Extracurricular";
import PPDB from "./pages/PPDB";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

// Dashboard Routes
import Dashboard from "./pages/Dashboard";
import StudentsManagement from "./pages/dashboard/StudentsManagement";
import MajorsManagement from "./pages/dashboard/MajorsManagement";
import ClassesManagement from "./pages/dashboard/ClassesManagement";
import BatchesManagement from "./pages/dashboard/BatchesManagement";
import ParentsManagement from "./pages/dashboard/ParentsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <DashboardProvider>
              {/* Toast components */}
              <Toaster />
              <Sonner />
              
              <Routes>
                {/* Landing Page Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/activities" element={<SchoolActivities />} />
                <Route path="/achievements" element={<SchoolAchievements />} />
                <Route path="/extracurricular" element={<Extracurricular />} />
                <Route path="/ppdb" element={<PPDB />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Dashboard Routes - Protected */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/students" element={
                  <ProtectedRoute>
                    <StudentsManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/majors" element={
                  <ProtectedRoute>
                    <MajorsManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/classes" element={
                  <ProtectedRoute>
                    <ClassesManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/batches" element={
                  <ProtectedRoute>
                    <BatchesManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/parents" element={
                  <ProtectedRoute>
                    <ParentsManagement />
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardProvider>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
