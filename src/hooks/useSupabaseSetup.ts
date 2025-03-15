
import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { toast } from 'sonner';
import supabase from '@/lib/supabase/client';
import { setupDatabaseTables } from '@/lib/edge/setup-database';

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
  
  // Function to set up database via edge function
  const setupDatabaseViaEdge = async () => {
    setIsSettingUp(true);
    try {
      const result = await setupDatabaseTables();
      return result.success;
    } catch (error) {
      console.error('Error setting up database via edge function:', error);
      toast.error('Error setting up database tables');
      return false;
    } finally {
      setIsSettingUp(false);
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
      
      // Try to query the tables
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
          description: 'Would you like to run the setup via Edge Function?',
          action: {
            label: 'Run Setup',
            onClick: setupDatabaseViaEdge
          }
        });
        
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
    setupDatabaseViaEdge,
    checkConnection: checkSetup
  };
}
