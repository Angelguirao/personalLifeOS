import supabase, { isSupabaseAvailable } from './client';
import { GardenNote } from './types/legacy-types';
import { getMentalModels } from './api-mental-models';
import { convertMentalModelToNote } from './types/conversion-utils';
import { toast } from 'sonner';

// Update this function to get mental models and convert them to garden notes for compatibility
export const getNotes = async (): Promise<GardenNote[]> => {
  console.log('Fetching mental models for notes view...');
  
  try {
    // Use the mental models API directly
    const mentalModels = await getMentalModels();
    
    // Transform the mental models to garden notes for backward compatibility
    return mentalModels.map(model => convertMentalModelToNote(model));
  } catch (error) {
    console.error('Error fetching notes:', error);
    toast.error('Error fetching notes. Please refresh.');
    return [];
  }
};

export const getNoteById = async (id: number): Promise<GardenNote | undefined> => {
  // This function needs to be updated to use mental models
  throw new Error('getNoteById is deprecated. Use getMentalModelById instead.');
};

export const createNote = async (note: Omit<GardenNote, 'id'>): Promise<GardenNote> => {
  // This function needs to be updated to use mental models
  throw new Error('createNote is deprecated. Use createMentalModel instead.');
};

export const updateNote = async (id: number, note: Partial<GardenNote>): Promise<GardenNote> => {
  // This function needs to be updated to use mental models
  throw new Error('updateNote is deprecated. Use updateMentalModel instead.');
};
