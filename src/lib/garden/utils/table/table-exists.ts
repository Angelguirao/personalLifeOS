
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';

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
