
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
    
    // Method 1: Try direct query
    try {
      const result = await directTableCheck(schema, table);
      if (result) return true;
    } catch (directError) {
      console.warn(`Direct table check failed for ${schema}.${table}:`, directError);
    }
    
    // Method 2: Try using information_schema
    try {
      const result = await informationSchemaCheck(schema, table);
      if (result) return true;
    } catch (schemaError) {
      console.warn(`Information schema check failed for ${schema}.${table}:`, schemaError);
    }
    
    // Method 3: Try accessing the table directly without schema qualification
    try {
      const result = await fallbackTableCheck(table);
      if (result) return true;
    } catch (fallbackError) {
      console.warn(`Fallback table check failed for ${table}:`, fallbackError);
    }
    
    // If all methods failed, the table likely doesn't exist
    console.warn(`Table ${schema}.${table} does not exist in Supabase`);
    return false;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Direct check for a table using RPC if available
const directTableCheck = async (schema: string, table: string): Promise<boolean> => {
  try {
    // First try using a custom function if it exists
    try {
      const { data, error } = await supabase.rpc('check_table_exists', { 
        p_schema_name: schema,
        p_table_name: table
      });
      
      if (!error && data === true) {
        console.log(`Table ${schema}.${table} exists according to RPC check`);
        return true;
      }
    } catch (rpcError) {
      console.warn(`RPC check_table_exists failed for ${schema}.${table}:`, rpcError);
    }
    
    // Try a direct query to the schema-qualified table
    const fullName = `${schema}.${table}`;
    const { data, error } = await supabase
      .from(fullName)
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.message.includes('does not exist')) {
        console.warn(`Table ${schema}.${table} does not exist in Supabase: ${error.message}`);
        throw error;
      }
      
      // Some other error occurred, maybe permissions
      console.warn(`Error accessing table ${schema}.${table}: ${error.message}`);
      return false;
    }
    
    console.log(`Table ${schema}.${table} exists and returned data:`, data ? data.length : 0, 'rows');
    return true;
  } catch (error) {
    console.warn(`Direct table check failed for ${schema}.${table}:`, error);
    throw error;
  }
};

// Check table existence using information_schema
const informationSchemaCheck = async (schema: string, table: string): Promise<boolean> => {
  try {
    // Try to query information_schema.tables
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', schema)
      .eq('table_name', table)
      .limit(1);
      
    if (error) {
      console.warn(`Information schema check failed for ${schema}.${table}: ${error.message}`);
      throw error;
    }
    
    const exists = data && data.length > 0;
    console.log(`Table ${schema}.${table} exists according to information_schema: ${exists}`);
    return exists;
  } catch (error) {
    console.warn(`Information schema check failed for ${schema}.${table}:`, error);
    throw error;
  }
};

// Fallback method when other methods fail
const fallbackTableCheck = async (table: string): Promise<boolean> => {
  try {
    // Try a direct query to the table without schema qualification
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.message.includes('does not exist')) {
        console.warn(`Table ${table} does not exist in Supabase: ${error.message}`);
        throw error;
      }
      
      // Some other error occurred, maybe permissions
      console.warn(`Error accessing table ${table}: ${error.message}`);
      return false;
    }
    
    console.log(`Table ${table} exists and returned data:`, data ? data.length : 0, 'rows');
    return true;
  } catch (error) {
    console.warn(`Fallback table check failed for ${table}:`, error);
    throw error;
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
    // First try using RPC method
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: createFunctionSQL });
      if (!error) {
        console.log('Successfully created table check function');
        return;
      }
    } catch (rpcError) {
      console.warn('Could not create table check function via RPC:', rpcError);
    }
    
    // If RPC fails, try direct SQL using supabase-js (requires higher permissions)
    const { error } = await supabase.from('_raw_sql').rpc('', { sql: createFunctionSQL });
    if (error) throw error;
    console.log('Successfully created table check function');
  } catch (error) {
    console.warn('Could not create table check function:', error);
    // This is expected to fail if the user doesn't have permission to create functions
    // We'll use our fallback methods
  }
};
