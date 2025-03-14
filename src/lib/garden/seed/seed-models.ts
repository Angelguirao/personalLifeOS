
import supabase from '../client';
import { mentalModels } from '../data';
import { toast } from 'sonner';

export const seedMentalModels = async () => {
  try {
    // Check if data already exists
    const { count, error: countError } = await supabase
      .from('mental_models')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking mental models data:', countError);
      return false;
    }
    
    // If we already have data, no need to seed
    if (count && count > 0) {
      console.log('Mental models table already contains data. Skipping seed operation.');
      return true;
    }
    
    console.log('Seeding mental models...');
    
    // First, delete existing model versions data to avoid foreign key constraints
    console.log('Deleting existing model versions data...');
    try {
      await supabase
        .from('mental_model_versions')
        .delete()
        .gte('id', '00000000-0000-0000-0000-000000000000');
      console.log('Existing model versions deleted successfully');
    } catch (error) {
      console.error('Error deleting existing model versions:', error);
    }
    
    // Then delete existing mental models
    console.log('Deleting existing mental models data...');
    try {
      await supabase
        .from('mental_models')
        .delete()
        .gte('id', '00000000-0000-0000-0000-000000000000');
      console.log('Existing mental models deleted successfully');
    } catch (error) {
      console.error('Error deleting existing mental models:', error);
    }
    
    // Format the mental models data for Supabase
    console.log(`Seeding ${mentalModels.length} mental models...`);
    
    // Split into batches of 10 for better performance
    const batchSize = 10;
    for (let i = 0; i < mentalModels.length; i += batchSize) {
      const batch = mentalModels.slice(i, i + batchSize);
      console.log(`Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(mentalModels.length / batchSize)}`);
      
      const { error } = await supabase
        .from('mental_models')
        .insert(batch);
      
      if (error) {
        console.error('Error seeding mental models batch:', error);
        toast.error('Error seeding mental models to database');
        return false;
      }
    }
    
    console.log('Mental models seeded successfully');
    return true;
    
  } catch (error) {
    console.error('Error in seedMentalModels:', error);
    toast.error('Failed to seed mental models');
    return false;
  }
};
