
import supabase from '@/lib/supabase/client';
import { System } from '../types/system-types';
import { tableExists } from '../utils/table-utils';
import { transformSystemFromSupabase, transformSystemToSupabase } from './transform-utils';

// Update an existing system
export const updateSystem = async (id: string, system: Partial<System>): Promise<System> => {
  if (!supabase) {
    throw new Error('Cannot update system: Supabase connection not available');
  }
  
  // Check if the systems table exists in the correct schema
  const systemsExist = await tableExists('systems.systems');
  if (!systemsExist) {
    throw new Error('Cannot update system: Systems table not available');
  }
  
  const updates = transformSystemToSupabase(system);
  
  // Note: When using schema-qualified tables in Supabase REST API,
  // we need to use the table name only and rely on RLS policies
  const { data, error } = await supabase
    .from('systems')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return transformSystemFromSupabase(data);
};

// Delete a system
export const deleteSystem = async (id: string): Promise<void> => {
  if (!supabase) {
    throw new Error('Cannot delete system: Supabase connection not available');
  }
  
  // Check if the systems table exists in the correct schema
  const systemsExist = await tableExists('systems.systems');
  if (!systemsExist) {
    throw new Error('Cannot delete system: Systems table not available');
  }
  
  // Note: When using schema-qualified tables in Supabase REST API,
  // we need to use the table name only and rely on RLS policies
  const { error } = await supabase
    .from('systems')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
