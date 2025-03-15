
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
