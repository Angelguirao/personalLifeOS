
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
