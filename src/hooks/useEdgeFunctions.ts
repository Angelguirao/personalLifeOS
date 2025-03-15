
import { useState } from 'react';
import { toast } from 'sonner';
import { setupDatabaseTables } from '@/lib/edge/setup-database';

export function useEdgeFunctions() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to run database setup via edge function
  const runDatabaseSetup = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await setupDatabaseTables();
      
      if (result.success) {
        toast.success('Database setup completed successfully');
        return true;
      } else {
        toast.error(result.message || 'Failed to set up database');
        return false;
      }
    } catch (error) {
      console.error('Error running database setup:', error);
      toast.error(`Error: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    runDatabaseSetup
  };
}
