
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface ContentSectionProps {
  note: MentalModel;
}

const ContentSection = ({ note }: ContentSectionProps) => {
  if (!note.fullContent || note.fullContent.trim() === '') return null;
  
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <p>{note.fullContent}</p>
    </div>
  );
};

export default ContentSection;
