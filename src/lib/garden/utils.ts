
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
    // SQL queries to create tables directly if they don't exist
    // Updated schema to match column names in Supabase
    const createNotesTableQuery = `
      CREATE TABLE IF NOT EXISTS garden_notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT,
        content TEXT,
        stage TEXT DEFAULT 'seedling',
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        connections TEXT[] DEFAULT '{}'
      );
    `;
    
    const createConnectionsTableQuery = `
      CREATE TABLE IF NOT EXISTS garden_connections (
        id SERIAL PRIMARY KEY,
        source_id INTEGER NOT NULL,
        target_id INTEGER NOT NULL,
        strength INTEGER DEFAULT 1,
        relationship TEXT
      );
    `;
    
    // Execute the SQL queries
    const { error: notesTableError } = await supabase.rpc('exec_sql', { 
      sql_query: createNotesTableQuery 
    });
    
    if (notesTableError) {
      console.error('Error creating notes table:', notesTableError);
      return false;
    }
    
    const { error: connectionsTableError } = await supabase.rpc('exec_sql', { 
      sql_query: createConnectionsTableQuery 
    });
    
    if (connectionsTableError) {
      console.error('Error creating connections table:', connectionsTableError);
      return false;
    }
    
    console.log('Tables created or already exist');
    return true;
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
    fullContent: data.content || '', // Changed from full_content to content
    stage: data.stage || 'seedling',
    lastUpdated: data.last_updated || new Date().toISOString(),
    connections: data.connections || [],
    // Removed bookInfo as it doesn't exist in the database schema
  };
};

// Helper function to transform data to Supabase format
export const transformNoteToSupabase = (note: Omit<GardenNote, 'id'>) => {
  return {
    title: note.title,
    summary: note.summary,
    content: note.fullContent, // Changed from full_content to content
    stage: note.stage,
    last_updated: note.lastUpdated,
    connections: note.connections || [],
    // Removed book_info as it doesn't exist in the database schema
  };
};
