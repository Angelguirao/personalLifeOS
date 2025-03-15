
-- Systems Table
CREATE TABLE IF NOT EXISTS systems (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  category TEXT,
  importance_level INTEGER DEFAULT 3, -- Scale 1-5
  visibility TEXT NOT NULL DEFAULT 'public',
  related_models TEXT[] DEFAULT '{}',
  is_self BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_systems_name ON systems(name);
CREATE INDEX IF NOT EXISTS idx_systems_category ON systems(category);

-- Ensure the updated_at timestamp gets updated
CREATE TRIGGER IF NOT EXISTS set_systems_timestamp
BEFORE UPDATE ON systems
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a relation table between systems and mental models
CREATE TABLE IF NOT EXISTS system_model_relations (
  id SERIAL PRIMARY KEY,
  system_id UUID NOT NULL,
  model_id UUID NOT NULL,
  relationship_type TEXT NOT NULL DEFAULT 'contains',
  strength INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_system FOREIGN KEY (system_id)
    REFERENCES systems (id) ON DELETE CASCADE,
  CONSTRAINT fk_model FOREIGN KEY (model_id)
    REFERENCES mental_models (id) ON DELETE CASCADE,
  CONSTRAINT unique_system_model_relation UNIQUE (system_id, model_id)
);

-- Create indexes for the relation table
CREATE INDEX IF NOT EXISTS idx_system_relations_system_id ON system_model_relations(system_id);
CREATE INDEX IF NOT EXISTS idx_system_relations_model_id ON system_model_relations(model_id);
