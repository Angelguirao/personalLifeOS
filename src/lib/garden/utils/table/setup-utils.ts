import { toast } from 'sonner';
import { setupDatabaseTables } from '@/lib/edge/setup-database';
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
import { executeSQL } from '@/lib/garden/client';

// Helper to run setup script through edge function
export const runSetupScript = async (): Promise<boolean> => {
  try {
    toast.info('Attempting to run database setup script via Edge Function...');
    
    const result = await setupDatabaseTables();
    
    if (result.success) {
      toast.success('Database setup completed successfully via Edge Function');
      return true;
    } else {
      // If edge function execution failed, show instructions for manual setup
      // Import the setup helper dynamically to avoid circular dependency
      const setupHelper = await import('../setup-helper');
      setupHelper.showSetupInstructions();
      
      return false;
    }
  } catch (error) {
    console.error('Error running setup script:', error);
    toast.error('Failed to set up database tables');
    return false;
  }
};

// These functions are kept for reference, but most functionality 
// has been moved to the edge function
// Helper to fetch the complete setup script
export const getCompleteSetupScript = async (): Promise<string | null> => {
  try {
    // Attempt to fetch the complete script
    const response = await fetch('/src/lib/garden/sql/complete_garden_setup.sql');
    
    if (!response.ok) {
      console.error(`Failed to fetch SQL script: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const sql = await response.text();
    console.log('Successfully loaded SQL script:', sql.substring(0, 100) + '...');
    return sql;
  } catch (error) {
    console.error('Error fetching SQL script:', error);
    return null;
  }
};

// Helper to verify schema existence
export const schemaExists = async (schemaName: string): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    return false;
  }
  
  try {
    // Query information_schema.schemata to check if the schema exists
    const { data, error } = await supabase
      .from('information_schema.schemata')
      .select('schema_name')
      .eq('schema_name', schemaName)
      .maybeSingle();
    
    if (error) {
      // If we got a permission error, try an alternative approach
      if (error.message.includes('permission denied')) {
        console.log(`Permission denied when checking schema ${schemaName}, trying alternative method`);
        return await checkSchemaByAttemptingAccess(schemaName);
      }
      
      console.error(`Error checking schema ${schemaName}:`, error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error(`Error checking schema ${schemaName}:`, error);
    return await checkSchemaByAttemptingAccess(schemaName);
  }
};

// Alternative method to check schema existence by trying to access a table in it
const checkSchemaByAttemptingAccess = async (schemaName: string): Promise<boolean> => {
  try {
    // We try to query a dummy table in the schema
    // This will fail with "relation does not exist" if the schema exists
    // but will fail with "schema does not exist" if the schema doesn't exist
    const { error } = await supabase
      .from(`${schemaName}._check_schema_exists_dummy`)
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.message.includes('schema') && error.message.includes('does not exist')) {
        return false;
      } else {
        // If we get any other error, the schema probably exists
        return true;
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error in alternative schema check for ${schemaName}:`, error);
    return false;
  }
};
