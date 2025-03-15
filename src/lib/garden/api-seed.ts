
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
    // Check if tables exist
    const mentalModelsTableExists = await tableExists('mental_models');
    const connectionsTableExists = await tableExists('connections');
    const versionsTableExists = await tableExists('mental_model_versions');
    const questionsTableExists = await tableExists('questions');
    const inspirationsTableExists = await tableExists('inspirations');
    
    // If mental models table doesn't exist, warn the user
    if (!mentalModelsTableExists || !connectionsTableExists || !versionsTableExists || 
        !questionsTableExists || !inspirationsTableExists) {
      console.error('Some database tables do not exist in Supabase. Please create them manually in the Supabase dashboard.');
      toast.error('Required database tables not found');
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
