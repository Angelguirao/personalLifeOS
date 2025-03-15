
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
import { toast } from 'sonner';

export const seedInitialData = async () => {
  // If supabase is null, just return without trying to seed
  if (!isSupabaseAvailable()) {
    console.error('Supabase client not initialized.');
    toast.error('Database connection not available', {
      description: 'Check your environment variables in .env file',
      duration: 5000
    });
    return;
  }
  
  console.log('Checking Supabase tables...');
  
  try {
    // Try to access the distinctions table directly
    const { error: distinctionsError } = await supabase
      .from('distinctions.distinctions')
      .select('id')
      .limit(1)
      .single();
    
    // Try to access the systems table directly
    const { error: systemsError } = await supabase
      .from('systems.systems')
      .select('id')
      .limit(1)
      .single();
    
    // Try to access the connections table directly
    const { error: connectionsError } = await supabase
      .from('relationships.connections')
      .select('id')
      .limit(1)
      .single();
    
    // If all queries failed with table not exist errors, we need to run the setup
    if (
      distinctionsError?.message?.includes('does not exist') &&
      systemsError?.message?.includes('does not exist') &&
      connectionsError?.message?.includes('does not exist')
    ) {
      console.log('Database tables need to be created - displaying setup instructions');
      
      // Show toast with database setup instructions
      toast.error('Database tables need to be set up', {
        description: 'Please run the SQL setup script in the Supabase SQL Editor',
        duration: 10000,
        action: {
          label: 'Setup Instructions',
          onClick: () => {
            // Import and call the setup helper dynamically to avoid circular dependency
            import('./utils/setup-helper').then(module => {
              module.showSetupInstructions();
            });
          }
        }
      });
      return;
    }
    
    // If at least one table exists, we consider it partially set up
    if (!distinctionsError || !systemsError || !connectionsError) {
      console.log('Some database tables are already set up');
      toast.success('Connected to database successfully');
    }
  } catch (error) {
    console.error('Error checking tables:', error);
    toast.error('Error connecting to database', {
      description: 'Please check console for more details and run the setup script',
      duration: 6000
    });
  }
};

// Function to help users run the setup script
export const setupDatabaseTables = async () => {
  toast.info('Setting up database tables...', {
    description: 'Follow the instructions to set up your Supabase database',
    duration: 5000
  });
  
  // Import and show setup instructions
  const setupHelper = await import('./utils/setup-helper');
  return setupHelper.showSetupInstructions();
};
