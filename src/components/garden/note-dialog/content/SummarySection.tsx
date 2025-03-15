
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface SummarySectionProps {
  note: MentalModel;
}

const SummarySection = ({ note }: SummarySectionProps) => {
  // Only show summary if it's different from the full content
  if (!note.summary || note.summary === note.fullContent) return null;
  
  return (
    <div className="font-medium text-sm">
      <p className="italic">{note.summary}</p>
    </div>
  );
};

export default SummarySection;
