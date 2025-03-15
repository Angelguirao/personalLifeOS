
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
  FormDescription,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ArrowDown, ArrowUp, Book } from 'lucide-react';
import { MentalModelFormValues } from '../MentalModelForm';

interface AdditionalTabProps {
  control: Control<MentalModelFormValues>;
}

export const AdditionalTab = ({ control }: AdditionalTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Additional Information</h3>
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <ArrowDown size={16} />
          Consequences
        </h4>
        
        <FormField
          control={control}
          name="consequencesPersonal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Level</FormLabel>
              <FormControl>
                <Textarea placeholder="Consequences for individuals" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="consequencesInterpersonal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interpersonal Level</FormLabel>
              <FormControl>
                <Textarea placeholder="Consequences for relationships" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="consequencesSocietal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Societal Level</FormLabel>
              <FormControl>
                <Textarea placeholder="Broader societal consequences" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <ArrowUp size={16} />
          Open Questions
        </h4>
        
        <FormField
          control={control}
          name="openQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Open Questions</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter each question on a new line" rows={4} {...field} />
              </FormControl>
              <FormDescription>Questions this model raises or leaves unanswered</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <Book size={16} />
          Book Reference
        </h4>
        
        <FormField
          control={control}
          name="bookTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Book title if this model references a book" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="bookAuthor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Book author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="bookLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="URL to book or reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
