
import supabase, { isSupabaseAvailable } from '../client';
import { System } from '../types/system-types';
import { tableExists } from '../utils/table-utils';
import { toast } from 'sonner';
import { transformSystemFromSupabase } from './transform-utils';

// Get all systems
export const getSystems = async (): Promise<System[]> => {
  console.log('Fetching systems...');
  
  // Check if Supabase is available
  if (!isSupabaseAvailable()) {
    console.error('Supabase client not initialized.');
    toast.error('Database connection not available');
    return [];
  }
  
  try {
    // Check if table exists
    const systemsExist = await tableExists('systems');
    if (!systemsExist) {
      console.error('Systems table does not exist');
      toast.error('Systems table not configured');
      return [];
    }
    
    console.log('Fetching systems from Supabase...');
    const { data, error } = await supabase
      .from('systems')
      .select('*')
      .order('importance_level', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      toast.error('Failed to load systems from database');
      return [];
    }
    
    console.log('Supabase systems data:', data);
    
    if (!data || data.length === 0) {
      console.log('No systems found in Supabase');
      return [];
    }
    
    return data.map(transformSystemFromSupabase);
  } catch (error) {
    console.error('Error fetching systems:', error);
    toast.error('Error fetching systems');
    return [];
  }
};

// Get system by ID
export const getSystemById = async (id: string): Promise<System | undefined> => {
  if (!isSupabaseAvailable() || !(await tableExists('systems'))) {
    console.error('Database not available or systems table does not exist');
    toast.error('Database connection not available');
    return undefined;
  }
  
  try {
    const { data, error } = await supabase
      .from('systems')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data ? transformSystemFromSupabase(data) : undefined;
  } catch (error) {
    console.error('Error fetching system by id:', error);
    toast.error('Error loading system details');
    return undefined;
  }
};
