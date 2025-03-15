
import React from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Image } from 'lucide-react';
import { MentalModelFormValues } from '../types';
import { useImageUpload } from '../utils/image-upload';

interface ImageUploadFieldProps {
  control: Control<MentalModelFormValues>;
}

export const ImageUploadField = ({ control }: ImageUploadFieldProps) => {
  const { setValue } = useFormContext<MentalModelFormValues>();
  const { previewUrl, setPreviewUrl, isUploading, handleFileUpload } = useImageUpload();

  // This will track the field value to show preview or placeholder
  const imageUrl = useWatch({
    control,
    name: "imageUrl",
    defaultValue: ""
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    await handleFileUpload(file, (url) => {
      setValue("imageUrl", url);
    });
  };

  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <Image size={16} /> Image
            </FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormControl>
                  <Input 
                    placeholder="URL to an image representing this model" 
                    {...field} 
                    className="mb-2"
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="max-w-64"
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="animate-spin h-4 w-4 border-2 border-primary rounded-full border-t-transparent"></div>
                  )}
                </div>
                <FormDescription>
                  Upload an image or paste a URL that visually represents this mental model
                </FormDescription>
                <FormMessage />
              </div>
              <div className="h-32 md:h-40 relative border rounded-md overflow-hidden bg-muted/20">
                {(imageUrl || previewUrl) ? (
                  <img 
                    src={previewUrl || imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl(null)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <Image size={32} strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
