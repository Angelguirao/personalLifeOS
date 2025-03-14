
import { RelationshipType } from '../../lib/garden/types/connection-types';

// Map relationship types to colors for better visualization
export const getRelationshipColor = (relationship: RelationshipType): string => {
  switch (relationship) {
    case 'related': return '#94a3b8'; // slate
    case 'supports': return '#60a5fa'; // blue
    case 'extends': return '#34d399'; // emerald
    case 'contradicts': return '#f87171'; // red
    case 'example': return '#c084fc'; // purple
    case 'question': return '#facc15'; // yellow
    case 'implementation': return '#fb923c'; // orange
    default: return '#94a3b8'; // default slate
  }
};
