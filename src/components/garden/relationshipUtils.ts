
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
    case 'inspires': return '#a3e635'; // lime
    case 'builds_on': return '#2dd4bf'; // teal
    case 'contrasts': return '#e879f9'; // fuchsia
    case 'references': return '#f472b6'; // pink
    case 'questions': return '#fbbf24'; // amber
    default: return '#94a3b8'; // default slate
  }
};
