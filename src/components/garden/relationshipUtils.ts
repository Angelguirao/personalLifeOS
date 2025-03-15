
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

// Add descriptions for each relationship type
export const getRelationshipDescription = (relationship: RelationshipType): string => {
  switch (relationship) {
    case 'related':
      return 'General connection between concepts';
    case 'supports':
      return 'Provides evidence or reasoning that strengthens the other model';
    case 'extends':
      return 'Builds upon and expands the other model';
    case 'contradicts':
      return 'Challenges or opposes the other model';
    case 'example':
      return 'Provides a concrete instance of the other model';
    case 'question':
    case 'questions':
      return 'Poses inquiries about the other model';
    case 'implementation':
      return 'Practical application of the other model';
    case 'inspires':
      return 'Creatively influenced by the other model';
    case 'builds_on':
      return 'Develops further based on the other model';
    case 'contrasts':
      return 'Shows differences compared to the other model';
    case 'references':
      return 'Cites or mentions the other model';
    default:
      return 'Connected to';
  }
};

// Get relationship strength description
export const getStrengthDescription = (strength: number): string => {
  if (strength >= 8) return 'Strong connection';
  if (strength >= 5) return 'Moderate connection';
  return 'Weak connection';
};
