
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
import { MentalModelFormValues } from '../MentalModelForm';
import { HelpCircle } from 'lucide-react';

interface QuestionsTabProps {
  control: Control<MentalModelFormValues>;
}

export const QuestionsTab = ({ control }: QuestionsTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <HelpCircle size={20} />
        Questions Management
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Manage questions related to this mental model
      </p>
      
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
      
      {/* Future enhancement: Link to existing questions in the system */}
      <div className="mt-4 p-4 bg-muted rounded-md">
        <p className="text-sm font-medium">Coming soon: Link to existing questions</p>
        <p className="text-xs text-muted-foreground">
          In the future, you'll be able to link this model to questions in your question bank.
        </p>
      </div>
    </>
  );
};
