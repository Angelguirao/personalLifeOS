
import supabase from '@/lib/supabase/client';
import { Project } from './types';

// Get all public projects
export const getPublicProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_private', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public projects:', error);
    throw error;
  }

  return data || [];
};

// Get all projects (public and private) - requires authentication
export const getAllProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }

  return data || [];
};

// Get a specific project by ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }

  return data;
};
