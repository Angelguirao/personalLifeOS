
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { QuestionFormValues } from './types';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface RelatedModelsFieldProps {
  control: Control<QuestionFormValues>;
  models: { id: string, title: string }[];
}

export const RelatedModelsField = ({ control, models }: RelatedModelsFieldProps) => {
  return (
    <FormField
      control={control}
      name="relatedModels"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Related Mental Models</FormLabel>
          <FormDescription>
            Connect this question to existing mental models in your garden
          </FormDescription>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {field.value.length > 0
                    ? `${field.value.length} model${field.value.length > 1 ? 's' : ''} selected`
                    : "Select models"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search models..." />
                <CommandEmpty>No mental model found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-auto">
                  {models.map((model) => (
                    <CommandItem
                      key={model.id}
                      value={model.title}
                      onSelect={() => {
                        const currentValues = [...field.value];
                        const modelIndex = currentValues.indexOf(model.id);
                        
                        if (modelIndex > -1) {
                          currentValues.splice(modelIndex, 1);
                        } else {
                          currentValues.push(model.id);
                        }
                        
                        field.onChange(currentValues);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value.includes(model.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {model.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
