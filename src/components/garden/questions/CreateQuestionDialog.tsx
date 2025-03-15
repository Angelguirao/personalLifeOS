
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Question } from '@/lib/garden/types';
import { QuestionTextField } from './form/QuestionTextField';
import { CategoryField } from './form/CategoryField';
import { ImportanceField } from './form/ImportanceField';
import { RelatedModelsField } from './form/RelatedModelsField';
import { ClarificationField } from './form/ClarificationField';
import { QuestionFormActions } from './form/QuestionFormActions';
import { useQuestionForm } from './form/useQuestionForm';

interface CreateQuestionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
  models: { id: string, title: string }[];
}

export const CreateQuestionDialog = ({
  isOpen,
  onOpenChange,
  onCreateQuestion,
  models,
}: CreateQuestionDialogProps) => {
  const { form, handleSubmit } = useQuestionForm(onCreateQuestion, onOpenChange);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
          <DialogDescription>
            Add a new question to your digital garden to explore ideas and concepts.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <QuestionTextField control={form.control} />
            <CategoryField control={form.control} />
            <ImportanceField control={form.control} />
            <RelatedModelsField control={form.control} models={models} />
            <ClarificationField control={form.control} />
            <QuestionFormActions onCancel={() => onOpenChange(false)} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
