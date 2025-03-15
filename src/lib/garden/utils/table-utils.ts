
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
    
    // Try direct query as it's more reliable with schema-qualified names
    return await directTableQuery(schema, table);
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Improved function to check if a table exists by directly querying it
const directTableQuery = async (schema: string, table: string): Promise<boolean> => {
  try {
    // For Supabase, we need to use RPC to query tables in non-public schemas
    const { data, error } = await supabase.rpc('check_table_exists', { 
      p_schema_name: schema,
      p_table_name: table
    });
    
    if (error) {
      console.warn(`Error checking if table ${schema}.${table} exists: ${error.message}`);
      // If RPC fails, we fall back to a different approach
      return await fallbackTableCheck(schema, table);
    }
    
    const exists = data === true;
    console.log(`Table ${schema}.${table} exists: ${exists}`);
    
    if (!exists) {
      console.warn(`Table ${schema}.${table} does not exist in the database`);
      toast.error(`Table ${schema}.${table} not found. Run the setup script in Supabase.`);
    }
    
    return exists;
  } catch (error) {
    console.error(`Error in direct table query for ${schema}.${table}:`, error);
    return await fallbackTableCheck(schema, table);
  }
};

// Fallback method when RPC is not available
const fallbackTableCheck = async (schema: string, table: string): Promise<boolean> => {
  try {
    // Try a direct query with the full schema path
    // Note: This may not work for all cases but is a good fallback
    let query = `${schema}.${table}`;
    
    // In some cases with Supabase, we might need to workaround by removing schema prefix
    // Let's try a direct query to the table without schema qualification
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.code === '42P01') {  // Table or view does not exist
        console.warn(`Table ${schema}.${table} does not exist in Supabase: ${error.message}`);
        toast.error(`Table ${table} not found. Please run the setup script.`);
      } else {
        console.warn(`Error accessing table ${schema}.${table}: ${error.message}`);
      }
      return false;
    }
    
    console.log(`Table ${table} exists and returned data:`, data ? data.length : 0, 'rows');
    return true;
  } catch (error) {
    console.error(`Error in fallback table check for ${schema}.${table}:`, error);
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
    
    // First, try to create the custom function to check table existence
    try {
      await createTableCheckFunction();
    } catch (fnError) {
      console.warn('Could not create table check function:', fnError);
    }
    
    // Provide specific instructions for setting up tables
    toast.info('You need to run the setup script manually in the Supabase SQL Editor', {
      description: 'Go to Supabase Dashboard > SQL Editor and run the complete_garden_setup.sql script',
      duration: 8000
    });
    
    return true;
  } catch (error) {
    console.error('Error running setup script:', error);
    toast.error('Failed to set up database tables');
    return false;
  }
};

// Create a database function to check if tables exist
const createTableCheckFunction = async (): Promise<void> => {
  if (!isSupabaseAvailable()) return;
  
  const createFunctionSQL = `
  CREATE OR REPLACE FUNCTION check_table_exists(p_schema_name text, p_table_name text) 
  RETURNS boolean AS $$
  DECLARE
    table_exists boolean;
  BEGIN
    SELECT EXISTS (
      SELECT FROM pg_tables 
      WHERE schemaname = p_schema_name 
      AND tablename = p_table_name
    ) INTO table_exists;
    
    RETURN table_exists;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  
  try {
    const { error } = await supabase.rpc('exec_sql', { sql: createFunctionSQL });
    if (error) throw error;
    console.log('Successfully created table check function');
  } catch (error) {
    console.warn('Could not create table check function:', error);
    // This is expected to fail if the user doesn't have permission to create functions
    // We'll use our fallback methods
  }
};
