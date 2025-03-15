
import supabase, { isSupabaseAvailable } from './client';
import { MentalModel } from './types/mental-model-types';
import { tableExists } from './utils/table-utils';
import { transformMentalModelFromSupabase, transformMentalModelToSupabase } from './utils/model-transforms';
import { toast } from 'sonner';

export const getMentalModels = async (): Promise<MentalModel[]> => {
  console.log('Fetching mental models...');
  
  // Check if Supabase is available
  if (!isSupabaseAvailable()) {
    console.error('Supabase client not initialized.');
    toast.error('Database connection not available');
    return [];
  }
  
  try {
    // Check if table exists
    const modelsExist = await tableExists('mental_models');
    if (!modelsExist) {
      console.error('Mental models table does not exist');
      toast.error('Database tables not properly configured');
      return [];
    }
    
    console.log('Fetching mental models from Supabase...');
    const { data, error } = await supabase
      .from('mental_models')
      .select('*');
    
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
  if (!isSupabaseAvailable() || !(await tableExists('mental_models'))) {
    console.error('Database not available or mental models table does not exist');
    toast.error('Database connection not available');
    return undefined;
  }
  
  try {
    const { data, error } = await supabase
      .from('mental_models')
      .select('*')
      .eq('id', id)
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
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('You must be authenticated to perform this action');
  }
  
  return session;
};

export const createMentalModel = async (model: Omit<MentalModel, 'id'>): Promise<MentalModel> => {
  if (!supabase || !(await tableExists('mental_models'))) {
    throw new Error('Cannot create mental model: Supabase connection or table not available');
  }
  
  // Check authentication
  await checkAuthentication();
  
  const supabaseModel = transformMentalModelToSupabase(model);
  
  const { data, error } = await supabase
    .from('mental_models')
    .insert(supabaseModel)
    .select()
    .single();
  
  if (error) throw error;
  return transformMentalModelFromSupabase(data);
};

export const updateMentalModel = async (id: string, model: Partial<MentalModel>): Promise<MentalModel> => {
  if (!supabase || !(await tableExists('mental_models'))) {
    throw new Error('Cannot update mental model: Supabase connection or table not available');
  }
  
  // Check authentication
  await checkAuthentication();
  
  const updates: any = {};
  
  // Map each field from camelCase to snake_case for Supabase
  if (model.title !== undefined) updates.title = model.title;
  if (model.subtitle !== undefined) updates.subtitle = model.subtitle;
  if (model.summary !== undefined) updates.summary = model.summary;
  if (model.fullContent !== undefined) updates.full_content = model.fullContent;
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
  if (model.questionsLinked !== undefined) updates.questions_linked = model.questionsLinked;
  
  // Legacy fields
  if (model.stage !== undefined) updates.stage = model.stage;
  if (model.lastUpdated !== undefined) updates.last_updated = model.lastUpdated;
  
  const { data, error } = await supabase
    .from('mental_models')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return transformMentalModelFromSupabase(data);
};

export const deleteMentalModel = async (id: string): Promise<void> => {
  if (!supabase || !(await tableExists('mental_models'))) {
    throw new Error('Cannot delete mental model: Supabase connection or table not available');
  }
  
  // Check authentication
  await checkAuthentication();
  
  const { error } = await supabase
    .from('mental_models')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
