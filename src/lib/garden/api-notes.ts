import supabase from './client';
import { gardenNotes } from './data';
import { GardenNote } from './types';
import { tableExists, transformNoteFromSupabase, transformNoteToSupabase } from './utils';
import { seedInitialData } from './api-seed';
import { toast } from 'sonner';

export const getNotes = async (): Promise<GardenNote[]> => {
  console.log('Fetching notes...');
  
  // If Supabase is not initialized, return fallback data
  if (!supabase) {
    console.log('Using fallback notes data');
    return gardenNotes;
  }
  
  try {
    // Check if tables exist
    const notesExist = await tableExists('garden_notes');
    if (!notesExist) {
      console.log('Notes table does not exist');
      toast.info('Digital Garden is running in offline mode. Connect to Supabase for persistent storage.');
      return gardenNotes;
    }
    
    console.log('Fetching notes from Supabase...');
    const { data, error } = await supabase
      .from('garden_notes')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      toast.error('Failed to load notes from database');
      return gardenNotes; // Return fallback data on error
    }
    
    console.log('Supabase notes data:', data);
    
    if (!data || data.length === 0) {
      console.log('No notes found in Supabase, using fallback data');
      return gardenNotes;
    }
    
    return data.map(transformNoteFromSupabase);
  } catch (error) {
    console.error('Error fetching notes:', error);
    toast.error('Error fetching notes');
    // Fallback to the sample data if there's an error
    return gardenNotes;
  }
};

export const getNoteById = async (id: number): Promise<GardenNote | undefined> => {
  if (!supabase || !(await tableExists('garden_notes'))) {
    console.log('Using fallback for note details');
    return gardenNotes.find(note => note.id === id);
  }
  
  try {
    const { data, error } = await supabase
      .from('garden_notes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data ? transformNoteFromSupabase(data) : undefined;
  } catch (error) {
    console.error('Error fetching note by id:', error);
    // Fallback to finding the note in the sample data
    return gardenNotes.find(note => note.id === id);
  }
};

export const createNote = async (note: Omit<GardenNote, 'id'>): Promise<GardenNote> => {
  if (!supabase || !(await tableExists('garden_notes'))) {
    throw new Error('Cannot create note: Supabase connection or table not available');
  }
  
  const supabaseNote = transformNoteToSupabase(note);
  
  const { data, error } = await supabase
    .from('garden_notes')
    .insert(supabaseNote)
    .select()
    .single();
  
  if (error) throw error;
  return transformNoteFromSupabase(data);
};

export const updateNote = async (id: number, note: Partial<GardenNote>): Promise<GardenNote> => {
  if (!supabase || !(await tableExists('garden_notes'))) {
    throw new Error('Cannot update note: Supabase connection or table not available');
  }
  
  const supabaseNote: any = {};
  
  if (note.title) supabaseNote.title = note.title;
  if (note.summary) supabaseNote.summary = note.summary;
  if (note.fullContent) supabaseNote.full_content = note.fullContent;
  if (note.stage) supabaseNote.stage = note.stage;
  if (note.lastUpdated) supabaseNote.last_updated = note.lastUpdated;
  if (note.connections) supabaseNote.connections = note.connections;
  if (note.bookInfo) supabaseNote.book_info = note.bookInfo;
  
  const { data, error } = await supabase
    .from('garden_notes')
    .update(supabaseNote)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return transformNoteFromSupabase(data);
};
