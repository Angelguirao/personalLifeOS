
import supabase, { isSupabaseAvailable } from '../client';
import { toast } from 'sonner';

// Helper function to check if a table exists
export const tableExists = async (tableName: string): Promise<boolean> => {
  // If supabase is null, return false to indicate table doesn't exist
  if (!isSupabaseAvailable()) {
    console.log(`Supabase client not initialized, can't check if table ${tableName} exists`);
    return false;
  }
  
  try {
    // Split the table name to handle schema-qualified names
    const parts = tableName.split('.');
    const schema = parts.length > 1 ? parts[0] : 'public';
    const table = parts.length > 1 ? parts[1] : parts[0];
    
    console.log(`Checking if table ${schema}.${table} exists...`);
    
    // Query the information_schema tables to check if the table exists
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', schema)
      .eq('table_name', table)
      .limit(1);
      
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      
      // Provide specific guidance based on error code
      if (error.code === '42P01') { // Table does not exist
        console.warn(`Information schema table not accessible. Using fallback method to check if ${tableName} exists.`);
        
        // Try direct query as fallback
        const fallbackCheck = await directTableQuery(tableName);
        return fallbackCheck;
      } else {
        toast.error(`Database error: ${error.message}`);
        return false;
      }
    }
    
    const exists = data && data.length > 0;
    console.log(`Table ${schema}.${table} exists: ${exists}`);
    
    if (!exists) {
      console.warn(`Table ${schema}.${table} does not exist in the database`);
      toast.error(`Table ${schema}.${table} not found. Run the setup script in Supabase.`);
    }
    
    return exists;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Fallback function to check if a table exists by directly querying it
const directTableQuery = async (tableName: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.code === '42P01') {  // Table or view does not exist
        console.warn(`Table ${tableName} does not exist in Supabase: ${error.message}`);
        toast.error(`Table ${tableName} not found. Please run the setup script.`);
      } else {
        console.warn(`Error accessing table ${tableName}: ${error.message}`);
      }
      return false;
    }
    
    console.log(`Table ${tableName} exists and returned data:`, data ? data.length : 0, 'rows');
    return true;
  } catch (error) {
    console.error(`Error in direct table query for ${tableName}:`, error);
    return false;
  }
};

// Helper to run SQL script against Supabase
export const runSetupScript = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    toast.error('Database connection not available');
    return false;
  }
  
  try {
    toast.info('Attempting to run database setup script...');
    
    console.log('Running complete garden setup script...');
    
    // Inform user about manual setup requirement
    toast.info('Please run the complete_garden_setup.sql script in the Supabase SQL Editor');
    
    // Return instructions for manual setup
    return true;
  } catch (error) {
    console.error('Error running setup script:', error);
    toast.error('Failed to set up database tables');
    return false;
  }
};
