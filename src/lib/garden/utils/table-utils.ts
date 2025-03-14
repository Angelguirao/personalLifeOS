
import supabase, { isSupabaseAvailable } from '../client';

// Helper function to check if a table exists
export const tableExists = async (tableName: string): Promise<boolean> => {
  // If supabase is null, return false to indicate table doesn't exist
  if (!isSupabaseAvailable()) {
    console.log(`Supabase client not initialized, can't check if table ${tableName} exists`);
    return false;
  }
  
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
  if (!isSupabaseAvailable()) {
    console.log("Supabase client not initialized, can't create tables");
    return false;
  }
  
  try {
    // For Supabase, we need to create tables through SQL
    // First, check if mental_models table exists
    const mentalModelsExist = await tableExists('mental_models');
    
    if (!mentalModelsExist) {
      console.log('Attempting to create tables in Supabase...');
      
      // Create the tables using SQL
      const { error: createError } = await supabase.rpc('create_garden_tables');
      
      if (createError) {
        // It's possible the stored procedure doesn't exist
        console.warn('Could not create tables:', createError);
        console.log('Please create the tables manually through the Supabase dashboard');
        
        // Show the SQL to create in the console for reference
        console.log(`
          SQL to create tables:
          
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
          
          CREATE TABLE IF NOT EXISTS connections (
            id SERIAL PRIMARY KEY,
            source_id UUID NOT NULL,
            target_id UUID NOT NULL,
            strength INTEGER DEFAULT 5, 
            relationship TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT fk_source_mental_model FOREIGN KEY (source_id)
              REFERENCES mental_models (id) ON DELETE CASCADE,
            CONSTRAINT fk_target_mental_model FOREIGN KEY (target_id)
              REFERENCES mental_models (id) ON DELETE CASCADE
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
        
        return false;
      }
      
      // Check if creation was successful
      const tablesExistNow = await tableExists('mental_models');
      if (tablesExistNow) {
        console.log('Tables created successfully');
        return true;
      } else {
        console.warn('Tables were not created successfully');
        return false;
      }
    }
    
    // If we get here, tables already exist
    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
    return false;
  }
};
