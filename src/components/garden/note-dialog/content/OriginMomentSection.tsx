
import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface OriginMomentSectionProps {
  note: MentalModel;
}

const OriginMomentSection = ({ note }: OriginMomentSectionProps) => {
  if (!note.originMoment) return null;
  
  // Format date helper function
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  return (
    <div className="mt-6 p-3 bg-secondary/20 rounded-md">
      <div className="flex items-start text-sm">
        <BrainCircuit size={14} className="mr-2 mt-0.5 text-primary" />
        <div>
          <span className="font-medium">Origin:</span> {formatDate(note.originMoment.datetime)}
          {note.originMoment.location && <span> at {note.originMoment.location}</span>}
          {note.originMoment.emotions && note.originMoment.emotions.length > 0 && (
            <p className="mt-1"><span className="font-medium">Emotions:</span> {note.originMoment.emotions.join(', ')}</p>
          )}
          {note.originMoment.perceptions && (
            <p className="mt-1"><span className="font-medium">Perceptions:</span> {note.originMoment.perceptions}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OriginMomentSection;
