
import React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Check } from 'lucide-react';
import { MentalModelFormValues } from './types';

interface AnalysisTabProps {
  control: Control<MentalModelFormValues>;
}

export const AnalysisTab = ({ control }: AnalysisTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Analysis & Critical Thinking</h3>
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <BookOpen size={16} />
          DSRP Structure
        </h4>
        
        <FormField
          control={control}
          name="dsrpDistinctions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distinctions</FormLabel>
              <FormControl>
                <Textarea placeholder="Key distinctions made by this model" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="dsrpSystems"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Systems</FormLabel>
              <FormControl>
                <Textarea placeholder="Systems structure related to this model" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="dsrpRelationships"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationships</FormLabel>
              <FormControl>
                <Textarea placeholder="Key relationships in this model" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="dsrpPerspectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perspectives</FormLabel>
              <FormControl>
                <Textarea placeholder="Different perspectives on this model (comma separated)" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <h4 className="text-md font-medium flex items-center gap-2">
          <Check size={16} />
          Socratic Method
        </h4>
        
        <FormField
          control={control}
          name="socraticClarification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clarification</FormLabel>
              <FormControl>
                <Textarea placeholder="What does this model clarify or define?" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="socraticAssumptions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assumptions</FormLabel>
              <FormControl>
                <Textarea placeholder="Key assumptions made (comma separated)" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="socraticEvidence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evidence</FormLabel>
              <FormControl>
                <Textarea placeholder="Evidence supporting or refuting this model" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="socraticPerspectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative Perspectives</FormLabel>
              <FormControl>
                <Textarea placeholder="Alternative ways of viewing this topic (comma separated)" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="socraticImplications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Implications</FormLabel>
              <FormControl>
                <Textarea placeholder="Implications if this model is true" rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
