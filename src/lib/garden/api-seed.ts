
import supabase, { isSupabaseAvailable } from './client';
import { tableExists } from './utils/table-utils';
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
    
    // If tables don't exist, warn the user
    if (!distinctionsTableExists || !systemsTableExists || !connectionsTableExists || !inspirationsTableExists) {
      console.error('Some database tables do not exist in Supabase. Make sure you run the SQL setup script in the Supabase dashboard.');
      toast.error('Required database tables not found');
      
      // Log which tables are missing for debugging
      console.error('Missing tables:', {
        'distinctions.distinctions': !distinctionsTableExists,
        'systems.systems': !systemsTableExists,
        'relationships.connections': !connectionsTableExists,
        'perspectives.inspirations': !inspirationsTableExists
      });
      
      // Display a more user-friendly error message
      toast.error('Database tables need to be set up. Please run the complete_garden_setup.sql script in the Supabase dashboard SQL Editor.');
      
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
