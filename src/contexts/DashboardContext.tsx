
import React, { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from 'sonner';

interface DashboardContextProps {
  fetchMajors: () => Promise<Tables<"majors">[]>;
  fetchClasses: () => Promise<Tables<"classes">[]>;
  fetchBatches: () => Promise<Tables<"batches">[]>;
  fetchStudents: () => Promise<Tables<"students">[]>;
  fetchParents: () => Promise<Tables<"parents">[]>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Fetch all majors
  const fetchMajors = async (): Promise<Tables<"majors">[]> => {
    try {
      const { data, error } = await supabase
        .from('majors')
        .select('*')
        .order('name');
        
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch majors', {
        description: error.message
      });
      return [];
    }
  };

  // Fetch all classes
  const fetchClasses = async (): Promise<Tables<"classes">[]> => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('name');
        
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch classes', {
        description: error.message
      });
      return [];
    }
  };

  // Fetch all batches
  const fetchBatches = async (): Promise<Tables<"batches">[]> => {
    try {
      const { data, error } = await supabase
        .from('batches')
        .select('*')
        .order('year', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch batches', {
        description: error.message
      });
      return [];
    }
  };

  // Fetch all students
  const fetchStudents = async (): Promise<Tables<"students">[]> => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('full_name');
        
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch students', {
        description: error.message
      });
      return [];
    }
  };

  // Fetch all parents
  const fetchParents = async (): Promise<Tables<"parents">[]> => {
    try {
      const { data, error } = await supabase
        .from('parents')
        .select('*');
        
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch parents', {
        description: error.message
      });
      return [];
    }
  };

  const value = {
    fetchMajors,
    fetchClasses,
    fetchBatches,
    fetchStudents,
    fetchParents,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
