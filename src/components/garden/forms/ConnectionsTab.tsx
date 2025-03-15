
import React, { useState, useEffect } from 'react';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { X, Plus, InfoIcon } from 'lucide-react';
import { MentalModelFormValues } from './types';
import { RelationshipType } from '@/lib/garden/types/connection-types';
import { getMentalModels } from '@/lib/garden/api';
import { getRelationshipDescription, getStrengthDescription } from '../relationshipUtils';

interface ConnectionsTabProps {
  control: Control<MentalModelFormValues>;
  modelId?: string;
}

export const ConnectionsTab = ({ control, modelId }: ConnectionsTabProps) => {
  const [availableModels, setAvailableModels] = useState<Array<{ id: string, title: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use react-hook-form's useFieldArray to manage the connections array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "connections",
  });

  // Fetch available models to connect to
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoading(true);
        const models = await getMentalModels();
        
        // Filter out the current model if we have an ID
        const filteredModels = modelId
          ? models.filter(model => model.id !== modelId)
          : models;
        
        setAvailableModels(filteredModels.map(model => ({
          id: model.id,
          title: model.title
        })));
      } catch (error) {
        console.error('Failed to load mental models:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, [modelId]);

  // Watch the current connections to filter available models
  const currentConnections = useWatch({
    control,
    name: "connections",
  }) || [];
  
  // Get models that aren't already connected
  const unconnectedModels = availableModels.filter(
    model => !currentConnections.some(conn => conn.targetId === model.id)
  );

  // Add a new connection
  const handleAddConnection = () => {
    if (unconnectedModels.length > 0) {
      append({
        targetId: unconnectedModels[0].id,
        relationship: 'related' as RelationshipType,
        strength: 5
      });
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold">Connections to Other Models</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Connect this model to other models in your garden to build a network of knowledge
      </p>
      
      <div className="p-4 bg-muted/30 rounded-md mb-6">
        <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
          <InfoIcon size={16} className="text-blue-500" />
          Understanding Relationships
        </h4>
        <p className="text-sm text-muted-foreground">
          Connections between models create a meaningful network of ideas. Choose the relationship type that best 
          describes how this model relates to others. The strength value indicates how strong the connection is.
        </p>
      </div>
      
      {isLoading ? (
        <p>Loading available models...</p>
      ) : (
        <div className="space-y-4">
          {fields.length === 0 ? (
            <p className="text-muted-foreground italic">No connections yet</p>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  <X size={16} />
                </Button>
                
                <FormField
                  control={control}
                  name={`connections.${index}.targetId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connected Model</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={availableModels.length === 0}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableModels.map(model => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`connections.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Relationship Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="related">Related</SelectItem>
                            <SelectItem value="supports">Supports</SelectItem>
                            <SelectItem value="contradicts">Contradicts</SelectItem>
                            <SelectItem value="extends">Extends</SelectItem>
                            <SelectItem value="example">Example</SelectItem>
                            <SelectItem value="implementation">Implementation</SelectItem>
                            <SelectItem value="inspires">Inspires</SelectItem>
                            <SelectItem value="builds_on">Builds On</SelectItem>
                            <SelectItem value="contrasts">Contrasts</SelectItem>
                            <SelectItem value="references">References</SelectItem>
                            <SelectItem value="questions">Questions</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {field.value && (
                        <FormDescription>
                          {getRelationshipDescription(field.value as RelationshipType)}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`connections.${index}.strength`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>
                        Connection Strength: {field.value}
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        {getStrengthDescription(field.value)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))
          )}
          
          <Button
            type="button"
            variant="outline"
            onClick={handleAddConnection}
            disabled={unconnectedModels.length === 0}
            className="w-full mt-4"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Connection
          </Button>
        </div>
      )}
    </>
  );
};
