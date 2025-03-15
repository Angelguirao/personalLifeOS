
import supabase from '@/lib/supabase/client';
import { System } from '../types/system-types';
import { tableExists } from '../utils/table-utils';
import { transformSystemFromSupabase, transformSystemToSupabase } from './transform-utils';
import { v4 as uuidv4 } from 'uuid';

// Create a new system
export const createSystem = async (system: Omit<System, 'id' | 'createdAt' | 'updatedAt'>): Promise<System> => {
  if (!supabase) {
    throw new Error('Cannot create system: Supabase connection not available');
  }
  
  // Check if the systems table exists in the correct schema
  const systemsExist = await tableExists('systems.systems');
  if (!systemsExist) {
    throw new Error('Cannot create system: Systems table not available');
  }
  
  // Generate a new UUID for the system
  const systemWithId = {
    ...system,
    id: uuidv4()
  };
  
  // Transform to Supabase format
  const supabaseSystem = transformSystemToSupabase(systemWithId);
  
  console.log('Creating system with data:', supabaseSystem);
  
  // Note: When using schema-qualified tables in Supabase REST API,
  // we need to use the table name only and rely on RLS policies
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
