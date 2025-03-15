
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
import { Checkbox } from '@/components/ui/checkbox';
import { History, GitBranch, GitMerge } from 'lucide-react';

interface VersioningTabProps {
  control: Control<MentalModelFormValues>;
}

export const VersioningTab = ({ control }: VersioningTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <History size={20} />
        Versioning
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Track changes and create versions of this mental model
      </p>
      
      <div className="space-y-6">
        <FormField
          control={control}
          name="createNewVersion"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center gap-1">
                  <GitBranch size={16} /> Create new version
                </FormLabel>
                <FormDescription>
                  When enabled, a snapshot of the current state will be saved as a new version when you update this model
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="versionNote"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <GitMerge size={16} /> Version Note
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what changed in this version" 
                  rows={4} 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Add notes about what's changing in this version to help track the evolution of your thinking
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Future enhancement: Version history display */}
      <div className="mt-6 p-4 bg-muted rounded-md">
        <p className="text-sm font-medium">Version history</p>
        <p className="text-xs text-muted-foreground">
          In the future, you'll be able to see and navigate through the version history of this model.
        </p>
      </div>
    </>
  );
};
