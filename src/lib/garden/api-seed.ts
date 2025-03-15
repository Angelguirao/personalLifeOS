
import supabase, { isSupabaseAvailable } from './client';
import { tableExists, runSetupScript } from './utils/table-utils';
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
    // Check if tables exist with schema qualification
    // We'll check for the main distinctions table first - if it doesn't exist, 
    // it's likely none of them do
    const distinctionsTableExists = await tableExists('distinctions.distinctions');
    
    if (!distinctionsTableExists) {
      console.error('Primary database table does not exist in Supabase.');
      
      // Try to run the setup script or guide the user
      await runSetupScript();
      
      // Display a more specific error message with detailed instructions
      toast.error('Database tables need to be set up', {
        description: 'Copy contents from src/lib/garden/sql/complete_garden_setup.sql and run in the Supabase SQL Editor',
        duration: 10000,
        action: {
          label: 'Fix It',
          onClick: () => window.open('https://app.supabase.com/project/_/sql', '_blank')
        }
      });
      
      return;
    }
    
    // If the main table exists, check the others
    const systemsTableExists = await tableExists('systems.systems');
    const connectionsTableExists = await tableExists('relationships.connections');
    const inspirationsTableExists = await tableExists('perspectives.inspirations');
    
    // Log which tables are missing for debugging
    if (!systemsTableExists || !connectionsTableExists || !inspirationsTableExists) {
      console.error('Some database tables do not exist in Supabase.', {
        'systems.systems': !systemsTableExists,
        'relationships.connections': !connectionsTableExists,
        'perspectives.inspirations': !inspirationsTableExists
      });
      
      toast.warning('Some database tables are missing', {
        description: 'Run the complete setup script to create all required tables',
        duration: 8000
      });
      
      return;
    }
    
    console.log('All required tables exist in Supabase');
    toast.success('Database connected successfully');
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
  return await runSetupScript();
};
