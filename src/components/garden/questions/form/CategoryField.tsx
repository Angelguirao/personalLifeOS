
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { QuestionFormValues } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategoryFieldProps {
  control: Control<QuestionFormValues>;
}

export const CategoryField = ({ control }: CategoryFieldProps) => {
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="philosophical">Philosophical</SelectItem>
              <SelectItem value="ethical">Ethical</SelectItem>
              <SelectItem value="practical">Practical</SelectItem>
              <SelectItem value="scientific">Scientific</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
