import { MentalModel } from '@/lib/garden/types';

// Helper function to convert arrays to comma-separated strings for form initialization
export const convertArrayToString = (arr?: string[]) => arr ? arr.join(', ') : '';

// Handle legacy visibility values
export const getVisibilityValue = (modelVisibility?: string): 'public' | 'private' | 'unlisted' => {
  if (!modelVisibility) return 'public';
  
  // If we have a legacy 'restricted' value, convert it to 'private'
  if (modelVisibility === 'restricted') {
    return 'private';
  }
  
  // Otherwise, use the value as long as it matches our allowed types
  return modelVisibility as 'public' | 'private' | 'unlisted';
};
