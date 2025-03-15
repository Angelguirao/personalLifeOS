
import supabase, { isSupabaseAvailable } from '../client';
import { SystemModelRelation } from '../types/system-types';
import { tableExists } from '../utils/table-utils';
import { toast } from 'sonner';

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
