
import React from 'react';

interface QuestionsListProps {
  questionLines: string[];
}

export const QuestionsList = ({ questionLines }: QuestionsListProps) => {
  if (questionLines.length === 0) return null;
  
  return (
    <div className="mt-4 p-4 bg-muted/30 rounded-md">
      <h4 className="text-sm font-medium mb-2">Current Open Questions ({questionLines.length})</h4>
      <ul className="space-y-2">
        {questionLines.map((question, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="text-muted-foreground mt-0.5">•</span>
            <span>{question}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
