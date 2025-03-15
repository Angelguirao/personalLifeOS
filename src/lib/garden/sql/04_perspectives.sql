
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
