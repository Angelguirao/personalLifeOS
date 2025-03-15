
-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS mental_model_versions;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS inspirations;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS mental_models;

-- Mental Models Table
CREATE TABLE mental_models (
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
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups on title
CREATE INDEX idx_mental_models_title ON mental_models(title);
CREATE INDEX idx_mental_models_visibility ON mental_models(visibility);

-- Connections Table
CREATE TABLE connections (
  id SERIAL PRIMARY KEY,
  source_id UUID NOT NULL,
  target_id UUID NOT NULL,
  strength INTEGER DEFAULT 5, -- Integer between 0-10 
  relationship TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Add foreign key constraints
  CONSTRAINT fk_source_mental_model FOREIGN KEY (source_id)
    REFERENCES mental_models (id) ON DELETE CASCADE,
  CONSTRAINT fk_target_mental_model FOREIGN KEY (target_id)
    REFERENCES mental_models (id) ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX idx_connections_source_id ON connections(source_id);
CREATE INDEX idx_connections_target_id ON connections(target_id);

-- Mental Model Versions Table
CREATE TABLE mental_model_versions (
  id UUID PRIMARY KEY,
  mental_model_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  content_snapshot TEXT,
  change_log TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  
  CONSTRAINT fk_mental_model FOREIGN KEY (mental_model_id)
    REFERENCES mental_models (id) ON DELETE CASCADE
);

-- Create index for faster version lookups
CREATE INDEX idx_versions_mental_model_id ON mental_model_versions(mental_model_id);

-- Questions Table
CREATE TABLE questions (
  id UUID PRIMARY KEY,
  question_text TEXT NOT NULL,
  clarification_needed BOOLEAN DEFAULT false,
  related_models TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  importance_rank INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inspirations Table
CREATE TABLE inspirations (
  id UUID PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_name TEXT NOT NULL,
  quote TEXT,
  author_name TEXT,
  link TEXT,
  mental_model_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_mental_model FOREIGN KEY (mental_model_id)
    REFERENCES mental_models (id) ON DELETE SET NULL
);

-- Create index for inspirations by mental model
CREATE INDEX idx_inspirations_mental_model_id ON inspirations(mental_model_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update timestamps
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON mental_models
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
