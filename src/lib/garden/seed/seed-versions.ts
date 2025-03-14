
import supabase from '../client';
import { modelVersions } from '../data';
import { toast } from 'sonner';

export const seedModelVersions = async () => {
  try {
    console.log('Seeding model versions...');
    
    // Check if we already have data
    const { data: existingData, error: checkError } = await supabase
      .from('mental_model_versions')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking for existing model versions:', checkError);
    } else if (existingData && existingData.length > 0) {
      console.log('Mental model versions already exist, skipping seed...');
      return true;
    }
    
    // First, delete existing model versions
    console.log('Deleting existing model versions...');
    const { error: deleteError } = await supabase
      .from('mental_model_versions')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    if (deleteError) {
      console.error('Error deleting existing model versions:', deleteError);
      toast.error('Failed to clear existing model versions');
      return false;
    }
    
    // Format the model versions data for Supabase (using snake_case for column names)
    const versionsData = modelVersions.map(version => ({
      id: version.id,
      mental_model_id: version.mentalModelId,
      version_number: version.versionNumber,
      content_snapshot: version.contentSnapshot,
      change_log: version.changeLog,
      timestamp: version.timestamp
    }));
    
    console.log('Inserting model versions:', versionsData);
    
    // Insert versions
    const { error } = await supabase
      .from('mental_model_versions')
      .insert(versionsData);
    
    if (error) {
      console.error('Error seeding model versions:', error);
      toast.error('Error seeding model versions to database');
      return false;
    }
    
    console.log('Model versions seeded successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error seeding model versions:', error);
    toast.error('Error seeding model versions');
    return false;
  }
};
