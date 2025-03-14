
import supabase from '../client';

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
      
      -- Legacy tables for backward compatibility
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
      
      -- New enhanced tables
      CREATE TABLE IF NOT EXISTS mental_models (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT,
        development_stage TEXT NOT NULL,
        confidence_level TEXT NOT NULL,
        summary TEXT,
        full_content TEXT,
        image_url TEXT,
        tags TEXT[] DEFAULT '{}',
        timestamps JSONB,
        origin_moment JSONB,
        applications JSONB,
        consequences JSONB,
        open_questions TEXT[] DEFAULT '{}',
        latch_attributes JSONB NOT NULL,
        dsrp_structure JSONB,
        socratic_attributes JSONB,
        hierarchical_view JSONB,
        visibility TEXT NOT NULL DEFAULT 'public',
        questions_linked TEXT[] DEFAULT '{}',
        stage TEXT,
        last_updated TIMESTAMP WITH TIME ZONE
      );
      
      CREATE TABLE IF NOT EXISTS mental_model_versions (
        id UUID PRIMARY KEY,
        mental_model_id UUID NOT NULL REFERENCES mental_models(id),
        version_number INTEGER NOT NULL,
        content_snapshot TEXT,
        change_log TEXT,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS questions (
        id UUID PRIMARY KEY,
        question_text TEXT NOT NULL,
        clarification_needed BOOLEAN DEFAULT false,
        related_models TEXT[] DEFAULT '{}',
        category TEXT NOT NULL,
        importance_rank INTEGER NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS inspirations (
        id UUID PRIMARY KEY,
        source_type TEXT NOT NULL,
        source_name TEXT NOT NULL,
        quote TEXT,
        author_name TEXT,
        link TEXT
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
