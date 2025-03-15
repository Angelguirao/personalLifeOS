
import React, { useEffect, useState } from 'react';
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
import { Code, Copy, Download, Loader, Upload, HelpCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JsonTabProps {
  control: Control<MentalModelFormValues>;
  defaultValues: MentalModelFormValues;
  reset: (values: MentalModelFormValues) => void;
}

export const JsonTab = ({ control, defaultValues, reset }: JsonTabProps) => {
  // Watch all form fields to generate JSON representation
  const formValues = useWatch({ control });
  const [activeJsonTab, setActiveJsonTab] = useState<"complete" | "model" | "connections" | "inspirations" | "questions" | "versioning">("complete");
  
  // Generate formatted JSON representation of the form data
  const generateJson = (mode: "complete" | "model" | "connections" | "inspirations" | "questions" | "versioning" = "complete") => {
    try {
      let data = { ...formValues };
      
      // Filter data based on selected tab
      switch (mode) {
        case "model":
          // Filter out connection and inspiration related fields
          const { connections, relatedQuestions, bookTitle, bookAuthor, bookLink, openQuestions, versionNote, createNewVersion, ...modelData } = data;
          return JSON.stringify(modelData, null, 2);
        
        case "connections":
          return JSON.stringify({ connections: data.connections || [] }, null, 2);
        
        case "inspirations":
          return JSON.stringify({
            bookInfo: data.bookTitle ? {
              title: data.bookTitle,
              author: data.bookAuthor,
              link: data.bookLink
            } : null
          }, null, 2);
          
        case "questions":
          // Process open questions to array format
          const questionsArray = data.openQuestions 
            ? data.openQuestions.split('\n')
              .map(q => q.trim())
              .filter(q => q.length > 0)
            : [];
            
          return JSON.stringify({
            openQuestions: questionsArray,
            relatedQuestions: data.relatedQuestions || []
          }, null, 2);
          
        case "versioning":
          return JSON.stringify({
            versionInfo: {
              createNewVersion: data.createNewVersion || false,
              versionNote: data.versionNote || ''
            }
          }, null, 2);
        
        case "complete":
        default:
          return JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error('Error generating JSON:', error);
      return '{}';
    }
  };
  
  // Handle JSON import
  const handleImport = (jsonStr: string) => {
    try {
      const parsedData = JSON.parse(jsonStr);
      
      // Merge with default values based on the active tab
      if (activeJsonTab === "complete") {
        reset({
          ...defaultValues,
          ...parsedData,
        });
      } else if (activeJsonTab === "model") {
        const { connections, relatedQuestions, ...currentValues } = useWatch({ control });
        reset({
          ...currentValues,
          ...parsedData,
          connections,
          relatedQuestions
        });
      } else if (activeJsonTab === "connections") {
        const currentValues = useWatch({ control });
        reset({
          ...currentValues,
          connections: parsedData.connections || []
        });
      } else if (activeJsonTab === "inspirations") {
        const currentValues = useWatch({ control });
        if (parsedData.bookInfo) {
          reset({
            ...currentValues,
            bookTitle: parsedData.bookInfo.title || '',
            bookAuthor: parsedData.bookInfo.author || '',
            bookLink: parsedData.bookInfo.link || ''
          });
        }
      } else if (activeJsonTab === "questions") {
        const currentValues = useWatch({ control });
        
        // Handle open questions (convert array back to newline-separated string)
        let openQuestionsStr = '';
        if (parsedData.openQuestions && Array.isArray(parsedData.openQuestions)) {
          openQuestionsStr = parsedData.openQuestions.join('\n');
        }
        
        reset({
          ...currentValues,
          openQuestions: openQuestionsStr,
          relatedQuestions: parsedData.relatedQuestions || []
        });
      } else if (activeJsonTab === "versioning") {
        const currentValues = useWatch({ control });
        if (parsedData.versionInfo) {
          reset({
            ...currentValues,
            createNewVersion: parsedData.versionInfo.createNewVersion,
            versionNote: parsedData.versionInfo.versionNote || ''
          });
        }
      }
      
      toast.success('Form data imported successfully');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast.error('Invalid JSON format');
    }
  };
  
  // Copy JSON to clipboard
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(generateJson(activeJsonTab));
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
      
      <Tabs value={activeJsonTab} onValueChange={(value) => setActiveJsonTab(value as any)} className="mb-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="complete">Complete Data</TabsTrigger>
          <TabsTrigger value="model">Model Only</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="inspirations">Inspirations</TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-1.5">
            <HelpCircle size={14} /> Questions
          </TabsTrigger>
          <TabsTrigger value="versioning" className="flex items-center gap-1.5">
            <Clock size={14} /> Versioning
          </TabsTrigger>
        </TabsList>
        
        <p className="text-sm text-muted-foreground mt-2">
          {activeJsonTab === "complete" && "View and edit all data including the model, connections, and related entities"}
          {activeJsonTab === "model" && "View and edit only the mental model data without related entities"}
          {activeJsonTab === "connections" && "View and edit only the connections between this model and other models"}
          {activeJsonTab === "inspirations" && "View and edit only inspirations like book references"}
          {activeJsonTab === "questions" && "View and edit open questions and related questions"}
          {activeJsonTab === "versioning" && "View and edit version control information"}
        </p>
      </Tabs>
      
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
                  value={field.value || generateJson(activeJsonTab)}
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
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(generateJson(activeJsonTab));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              
              // Name the file based on the active tab
              let filename = "mental-model";
              if (activeJsonTab !== "complete") {
                filename += `-${activeJsonTab}`;
              }
              downloadAnchor.setAttribute("download", `${filename}-${Date.now()}.json`);
              
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
