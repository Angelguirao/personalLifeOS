
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
  full_content,
  tags,
  visibility,
  created_at,
  updated_at
FROM 
  distinctions.distinctions
WHERE 
  type = 'mental_model';
