
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const QuestionsHeader = () => {
  return (
    <>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <HelpCircle size={20} />
        Questions Management
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Manage questions related to this mental model
      </p>
    </>
  );
};
