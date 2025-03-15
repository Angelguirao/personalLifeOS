
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
