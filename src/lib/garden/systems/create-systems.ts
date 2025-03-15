
import supabase from '../client';
import { System } from '../types/system-types';
import { tableExists } from '../utils/table-utils';
import { transformSystemFromSupabase, transformSystemToSupabase } from './transform-utils';
import { v4 as uuidv4 } from 'uuid';

// Create a new system
export const createSystem = async (system: Omit<System, 'id' | 'createdAt' | 'updatedAt'>): Promise<System> => {
  if (!supabase || !(await tableExists('systems'))) {
    throw new Error('Cannot create system: Supabase connection or table not available');
  }
  
  // Generate a new UUID for the system
  const systemWithId = {
    ...system,
    id: uuidv4()
  };
  
  // Transform to Supabase format
  const supabaseSystem = transformSystemToSupabase(systemWithId);
  
  console.log('Creating system with data:', supabaseSystem);
  
  const { data, error } = await supabase
    .from('systems')
    .insert(supabaseSystem)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating system:', error);
    throw error;
  }
  return transformSystemFromSupabase(data);
};
