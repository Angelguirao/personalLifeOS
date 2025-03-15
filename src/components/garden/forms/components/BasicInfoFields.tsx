
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MentalModelFormValues } from '../types';

interface BasicInfoFieldsProps {
  control: Control<MentalModelFormValues>;
}

export const BasicInfoFields = ({ control }: BasicInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Mental model title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="Optional subtitle" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="developmentStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Development Stage</FormLabel>
              <FormControl>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="seedling">Seedling</option>
                  <option value="growing">Growing</option>
                  <option value="evergreen">Evergreen</option>
                  <option value="mature">Mature</option>
                  <option value="refined">Refined</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confidenceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confidence Level</FormLabel>
              <FormControl>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="hypothesis">Hypothesis</option>
                  <option value="working">Working</option>
                  <option value="established">Established</option>
                  <option value="fundamental">Fundamental</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Textarea placeholder="Brief summary of this mental model" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="fullContent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Content</FormLabel>
            <FormControl>
              <Textarea placeholder="Detailed explanation of this mental model" rows={6} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
