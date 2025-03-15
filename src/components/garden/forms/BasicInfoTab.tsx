
import React from 'react';
import { Control } from 'react-hook-form';
import { MentalModelFormValues } from './types';
import { Separator } from '@/components/ui/separator';
import { BasicInfoFields } from './components/BasicInfoFields';
import { ImageUploadField } from './components/ImageUploadField';
import { OriginInfoFields } from './components/OriginInfoFields';
import { VisibilityField } from './components/VisibilityField';

interface BasicInfoTabProps {
  control: Control<MentalModelFormValues>;
}

export const BasicInfoTab = ({ control }: BasicInfoTabProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Basic Information</h3>
      
      <BasicInfoFields control={control} />
      <ImageUploadField control={control} />
      <VisibilityField control={control} />

      <Separator className="my-4" />

      <h3 className="text-lg font-semibold">Origin Information</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Capture when and where this mental model originated for you
      </p>
      
      <OriginInfoFields control={control} />
    </>
  );
};
