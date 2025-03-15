
// Edge function for database setup
// This runs on the server with full database access permissions

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.29.0';

interface SetupResponse {
  success: boolean;
  message: string;
  tablesCreated?: string[];
}

// Create a Supabase client with the service role key
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

serve(async (req: Request) => {
  // Check if request is OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
      }
    });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing authorization header' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get JWT token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the JWT
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Unauthorized' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Now that user is authenticated, we can run the setup
    const setupResult = await setupDatabaseTables();

    return new Response(JSON.stringify(setupResult), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in setup database function:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: `Error: ${error.message}`
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

async function setupDatabaseTables(): Promise<SetupResponse> {
  try {
    // This SQL script creates all necessary tables
    // We're executing it directly from the Edge Function with admin privileges
    const sql = `
    -- Create schemas for each DSRP element
    CREATE SCHEMA IF NOT EXISTS distinctions;
    CREATE SCHEMA IF NOT EXISTS systems;
    CREATE SCHEMA IF NOT EXISTS relationships;
    CREATE SCHEMA IF NOT EXISTS perspectives;

    -- Distinctions Table (unified table for mental models, questions, experiences)
    CREATE TABLE IF NOT EXISTS distinctions.distinctions (
      id UUID PRIMARY KEY,
      type TEXT NOT NULL, -- 'mental_model', 'question', 'experience'
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

    -- Create systems table
    CREATE TABLE IF NOT EXISTS systems.systems (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      color TEXT,
      category TEXT,
      importance_level INTEGER NOT NULL,
      visibility TEXT NOT NULL DEFAULT 'public',
      related_systems TEXT[] DEFAULT '{}',
      parent_system UUID,
      distinctions TEXT[] DEFAULT '{}',
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create relationships table
    CREATE TABLE IF NOT EXISTS relationships.connections (
      id SERIAL PRIMARY KEY,
      source_id UUID NOT NULL,
      target_id UUID NOT NULL,
      relationship_type TEXT NOT NULL DEFAULT 'relates_to',
      strength INTEGER DEFAULT 5,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      
      CONSTRAINT fk_source_distinction 
        FOREIGN KEY (source_id) REFERENCES distinctions.distinctions (id) ON DELETE CASCADE,
      CONSTRAINT fk_target_distinction 
        FOREIGN KEY (target_id) REFERENCES distinctions.distinctions (id) ON DELETE CASCADE
    );

    -- Create function to update timestamps
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
       NEW.updated_at = NOW();
       RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Create trigger for distinctions table
    DROP TRIGGER IF EXISTS set_timestamp_distinctions ON distinctions.distinctions;
    CREATE TRIGGER set_timestamp_distinctions
    BEFORE UPDATE ON distinctions.distinctions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

    -- Create trigger for systems table
    DROP TRIGGER IF EXISTS set_timestamp_systems ON systems.systems;
    CREATE TRIGGER set_timestamp_systems
    BEFORE UPDATE ON systems.systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
    `;

    // Execute SQL with admin privileges
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      
      // Try an alternative approach if exec_sql RPC doesn't exist
      if (error.message.includes('function "exec_sql" does not exist')) {
        // Use direct SQL with service role but this requires proper permissions
        const { error: directError } = await supabaseAdmin.rpc('pg_execute', { sql_string: sql });
        
        if (directError) {
          throw new Error(`SQL execution failed: ${directError.message}`);
        }
      } else {
        throw new Error(`SQL execution failed: ${error.message}`);
      }
    }
    
    return { 
      success: true, 
      message: 'Database tables created successfully',
      tablesCreated: [
        'distinctions.distinctions',
        'systems.systems',
        'relationships.connections'
      ]
    };
    
  } catch (error) {
    console.error('Error in setupDatabaseTables:', error);
    return {
      success: false,
      message: `Failed to create database tables: ${error.message}`
    };
  }
}
