
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface ConsequencesSectionProps {
  note: MentalModel;
}

const ConsequencesSection = ({ note }: ConsequencesSectionProps) => {
  // Helper function to check if consequences object has any content
  const hasContent = (consequences: any): boolean => {
    if (!consequences) return false;
    
    return (
      (consequences.personal && consequences.personal.trim() !== '') ||
      (consequences.interpersonal && consequences.interpersonal.trim() !== '') ||
      (consequences.societal && consequences.societal.trim() !== '')
    );
  };
  
  if (!note.consequences || !hasContent(note.consequences)) return null;
  
  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-sm font-semibold">Implications:</h3>
      <div className="space-y-1 text-sm">
        {note.consequences?.personal && note.consequences.personal.trim() !== '' && (
          <p><span className="font-medium">Personal:</span> {note.consequences.personal}</p>
        )}
        {note.consequences?.interpersonal && note.consequences.interpersonal.trim() !== '' && (
          <p><span className="font-medium">Interpersonal:</span> {note.consequences.interpersonal}</p>
        )}
        {note.consequences?.societal && note.consequences.societal.trim() !== '' && (
          <p><span className="font-medium">Societal:</span> {note.consequences.societal}</p>
        )}
      </div>
    </div>
  );
};

export default ConsequencesSection;
