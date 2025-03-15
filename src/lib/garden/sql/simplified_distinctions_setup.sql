
-- Simplified Garden Database Setup Script
-- Only creates the distinctions schema and table for the polymorphic approach

-- Drop existing tables if they exist
DROP TABLE IF EXISTS distinctions.versions CASCADE;
DROP TABLE IF EXISTS distinctions.distinctions CASCADE;

-- Create schema
CREATE SCHEMA IF NOT EXISTS distinctions;

-- Distinctions Table (unified table for mental models, questions, experiences)
CREATE TABLE distinctions.distinctions (
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
CREATE INDEX idx_distinctions_type ON distinctions.distinctions(type);
CREATE INDEX idx_distinctions_title ON distinctions.distinctions(title);
CREATE INDEX idx_distinctions_visibility ON distinctions.distinctions(visibility);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update timestamps
CREATE TRIGGER set_timestamp_distinctions
BEFORE UPDATE ON distinctions.distinctions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
