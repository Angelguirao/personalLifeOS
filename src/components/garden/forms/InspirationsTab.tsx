
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MentalModelFormValues } from './types';
import { BookOpen, BookMarked, Link, Quote } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface InspirationsTabProps {
  control: Control<MentalModelFormValues>;
}

export const InspirationsTab = ({ control }: InspirationsTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <BookOpen size={20} />
        Inspirations
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Add sources that inspired this mental model
      </p>
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <BookMarked size={16} />
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
              <FormLabel className="flex items-center gap-1">
                <Link size={16} /> URL
              </FormLabel>
              <FormControl>
                <Input placeholder="URL to book or reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Separator className="my-4" />
      
      {/* Future enhancement: Add other inspiration types */}
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <Quote size={16} />
          Other Inspirations
        </h4>
        
        <div className="p-4 bg-muted rounded-md">
          <p className="text-sm font-medium">Coming soon: Additional inspiration types</p>
          <p className="text-xs text-muted-foreground">
            In the future, you'll be able to add articles, videos, conversations, and other types of inspirations.
          </p>
        </div>
      </div>
    </>
  );
};
