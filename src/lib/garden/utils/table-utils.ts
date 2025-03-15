
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
    let schema = 'public';
    let table = tableName;
    
    if (parts.length > 1) {
      schema = parts[0];
      table = parts[1];
    }
    
    // Query the information_schema to check if the table exists
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', schema)
      .eq('table_name', table)
      .limit(1);
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      
      // Try alternative approach - query the table directly
      const { error: queryError } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
        
      if (queryError) {
        console.warn(`Table ${tableName} does not exist in Supabase`);
        return false;
      }
      
      return true;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};
