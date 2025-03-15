
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client with improved error handling
let supabase;

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
    
    // Test connection by making a simple query to check if the distinctions schema and table exist
    supabase.from('distinctions.distinctions').select('id').limit(1)
      .then(response => {
        if (response.error) {
          console.warn('Supabase connection test failed:', response.error.message, response.error);
          if (response.error.code === '42P01') {  // Table or view does not exist
            console.log('The table does not exist. You may need to run the setup SQL script in the Supabase dashboard.');
            toast.error('Database tables not set up. Please run the setup script.');
          } else if (response.error.message && response.error.message.includes('permission denied')) {
            console.log('This appears to be a permissions issue. Check your RLS policies.');
            toast.error('Database permission issue. Check your policies.');
          } else {
            console.log('Unknown database error:', response.error);
            toast.error('Database connection issue: ' + response.error.message);
          }
        } else {
          console.log('Supabase connection test successful!');
          toast.success('Connected to database successfully');
        }
      })
      .catch(error => {
        console.error('Supabase connection test error:', error.message, error);
        toast.error('Failed to connect to database: ' + error.message);
      });
    
    console.log('Supabase client initialized successfully');
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
