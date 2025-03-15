
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
import { Separator } from '@/components/ui/separator';
import { Calendar, Check } from 'lucide-react';
import { MentalModelFormValues } from '../MentalModelForm';

interface MetadataTabProps {
  control: Control<MentalModelFormValues>;
}

export const MetadataTab = ({ control }: MetadataTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Metadata & Organization</h3>
      
      <div className="space-y-4">
        <h4 className="text-md font-medium">Tags & Categories</h4>
        
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>General Tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags separated by commas" {...field} />
              </FormControl>
              <FormDescription>General tags for categorization</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="domains"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domains</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Philosophy, Ecology, Technology" {...field} />
              </FormControl>
              <FormDescription>Knowledge domains this model belongs to</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="frameworks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frameworks</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Systems Thinking, Deep Ecology" {...field} />
              </FormControl>
              <FormDescription>Conceptual frameworks used</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="applications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applications</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Biophilic Cities, Circular Economy" {...field} />
              </FormControl>
              <FormDescription>Practical applications of this model</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <Calendar size={16} />
          LATCH Framework
        </h4>
        
        <FormField
          control={control}
          name="latchLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Geographic or conceptual location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="latchAlphabetical"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alphabetical Index</FormLabel>
              <FormControl>
                <Input placeholder="E.g., A for Anthropocene" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="latchTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Period</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Present & Future" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="latchCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Ecological Thought, Ethics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="latchHierarchyLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hierarchy Level (1-5)</FormLabel>
              <FormControl>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="1">1 - Fundamental</option>
                  <option value="2">2 - Applied Model</option>
                  <option value="3">3 - System</option>
                  <option value="4">4 - Framework</option>
                  <option value="5">5 - Specific Instance</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
