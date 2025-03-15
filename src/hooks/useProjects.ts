import { useState, useEffect } from 'react';
import { Project } from '@/lib/projects/types';
import { getPublicProjects, getAllProjects } from '@/lib/projects/api';
import { useAuth } from '@/hooks/useAuth';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated } = useAuth?.() || { isAuthenticated: false };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // If authenticated, get all projects including private ones
        // Otherwise, only get public projects
        const data = isAuthenticated ? 
          await getAllProjects() : 
          await getPublicProjects();
        
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated]);

  return { projects, isLoading, error };
};
