
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { MentalModel } from '@/lib/garden/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mentalModelSchema } from './forms/schema';
import { BasicInfoTab } from './forms/BasicInfoTab';
import { MetadataTab } from './forms/MetadataTab';
import { AnalysisTab } from './forms/AnalysisTab';
import { AdditionalTab } from './forms/AdditionalTab';
import { OriginTab } from './forms/OriginTab';
import { JsonTab } from './forms/JsonTab';
import { processModelForForm } from '@/lib/garden/utils/form-processors';

export type MentalModelFormValues = z.infer<typeof mentalModelSchema>;

interface MentalModelFormProps {
  model?: MentalModel;
  initialData?: MentalModelFormValues | null;
  onSubmit: (data: MentalModelFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

// Helper function to convert arrays to comma-separated strings for form initialization
export const convertArrayToString = (arr?: string[]) => arr ? arr.join(', ') : '';

// Handle legacy visibility values
export const getVisibilityValue = (modelVisibility?: string): 'public' | 'private' | 'unlisted' => {
  if (!modelVisibility) return 'public';
  
  // If we have a legacy 'restricted' value, convert it to 'private'
  if (modelVisibility === 'restricted') {
    return 'private';
  }
  
  // Otherwise, use the value as long as it matches our allowed types
  return modelVisibility as 'public' | 'private' | 'unlisted';
};

const MentalModelForm = ({ model, initialData, onSubmit, onCancel, isSubmitting }: MentalModelFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  // Use initialData if provided, otherwise generate default values from model
  const defaultValues = initialData || (model ? processModelForForm(model) : {
    // Basic information
    title: '',
    subtitle: '',
    developmentStage: 'seedling',
    confidenceLevel: 'working',
    summary: '',
    fullContent: '',
    imageUrl: '',
    
    // Tags and categories
    tags: '',
    domains: '',
    frameworks: '',
    applications: '',
    
    // LATCH Framework
    latchLocation: '',
    latchAlphabetical: '',
    latchTime: '',
    latchCategory: '',
    latchHierarchyLevel: '3',
    
    // DSRP Structure
    dsrpDistinctions: '',
    dsrpSystems: '',
    dsrpRelationships: '',
    dsrpPerspectives: '',
    
    // Socratic Attributes
    socraticClarification: '',
    socraticAssumptions: '',
    socraticEvidence: '',
    socraticPerspectives: '',
    socraticImplications: '',
    
    // Origin Moment
    originDatetime: '',
    originLocation: '',
    originEmotions: '',
    originPerceptions: '',
    
    // Consequences
    consequencesPersonal: '',
    consequencesInterpersonal: '',
    consequencesSocietal: '',
    
    // Open Questions
    openQuestions: '',
    
    // Book Info
    bookTitle: '',
    bookAuthor: '',
    bookLink: '',
    
    // Versioning
    versionNote: '',
    createNewVersion: true,
    
    // Visibility
    visibility: 'public',
    
    // JSON data field (initially empty)
    jsonData: '',
    
    // Connections and questions
    connections: [],
    relatedQuestions: []
  });
  
  const form = useForm<MentalModelFormValues>({
    resolver: zodResolver(mentalModelSchema),
    defaultValues,
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = async (data: MentalModelFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="origin">Origin</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
          
          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4">
            <BasicInfoTab control={form.control} />
          </TabsContent>
          
          {/* Metadata Tab */}
          <TabsContent value="metadata" className="space-y-4">
            <MetadataTab control={form.control} />
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <AnalysisTab control={form.control} />
          </TabsContent>
          
          {/* Origin Tab */}
          <TabsContent value="origin" className="space-y-4">
            <OriginTab control={form.control} />
          </TabsContent>
          
          {/* Additional Tab */}
          <TabsContent value="additional" className="space-y-4">
            <AdditionalTab control={form.control} />
          </TabsContent>
          
          {/* JSON Tab */}
          <TabsContent value="json" className="space-y-4">
            <JsonTab 
              control={form.control} 
              defaultValues={defaultValues} 
              reset={(values) => form.reset(values)} 
            />
          </TabsContent>
        </Tabs>

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
