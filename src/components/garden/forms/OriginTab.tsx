
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
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
import { Clock, MapPin, Heart } from 'lucide-react';

interface OriginTabProps {
  control: Control<MentalModelFormValues>;
}

export const OriginTab = ({ control }: OriginTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Origin Moment</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Capture when and where this mental model originated for you
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="originDatetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Clock size={16} /> Date/Time
              </FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>When did you first encounter this model?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="originLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <MapPin size={16} /> Location
              </FormLabel>
              <FormControl>
                <Input placeholder="Where were you?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="originEmotions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <Heart size={16} /> Emotions
            </FormLabel>
            <FormControl>
              <Input placeholder="Comma-separated emotions you felt" {...field} />
            </FormControl>
            <FormDescription>How did you feel when discovering this model?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="originPerceptions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Perceptions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What did you notice or perceive when this model came to you?" 
                rows={3} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
