
import supabase, { isSupabaseAvailable } from './client';
import { System, SystemModelRelation } from './types/system-types';
import { tableExists } from './utils/table-utils';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Helper function to transform system data from Supabase to our interface
const transformSystemFromSupabase = (data: any): System => {
  return {
    id: data.id,
    name: data.name,
    description: data.description || '',
    icon: data.icon,
    color: data.color,
    category: data.category,
    importanceLevel: data.importance_level || 3,
    visibility: data.visibility || 'public',
    relatedModels: data.related_models || [],
    isSelf: data.is_self || false,
    metadata: data.metadata,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

// Helper function to transform system data to Supabase format
const transformSystemToSupabase = (system: Partial<System> & { id?: string }) => {
  return {
    id: system.id,
    name: system.name,
    description: system.description,
    icon: system.icon,
    color: system.color,
    category: system.category,
    importance_level: system.importanceLevel,
    visibility: system.visibility,
    related_models: system.relatedModels || [],
    is_self: system.isSelf,
    metadata: system.metadata
  };
};

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

// Get system model relationships
export const getSystemModelRelations = async (systemId: string): Promise<SystemModelRelation[]> => {
  if (!isSupabaseAvailable() || !(await tableExists('system_model_relations'))) {
    console.error('Database not available or relations table does not exist');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('system_model_relations')
      .select('*')
      .eq('system_id', systemId);
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return [];
    }
    
    return data.map((relation: any) => ({
      id: relation.id,
      systemId: relation.system_id,
      modelId: relation.model_id,
      relationshipType: relation.relationship_type,
      strength: relation.strength,
      createdAt: relation.created_at
    }));
  } catch (error) {
    console.error('Error fetching system-model relations:', error);
    toast.error('Error loading system relationships');
    return [];
  }
};

// Create a system-model relationship
export const createSystemModelRelation = async (
  relation: Omit<SystemModelRelation, 'id' | 'createdAt'>
): Promise<SystemModelRelation> => {
  if (!supabase || !(await tableExists('system_model_relations'))) {
    throw new Error('Cannot create relation: Supabase connection or table not available');
  }
  
  const { data, error } = await supabase
    .from('system_model_relations')
    .insert({
      system_id: relation.systemId,
      model_id: relation.modelId,
      relationship_type: relation.relationshipType,
      strength: relation.strength
    })
    .select()
    .single();
  
  if (error) {
    // Check if it's a unique constraint error (relation already exists)
    if (error.code === '23505') {
      throw new Error('This model is already related to this system');
    }
    throw error;
  }
  
  return {
    id: data.id,
    systemId: data.system_id,
    modelId: data.model_id,
    relationshipType: data.relationship_type,
    strength: data.strength,
    createdAt: data.created_at
  };
};

// Delete a system-model relationship
export const deleteSystemModelRelation = async (
  systemId: string, 
  modelId: string
): Promise<void> => {
  if (!supabase || !(await tableExists('system_model_relations'))) {
    throw new Error('Cannot delete relation: Supabase connection or table not available');
  }
  
  const { error } = await supabase
    .from('system_model_relations')
    .delete()
    .match({ system_id: systemId, model_id: modelId });
  
  if (error) throw error;
};
