
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
    const fullyQualifiedName = parts.length > 1 ? tableName : `public.${tableName}`;
    
    // Query the table directly as a simpler approach
    const { error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
      
    if (error) {
      console.warn(`Table ${tableName} does not exist in Supabase or is inaccessible: ${error.message}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};
