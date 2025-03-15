
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { QuestionFormValues } from './types';

interface QuestionTextFieldProps {
  control: Control<QuestionFormValues>;
}

export const QuestionTextField = ({ control }: QuestionTextFieldProps) => {
  return (
    <FormField
      control={control}
      name="questionText"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Question</FormLabel>
          <FormControl>
            <Input placeholder="What is the nature of consciousness?" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
