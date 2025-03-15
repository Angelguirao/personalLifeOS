
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { executeSQL } from '@/lib/garden/client';

// Helper to run SQL script against Supabase
export const runSetupScript = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    toast.error('Database connection not available');
    return false;
  }
  
  try {
    toast.info('Attempting to run database setup script...');
    
    console.log('Running complete garden setup script...');
    
    // Try to get the complete SQL script
    const setupScript = await getCompleteSetupScript();
    
    if (!setupScript) {
      toast.error('Failed to load setup script');
      return false;
    }
    
    // Attempt to execute the script using executeSQL helper from garden client
    const success = await executeSQL(setupScript);
    
    if (success) {
      toast.success('Database tables created successfully!');
      return true;
    } else {
      // If direct execution failed, show instructions for manual setup
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
