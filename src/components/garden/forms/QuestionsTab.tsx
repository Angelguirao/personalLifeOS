
import React, { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MentalModelFormValues } from './types';
import { HelpCircle, Plus, Link, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuestionsTabProps {
  control: Control<MentalModelFormValues>;
}

export const QuestionsTab = ({ control }: QuestionsTabProps) => {
  const [showQuestionSearch, setShowQuestionSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { watch } = useFormContext<MentalModelFormValues>();
  
  // Get the current questions as an array for display
  const currentQuestions = watch('openQuestions') || '';
  const questionLines = currentQuestions.split('\n').filter(q => q.trim().length > 0);
  
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
      
      {questionLines.length > 0 && (
        <div className="mt-4 p-4 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium mb-2">Current Open Questions ({questionLines.length})</h4>
          <ul className="space-y-2">
            {questionLines.map((question, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-0.5">•</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Future feature: Link to existing questions */}
      <div className="mt-6 p-4 bg-muted rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium mb-1">Link to existing questions</h4>
            <p className="text-xs text-muted-foreground">
              In the future, you'll be able to link this model to questions in your question bank.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            disabled 
            className="h-8"
            onClick={() => setShowQuestionSearch(!showQuestionSearch)}
          >
            <Link size={14} className="mr-1.5" /> Link Questions
          </Button>
        </div>
        
        {showQuestionSearch && (
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search question bank..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled
              />
            </div>
            <div className="text-center p-6">
              <p className="text-sm text-muted-foreground">
                This feature will be available soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
