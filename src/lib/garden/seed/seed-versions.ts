
import supabase from '../client';
import { modelVersions } from '../data';
import { toast } from 'sonner';

export const seedModelVersions = async () => {
  // Check if the versions table has data
  const { count, error: countError } = await supabase
    .from('mental_model_versions')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking versions data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Versions table already contains data. Skipping seed operation.');
    return true;
  }
  
  // Format the model versions data for Supabase (using snake_case for column names)
  const versionsData = modelVersions.map(version => ({
    id: version.id,
    mental_model_id: version.mentalModelId,
    version_number: version.versionNumber,
    content_snapshot: version.contentSnapshot,
    change_log: version.changeLog, // Ensure this matches the column name in Supabase
    timestamp: version.timestamp
  }));
  
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
};
