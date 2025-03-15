
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
