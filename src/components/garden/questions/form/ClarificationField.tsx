
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormDescription } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { QuestionFormValues } from './types';
import { Checkbox } from '@/components/ui/checkbox';

interface ClarificationFieldProps {
  control: Control<QuestionFormValues>;
}

export const ClarificationField = ({ control }: ClarificationFieldProps) => {
  return (
    <FormField
      control={control}
      name="clarificationNeeded"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              Needs Clarification
            </FormLabel>
            <FormDescription>
              Mark this if the question requires further refinement
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};
