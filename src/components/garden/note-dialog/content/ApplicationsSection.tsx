
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface ApplicationsSectionProps {
  note: MentalModel;
}

const ApplicationsSection = ({ note }: ApplicationsSectionProps) => {
  if (!note.applications?.examples || note.applications.examples.length === 0) return null;
  
  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-sm font-semibold">Applications:</h3>
      <ul className="space-y-1 text-sm">
        {note.applications.examples.map((example, index) => (
          <li key={index} className="pl-4 relative before:absolute before:left-0 before:content-['•'] before:text-primary">
            <span className="font-medium">{example.domain}:</span> {example.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsSection;
