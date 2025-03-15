
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MentalModelFormValues } from '../types';

interface QuestionsFieldProps {
  control: Control<MentalModelFormValues>;
}

export const QuestionsField = ({ control }: QuestionsFieldProps) => {
  return (
    <FormField
      control={control}
      name="openQuestions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Open Questions</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter each question on a new line" 
              rows={6} 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Questions this model raises or leaves unanswered. Each question on a new line.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
