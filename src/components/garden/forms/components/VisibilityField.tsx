
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MentalModelFormValues } from '../types';
import { Eye } from 'lucide-react';

interface VisibilityFieldProps {
  control: Control<MentalModelFormValues>;
}

export const VisibilityField = ({ control }: VisibilityFieldProps) => {
  return (
    <FormField
      control={control}
      name="visibility"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            <Eye size={16} /> Visibility
          </FormLabel>
          <FormControl>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...field}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="unlisted">Unlisted</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
