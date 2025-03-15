
import supabase, { isSupabaseAvailable } from '../client';

// Helper function to check if a table exists
export const tableExists = async (tableName: string): Promise<boolean> => {
  // If supabase is null, return false to indicate table doesn't exist
  if (!isSupabaseAvailable()) {
    console.log(`Supabase client not initialized, can't check if table ${tableName} exists`);
    return false;
  }
  
  try {
    // Try to fetch a single record from the table
    const { error } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
    
    // If there's a PostgreSQL error about the relation not existing, the table doesn't exist
    if (error && (
      error.message.includes('relation') && 
      error.message.includes('does not exist')
    )) {
      console.warn(`Table ${tableName} does not exist in Supabase`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};
