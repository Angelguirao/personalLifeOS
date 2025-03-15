
import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { toast } from 'sonner';
import supabase from '@/lib/supabase/client';

export function useSupabaseSetup() {
  const { isConnected, isAuthenticated, checkSetup } = useSupabase();
  const [isSettingUp, setIsSettingUp] = useState(false);
  
  // Function to show setup instructions
  const showSetupInstructions = async () => {
    try {
      // Import setup helper dynamically to avoid circular dependency
      const setupHelper = await import('@/lib/garden/utils/setup-helper');
      setupHelper.showSetupInstructions();
      return true;
    } catch (error) {
      console.error('Error showing setup instructions:', error);
      toast.error('Failed to load setup instructions');
      return false;
    }
  };
  
  // Function to check if tables exist
  const checkTablesExist = async () => {
    if (!supabase) {
      toast.error('Database connection not available');
      return false;
    }
    
    try {
      setIsSettingUp(true);
      
      // Try to query the tables (this will be expanded with your table-utils)
      const { error: distinctionsError } = await supabase
        .from('distinctions.distinctions')
        .select('id')
        .limit(1)
        .single();
        
      const { error: systemsError } = await supabase
        .from('systems.systems')
        .select('id')
        .limit(1)
        .single();
        
      const { error: connectionsError } = await supabase
        .from('relationships.connections')
        .select('id')
        .limit(1)
        .single();
      
      // If all tables don't exist, we need to run setup
      if (
        distinctionsError?.message?.includes('does not exist') &&
        systemsError?.message?.includes('does not exist') &&
        connectionsError?.message?.includes('does not exist')
      ) {
        toast.error('Database tables need to be set up', {
          description: 'Please run the SQL setup script in the Supabase SQL Editor',
        });
        
        // Show setup instructions
        await showSetupInstructions();
        return false;
      }
      
      // If at least one table exists, we consider it partially set up
      if (!distinctionsError || !systemsError || !connectionsError) {
        toast.success('Some database tables are already set up');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking tables:', error);
      return false;
    } finally {
      setIsSettingUp(false);
    }
  };
  
  return {
    isConnected,
    isAuthenticated,
    isSettingUp,
    checkTablesExist,
    showSetupInstructions,
    checkConnection: checkSetup
  };
}
