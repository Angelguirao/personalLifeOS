
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client
let supabaseClient;

// Initialize our connection with environment variables
try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found in environment variables.');
    toast.error('Database credentials missing. Check your environment variables.');
    supabaseClient = null;
  } else {
    console.log('Initializing Supabase connection with:', 
      supabaseUrl?.startsWith('https://') && supabaseUrl?.includes('.supabase.co') ? 'Valid URL' : 'Invalid URL format',
      typeof supabaseKey === 'string' && supabaseKey.length > 20 ? 'Valid key format' : 'Invalid key format'
    );
    
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  supabaseClient = null;
  toast.error('Failed to initialize database connection');
}

// Export the Supabase client
const supabase = supabaseClient;
export default supabase;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = (): boolean => {
  return supabase !== null;
};

// Test the database connection and return a promise
export const testConnection = async (): Promise<boolean> => {
  if (!supabase) {
    toast.error('Database client not initialized');
    return false;
  }
  
  try {
    // Try a simple query as a basic connection test
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .limit(1);
    
    if (error) {
      console.warn('Supabase connection test failed:', error.message);
      if (error.message.includes('permission denied')) {
        toast.warning('Database connected but with limited permissions');
        return true; // Connection exists but permissions are limited
      } else {
        toast.error('Database connection error: ' + error.message);
        return false;
      }
    } else {
      console.log('Supabase connection test successful!');
      toast.success('Connected to database successfully');
      return true;
    }
  } catch (error) {
    console.error('Supabase connection test error:', error);
    toast.error('Failed to connect to database');
    return false;
  }
};
