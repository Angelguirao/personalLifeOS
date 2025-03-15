
import supabase, { isSupabaseAvailable } from './client';
import { tableExists, runSetupScript } from './utils/table-utils';
import { toast } from 'sonner';

export const seedInitialData = async () => {
  // If supabase is null, just return without trying to seed
  if (!isSupabaseAvailable()) {
    console.error('Supabase client not initialized.');
    toast.error('Database connection not available');
    return;
  }
  
  console.log('Checking Supabase tables...');
  
  try {
    // Check if tables exist with schema qualification
    const distinctionsTableExists = await tableExists('distinctions.distinctions');
    const systemsTableExists = await tableExists('systems.systems');
    const connectionsTableExists = await tableExists('relationships.connections');
    const inspirationsTableExists = await tableExists('perspectives.inspirations');
    
    // If tables don't exist, try to run setup script or guide the user
    if (!distinctionsTableExists || !systemsTableExists || !connectionsTableExists || !inspirationsTableExists) {
      console.error('Some database tables do not exist in Supabase.');
      
      // Log which tables are missing for debugging
      console.error('Missing tables:', {
        'distinctions.distinctions': !distinctionsTableExists,
        'systems.systems': !systemsTableExists,
        'relationships.connections': !connectionsTableExists,
        'perspectives.inspirations': !inspirationsTableExists
      });
      
      // Try to run the setup script or provide guidance
      const setupAttempted = await runSetupScript();
      
      // Display a more user-friendly error message with specific instructions
      toast.error(
        'Database tables need to be set up. Please run the complete_garden_setup.sql script in the Supabase SQL Editor.',
        { duration: 8000 }
      );
      
      return;
    }
    
    console.log('All required tables exist in Supabase');
    toast.success('Database connected successfully');
  } catch (error) {
    console.error('Error checking tables:', error);
    toast.error('Error connecting to database');
    throw error;
  }
};

// Function to help users run the setup script
export const setupDatabaseTables = async () => {
  return await runSetupScript();
};
