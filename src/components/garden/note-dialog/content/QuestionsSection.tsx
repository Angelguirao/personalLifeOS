
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface QuestionsSectionProps {
  note: MentalModel;
}

const QuestionsSection = ({ note }: QuestionsSectionProps) => {
  if (!note.openQuestions || note.openQuestions.length === 0) return null;
  
  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-sm font-semibold">Open Questions:</h3>
      <ul className="space-y-1 text-sm pl-4">
        {note.openQuestions.map((question, index) => (
          <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsSection;
