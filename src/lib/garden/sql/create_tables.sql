
-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS mental_model_versions;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS inspirations;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS mental_models;
DROP TABLE IF EXISTS system_model_relations;
DROP TABLE IF EXISTS systems;
DROP TABLE IF EXISTS distinctions;

-- Distinctions Table (unified table for mental models, questions, experiences)
CREATE TABLE distinctions (
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
CREATE INDEX idx_distinctions_type ON distinctions(type);
CREATE INDEX idx_distinctions_title ON distinctions(title);
CREATE INDEX idx_distinctions_visibility ON distinctions(visibility);

-- Versions Table (for tracking versions of distinctions)
CREATE TABLE distinction_versions (
  id UUID PRIMARY KEY,
  distinction_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  content_snapshot TEXT,
  change_log TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  
  CONSTRAINT fk_distinction FOREIGN KEY (distinction_id)
    REFERENCES distinctions (id) ON DELETE CASCADE
);

-- Create index for faster version lookups
CREATE INDEX idx_versions_distinction_id ON distinction_versions(distinction_id);

-- Connections Table (between any distinction items)
CREATE TABLE connections (
  id SERIAL PRIMARY KEY,
  source_id UUID NOT NULL,
  target_id UUID NOT NULL,
  strength INTEGER DEFAULT 5, -- Integer between 0-10 
  relationship TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Add foreign key constraints
  CONSTRAINT fk_source_distinction FOREIGN KEY (source_id)
    REFERENCES distinctions (id) ON DELETE CASCADE,
  CONSTRAINT fk_target_distinction FOREIGN KEY (target_id)
    REFERENCES distinctions (id) ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX idx_connections_source_id ON connections(source_id);
CREATE INDEX idx_connections_target_id ON connections(target_id);

-- Inspirations Table (linked to distinctions)
CREATE TABLE inspirations (
  id UUID PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_name TEXT NOT NULL,
  quote TEXT,
  author_name TEXT,
  link TEXT,
  distinction_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_distinction FOREIGN KEY (distinction_id)
    REFERENCES distinctions (id) ON DELETE SET NULL
);

-- Create index for inspirations by distinction
CREATE INDEX idx_inspirations_distinction_id ON inspirations(distinction_id);

-- Systems Table
CREATE TABLE systems (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  category TEXT,
  importance_level INTEGER NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'public',
  related_models TEXT[] DEFAULT '{}',
  parent_system UUID,
  distinctions TEXT[] DEFAULT '{}',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_parent_system FOREIGN KEY (parent_system)
    REFERENCES systems (id) ON DELETE SET NULL
);

-- Create indexes for systems
CREATE INDEX idx_systems_name ON systems(name);
CREATE INDEX idx_systems_parent ON systems(parent_system);

-- System-Distinction Relations Table
CREATE TABLE system_distinction_relations (
  id SERIAL PRIMARY KEY,
  system_id UUID NOT NULL,
  distinction_id UUID NOT NULL,
  relationship_type TEXT NOT NULL,
  strength INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_system FOREIGN KEY (system_id)
    REFERENCES systems (id) ON DELETE CASCADE,
  CONSTRAINT fk_distinction FOREIGN KEY (distinction_id)
    REFERENCES distinctions (id) ON DELETE CASCADE
);

-- Create indexes for system-distinction relations
CREATE INDEX idx_system_distinction_system_id ON system_distinction_relations(system_id);
CREATE INDEX idx_system_distinction_distinction_id ON system_distinction_relations(distinction_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update timestamps
CREATE TRIGGER set_timestamp_distinctions
BEFORE UPDATE ON distinctions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_systems
BEFORE UPDATE ON systems
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
