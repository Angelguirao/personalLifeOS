
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
