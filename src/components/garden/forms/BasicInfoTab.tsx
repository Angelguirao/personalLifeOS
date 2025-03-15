import React, { useState } from 'react';
import { Control, useWatch, useFormContext } from 'react-hook-form';
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
import { MentalModelFormValues } from './types';
import { Image, Clock, MapPin, Heart, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { v4 as uuidv4 } from 'uuid';
import supabase from '@/lib/garden/client';
import { toast } from 'sonner';

interface BasicInfoTabProps {
  control: Control<MentalModelFormValues>;
}

export const BasicInfoTab = ({ control }: BasicInfoTabProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // This will track the field value to show preview or placeholder
  const imageUrl = useWatch({
    control,
    name: "imageUrl",
    defaultValue: ""
  });

  // File upload handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if Supabase is available
    if (!supabase) {
      toast.error('File upload requires Supabase. Please connect to Supabase or paste an image URL instead.');
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `mental-models/${fileName}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('garden')
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('garden')
        .getPublicUrl(filePath);
      
      // Set the URL in the form
      form.setValue("imageUrl", publicUrl);
      setPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload image. Please try again or use an external URL.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold">Basic Information</h3>
      
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Mental model title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="Optional subtitle" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="developmentStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Development Stage</FormLabel>
              <FormControl>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="seedling">Seedling</option>
                  <option value="growing">Growing</option>
                  <option value="evergreen">Evergreen</option>
                  <option value="mature">Mature</option>
                  <option value="refined">Refined</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confidenceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confidence Level</FormLabel>
              <FormControl>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="hypothesis">Hypothesis</option>
                  <option value="working">Working</option>
                  <option value="established">Established</option>
                  <option value="fundamental">Fundamental</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Textarea placeholder="Brief summary of this mental model" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="fullContent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Content</FormLabel>
            <FormControl>
              <Textarea placeholder="Detailed explanation of this mental model" rows={6} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
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
                      onChange={handleFileUpload}
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
      
      <FormField
        control={control}
        name="visibility"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Visibility</FormLabel>
            <FormControl>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...field}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="my-4" />

      <h3 className="text-lg font-semibold">Origin Information</h3>
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
