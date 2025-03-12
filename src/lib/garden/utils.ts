
import supabase from './client';
import { GardenNote } from './types';

// Helper function to check if a table exists
export const tableExists = async (tableName: string): Promise<boolean> => {
  if (!supabase) return false;
  
  try {
    // Try to fetch a single record from the table
    const { error } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
    
    // If there's a PostgreSQL error about the relation not existing, the table doesn't exist
    if (error && (
      error.message.includes('relation') && 
      error.message.includes('does not exist')
    )) {
      console.warn(`Table ${tableName} does not exist in Supabase`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Create necessary tables in Supabase if they don't exist
export const createTablesIfNotExist = async (): Promise<boolean> => {
  if (!supabase) return false;
  
  try {
    console.log('Creating tables using Supabase API instead of SQL commands');
    
    // For Supabase, we need to create tables through the Supabase dashboard or using migrations
    // Here we will just log a message that the user needs to create the tables manually
    
    console.log(`
      To create required tables, please go to your Supabase dashboard and run these SQL commands:
      
      CREATE TABLE IF NOT EXISTS garden_notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT,
        full_content TEXT,
        stage TEXT DEFAULT 'seedling',
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        connections TEXT[] DEFAULT '{}',
        book_info JSONB
      );
      
      CREATE TABLE IF NOT EXISTS garden_connections (
        id SERIAL PRIMARY KEY,
        source_id INTEGER NOT NULL REFERENCES garden_notes(id),
        target_id INTEGER NOT NULL REFERENCES garden_notes(id),
        strength INTEGER DEFAULT 1,
        relationship TEXT
      );
    `);
    
    // We'll consider this a success so the app can use fallback data
    // You'll need to create the tables manually in the Supabase dashboard
    return false;
  } catch (error) {
    console.error('Error creating tables:', error);
    return false;
  }
};

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
