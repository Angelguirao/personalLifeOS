
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { QuestionFormValues } from './types';
import { Slider } from '@/components/ui/slider';

interface ImportanceFieldProps {
  control: Control<QuestionFormValues>;
}

export const ImportanceField = ({ control }: ImportanceFieldProps) => {
  return (
    <FormField
      control={control}
      name="importanceRank"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Importance (1-10): {field.value}</FormLabel>
          <FormControl>
            <Slider
              value={[field.value]}
              min={1}
              max={10}
              step={1}
              onValueChange={(values) => field.onChange(values[0])}
            />
          </FormControl>
          <FormDescription>
            How important is this question to your thinking?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
