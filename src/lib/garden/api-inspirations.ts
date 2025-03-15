
import supabase from './client';
import { inspirations } from './data';
import { Inspiration, SourceType } from './types';
import { tableExists } from './utils/table-utils';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Convert database inspiration to frontend inspiration
const mapToFrontendInspiration = (dbInspiration: any): Inspiration => ({
  id: dbInspiration.id,
  sourceType: dbInspiration.source_type,
  sourceName: dbInspiration.source_name,
  quote: dbInspiration.quote,
  authorName: dbInspiration.author_name,
  link: dbInspiration.link,
  mentalModelId: dbInspiration.mental_model_id
});

// Convert frontend inspiration to database format
const mapToDatabaseInspiration = (frontendInspiration: Omit<Inspiration, 'id'>): any => ({
  id: uuidv4(),
  source_type: frontendInspiration.sourceType,
  source_name: frontendInspiration.sourceName,
  quote: frontendInspiration.quote,
  author_name: frontendInspiration.authorName,
  link: frontendInspiration.link,
  mental_model_id: frontendInspiration.mentalModelId
});

// Get all inspirations
export const getInspirations = async (): Promise<Inspiration[]> => {
  if (supabase === null) {
    console.log('Supabase client not initialized. Using fallback inspirations data.');
    return inspirations;
  }
  
  try {
    const inspirationsExist = await tableExists('inspirations');
    if (!inspirationsExist) {
      console.log('Inspirations table does not exist, using fallback data');
      return inspirations;
    }
    
    const { data, error } = await supabase
      .from('inspirations')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      return inspirations;
    }
    
    if (!data || data.length === 0) {
      return inspirations;
    }
    
    return data.map(mapToFrontendInspiration);
  } catch (error) {
    console.error('Error fetching inspirations:', error);
    toast.error('Error fetching inspirations. Please refresh.');
    return inspirations;
  }
};

// Get inspirations for a specific mental model
export const getModelInspirations = async (modelId: string): Promise<Inspiration[]> => {
  if (!supabase || !(await tableExists('inspirations'))) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('inspirations')
    .select('*')
    .eq('mental_model_id', modelId);
  
  if (error) {
    console.error('Error fetching model inspirations:', error);
    throw error;
  }
  
  return data.map(mapToFrontendInspiration);
};

// Create a new inspiration
export const createInspiration = async (inspiration: Omit<Inspiration, 'id'>): Promise<Inspiration> => {
  if (!supabase || !(await tableExists('inspirations'))) {
    throw new Error('Cannot create inspiration: Supabase connection or table not available');
  }
  
  const dbInspiration = mapToDatabaseInspiration(inspiration);
  
  const { data, error } = await supabase
    .from('inspirations')
    .insert(dbInspiration)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating inspiration:', error);
    throw error;
  }
  
  return mapToFrontendInspiration(data);
};

// Delete an inspiration
export const deleteInspiration = async (inspirationId: string): Promise<void> => {
  if (!supabase || !(await tableExists('inspirations'))) {
    throw new Error('Cannot delete inspiration: Supabase connection or table not available');
  }
  
  const { error } = await supabase
    .from('inspirations')
    .delete()
    .eq('id', inspirationId);
  
  if (error) {
    console.error('Error deleting inspiration:', error);
    throw error;
  }
};

// Update an existing inspiration
export const updateInspiration = async (
  inspirationId: string,
  updates: Partial<Omit<Inspiration, 'id'>>
): Promise<Inspiration> => {
  if (!supabase || !(await tableExists('inspirations'))) {
    throw new Error('Cannot update inspiration: Supabase connection or table not available');
  }
  
  const dbUpdates: Record<string, any> = {};
  
  if (updates.sourceType !== undefined) dbUpdates.source_type = updates.sourceType;
  if (updates.sourceName !== undefined) dbUpdates.source_name = updates.sourceName;
  if (updates.authorName !== undefined) dbUpdates.author_name = updates.authorName;
  if (updates.quote !== undefined) dbUpdates.quote = updates.quote;
  if (updates.link !== undefined) dbUpdates.link = updates.link;
  if (updates.mentalModelId !== undefined) dbUpdates.mental_model_id = updates.mentalModelId;
  
  const { data, error } = await supabase
    .from('inspirations')
    .update(dbUpdates)
    .eq('id', inspirationId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating inspiration:', error);
    throw error;
  }
  
  return mapToFrontendInspiration(data);
};
