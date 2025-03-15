
import React from 'react';
import { MessageCircleQuestion } from 'lucide-react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface SocraticSectionProps {
  note: MentalModel;
}

const SocraticSection = ({ note }: SocraticSectionProps) => {
  // Helper function to check if socratic attributes have content
  const hasContent = (socraticAttributes: any): boolean => {
    if (!socraticAttributes) return false;
    
    // Check string properties
    const hasStringContent = (
      (socraticAttributes.clarification && socraticAttributes.clarification.trim() !== '') ||
      (socraticAttributes.evidence && socraticAttributes.evidence.trim() !== '') ||
      (socraticAttributes.implications && socraticAttributes.implications.trim() !== '')
    );
    
    // Check array properties
    const hasArrayContent = (
      (socraticAttributes.assumptions && socraticAttributes.assumptions.length > 0) ||
      (socraticAttributes.alternativePerspectives && socraticAttributes.alternativePerspectives.length > 0)
    );
    
    return hasStringContent || hasArrayContent;
  };
  
  if (!note.socraticAttributes || !hasContent(note.socraticAttributes)) return null;
  
  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-sm font-semibold flex items-center">
        <MessageCircleQuestion size={14} className="mr-2 text-primary" />
        Socratic Analysis
      </h3>
      <div className="space-y-2 text-sm">
        {note.socraticAttributes?.clarification && note.socraticAttributes.clarification.trim() !== '' && (
          <p><span className="font-medium">Clarification:</span> {note.socraticAttributes.clarification}</p>
        )}
        {note.socraticAttributes?.assumptions && note.socraticAttributes.assumptions.length > 0 && (
          <div>
            <span className="font-medium">Assumptions:</span>
            <ul className="mt-1 pl-4 space-y-1">
              {note.socraticAttributes.assumptions.map((assumption, index) => (
                <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                  {assumption}
                </li>
              ))}
            </ul>
          </div>
        )}
        {note.socraticAttributes?.evidence && note.socraticAttributes.evidence.trim() !== '' && (
          <p><span className="font-medium">Evidence:</span> {note.socraticAttributes.evidence}</p>
        )}
        {note.socraticAttributes?.alternativePerspectives && note.socraticAttributes.alternativePerspectives.length > 0 && (
          <div>
            <span className="font-medium">Alternative Perspectives:</span>
            <ul className="mt-1 pl-4 space-y-1">
              {note.socraticAttributes.alternativePerspectives.map((perspective, index) => (
                <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                  {perspective}
                </li>
              ))}
            </ul>
          </div>
        )}
        {note.socraticAttributes?.implications && note.socraticAttributes.implications.trim() !== '' && (
          <p><span className="font-medium">Implications:</span> {note.socraticAttributes.implications}</p>
        )}
      </div>
    </div>
  );
};

export default SocraticSection;
