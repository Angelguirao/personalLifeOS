
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
