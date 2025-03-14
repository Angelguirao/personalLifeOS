
import { GardenNote } from '../types/legacy-types';

// Helper function to transform data from Supabase to match our interfaces
export const transformNoteFromSupabase = (data: any): GardenNote => {
  return {
    id: data.id,
    title: data.title || '',
    summary: data.summary || '',
    fullContent: data.full_content || '', 
    stage: data.stage || 'seedling',
    lastUpdated: data.last_updated || new Date().toISOString(),
    connections: data.connections || [],
    bookInfo: data.book_info
  };
};

// Helper function to transform data to Supabase format
export const transformNoteToSupabase = (note: Omit<GardenNote, 'id'>) => {
  return {
    title: note.title,
    summary: note.summary,
    full_content: note.fullContent,
    stage: note.stage,
    last_updated: note.lastUpdated,
    connections: note.connections || [],
    book_info: note.bookInfo
  };
};
