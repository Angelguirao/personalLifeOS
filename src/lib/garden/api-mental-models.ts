
import supabase, { isSupabaseAvailable } from './client';
import { MentalModel } from './types/mental-model-types';
import { tableExists } from './utils/table-utils';
import { transformMentalModelFromSupabase, transformMentalModelToSupabase } from './utils/model-transforms';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const getMentalModels = async (): Promise<MentalModel[]> => {
  console.log('Fetching mental models...');
  
  // Check if Supabase is available
  if (!isSupabaseAvailable()) {
    console.error('Supabase client not initialized.');
    toast.error('Database connection not available');
    return [];
  }
  
  try {
    // Check if distinctions table exists
    const modelsExist = await tableExists('distinctions.distinctions');
    if (!modelsExist) {
      console.error('Distinctions table does not exist');
      toast.error('Database tables not properly set up. Please run the setup script.');
      return [];
    }
    
    console.log('Fetching mental models from Supabase...');
    const { data, error } = await supabase
      .from('distinctions.distinctions')
      .select('*')
      .eq('type', 'mental_model');
    
    if (error) {
      console.error('Supabase error:', error);
      toast.error('Failed to load mental models from database');
      return [];
    }
    
    console.log('Supabase mental models data:', data);
    
    if (!data || data.length === 0) {
      console.log('No mental models found in Supabase');
      return [];
    }
    
    return data.map(transformMentalModelFromSupabase);
  } catch (error) {
    console.error('Error fetching mental models:', error);
    toast.error('Error fetching mental models');
    return [];
  }
};

export const getMentalModelById = async (id: string): Promise<MentalModel | undefined> => {
  if (!isSupabaseAvailable()) {
    console.error('Database not available');
    toast.error('Database connection not available');
    return undefined;
  }
  
  try {
    const { data, error } = await supabase
      .from('distinctions.distinctions')
      .select('*')
      .eq('id', id)
      .eq('type', 'mental_model')
      .single();
    
    if (error) throw error;
    return data ? transformMentalModelFromSupabase(data) : undefined;
  } catch (error) {
    console.error('Error fetching mental model by id:', error);
    toast.error('Error loading mental model details');
    return undefined;
  }
};

// Helper function to check if the user is authenticated
const checkAuthentication = async () => {
  if (!isSupabaseAvailable()) {
    throw new Error('Supabase client is not available');
  }
  
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Authentication error:', error);
    throw new Error(`Authentication error: ${error.message}`);
  }
  
  if (!session) {
    throw new Error('You must be authenticated to perform this action');
  }
  
  return session;
};

export const createMentalModel = async (model: Omit<MentalModel, 'id'>): Promise<MentalModel> => {
  if (!supabase) {
    throw new Error('Cannot create mental model: Supabase connection not available');
  }
  
  try {
    // Check if table exists
    const tableAccessible = await tableExists('distinctions.distinctions');
    if (!tableAccessible) {
      throw new Error('The distinctions.distinctions table does not exist or is not accessible. Please run the complete_garden_setup.sql script in the Supabase SQL Editor.');
    }
    
    // Check authentication
    await checkAuthentication();
    
    // Generate a new UUID for the model
    const modelId = uuidv4();
    
    // Transform to Supabase format and ensure type is set to mental_model
    const supabaseModel = {
      ...transformMentalModelToSupabase({
        ...model,
        id: modelId
      } as MentalModel),
      type: 'mental_model'
    };
    
    console.log('Creating mental model with data:', supabaseModel);
    
    const { data, error } = await supabase
      .from('distinctions.distinctions')
      .insert(supabaseModel)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error when creating mental model:', error);
      
      // Handle specific error cases
      if (error.code === '42P01') {
        throw new Error('Database table not found. Please run the complete_garden_setup.sql script in the Supabase SQL Editor.');
      } else if (error.code === '23505') {
        throw new Error('A mental model with this ID already exists.');
      } else if (error.message.includes('permission denied')) {
        throw new Error('Permission denied. Check your database policies.');
      } else {
        throw new Error(`Failed to create mental model: ${error.message}`);
      }
    }
    
    if (!data) {
      throw new Error('No data returned after creating mental model');
    }
    
    return transformMentalModelFromSupabase(data);
  } catch (error) {
    console.error('Error creating mental model:', error);
    throw error;
  }
};

export const updateMentalModel = async (id: string, model: Partial<MentalModel>): Promise<MentalModel> => {
  if (!supabase) {
    throw new Error('Cannot update mental model: Supabase connection not available');
  }
  
  // Check authentication
  await checkAuthentication();
  
  const updates: any = {};
  
  // Map each field from camelCase to snake_case for Supabase
  if (model.title !== undefined) updates.title = model.title;
  if (model.subtitle !== undefined) updates.subtitle = model.subtitle;
  if (model.summary !== undefined) updates.summary = model.summary;
  if (model.fullContent !== undefined) updates.content = model.fullContent;
  if (model.developmentStage !== undefined) updates.development_stage = model.developmentStage;
  if (model.confidenceLevel !== undefined) updates.confidence_level = model.confidenceLevel;
  if (model.imageUrl !== undefined) updates.image_url = model.imageUrl;
  if (model.tags !== undefined) updates.tags = model.tags;
  if (model.timestamps !== undefined) updates.timestamps = model.timestamps;
  if (model.originMoment !== undefined) updates.origin_moment = model.originMoment;
  if (model.applications !== undefined) updates.applications = model.applications;
  if (model.consequences !== undefined) updates.consequences = model.consequences;
  if (model.openQuestions !== undefined) updates.open_questions = model.openQuestions;
  if (model.latchAttributes !== undefined) updates.latch_attributes = model.latchAttributes;
  if (model.dsrpStructure !== undefined) updates.dsrp_structure = model.dsrpStructure;
  if (model.socraticAttributes !== undefined) updates.socratic_attributes = model.socraticAttributes;
  if (model.hierarchicalView !== undefined) updates.hierarchical_view = model.hierarchicalView;
  if (model.visibility !== undefined) updates.visibility = model.visibility;
  
  try {
    const { data, error } = await supabase
      .from('distinctions.distinctions')
      .update(updates)
      .eq('id', id)
      .eq('type', 'mental_model')
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error when updating mental model:', error);
      throw new Error(`Failed to update mental model: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('No data returned after updating mental model');
    }
    
    return transformMentalModelFromSupabase(data);
  } catch (error) {
    console.error('Error updating mental model:', error);
    throw error;
  }
};

export const deleteMentalModel = async (id: string): Promise<void> => {
  if (!supabase) {
    throw new Error('Cannot delete mental model: Supabase connection not available');
  }
  
  // Check authentication
  await checkAuthentication();
  
  try {
    const { error } = await supabase
      .from('distinctions.distinctions')
      .delete()
      .eq('id', id)
      .eq('type', 'mental_model');
    
    if (error) {
      console.error('Supabase error when deleting mental model:', error);
      throw new Error(`Failed to delete mental model: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting mental model:', error);
    throw error;
  }
};
