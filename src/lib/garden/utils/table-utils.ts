
import supabase, { isSupabaseAvailable } from '../client';

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
    
    // Query the table directly as a simpler approach
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.code === '42P01') {  // Table or view does not exist
        console.warn(`Table ${tableName} does not exist in Supabase: ${error.message}`);
      } else {
        console.warn(`Error accessing table ${tableName}: ${error.message}`);
      }
      return false;
    }
    
    console.log(`Table ${tableName} exists and returned data:`, data ? data.length : 0, 'rows');
    return true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};
