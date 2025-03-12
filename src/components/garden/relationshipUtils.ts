
import { RelationshipType } from '../../lib/garden/types';

// Map relationship types to colors for better visualization
export const getRelationshipColor = (relationship: RelationshipType): string => {
  switch (relationship) {
    case 'related': return '#94a3b8'; // slate
    case 'inspires': return '#60a5fa'; // blue
    case 'builds_on': return '#34d399'; // emerald
    case 'contrasts': return '#f87171'; // red
    case 'references': return '#c084fc'; // purple
    case 'questions': return '#facc15'; // yellow
    default: return '#94a3b8'; // default slate
  }
};
