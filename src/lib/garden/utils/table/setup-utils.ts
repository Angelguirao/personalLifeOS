
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
import { toast } from 'sonner';

// Helper to run SQL script against Supabase
export const runSetupScript = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    toast.error('Database connection not available');
    return false;
  }
  
  try {
    toast.info('Attempting to run database setup script...');
    
    console.log('Running complete garden setup script...');
    
    // Import the setup helper dynamically to avoid circular dependency
    const setupHelper = await import('../setup-helper');
    setupHelper.showSetupInstructions();
    
    return true;
  } catch (error) {
    console.error('Error running setup script:', error);
    toast.error('Failed to set up database tables');
    return false;
  }
};
