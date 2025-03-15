
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import supabase from '@/lib/garden/client';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    file: File | undefined, 
    onSuccess: (url: string) => void
  ) => {
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
      
      onSuccess(publicUrl);
      setPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload image. Please try again or use an external URL.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    previewUrl,
    setPreviewUrl,
    isUploading,
    handleFileUpload
  };
};
