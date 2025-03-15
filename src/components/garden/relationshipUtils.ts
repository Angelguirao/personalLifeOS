
import { RelationshipType, relationshipDescriptions } from '@/lib/garden/types/connection-types';

export const getRelationshipDescription = (type: RelationshipType): string => {
  return relationshipDescriptions[type] || "Connection between models";
};

export const getStrengthDescription = (value: number): string => {
  if (value >= 9) return "Very strong connection, inseparable concepts";
  if (value >= 7) return "Strong connection with significant overlap";
  if (value >= 5) return "Moderate connection with clear relationship";
  if (value >= 3) return "Weak connection with some relevance";
  return "Minimal connection, loosely related";
};

// Add the missing function for getting relationship colors
export const getRelationshipColor = (type: RelationshipType): string => {
  // Color mapping for different relationship types
  switch (type) {
    case 'supports':
      return '#4ade80'; // green
    case 'contradicts':
      return '#f87171'; // red
    case 'extends':
      return '#60a5fa'; // blue
    case 'example':
      return '#c084fc'; // purple
    case 'implementation':
      return '#f97316'; // orange
    case 'question':
    case 'questions':
      return '#fbbf24'; // amber
    case 'inspires':
      return '#ec4899'; // pink
    case 'builds_on':
      return '#2dd4bf'; // teal
    case 'contrasts':
      return '#a855f7'; // violet
    case 'references':
      return '#94a3b8'; // slate
    case 'related':
    default:
      return '#64748b'; // slate/gray - default
  }
};
