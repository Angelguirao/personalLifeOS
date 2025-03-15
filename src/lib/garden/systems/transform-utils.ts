
import { System } from '../types/system-types';

// Helper function to transform system data from Supabase to our interface
export const transformSystemFromSupabase = (data: any): System => {
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
export const transformSystemToSupabase = (system: Partial<System> & { id?: string }) => {
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
