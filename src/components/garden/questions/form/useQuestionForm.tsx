
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionFormValues, questionSchema } from './types';
import { Question } from '@/lib/garden/types';

export const useQuestionForm = (
  onCreateQuestion: (question: Omit<Question, 'id'>) => Promise<void>,
  onOpenChange: (open: boolean) => void
) => {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: '',
      category: 'philosophical',
      clarificationNeeded: false,
      importanceRank: 5,
      relatedModels: [],
    },
  });

  const handleSubmit = async (values: QuestionFormValues) => {
    try {
      // Cast the values to ensure TypeScript recognizes this as Omit<Question, "id">
      const questionData: Omit<Question, 'id'> = {
        questionText: values.questionText,
        category: values.category,
        clarificationNeeded: values.clarificationNeeded,
        importanceRank: values.importanceRank,
        relatedModels: values.relatedModels,
      };
      
      await onCreateQuestion(questionData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return {
    form,
    handleSubmit,
  };
};
