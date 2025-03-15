
import supabase from '@/lib/supabase/client';
import { System } from '../types/system-types';
import { tableExists } from '../utils/table-utils';
import { transformSystemFromSupabase, transformSystemToSupabase } from './transform-utils';

// Update an existing system
export const updateSystem = async (id: string, system: Partial<System>): Promise<System> => {
  if (!supabase || !(await tableExists('systems'))) {
    throw new Error('Cannot update system: Supabase connection or table not available');
  }
  
  const updates = transformSystemToSupabase(system);
  
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
  if (!supabase || !(await tableExists('systems'))) {
    throw new Error('Cannot delete system: Supabase connection or table not available');
  }
  
  const { error } = await supabase
    .from('systems')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
