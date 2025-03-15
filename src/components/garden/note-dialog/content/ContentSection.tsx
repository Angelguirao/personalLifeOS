
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';
import { Textarea } from '@/components/ui/textarea';

interface ContentSectionProps {
  note: MentalModel;
}

const ContentSection = ({ note }: ContentSectionProps) => {
  if (!note.fullContent || note.fullContent.trim() === '') return null;
  
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="whitespace-pre-wrap">
        {note.fullContent}
      </div>
    </div>
  );
};

export default ContentSection;
