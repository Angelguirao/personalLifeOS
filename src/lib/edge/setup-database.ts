
// This file defines the interface for our edge function that will handle database setup
// This will be called from the client but executed on the server

import { toast } from 'sonner';

// URL where our edge function will be deployed
const EDGE_FUNCTION_URL = import.meta.env.VITE_EDGE_FUNCTION_URL || '';

// Interface for the response from our setup edge function
interface SetupResponse {
  success: boolean;
  message: string;
  tablesCreated?: string[];
}

/**
 * Calls the edge function to set up the database tables
 */
export const setupDatabaseTables = async (): Promise<SetupResponse> => {
  if (!EDGE_FUNCTION_URL) {
    toast.error('Edge function URL not configured');
    return {
      success: false,
      message: 'Edge function URL not configured in environment variables'
    };
  }
  
  try {
    const response = await fetch(`${EDGE_FUNCTION_URL}/setup-database`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Edge function error: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      toast.success(result.message || 'Database tables created successfully');
    } else {
      toast.error(result.message || 'Failed to create database tables');
    }
    
    return result;
  } catch (error) {
    console.error('Error calling setup database edge function:', error);
    toast.error(`Error setting up database: ${error.message}`);
    
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
};
