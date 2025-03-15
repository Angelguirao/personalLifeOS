
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client with improved error handling
let supabase;

// Test the database connection
const testConnection = async () => {
  if (!supabase) return;
  
  try {
    // Try a simple query first as a basic connection test
    // Using information_schema directly often has permission issues in Supabase
    const { data, error } = await supabase
      .from('information_schema.schemata')
      .select('schema_name')
      .limit(1)
      .catch(e => ({ data: null, error: e }));
    
    if (error) {
      console.warn('Supabase connection test failed:', error.message);
      handleConnectionError(error);
      
      // Check if tables exist by attempting to access them directly
      await checkTablesExist();
    } else {
      console.log('Supabase connection test successful!');
      toast.success('Connected to database successfully');
      
      // Try to create our helper functions
      createHelperFunctions();
    }
  } catch (error) {
    console.error('Supabase connection test error:', error);
    toast.error('Failed to connect to database: ' + error.message);
    
    // Even with connection error, try to check tables
    await checkTablesExist();
  }
};

// Check if the required tables exist
const checkTablesExist = async () => {
  try {
    // Try to access the distinctions table directly
    const { error: distinctionsError } = await supabase
      .from('distinctions.distinctions')
      .select('id')
      .limit(1)
      .single();
    
    // Try to access the systems table directly
    const { error: systemsError } = await supabase
      .from('systems.systems')
      .select('id')
      .limit(1)
      .single();
    
    // Try to access the connections table directly
    const { error: connectionsError } = await supabase
      .from('relationships.connections')
      .select('id')
      .limit(1)
      .single();
    
    // If all queries failed with table not exist errors, we need to run the setup
    if (
      distinctionsError?.message?.includes('does not exist') &&
      systemsError?.message?.includes('does not exist') &&
      connectionsError?.message?.includes('does not exist')
    ) {
      console.log('Database tables need to be created - displaying setup instructions');
      
      // Show toast with database setup instructions
      toast.error('Database tables need to be set up', {
        description: 'Please run the SQL setup script in the Supabase SQL Editor',
        duration: 10000,
        action: {
          label: 'Setup Instructions',
          onClick: () => {
            // Import and call the setup helper dynamically to avoid circular dependency
            import('./utils/setup-helper').then(module => {
              module.showSetupInstructions();
            });
          }
        }
      });
    }
  } catch (error) {
    console.error('Error checking tables existence:', error);
  }
};

// Handle connection errors
const handleConnectionError = (error) => {
  if (error.code === '42P01') {  // Table or view does not exist
    console.log('Information schema not accessible. This is expected with limited permissions.');
    toast.warning('Limited database access. Some features may not work properly.');
  } else if (error.message && error.message.includes('permission denied')) {
    console.log('This appears to be a permissions issue. Check your RLS policies.');
    toast.error('Database permission issue. Check your policies.');
  } else {
    console.log('Unknown database error:', error);
    toast.error('Database connection issue: ' + error.message);
  }
};

// Create helper database functions
const createHelperFunctions = async () => {
  if (!supabase) return;
  
  try {
    // Create a function to execute arbitrary SQL
    const createExecSqlFn = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text) 
    RETURNS void AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    await supabase.rpc('exec_sql', { sql: createExecSqlFn }).catch(err => {
      console.warn('Could not create exec_sql function. This requires admin privileges:', err);
    });
    
  } catch (error) {
    console.warn('Failed to create helper functions:', error);
    // Not critical, so we'll continue
  }
};

// Check for environment variables and initialize Supabase
try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('Supabase credentials not found in environment variables. Using fallback data.');
    toast.error('Database credentials missing. Check your environment variables.');
    supabase = null;
  } else {
    console.log('Supabase credentials found. URL format valid:', 
      supabaseUrl?.startsWith('https://') && supabaseUrl?.includes('.supabase.co'),
      'Key format valid:', 
      typeof supabaseKey === 'string' && supabaseKey.length > 20
    );
    
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    
    // Test connection by making a simple query
    testConnection();
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  supabase = null;
  toast.error('Failed to initialize database connection');
}

// Export the Supabase client
export default supabase;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};

// Helper to execute SQL directly (if permitted)
export const executeSQL = async (sql: string): Promise<boolean> => {
  if (!supabase) return false;
  
  try {
    // First try using the RPC method
    try {
      const { error } = await supabase.rpc('exec_sql', { sql });
      if (!error) return true;
    } catch (rpcError) {
      console.warn('RPC exec_sql failed, trying raw SQL:', rpcError);
    }
    
    // If RPC fails, try direct SQL using supabase-js
    // Note: This requires higher permissions and may not work
    const { error } = await supabase.from('_raw_sql').rpc('', { sql });
    if (error) {
      console.error('Error executing SQL:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to execute SQL:', error);
    return false;
  }
};
