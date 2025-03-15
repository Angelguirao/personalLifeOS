
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MentalModelFormValues } from '../types';

interface JsonDataFieldProps {
  control: Control<MentalModelFormValues>;
  jsonContent: string;
}

export const JsonDataField = ({ control, jsonContent }: JsonDataFieldProps) => {
  // Copy JSON to clipboard
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(jsonContent);
      toast.success('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
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
              value={field.value || jsonContent}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
