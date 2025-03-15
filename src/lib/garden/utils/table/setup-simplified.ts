
import { toast } from 'sonner';
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
import { setupDatabaseTables } from '@/lib/edge/setup-database';

/**
 * Runs a simplified setup script that only creates the distinctions schema and table
 * Uses edge function instead of client-side SQL
 */
export const runSimplifiedSetup = async (): Promise<boolean> => {
  try {
    toast.info('Setting up distinctions schema and table via Edge Function...');
    
    const result = await setupDatabaseTables();
    
    if (result.success) {
      toast.success('Distinctions table created successfully via Edge Function!');
      return true;
    } else {
      toast.error('Failed to create distinctions table');
      return false;
    }
  } catch (error) {
    console.error('Error running simplified setup script:', error);
    toast.error('Failed to set up distinctions table');
    return false;
  }
};

/**
 * Checks if the distinctions schema and table exist
 */
export const checkDistinctionsExists = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    return false;
  }
  
  try {
    // First check if schema exists
    const { data: schemaData, error: schemaError } = await supabase
      .from('information_schema.schemata')
      .select('schema_name')
      .eq('schema_name', 'distinctions')
      .maybeSingle();
    
    if (schemaError || !schemaData) {
      console.log('Distinctions schema does not exist:', schemaError?.message);
      return false;
    }
    
    // Then check if table exists
    const { data, error } = await supabase
      .from('distinctions.distinctions')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log('Distinctions table does not exist');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking distinctions schema/table:', error);
    return false;
  }
};
