
-- Complete Garden Database Setup Script
-- Contains all SQL commands from individual script files combined into one script for easy execution

-- =============================================
-- Drop existing tables and create schemas
-- =============================================
DROP TABLE IF EXISTS perspectives.inspirations CASCADE;
DROP TABLE IF EXISTS perspectives.perspective_types CASCADE;

DROP TABLE IF EXISTS relationships.system_distinction_relations CASCADE;
DROP TABLE IF EXISTS relationships.connections CASCADE;
DROP TABLE IF EXISTS relationships.relationship_types CASCADE;

DROP TABLE IF EXISTS systems.systems CASCADE;

DROP TABLE IF EXISTS distinctions.versions CASCADE;
DROP TABLE IF EXISTS distinctions.distinctions CASCADE;

-- Create schemas for each DSRP element
CREATE SCHEMA IF NOT EXISTS distinctions;
CREATE SCHEMA IF NOT EXISTS systems;
CREATE SCHEMA IF NOT EXISTS relationships;
CREATE SCHEMA IF NOT EXISTS perspectives;

-- =============================================
-- Create distinctions schema tables
-- =============================================
-- Distinctions Table (unified table for mental models, questions, experiences)
CREATE TABLE distinctions.distinctions (
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
CREATE INDEX idx_distinctions_type ON distinctions.distinctions(type);
CREATE INDEX idx_distinctions_title ON distinctions.distinctions(title);
CREATE INDEX idx_distinctions_visibility ON distinctions.distinctions(visibility);

-- Versions Table (for tracking versions of distinctions)
CREATE TABLE distinctions.versions (
  id UUID PRIMARY KEY,
  distinction_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  content_snapshot TEXT,
  change_log TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  
  CONSTRAINT fk_distinction FOREIGN KEY (distinction_id)
    REFERENCES distinctions.distinctions (id) ON DELETE CASCADE
);

-- Create index for faster version lookups
CREATE INDEX idx_versions_distinction_id ON distinctions.versions(distinction_id);

-- =============================================
-- Create systems schema tables
-- =============================================
-- Systems Table
CREATE TABLE systems.systems (
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_parent_system FOREIGN KEY (parent_system)
    REFERENCES systems.systems (id) ON DELETE SET NULL
);

-- Create indexes for systems
CREATE INDEX idx_systems_name ON systems.systems(name);
CREATE INDEX idx_systems_parent ON systems.systems(parent_system);

-- =============================================
-- Create relationships schema tables
-- =============================================
-- Relationships Table (defining relationship types)
CREATE TABLE relationships.relationship_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  bidirectional BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert common relationship types
INSERT INTO relationships.relationship_types (name, description, bidirectional) VALUES 
('relates_to', 'Generic relationship between two items', true),
('contains', 'One item contains or includes another', false),
('derives_from', 'One item is derived from another', false),
('influences', 'One item influences another', false),
('contradicts', 'One item contradicts another', true),
('extends', 'One item extends or builds upon another', false),
('implements', 'One item implements another', false),
('references', 'One item references another', false);

-- Connections Table (between any distinction items)
CREATE TABLE relationships.connections (
  id SERIAL PRIMARY KEY,
  source_id UUID NOT NULL,
  target_id UUID NOT NULL,
  relationship_type_id INTEGER NOT NULL,
  strength INTEGER DEFAULT 5, -- Integer between 0-10 
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Add foreign key constraints
  CONSTRAINT fk_source_distinction FOREIGN KEY (source_id)
    REFERENCES distinctions.distinctions (id) ON DELETE CASCADE,
  CONSTRAINT fk_target_distinction FOREIGN KEY (target_id)
    REFERENCES distinctions.distinctions (id) ON DELETE CASCADE,
  CONSTRAINT fk_relationship_type FOREIGN KEY (relationship_type_id)
    REFERENCES relationships.relationship_types (id) ON DELETE RESTRICT
);

-- Create indexes for faster lookups
CREATE INDEX idx_connections_source_id ON relationships.connections(source_id);
CREATE INDEX idx_connections_target_id ON relationships.connections(target_id);

-- System-Distinction Relations Table
CREATE TABLE relationships.system_distinction_relations (
  id SERIAL PRIMARY KEY,
  system_id UUID NOT NULL,
  distinction_id UUID NOT NULL,
  relationship_type_id INTEGER NOT NULL,
  strength INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_system FOREIGN KEY (system_id)
    REFERENCES systems.systems (id) ON DELETE CASCADE,
  CONSTRAINT fk_distinction FOREIGN KEY (distinction_id)
    REFERENCES distinctions.distinctions (id) ON DELETE CASCADE,
  CONSTRAINT fk_relationship_type FOREIGN KEY (relationship_type_id)
    REFERENCES relationships.relationship_types (id) ON DELETE RESTRICT
);

-- Create indexes for system-distinction relations
CREATE INDEX idx_system_distinction_system_id ON relationships.system_distinction_relations(system_id);
CREATE INDEX idx_system_distinction_distinction_id ON relationships.system_distinction_relations(distinction_id);

-- =============================================
-- Create perspectives schema tables
-- =============================================
-- Perspectives Table
CREATE TABLE perspectives.perspective_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert common perspective types
INSERT INTO perspectives.perspective_types (name, description) VALUES 
('analytical', 'Logical analysis perspective'),
('emotional', 'Emotional response perspective'),
('practical', 'Practical application perspective'),
('creative', 'Creative exploration perspective'),
('critical', 'Critical evaluation perspective'),
('ethical', 'Ethical consideration perspective');

-- Inspirations Table (linked to distinctions)
CREATE TABLE perspectives.inspirations (
  id UUID PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_name TEXT NOT NULL,
  quote TEXT,
  author_name TEXT,
  link TEXT,
  distinction_id UUID,
  perspective_type_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_distinction FOREIGN KEY (distinction_id)
    REFERENCES distinctions.distinctions (id) ON DELETE SET NULL,
  CONSTRAINT fk_perspective_type FOREIGN KEY (perspective_type_id)
    REFERENCES perspectives.perspective_types (id) ON DELETE SET NULL
);

-- Create index for inspirations by distinction
CREATE INDEX idx_inspirations_distinction_id ON perspectives.inspirations(distinction_id);

-- =============================================
-- Create views
-- =============================================
-- Create a view that combines all distinctions with their relationships
CREATE VIEW relationships.distinction_network AS
SELECT 
  d.id, 
  d.type, 
  d.title,
  d.summary,
  d.visibility,
  c.source_id,
  c.target_id,
  rt.name as relationship_type,
  c.strength
FROM 
  distinctions.distinctions d
LEFT JOIN 
  relationships.connections c ON d.id = c.source_id OR d.id = c.target_id
LEFT JOIN
  relationships.relationship_types rt ON c.relationship_type_id = rt.id
WHERE 
  d.visibility = 'public';

-- Create a view for mental models (a type of distinction)
CREATE VIEW distinctions.mental_models_view AS
SELECT 
  id,
  title,
  summary, 
  content as full_content,
  tags,
  visibility,
  created_at,
  updated_at
FROM 
  distinctions.distinctions
WHERE 
  type = 'mental_model';

-- =============================================
-- Create triggers and functions
-- =============================================
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
BEFORE UPDATE ON distinctions.distinctions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_systems
BEFORE UPDATE ON systems.systems
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
