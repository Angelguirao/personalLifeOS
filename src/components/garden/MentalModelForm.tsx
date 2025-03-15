
import React, { useState } from 'react';
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

export type MentalModelFormValues = z.infer<typeof mentalModelSchema>;

interface MentalModelFormProps {
  model?: MentalModel;
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

const MentalModelForm = ({ model, onSubmit, onCancel, isSubmitting }: MentalModelFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  const defaultValues = {
    // Basic information
    title: model?.title || '',
    subtitle: model?.subtitle || '',
    developmentStage: model?.developmentStage || 'seedling',
    confidenceLevel: model?.confidenceLevel || 'working',
    summary: model?.summary || '',
    fullContent: model?.fullContent || '',
    imageUrl: model?.imageUrl || '',
    
    // Tags and categories
    tags: convertArrayToString(model?.tags?.filter(tag => !tag.startsWith('domain:') && !tag.startsWith('framework:') && !tag.startsWith('application:'))),
    domains: model?.tags?.filter(tag => tag.startsWith('domain:')).map(tag => tag.replace('domain:', '')).join(', ') || '',
    frameworks: model?.tags?.filter(tag => tag.startsWith('framework:')).map(tag => tag.replace('framework:', '')).join(', ') || '',
    applications: model?.tags?.filter(tag => tag.startsWith('application:')).map(tag => tag.replace('application:', '')).join(', ') || '',
    
    // LATCH Framework
    latchLocation: model?.latchAttributes?.location || '',
    latchAlphabetical: model?.latchAttributes?.alphabeticalIndex || '',
    latchTime: model?.latchAttributes?.time || '',
    latchCategory: model?.latchAttributes?.category || '',
    latchHierarchyLevel: model?.latchAttributes?.hierarchyLevel?.toString() || '3',
    
    // DSRP Structure
    dsrpDistinctions: model?.dsrpStructure?.distinctions || '',
    dsrpSystems: model?.dsrpStructure?.systemStructure || '',
    dsrpRelationships: model?.dsrpStructure?.relationships ? JSON.stringify(model.dsrpStructure.relationships) : '',
    dsrpPerspectives: model?.dsrpStructure?.perspectives ? model.dsrpStructure.perspectives.join(', ') : '',
    
    // Socratic Attributes
    socraticClarification: model?.socraticAttributes?.clarification || '',
    socraticAssumptions: model?.socraticAttributes?.assumptions ? model.socraticAttributes.assumptions.join(', ') : '',
    socraticEvidence: model?.socraticAttributes?.evidence || '',
    socraticPerspectives: model?.socraticAttributes?.alternativePerspectives ? model.socraticAttributes.alternativePerspectives.join(', ') : '',
    socraticImplications: model?.socraticAttributes?.implications || '',
    
    // Origin Moment
    originDatetime: model?.originMoment?.datetime || '',
    originLocation: model?.originMoment?.location || '',
    originEmotions: model?.originMoment?.emotions ? model.originMoment.emotions.join(', ') : '',
    originPerceptions: model?.originMoment?.perceptions || '',
    
    // Consequences
    consequencesPersonal: model?.consequences?.personal || '',
    consequencesInterpersonal: model?.consequences?.interpersonal || '',
    consequencesSocietal: model?.consequences?.societal || '',
    
    // Open Questions
    openQuestions: model?.openQuestions ? model.openQuestions.join('\n') : '',
    
    // Book Info
    bookTitle: model?.bookInfo?.title || '',
    bookAuthor: model?.bookInfo?.author || '',
    bookLink: model?.bookInfo?.link || '',
    
    // Visibility
    visibility: getVisibilityValue(model?.visibility),
    
    // JSON data field (initially empty)
    jsonData: '',
  };
  
  const form = useForm<MentalModelFormValues>({
    resolver: zodResolver(mentalModelSchema),
    defaultValues,
  });

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
