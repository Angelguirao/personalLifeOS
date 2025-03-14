
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
let supabase;
try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found in environment variables. Using fallback data.');
    // Instead of undefined, we'll set supabase to null to indicate it's intentionally not initialized
    supabase = null;
  } else {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    console.log('Supabase client initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Set to null when an error occurs
  supabase = null;
}

export default supabase;
