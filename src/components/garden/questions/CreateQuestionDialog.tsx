
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QuestionCategory, Question } from '@/lib/garden/types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// Define a strict schema that matches our Question type requirements
const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  category: z.enum(['philosophical', 'ethical', 'practical', 'scientific', 'social', 'personal']),
  clarificationNeeded: z.boolean().default(false),
  importanceRank: z.number().min(1).max(10),
  relatedModels: z.array(z.string()).default([]),
});

// This ensures the form values will match the expected Omit<Question, "id"> type
type QuestionFormValues = z.infer<typeof questionSchema>;

interface CreateQuestionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
  models: { id: string, title: string }[];
}

export const CreateQuestionDialog = ({
  isOpen,
  onOpenChange,
  onCreateQuestion,
  models,
}: CreateQuestionDialogProps) => {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: '',
      category: 'philosophical',
      clarificationNeeded: false,
      importanceRank: 5,
      relatedModels: [],
    },
  });

  const handleSubmit = async (values: QuestionFormValues) => {
    try {
      // Cast the values to ensure TypeScript recognizes this as Omit<Question, "id">
      const questionData: Omit<Question, 'id'> = {
        questionText: values.questionText,
        category: values.category,
        clarificationNeeded: values.clarificationNeeded,
        importanceRank: values.importanceRank,
        relatedModels: values.relatedModels,
      };
      
      await onCreateQuestion(questionData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
          <DialogDescription>
            Add a new question to your digital garden to explore ideas and concepts.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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

            <FormField
              control={form.control}
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

            <FormField
              control={form.control}
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

            <FormField
              control={form.control}
              name="relatedModels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Mental Models</FormLabel>
                  <FormDescription>
                    Connect this question to existing mental models in your garden
                  </FormDescription>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {field.value.length > 0
                            ? `${field.value.length} model${field.value.length > 1 ? 's' : ''} selected`
                            : "Select models"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search models..." />
                        <CommandEmpty>No mental model found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-auto">
                          {models.map((model) => (
                            <CommandItem
                              key={model.id}
                              value={model.title}
                              onSelect={() => {
                                const currentValues = [...field.value];
                                const modelIndex = currentValues.indexOf(model.id);
                                
                                if (modelIndex > -1) {
                                  currentValues.splice(modelIndex, 1);
                                } else {
                                  currentValues.push(model.id);
                                }
                                
                                field.onChange(currentValues);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value.includes(model.id) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {model.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Question</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
