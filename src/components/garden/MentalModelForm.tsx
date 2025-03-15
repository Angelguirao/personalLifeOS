
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MentalModel } from '@/lib/garden/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema for validation
const mentalModelSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  developmentStage: z.enum(['seedling', 'growing', 'evergreen', 'mature', 'refined']),
  confidenceLevel: z.enum(['hypothesis', 'working', 'established', 'fundamental']),
  summary: z.string().min(1, 'Summary is required'),
  fullContent: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
});

type MentalModelFormValues = z.infer<typeof mentalModelSchema>;

interface MentalModelFormProps {
  model?: MentalModel;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const MentalModelForm = ({ model, onSubmit, onCancel, isSubmitting }: MentalModelFormProps) => {
  const form = useForm<MentalModelFormValues>({
    resolver: zodResolver(mentalModelSchema),
    defaultValues: {
      title: model?.title || '',
      subtitle: model?.subtitle || '',
      developmentStage: model?.developmentStage || 'seedling',
      confidenceLevel: model?.confidenceLevel || 'working',
      summary: model?.summary || '',
      fullContent: model?.fullContent || '',
      tags: model?.tags ? model.tags.join(', ') : '',
    },
  });

  const handleSubmit = async (data: MentalModelFormValues) => {
    // Process tags from comma-separated string to array
    const processedData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
    };
    
    await onSubmit(processedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
          control={form.control}
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
            control={form.control}
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
            control={form.control}
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
          control={form.control}
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
          control={form.control}
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

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags separated by commas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : model ? 'Update Model' : 'Create Model'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MentalModelForm;
