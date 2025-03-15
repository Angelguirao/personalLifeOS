
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
    
    // Test connection by making a simple query to the distinctions schema
    supabase.from('distinctions.distinctions').select('id').limit(1)
      .then(response => {
        if (response.error) {
          console.warn('Supabase connection test failed:', response.error.message);
          if (response.error.message.includes('permission denied')) {
            console.log('This appears to be a permissions issue. Check your RLS policies.');
          } else if (response.error.message.includes('does not exist')) {
            console.log('The table does not exist. Check that the schema and table are created correctly.');
          }
        } else {
          console.log('Supabase connection test successful!');
        }
      })
      .catch(error => {
        console.error('Supabase connection test error:', error.message);
      });
    
    console.log('Supabase client initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  supabase = null;
}

// Export the Supabase client
export default supabase;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};
