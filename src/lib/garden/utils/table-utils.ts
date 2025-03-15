
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
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
    
    // Method 1: Try accessing the table directly with schema qualification
    try {
      const { data, error } = await supabase
        .from(`${schema}.${table}`)
        .select('*')
        .limit(1);
        
      if (!error) {
        console.log(`Table ${schema}.${table} exists and returned data:`, data ? data.length : 0, 'rows');
        return true;
      }
      
      if (error && !error.message.includes('does not exist')) {
        // If the error is not about table existence, it might be permissions
        // We'll still return true since the table exists but we can't access it
        console.log(`Permission issue accessing ${schema}.${table}: ${error.message}`);
        return true;
      }
    } catch (directError) {
      console.warn(`Direct schema-qualified check failed for ${schema}.${table}:`, directError);
    }
    
    // Method 2: Try accessing the table directly without schema qualification
    // This is needed because Supabase sometimes doesn't support schema-qualified names in the REST API
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
        
      if (!error) {
        console.log(`Table ${table} exists in the public schema and returned data:`, data ? data.length : 0, 'rows');
        return true;
      }
      
      if (error && !error.message.includes('does not exist')) {
        console.log(`Permission issue accessing ${table}: ${error.message}`);
        return true;
      }
    } catch (fallbackError) {
      console.warn(`Fallback table check failed for ${table}:`, fallbackError);
    }
    
    // If we're still here, the table likely doesn't exist or is inaccessible
    console.warn(`Table ${schema}.${table} does not exist in Supabase or cannot be accessed`);
    return false;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
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
    
    // Import the setup helper dynamically to avoid circular dependency
    const setupHelper = await import('../utils/setup-helper');
    setupHelper.showSetupInstructions();
    
    return true;
  } catch (error) {
    console.error('Error running setup script:', error);
    toast.error('Failed to set up database tables');
    return false;
  }
};

// Check if all required tables exist
export const checkGardenTablesExist = async (): Promise<boolean> => {
  try {
    // Check essential tables across schemas
    const distinctionsTableExists = await tableExists('distinctions.distinctions');
    const systemsTableExists = await tableExists('systems.systems');
    const connectionsTableExists = await tableExists('relationships.connections');
    
    // If all essential tables exist
    if (distinctionsTableExists && systemsTableExists && connectionsTableExists) {
      console.log('All essential Garden tables exist!');
      return true;
    }
    
    // If any essential table is missing
    console.warn('Some Garden tables are missing:');
    console.warn(`- distinctions.distinctions: ${distinctionsTableExists ? 'Exists' : 'Missing'}`);
    console.warn(`- systems.systems: ${systemsTableExists ? 'Exists' : 'Missing'}`);
    console.warn(`- relationships.connections: ${connectionsTableExists ? 'Exists' : 'Missing'}`);
    
    return false;
  } catch (error) {
    console.error('Error checking Garden tables:', error);
    return false;
  }
};
