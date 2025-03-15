
import React, { useEffect } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MentalModelFormValues } from './types';
import { Code, Copy, Download, Loader, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface JsonTabProps {
  control: Control<MentalModelFormValues>;
  defaultValues: MentalModelFormValues;
  reset: (values: MentalModelFormValues) => void;
}

export const JsonTab = ({ control, defaultValues, reset }: JsonTabProps) => {
  // Watch all form fields to generate JSON representation
  const formValues = useWatch({ control });
  
  // Generate formatted JSON representation of the form data
  const generateJson = () => {
    try {
      return JSON.stringify(formValues, null, 2);
    } catch (error) {
      console.error('Error generating JSON:', error);
      return '{}';
    }
  };
  
  // Handle JSON import
  const handleImport = (jsonStr: string) => {
    try {
      const parsedData = JSON.parse(jsonStr);
      reset({
        ...defaultValues,
        ...parsedData,
      });
      toast.success('Form data imported successfully');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast.error('Invalid JSON format');
    }
  };
  
  // Copy JSON to clipboard
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(generateJson());
      toast.success('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Code size={20} />
        JSON Import/Export
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Import or export mental model data in JSON format for easier editing or backup
      </p>
      
      <div className="space-y-6">
        <FormField
          control={control}
          name="jsonData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JSON Data</FormLabel>
              <div className="flex justify-between mb-2">
                <FormDescription>
                  Paste JSON data to import or view the current form state
                </FormDescription>
                <Button
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8"
                >
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  rows={20} 
                  className="font-mono text-sm"
                  placeholder="Paste JSON data here to import"
                  value={field.value || generateJson()}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const formField = document.querySelector('textarea[name="jsonData"]') as HTMLTextAreaElement;
              if (formField) {
                handleImport(formField.value);
              }
            }}
          >
            <Upload size={16} className="mr-2" /> Import from JSON
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Create a download link
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(generateJson());
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `mental-model-${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
          >
            <Download size={16} className="mr-2" /> Export to File
          </Button>
        </div>
      </div>
    </>
  );
};
