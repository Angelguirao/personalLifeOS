
import supabase from './client';
import { mentalModels } from './data';
import { GardenNote } from './types/legacy-types';
import { MentalModel } from './types/mental-model-types';
import { convertMentalModelToNote } from './types/conversion-utils';
import { 
  tableExists, 
  transformMentalModelFromSupabase
} from './utils';
import { toast } from 'sonner';

// Update this function to get mental models and convert them to garden notes for compatibility
export const getNotes = async (): Promise<GardenNote[]> => {
  console.log('Fetching mental models for notes view...');
  
  // Ensure Supabase is initialized
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  try {
    // Check if tables exist
    const modelsExist = await tableExists('mental_models');
    if (!modelsExist) {
      throw new Error('Mental models table does not exist');
    }
    
    console.log('Fetching mental models from Supabase...');
    const { data, error } = await supabase
      .from('mental_models')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Supabase mental models data:', data);
    
    if (!data || data.length === 0) {
      console.log('No mental models found in Supabase');
      // No fallback to static data anymore - return empty array
      return [];
    }
    
    // Transform the mental models to garden notes for backward compatibility
    return data.map(model => {
      const mentalModel = transformMentalModelFromSupabase(model);
      return convertMentalModelToNote(mentalModel);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    toast.error('Error fetching notes. Please refresh.');
    // No fallback, just return empty array
    return [];
  }
};

export const getNoteById = async (id: number): Promise<GardenNote | undefined> => {
  // This function needs to be updated to use mental models
  // For now, we'll throw an error to indicate this function needs to be updated
  throw new Error('getNoteById is deprecated. Use getMentalModelById instead.');
};

export const createNote = async (note: Omit<GardenNote, 'id'>): Promise<GardenNote> => {
  // This function needs to be updated to use mental models
  // For now, we'll throw an error to indicate this function needs to be updated
  throw new Error('createNote is deprecated. Use createMentalModel instead.');
};

export const updateNote = async (id: number, note: Partial<GardenNote>): Promise<GardenNote> => {
  // This function needs to be updated to use mental models
  // For now, we'll throw an error to indicate this function needs to be updated
  throw new Error('updateNote is deprecated. Use updateMentalModel instead.');
};
