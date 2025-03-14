
-- First, drop the existing connections table if it exists
DROP TABLE IF EXISTS garden_connections;
DROP TABLE IF EXISTS connections;

-- Create a new connections table that references mental_models by UUID
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

-- Create index for faster lookups
CREATE INDEX idx_connections_source_id ON connections(source_id);
CREATE INDEX idx_connections_target_id ON connections(target_id);

-- Add sample connections from the static data to verify functionality
INSERT INTO connections (source_id, target_id, strength, relationship)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'c4c6e79b-0d04-4f53-b6f3-3382180cadc9', 7, 'related'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '3a8a7e33-da91-4782-90ba-1834c9e982c4', 5, 'inspires'),
  ('c4c6e79b-0d04-4f53-b6f3-3382180cadc9', '0556b3d5-64e2-4b70-8f47-8d3ba68f56c8', 6, 'builds_on'),
  ('3a8a7e33-da91-4782-90ba-1834c9e982c4', '2b45c097-b31e-4c36-b324-3f8824601dbe', 8, 'contrasts'),
  ('0556b3d5-64e2-4b70-8f47-8d3ba68f56c8', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4, 'references'),
  ('2b45c097-b31e-4c36-b324-3f8824601dbe', '3a8a7e33-da91-4782-90ba-1834c9e982c4', 5, 'questions');

-- Verify the data was inserted correctly
SELECT * FROM connections;
