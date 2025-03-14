
import { Connection, RelationshipType } from '../types';

// Generate some sample connections between notes with strengths as numbers, not strings
export const connections: Connection[] = [
  { id: 1, sourceId: 1, targetId: 2, strength: 0.7, relationship: "related" as RelationshipType },
  { id: 2, sourceId: 1, targetId: 3, strength: 0.5, relationship: "inspires" as RelationshipType },
  { id: 3, sourceId: 2, targetId: 4, strength: 0.6, relationship: "builds_on" as RelationshipType },
  { id: 4, sourceId: 3, targetId: 5, strength: 0.8, relationship: "contrasts" as RelationshipType },
  { id: 5, sourceId: 4, targetId: 1, strength: 0.4, relationship: "references" as RelationshipType },
  { id: 6, sourceId: 5, targetId: 3, strength: 0.5, relationship: "questions" as RelationshipType },
];
