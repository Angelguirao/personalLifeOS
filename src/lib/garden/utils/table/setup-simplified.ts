
import supabase, { isSupabaseAvailable } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { executeSQL } from '@/lib/garden/client';

/**
 * Runs a simplified setup script that only creates the distinctions schema and table
 * for the polymorphic approach (mental models, questions, experiences)
 */
export const runSimplifiedSetup = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    toast.error('Database connection not available');
    return false;
  }
  
  try {
    toast.info('Setting up distinctions schema and table...');
    
    // SQL to create just the distinctions schema and table
    const setupSQL = `
    -- Create distinctions schema
    CREATE SCHEMA IF NOT EXISTS distinctions;
    
    -- Distinctions Table (unified table for mental models, questions, experiences)
    CREATE TABLE IF NOT EXISTS distinctions.distinctions (
      id UUID PRIMARY KEY,
      type TEXT NOT NULL, -- 'mentalModel', 'question', 'experience'
      title TEXT NOT NULL,
      subtitle TEXT,
      content TEXT,
      summary TEXT,
      development_stage TEXT,
      confidence_level TEXT,
      image_url TEXT,
      tags TEXT[] DEFAULT '{}',
      category TEXT,
      importance_rank INTEGER,
      clarification_needed BOOLEAN DEFAULT false,
      related_items TEXT[] DEFAULT '{}',
      timestamps JSONB,
      origin_moment JSONB,
      applications JSONB,
      consequences JSONB,
      open_questions TEXT[] DEFAULT '{}',
      latch_attributes JSONB,
      dsrp_structure JSONB,
      socratic_attributes JSONB,
      hierarchical_view JSONB,
      visibility TEXT NOT NULL DEFAULT 'public',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create indexes for faster lookups
    CREATE INDEX IF NOT EXISTS idx_distinctions_type ON distinctions.distinctions(type);
    CREATE INDEX IF NOT EXISTS idx_distinctions_title ON distinctions.distinctions(title);
    CREATE INDEX IF NOT EXISTS idx_distinctions_visibility ON distinctions.distinctions(visibility);
    `;
    
    // Attempt to execute the script using executeSQL helper from garden client
    const success = await executeSQL(setupSQL);
    
    if (success) {
      toast.success('Distinctions table created successfully!');
      return true;
    } else {
      toast.error('Failed to create distinctions table');
      return false;
    }
  } catch (error) {
    console.error('Error running simplified setup script:', error);
    toast.error('Failed to set up distinctions table');
    return false;
  }
};

/**
 * Checks if the distinctions schema and table exist
 */
export const checkDistinctionsExists = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) {
    return false;
  }
  
  try {
    // First check if schema exists
    const { data: schemaData, error: schemaError } = await supabase
      .from('information_schema.schemata')
      .select('schema_name')
      .eq('schema_name', 'distinctions')
      .maybeSingle();
    
    if (schemaError || !schemaData) {
      console.log('Distinctions schema does not exist:', schemaError?.message);
      return false;
    }
    
    // Then check if table exists
    const { data, error } = await supabase
      .from('distinctions.distinctions')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log('Distinctions table does not exist');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking distinctions schema/table:', error);
    return false;
  }
};
