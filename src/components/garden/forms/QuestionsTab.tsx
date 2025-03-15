
import React, { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { MentalModelFormValues } from './types';
import { QuestionsHeader } from './questions/QuestionsHeader';
import { QuestionsField } from './questions/QuestionsField';
import { QuestionsList } from './questions/QuestionsList';
import { QuestionBankSection } from './questions/QuestionBankSection';

interface QuestionsTabProps {
  control: Control<MentalModelFormValues>;
}

export const QuestionsTab = ({ control }: QuestionsTabProps) => {
  const [showQuestionSearch, setShowQuestionSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { watch } = useFormContext<MentalModelFormValues>();
  
  // Get the current questions as an array for display
  const currentQuestions = watch('openQuestions') || '';
  const questionLines = currentQuestions.split('\n').filter(q => q.trim().length > 0);
  
  return (
    <>
      <QuestionsHeader />
      <QuestionsField control={control} />
      <QuestionsList questionLines={questionLines} />
      <QuestionBankSection 
        showQuestionSearch={showQuestionSearch}
        setShowQuestionSearch={setShowQuestionSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};
