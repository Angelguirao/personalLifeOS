
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import supabase, { isSupabaseAvailable, testConnection } from './client';
import { toast } from 'sonner';

interface SupabaseContextType {
  isConnected: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  testConnection: () => Promise<boolean>;
  checkSetup: () => Promise<boolean>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!supabase) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
    
    // Subscribe to auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
      
      return () => subscription.unsubscribe();
    }
  }, []);

  // Initial connection test
  useEffect(() => {
    const initialConnectionTest = async () => {
      setIsLoading(true);
      const connected = await checkConnection();
      setIsConnected(connected);
      setIsLoading(false);
    };

    initialConnectionTest();
  }, []);

  // Function to check the connection
  const checkConnection = async (): Promise<boolean> => {
    if (!isSupabaseAvailable()) {
      setIsConnected(false);
      return false;
    }
    
    try {
      const result = await testConnection();
      setIsConnected(result);
      return result;
    } catch (error) {
      setIsConnected(false);
      return false;
    }
  };

  // Function to check if database is properly set up
  const checkSetup = async (): Promise<boolean> => {
    if (!isSupabaseAvailable()) {
      toast.error('Database connection not available');
      return false;
    }
    
    // For now, this just checks the connection
    // In the future, you can expand this to check for specific tables/schemas
    return await checkConnection();
  };

  const value = {
    isConnected,
    isLoading,
    isAuthenticated,
    testConnection: checkConnection,
    checkSetup
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};
